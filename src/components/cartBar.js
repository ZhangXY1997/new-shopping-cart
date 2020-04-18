import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import MediaControlCard from './cart.js';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles({
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

export default function TemporaryDrawer({ prod, state }) {
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
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div>
        <IconButton color="secondary" onClick={toggleDrawer(anchor, false)}>
        <CloseIcon />
        </IconButton>
      </div>
      <ul className={classes.ul} >
        {state.selected.selectedItem.map(product => <MediaControlCard key={ product.sku } product={product} />)}
      </ul>  
      <Typography gutterBottom variant="subtitle1" >
        {"SUBTOTAL: "+prod.currencyFormat}{state.selected.totalPrice}
      </Typography>    
    </div>
   
  );

  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button variant="contained" color="primary" onClick={() =>buttonClick(anchor) }>ADD TO CART</Button>
          <Drawer anchor={anchor} open={cart[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}

// classes={{ paper: classes.paper }}


