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

export default function TemporaryDrawer({ prod, state, state1, size, inventory, dis}) {
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
    state.toggle(prod, prod.price, size);
    setCart({ ...cart, [anchor]: true });
    state1.setTprice(state1.tprice + prod.price);
    inventory[prod.sku][size] -= 1;
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
        {state.selected.selectedItem.map(product => <MediaControlCard key={ product.sku } product={product} state={state1} inventory={inventory[product.sku]} />)}
      </ul>  
      <Typography gutterBottom variant="subtitle1" >
        {"SUBTOTAL: "+prod.currencyFormat}{state1.tprice}
      </Typography>    
    </div>
   
  );

  return (
    <div>
      <React.Fragment key={'right'}>
        <Button key={prod.sku} disabled={false} variant="contained" color="primary" onClick={() =>buttonClick('right') }>ADD TO CART</Button>
        <Drawer anchor={'right'} open={cart['right']} onClose={toggleDrawer('right', false)}>
          {list('right')}
        </Drawer>
      </React.Fragment>
    </div>
  );
}

// classes={{ paper: classes.paper }}


