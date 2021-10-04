import React, { useState } from "react";
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


export default function Home(){
    function GridApp(){
        const tileData = [
            {key:1, img: "http://placekitten.com/200/200", title: "cat", author: "john smith" },
            {key :2, img: "http://placekitten.com/200/200", title: "cat", author: "mary smith" },
            {key:3, img: "http://placekitten.com/200/200", title: "cat", author: "mary smith" },
            {key:4, img: "http://placekitten.com/200/200", title: "cat", author: "john smith" },
            {key :5, img: "http://placekitten.com/200/200", title: "cat", author: "mary smith" },
            {key:6, img: "http://placekitten.com/200/200", title: "cat", author: "mary smith" },
            {key:7, img: "http://placekitten.com/200/200", title: "cat", author: "john smith" },
            {key :8, img: "http://placekitten.com/200/200", title: "cat", author: "mary smith" },
            {key:9, img: "http://placekitten.com/200/200", title: "cat", author: "mary smith" }
          ];
        return (
            <div>
            <GridList className = "grid" style={{flexWrap: "nowrap"}} cellHeight={250} cols={6}>
              {tileData.map(tile => (
                <GridListTile key={tile.key} cols={tile.cols || 1}>
                  <img src={tile.img} alt={tile.title} />
                  <GridListTileBar
                    title={tile.title}
                    subtitle={<span>by: {tile.author}</span>}
                  />
                </GridListTile>
              ))}
            </GridList>
          </div>
        )
    }
    function GridRelease() {
      const tileData = [
        {key:1, img: "http://placekitten.com/200/200", title: "cat", author: "john smith" },
        {key :2, img: "http://placekitten.com/200/200", title: "cat", author: "mary smith" },
        {key:3, img: "http://placekitten.com/200/200", title: "cat", author: "mary smith" },
        {key:4, img: "http://placekitten.com/200/200", title: "cat", author: "john smith" },
        {key :5, img: "http://placekitten.com/200/200", title: "cat", author: "mary smith" },
      ];
      var locations = ["hyd","bang"]

      function handler(){
        console.log("hellooo");
      }
      return (
        <div>
          <div className="flex-container">
            <div className="releaseGrid">
              <GridList className="grid" cellHeight={350} cols={4}>
                {tileData.map((tile) => (
                  <GridListTile cols={tile.cols || 1}>
                    <img src={tile.img} alt={tile.title} />
                    <GridListTileBar
                      title={tile.title}
                      subtitle={<span>by: {tile.author}</span>}
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
                      <Input id = "movieName"/>
                  </FormControl>
                  <br />
                  <br />
                  <FormControl className = "formControl">
                      <InputLabel htmlFor="genres">
                      Genres
                      </InputLabel>
                      <Select>
                        {["action", "horror", "romance", "thriller"].map((loc) => (
                          <MenuItem key={loc} value={loc}>
                            {loc}
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
                      <Select>
                        {["alia bhaat", "kim shin", "kohli", "salman"].map((loc) => (
                          <MenuItem key={loc} value={loc}>
                              <Checkbox checked = {true} value = {loc} />
                              {loc}
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
                    />
                  </FormControl>
                  <br/>
                  <br/>
                  <br />
                  <Button color = "primary" variant="contained">APPLY</Button>
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

