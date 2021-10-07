import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import "./Details.css";
import YouTube from 'react-youtube';

export default function Details(props){
    const data = props.location.state.moviedetails.data;
    //setmovieDetails(props.location.state.moviedetails);
    {console.log(props.location.state.moviedetails)}
    return(
        <div>
            <h3>Back to home</h3>
            <div className ="maincontainer">
                <div className = "leftSide">
                <img src={data.poster_url} className = "leftImage" alt={data.title} />
                
                </div>
                <div className = "middleSide">
                    <Typography style = {{fontWeight: "bold"}} variant="h3">
                        {data.title}
                    </Typography>

                    <Typography inline style = {{fontWeight: "bold"}} variant="h6">
                        Genre:
                    </Typography>
                    <span>&nbsp;</span>
                    <Typography inline variant="subtitle1">
                        {data.genres.toString()}
                    </Typography>
                    <br></br>

                    <Typography inline style = {{fontWeight: "bold"}} variant="h6">
                        Duration:
                    </Typography>
                    <span>&nbsp;</span>
                    <Typography inline variant="subtitle1">
                        {data.duration}
                    </Typography>
                    <br></br>

                    <Typography inline style = {{fontWeight: "bold"}} variant="h6">
                        Release Date:
                    </Typography>
                    <span>&nbsp;</span>
                    <Typography inline variant="subtitle1">
                        {data.release_date}
                    </Typography>
                    <br></br>

                    <Typography inline style = {{fontWeight: "bold"}} variant="h6">
                        Rating:
                    </Typography>
                    <span>&nbsp;</span>
                    <Typography inline variant="subtitle1">
                        {data.rating}
                    </Typography>

                    <br></br>
                    <br></br>
                    <br></br>
                    <Typography inline style = {{fontWeight: "bold"}} variant="h6">
                        Plot:
                    </Typography>
                    <span>&nbsp;</span>
                    <Typography inline variant="subtitle1">
                        <a href = {data.wiki_url} alt = "Wiki">(wiki Link) </a>
                        {data.storyline}
                    </Typography>
                    <br></br>
                    <br></br>
                    <Typography style = {{fontWeight: "bold"}} variant="h6">
                        Trailer:
                    </Typography>
                    <YouTube opts={{width: "100%"}} videoId = {data.trailer_url}></YouTube>            
                </div>
                <div className = "rightSide">
                    <Typography style = {{fontWeight: "bold"}} variant="h6">
                        Rate this movie:
                    </Typography>
                    <Typography style = {{fontWeight: "bold"}} variant="h6">
                        Artists:
                    </Typography>
                    <div>
                    {data.artists.map((art) => (
                        <img src={art.profile_url} key = {art.first_name} className = "rightImage" alt={art.first_name} />
                        ))}
                    </div>
                </div>
            </div>
        </div>    
    )    
}