import React, { useEffect } from "react";
import "./Home.css";
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import {Button, Checkbox} from "@material-ui/core";
import {Link} from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

const styles = (theme) => ({
  root: {
    margin: theme.spacing.unit,
    minWidth: 240,
    maxWidth: 240
  },
  heading: {
    color: theme.palette.primary.light,
    fontSize: '17px',
  }
});

 function Home(props){
    var hideButton = props.hideButtonInHeader;

    const { classes } = props;
    
    useEffect(() => {
      hideButton();
    });
    function GridApp(){
      const [moviesData, setMoviesData] = React.useState([]);

        useEffect(() => {
          async function getGridData(){
            try {
                const rawPromise = fetch('http://localhost:8085/api/v1/movies?page=1&limit=17',{
                    method: 'GET',
                    headers: {
                      "Accept": "application/json;charset=UTF-8"
                    }
                })
                const rawResponse = await rawPromise;
                var data = await rawResponse.json();
                
              if(rawResponse.ok){
                  const pub = data.movies.filter((data)=>{
                      if(data.status === "PUBLISHED"){
                        return true
                      }
                      return false
                  })
                  setMoviesData(pub);
              }else{
                  const error = new Error();
                  error.message = error.message ?  error.message : "something happened";
                  throw error;
              }
        
              } catch (error) {
                  alert(error);
              }
              return {};
        }
        getGridData();
      },[]);
      
        return (
            <div>
            <GridList className = "grid" style={{flexWrap: "nowrap"}} cellHeight={250} cols={6}>
              {moviesData.map(data => (
                <GridListTile key={data.id} cols={1}>
                  <img src={data.poster_url} alt={data.title} />
                  <GridListTileBar
                    title={data.title}
                  />
                </GridListTile>
              ))}
            </GridList>
          </div>
        )
    }
    function GridRelease() {
      const [moviesReleaseData, setMoviesReleaseData] = React.useState([]);
      const [genresData, setGenresData] = React.useState([]);
      const [artistsData, setArtistsData] = React.useState([]);

      const [moveNameData, setMoveNameData] = React.useState("");
      const [releaseStartData, setReleaseStartData] = React.useState("");
      const [releaseEndData, setReleaseEndData] = React.useState("");
      const [artistsCheckBoxData, setArtistsCheckBoxData] = React.useState({});
      const [genresCheckBoxData, setGenresCheckBoxData] = React.useState({});

      async function getReleasedData(){
        try {
            const rawPromise = fetch('http://localhost:8085/api/v1/movies?page=1&limit=17',{
                method: 'GET',
                headers: {
                  "Accept": "application/json;charset=UTF-8"
                }
            })
            const rawResponse = await rawPromise;
            var data = await rawResponse.json();
            
          if(rawResponse.ok){
              const rel = data.movies.filter((data)=>{
                  if(data.status === "RELEASED"){
                    return true
                  }
                  return false
              })
              setMoviesReleaseData(rel);
          }else{
              const error = new Error();
              error.message = error.message ?  error.message : "something happened";
              throw error;
          }
    
          } catch (error) {
            alert(error);
          }
          return {};
    }
    async function getGenereData(){
      try {
          const rawPromise = fetch('http://localhost:8085/api/v1/genres',{
              method: 'GET',
              headers: {
                "Accept": "application/json;charset=UTF-8"
              }
          })
          const rawResponse = await rawPromise;
          var data = await rawResponse.json();
          
        if(rawResponse.ok){
          setGenresData(data.genres);
        }else{
            const error = new Error();
            error.message = data.message ?  data.message : "something happened";
            throw error;
        }
  
        } catch (error) {
          alert(error);
        }
        return {};
  }
    async function getArtistsData(){
      try {
          const rawPromise = fetch('http://localhost:8085/api/v1/artists?page=1&limit=20',{
              method: 'GET',
              headers: {
                "Accept": "application/json;charset=UTF-8"
              }
          })
          const rawResponse = await rawPromise;
          var data = await rawResponse.json();
          
        if(rawResponse.ok){
          setArtistsData(data.artists);
        }else{
            const error = new Error();
            error.message = data.message ?  data.message : "something happened";
            throw error;
        }
  
        } catch (error) {
          alert(error);
        }
        return {};
  }

      useEffect(() => {
        const artistsObject = {};
        artistsData.forEach((data) => {
          artistsObject[data.first_name] = false;
        });
        setArtistsCheckBoxData({ ...artistsObject });
      }, [artistsData]);

      useEffect(() => {
        const genresObject = {};
        genresData.forEach((data) => {
          genresObject[data.genre] = false;
        });
        setGenresCheckBoxData({ ...genresObject });
      }, [genresData]);

      useEffect(() => {
        getReleasedData();
        getGenereData();
        getArtistsData();
      }, []);
      function onNameChange(event) {
        setMoveNameData(event.target.value);
      }
      function handleArtistCheckBoxChange(event) {
        const state = { ...artistsCheckBoxData };
        state[event.target.name] = event.target.checked;
        setArtistsCheckBoxData({ ...state });
      }
      function handleGenreCheckBoxChange(event) {
        const state = { ...genresCheckBoxData };
        state[event.target.name] = event.target.checked;
        setGenresCheckBoxData({ ...state });
      }
      function onReleaseStartChange(event) {
        setReleaseStartData(event.target.value);
      }
      function onReleaseEndChange(event) {
        setReleaseEndData(event.target.value);
      }
    async function applyFiltersHandler(){
      var movieFilter = [...moviesReleaseData];

      if(moveNameData.length > 0){
        movieFilter = movieFilter.filter((data)=>{
          if(data.title === moveNameData){
            return true;
          }
          return false;
        })
      }
      const genresArray = [];
      for(let key in genresCheckBoxData){
        if(genresCheckBoxData[key] === true){
          genresArray.push(key);
        }
      }
      if(genresArray.length > 0){
        let state = movieFilter.filter((data)=>{
          for(let i of genresArray){
            if(data.genres.includes(i)){
              return true;
            }
          }
        })
        movieFilter = state;
      }

      const artistsArray = [];
      for(let key in artistsCheckBoxData){
        if(artistsCheckBoxData[key] === true){
          artistsArray.push(key);
        }
      }
      if(artistsArray.length > 0){
        let state = movieFilter.filter((data)=>{
          for(let i of artistsArray){
            for(var artist of data.artists){
              if(artist["first_name"] === i){
               return true;
              }
            }
          }
       })
        movieFilter = state;
      }

      if(releaseStartData.length > 0){
          movieFilter = movieFilter.filter((data)=>{
          if(Date.parse(data.release_date) >= Date.parse(releaseStartData)){
            return true;
          }
        })  
      }
      if(releaseEndData.length > 0){
         movieFilter = movieFilter.filter((data)=>{
          if(Date.parse(data.release_date) <= Date.parse(releaseEndData)){
            return true;
          }
        })
       }
       setMoviesReleaseData([...movieFilter]);
    }
      return (
        <div>
          <div className="flex-container">
            <div className="releaseGrid">
              <GridList className="grid" cellHeight={350} cols={4}>
                {moviesReleaseData.map((data) => (
                  <GridListTile key={data.id} id = "releasedImage" cols={1}>
                    <Link to = {{pathname: `/movie/${data.id}`,state: { moviedetails: data.id}}}><img src={data.poster_url} className = "gridImage" alt={data.title} /></Link>
                    <GridListTileBar 
                      title={data.title}
                      className = "gridTitle"
                      subtitle={<span>Release Date {data.release_date}</span>}
                    />
                  </GridListTile>
                ))}
              </GridList>
            </div>
            <div className="filter">
              <div className = "filterContent">
                <Card>
                <CardContent className= {classes.root}>
                  <Typography variant="headline" className = {classes.heading} component="h2">
                    FIND MOVIES BY:
                  </Typography>
                  <br />
                  <FormControl className = "formContents">
                      <InputLabel htmlFor="movieName">
                      Movie Name
                      </InputLabel>
                      <Input id = "movieName" value = {moveNameData} onChange = {onNameChange}/>
                  </FormControl>
                  <br />
                  <br />
                  <FormControl className = "formContents">
                      <InputLabel htmlFor="genres">
                      Genres
                      </InputLabel>
                      <Select placeholder = {"Genres"} value = "">
                        {genresData.map((data) => (
                          <MenuItem key={data.id}>
                              <Checkbox checked = {genresCheckBoxData[data.genre]} id = {data.genre} name = {data.genre} onChange={handleGenreCheckBoxChange}/>
                              <label htmlFor = {data.genre}> {data.genre}</label>
                          </MenuItem>
                        ))}
                      </Select>
                  </FormControl>
                  <br />
                  <br />
                  <FormControl className = "formContents">
                      <InputLabel htmlFor="artists">
                      Artists
                      </InputLabel>
                      <Select placeholder = {"Artists"} value = "">
                        {artistsData.map((data) => (
                          <MenuItem key={data.id}>
                              <Checkbox checked = {artistsCheckBoxData[data.first_name]} id = {data.first_name} name = {data.first_name} onChange={handleArtistCheckBoxChange}/>
                              <label htmlFor = {data.first_name}> {data.first_name + " " + data.last_name}</label>
                          </MenuItem>
                        ))}
                      </Select>
                  </FormControl>
                  <br />
                  <br />
                  <FormControl className = "formContents">
                      <InputLabel shrink = {true} htmlFor="releaseStart">
                      Release Date Start
                      </InputLabel>
                      <br/>
                      <TextField
                      id = "releaseStart"
                      type = "Date"
                      onChange = {onReleaseStartChange}
                    />
                  </FormControl>
                  <br/>
                  <br />
                  <FormControl className = "formContents">
                      <InputLabel shrink = {true} htmlFor="releaseEnd">
                      Release Date End
                      </InputLabel>
                      <br/>
                      <TextField
                      id = "releaseEnd"
                      type = "Date"
                      onChange = {onReleaseEndChange}
                    />
                  </FormControl>
                </CardContent>
                <br/>
                  <br/>
                  <div className = "mybutton">
                  <Button color = "primary" style = {{width: "100%"}} variant="contained" onClick = {applyFiltersHandler}>APPLY</Button>
                  </div>  
                 </Card>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return(
        <div>
            <div className = "homeHeader">Upcoming Movies</div>
            <GridApp></GridApp>
            <GridRelease></GridRelease>
        </div>
    )    
}
Home.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Home);

