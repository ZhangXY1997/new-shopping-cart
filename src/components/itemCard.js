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
import TemporaryDrawer from './cartBar.js';
import CartIcon from './cartIcon.js';
import SizeButton from './sizebutton.js';
import Signin from './signin.js';
import firebase from 'firebase/app';
import 'firebase/database';

const useStyles = makeStyles({
  root: {
    minWidth: 300,
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
  const [tprice, setTprice] = useState(0);
  const [inventorydata, setInventorydata] = useState({});

  const firebaseConfig = {
    apiKey: "AIzaSyDGehOXzZLBnpMnP5u1kG528ol92JlgoXA",
    authDomain: "new-shopping-cart-b228f.firebaseapp.com",
    databaseURL: "https://new-shopping-cart-b228f.firebaseio.com",
    projectId: "new-shopping-cart-b228f",
    storageBucket: "new-shopping-cart-b228f.appspot.com",
    messagingSenderId: "642892692693",
    appId: "1:642892692693:web:cd5a3285525e12eca9f65c",
    measurementId: "G-6RNQNL6N00"
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  const db = firebase.database().ref();

  const products = Object.values(data);
  useEffect(() => {
    db.child("products").on("value", function(snapshot) {
      setData(snapshot.val());
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
  }, []);

  const inventory = Object(inventorydata);
    useEffect(() => {
    db.child("inventory").on("value", function(snapshot) {
      setInventorydata(snapshot.val());
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
  }, []);

  const useSelection = () => {
    const [selected, setSelected] = useState({
      selectedItem: [],
      totalPrice: {
        price: 0,
      },
    });
    const toggle = (x, y, size) => {
      var flag = false;
      selected.selectedItem.map(prod => {
        if (prod.sku === x.sku && prod.size === size) {
          prod.quantity += 1;
          flag = true;
        }
      })
      if (flag === false) {
        x.quantity = 1;
        var temp = Object.assign({}, x);;
        temp.size = size;
        setSelected({selectedItem: [temp].concat(selected.selectedItem), totalPrice: {price: y + selected.totalPrice.price}})
      } else {
        setSelected({selectedItem: selected.selectedItem, totalPrice: {price: y + selected.totalPrice.price}})
      }
    };

    return [ selected, toggle ];
  };
  const [selected, toggle] = useSelection();

  return (
    <div>
      <div>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={7} >
          </Grid>
          <Grid item xs={12} sm={4} >
            <Signin />
          </Grid>
          <Grid item xs={12} sm={1}>
            <CartIcon state={ { selected, toggle } } state1={{tprice, setTprice}} inventory={ inventory } />
          </Grid>
        </Grid>
      </div>
      <ul>
        <Grid container spacing={3}>
        {products.map((product) => (
            <ProdCard product={product} inventory={inventory} state={ { selected, toggle } } state1={{tprice, setTprice}} />
        ))}
        </Grid>
      </ul>
    </div>
  );
}

function ProdCard({product, inventory, state, state1}) {
  const classes = useStyles();

  const [dis, setDis] = useState(true);
  const [size, setSize] = useState("");


  return (
    <Grid className={classes.root} item xs={12} sm={3}>
      <Card>
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
            <SizeButton inventory={ inventory[product.sku] } state={ {size, setSize} } state1={{dis, setDis}} />
          <Grid item xs={12}>
            <Grid container justify="center" >
              <TemporaryDrawer key={ product.sku } prod={product} state={ state } state1={state1} size={size} inventory={ inventory } disstate={{dis, setDis}} />
            </Grid>
          </Grid>
        </Grid>
        </CardActions>
      </Card>
    </Grid>
  );
}
