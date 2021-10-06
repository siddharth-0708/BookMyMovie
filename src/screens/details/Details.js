import React, { useState } from "react";

export default function Details(props){
    const [movieDetails, setmovieDetails] = React.useState([]);
    //setmovieDetails(props.location.state.moviedetails);
    {console.log(props.location.state.moviedetails)}
    return(
        <h4> This is Details page</h4>  
    )    
}