import React, { useState, useEffect } from "react";
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
import FormHelperText from "@material-ui/core/FormHelperText";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import {Button, Checkbox} from "@material-ui/core";
import {Link} from "react-router-dom"


export default function Home(){
    function GridApp(){
      const [moviesData, setMoviesData] = React.useState([]);

        useEffect(() => {
          console.log("This is use effect of home page, Grid app section");
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
                console.log(data);
                  const pub = data.movies.filter((data)=>{
                      if(data.status === "PUBLISHED"){
                        return true
                      }
                  })
                  console.log(pub);
                  setMoviesData(pub);
              }else{
                  const error = new Error();
                  error.message = error.message ?  error.message : "something happened";
                  throw error;
              }
        
              } catch (error) {
                  
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
            console.log("RELEASEEEE");
            console.log(data);
              const rel = data.movies.filter((data)=>{
                  if(data.status === "RELEASED"){
                    return true
                  }
              })
              setMoviesReleaseData(rel);
          }else{
              const error = new Error();
              error.message = error.message ?  error.message : "something happened";
              throw error;
          }
    
          } catch (error) {
              
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
          console.log(data);
          setGenresData(data.genres);
        }else{
            const error = new Error();
            error.message = error.message ?  error.message : "something happened";
            throw error;
        }
  
        } catch (error) {
            
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
          console.log(data);
          setArtistsData(data.artists);
        }else{
            const error = new Error();
            error.message = error.message ?  error.message : "something happened";
            throw error;
        }
  
        } catch (error) {
            
        }
        return {};
  }

      useEffect(() => {
        const artistsObject = {};
        artistsData.forEach((data)=>{
          artistsObject[data.first_name] = false;
        })
        setArtistsCheckBoxData({...artistsObject});
      },[artistsData]);

      useEffect(() => {
        const genresObject = {};
        genresData.forEach((data)=>{
          genresObject[data.genre] = false;
        })
        setGenresCheckBoxData({...genresObject});
      },[genresData]);

      useEffect(() => {
        console.log("This is use effect of home page, Grid app section");
        getReleasedData();
        getGenereData();
        getArtistsData();
      
    },[]);
    function onNameChange(event){
      setMoveNameData(event.target.value);
    }
    function handleArtistCheckBoxChange(event){
      const state = {...artistsCheckBoxData};
      state[event.target.name] = event.target.checked;
      setArtistsCheckBoxData({...state});
    }
    function handleGenreCheckBoxChange(event){
      const state = {...genresCheckBoxData};
      state[event.target.name] = event.target.checked;
      setGenresCheckBoxData({...state});
    }
    function onReleaseStartChange(event){
      setReleaseStartData(event.target.value);
    }
    function onReleaseEndChange(event){
      setReleaseEndData(event.target.value);
    }
    function onImageClickedHandler(event){
      console.log("Image clickeddddd", event)
    }
    async function applyFiltersHandler(){
      //WHY WITH STATE IT DID NOT WORK??? moviesReleaseData REMAINED SAME? TOO MUCH RE RENDERING?
      //NOT RESETTING!!! THERE IS SOME PROBLEM WHEN MULTIPLE SET FUNCTIONS ARE CALLED TOGETHER
     // var state  = await getReleasedData();
      console.log("snokkeeeeee", moviesReleaseData)
      var movieFilter = [...moviesReleaseData];

      if(moveNameData.length > 0){
        movieFilter = movieFilter.filter((data)=>{
          if(data.title == moveNameData){
            return true;
          }
        })
        //setMoviesReleaseData([...state]);  
      }
      const genresArray = [];
      for(var key in genresCheckBoxData){
        if(genresCheckBoxData[key] === true){
          genresArray.push(key);
        }
      }
      if(genresArray.length > 0){
        var state = movieFilter.filter((data)=>{
          for(let i of genresArray){
            if(data.genres.includes(i)){
              return true;
            }
          }
        })
        movieFilter = state;
      }

      const artistsArray = [];
      for(var key in artistsCheckBoxData){
        if(artistsCheckBoxData[key] === true){
          artistsArray.push(key);
        }
      }
      if(artistsArray.length > 0){
        var state = movieFilter.filter((data)=>{
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
        //console.log("release start date is set ", moviesReleaseData);    
  
      }
      if(releaseEndData.length > 0){
         movieFilter = movieFilter.filter((data)=>{
          if(Date.parse(data.release_date) <= Date.parse(releaseEndData)){
            return true;
          }
        })
        //<Link to = {{pathname: `/movie/${data.id}`, state: { moviedetails: {data}}}}><img src={data.poster_url} alt={data.title} /></Link>
       // setMoviesReleaseData([...state]);  
       }
       setMoviesReleaseData([...movieFilter]);
    }
      return (
        <div>
          {console.log(releaseStartData,releaseEndData)}
          <div className="flex-container">
            <div className="releaseGrid">
              <GridList className="grid" cellHeight={350} cols={4}>
                {moviesReleaseData.map((data) => (
                  <GridListTile key={data.id} id = "releasedImage" cols={1}>
                    <Link to = {{pathname: `/movie/${data.id}`, state: { moviedetails: data.id}}}><img src={data.poster_url} className = "gridImage" alt={data.title} /></Link>
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
              <Card className="cardStyle" style = {{textAlign: "center", width: "280px"}}>
                <CardContent>
                  <Typography variant="headline" component="h2">
                    FIND MOVIES BY:
                  </Typography>
                  <br />
                  <FormControl className = "formControl">
                      <InputLabel htmlFor="movieName">
                      Movie Name
                      </InputLabel>
                      <Input id = "movieName" value = {moveNameData} onChange = {onNameChange}/>
                  </FormControl>
                  <br />
                  <br />
                  <FormControl className = "formControl">
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
                  <FormControl className = "formControl">
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
                  <FormControl className = "formControl">
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
                  <FormControl className = "formControl">
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
                  <br/>
                  <br/>
                  <br />
                  <Button color = "primary" variant="contained" onClick = {applyFiltersHandler}>APPLY</Button>
                </CardContent>
              </Card>
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

