import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TemporaryDrawer from './cartBar.js';
import CartIcon from './cartIcon.js';
import SizeButton from './sizebutton.js';
import Signin from './signin.js';
import firebase from './firebase.js';

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

  const [data, setData] = useState({});
  const [tprice, setTprice] = useState(0);
  const [inventorydata, setInventorydata] = useState({});
  const [uid, setUid] = useState();
  const [carts, setCarts] = useState();

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
  }, [uid]);

  useEffect(() => {
      firebase.auth().onAuthStateChanged((user) => {
          if (user) {
              setUid(user.uid);
          }
      });
  });

  useEffect(() => {
      const dbCarts = db.child("carts");
      const handleData = snap => {
          if (snap.val()){
              setCarts(snap.val(), );
          };
      };
      dbCarts.on('value', handleData, error => alert(error));
      return () => {
          dbCarts.off('value', handleData);
      };
  }, []);

  const useSelection = () => {
    const [selected, setSelected] = useState({
      selectedItem: [],
      totalPrice: {
        price: 0,
      },
    });
    useEffect(() => {
      if (uid && carts) {
        const userInfo = carts[uid];
        if (userInfo.items) {
          var dbPrice = 0;
          userInfo.items.map(prod => {
            dbPrice += prod.price * prod.quantity;
          })
          setTprice(dbPrice);
          setSelected({selectedItem: userInfo.items, totalPrice: {price: dbPrice}})
        }
      } else {
        setSelected({selectedItem: [], totalPrice: {price: 0}})
        setTprice(0);
      }
    }, [uid]);

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
        if (uid) {
          const items = selected.selectedItem;
        items.push(temp);
        db.child("carts").child(uid)
          .update({
              items: items
          })
          .catch(error => alert(error));
        }
        

      } else {
        setSelected({selectedItem: selected.selectedItem, totalPrice: {price: y + selected.totalPrice.price}})
        if (uid && carts[uid].items) {
          const userInfo = carts[uid]
          userInfo.items.map(prod => {
            if (prod.sku === x.sku && prod.size === size) {
              prod.quantity += 1;
              db.child("carts")
              .update({
                  [uid]: userInfo
              })
              .catch(error => alert(error));
            }
          })
        }
        
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
            <Signin state={{uid, setUid}} />
          </Grid>
          <Grid item xs={12} sm={1}>
            <CartIcon state={ { selected, toggle } } state1={{tprice, setTprice}} inventory={ inventory } />
          </Grid>
        </Grid>
      </div>
      <ul>
        <Grid container spacing={3}>
        {products.map((product) => (
            <ProdCard product={product} inventory={inventory} state={ { selected, toggle } } state1={{tprice, setTprice}} state2={{carts, setCarts}} uid={uid} />
        ))}
        </Grid>
      </ul>
    </div>
  );
}

function ProdCard({product, inventory, state, state1, state2, uid}) {
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
              <TemporaryDrawer key={ product.sku } prod={product} state={ state } state1={state1} state2={state2} size={size} inventory={ inventory } disstate={{dis, setDis}} uid={uid} />
            </Grid>
          </Grid>
        </Grid>
        </CardActions>
      </Card>
    </Grid>
  );
}
