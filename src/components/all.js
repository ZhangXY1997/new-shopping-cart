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
  },
  list: {
    width: 440,
  },
  ul: {
    margin: 0,
    padding: 0,
  },
  paper: {
    backgroundColor: 'black',
  },
});

export default function All() {
  const classes = useStyles();

  const [cart, setCart] = useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setCart({ ...cart, [anchor]: open });
  };

  const buttonClick = (anchor) => {
    state.toggle(prod, prod.price);
    setCart({ ...cart, [anchor]: true });
  }

  const list = (anchor) => (

    <div
      className={clsx(classes.list)}
      role="presentation"
    >
      <div>
        <IconButton color="secondary" onClick={toggleDrawer(anchor, false)}>
        <CloseIcon />
        </IconButton>
      </div>
      <ul className={classes.ul} >
        {state.selected.selectedItem.map(product => <MediaControlCard key={ product.sku } product={product} totalprice={state.selected.totalPrice} />)}
      </ul>  
      <Typography gutterBottom variant="subtitle1" >
        {"SUBTOTAL: "+prod.currencyFormat}{state.selected.totalPrice.price}
      </Typography>    
    </div>
   
  );

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

  const useSelection = () => {
    const [selected, setSelected] = useState({
      selectedItem: [],
      totalPrice: {
        price: 0,
      },
    });
    const toggle = (x, y) => {
      var flag = false;
      selected.selectedItem.map(prod => {
        if (prod.sku === x.sku) {
          prod.quantity += 1;
          flag = true;
        }
      })
      if (flag === false) {
        x.quantity = 1;
        setSelected({selectedItem: [x].concat(selected.selectedItem), totalPrice: {price: y + selected.totalPrice.price}})
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
          <Grid item xs={12} sm={11}>
          </Grid>
          <Grid item xs={12} sm={1}>
            <CartIcon state={ { selected, toggle } } />
          </Grid>
        </Grid>
      </div>
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
                    <div>
                      <React.Fragment key={'right'}>
                        <Button variant="contained" color="primary" onClick={() =>buttonClick('right') }>ADD TO CART</Button>
                        <Drawer anchor={'right'} open={cart['right']} onClose={toggleDrawer('right', false)}>
                          {list('right')}
                        </Drawer>
                      </React.Fragment>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
              </CardActions>
            </Card>
          </Grid>
        ))}
        </Grid>
      </ul>
    </div>
  );
}
