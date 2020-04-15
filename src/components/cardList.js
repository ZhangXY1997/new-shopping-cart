import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import ItemCard from "./itemCard.js";

const useStyles = makeStyles((theme) => ({
  root: {
    
  },
  gridList: {
    
  },
  icon: {
   
  },
}));

export default function TitlebarGridList() {
  const classes = useStyles();

  const [data, setData] = useState({});
  const products = Object.values(data);
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('./data/products.json');
      const json = await response.json();
      setData(json);
    };
    fetchProducts();
  }, []);

  return (
    <div className={classes.root}>
      <GridList cellHeight={180} className={classes.gridList}>
        <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
          <ListSubheader component="div">16 Product(s) found.</ListSubheader>
        </GridListTile>
        {products.map((tile) => (
          <GridListTile key={tile.img}>
            <img src="/data/products/876661122392077_1.jpg" />
            <GridListTileBar
              title={tile.title}
              subtitle={<span>{tile.currencyFormat}{tile.price}</span>}
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
