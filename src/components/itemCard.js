import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
  root: {
    
  },
  img: {
    height: "80%",
    width: "80%",
    marginLeft: 28,
  },
  card: {
    height: 450,
  },
  button: {
    minWidth: 50,
  }
});

export default function ItemCard() {
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
    <ul>
      <Grid container spacing={3}>
      {products.map((product) => (
          <Grid item xs={12} sm={3}>
            <Card className={classes.root}>
            <CardActionArea className={classes.card}>
              <CardMedia
                className={classes.img}
                image={"/data/products/"+product.sku + "_1.jpg"}
              />
              <CardContent>
                <Typography gutterBottom variant="subtitle1" align="center">
                  {product.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p" align="center">
                  {product.description}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p" align="center">
                  {product.currencyFormat}{product.price}
                </Typography> 
              </CardContent>
            </CardActionArea>
            <CardActions>
             <Grid container spacing={3}>
              <Grid item xs={12} sm={3}>
                <Button className={classes.button} variant="outlined" size="small">S</Button>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Button className={classes.button} variant="outlined" size="small">M</Button>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Button className={classes.button} variant="outlined" size="small">L</Button>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Button className={classes.button} variant="outlined" size="small">XL</Button>
              </Grid>
              <Grid item xs={12}>
                <Grid container justify="center" >
                  <Button className={classes.button} variant="contained" color="primary">
                    ADD TO CART
                  </Button>
                </Grid>
              </Grid>
            </Grid>
              
            </CardActions>
          </Card>
        </Grid>
      ))}
      </Grid>
    </ul>
  );
}
