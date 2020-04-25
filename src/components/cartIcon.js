import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import MediaControlCard from './cart.js';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

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

function CartIcon({ state, state1, inventory }) {
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
        {"SUBTOTAL: $"}{state1.tprice}
      </Typography>    
    </div>
   
  );

  return (
    <div>
      <React.Fragment key={'right'}>
        <IconButton onClick={toggleDrawer('right', true)}>
          <ShoppingCartIcon fontSize="large"/>
        </IconButton>
        <Drawer anchor={'right'} open={cart['right']} onClose={toggleDrawer('right', false)}>
          {list('right')}
        </Drawer>
      </React.Fragment>
    </div>
  );
}

export default CartIcon;

// classes={{ paper: classes.paper }}


