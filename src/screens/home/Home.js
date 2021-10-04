import React, { useState } from "react";
import "./Home.css";
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

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
    return(
        <div>
            <div className = "homeHeader">Upcoming Movies</div>
            <GridApp></GridApp>

        </div>
    )    
}
//keep both in one component. That component will again return 2 component