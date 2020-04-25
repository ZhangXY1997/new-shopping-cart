import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles({
  button: {
    minWidth: 50,
  },
  root: {
    maxWidth: 65,
    marginTop: 10,
  },
  paper: {
    textAlign: 'center',
  },
});

export default function SizeButton({inventory, state, state1}) {
  const classes = useStyles();

  if (inventory !== window.undefined && (inventory["L"] > 0 || inventory["XL"] > 0 || inventory["M"] > 0 || inventory["S"] > 0)) {
    return (
      <Grid direction="row" justify="center" container spacing={1}>
        <Grid className={classes.root} item xs={12} sm={3}>
          <Small inventory={inventory} state={state} state1={state1} />
        </Grid>
        <Grid className={classes.root} item xs={12} sm={3}>
          <Medium inventory={inventory} state={state} state1={state1} />
        </Grid>
        <Grid className={classes.root} item xs={12} sm={3}>
          <Large inventory={inventory} state={state} state1={state1} />
        </Grid>
        <Grid className={classes.root} item xs={12} sm={3}>
          <XLarge inventory={inventory} state={state} state1={state1} />
        </Grid>
      </Grid>
    );
  } else {
    return (
      <Grid justify="center" container spacing={1}>
        <Grid item xs={12} sm={12}>
          <Grid container justify="center" >
            <paper className={classes.paper} variant="outlined" size="small">OUT OF STOCK</paper>
          </Grid>
        </Grid>
      </Grid>
    );

  }
  
}

function Small({inventory, state, state1}) {
  const classes = useStyles();

  const s = () => {
    state.setSize("S");
    state1.setDis(false);
  }

  if (inventory !== window.undefined && inventory["S"] > 0) {
    return (
      <Button className={classes.button} variant="outlined" size="small" 
      onClick={() => s()} >S</Button>
    );
  } else {
    return(
      <div></div>
    );
  }
}

function Medium({inventory, state}) {
  const classes = useStyles();

  if (inventory !== window.undefined && inventory["M"] > 0) {
    return (
      <Button className={classes.button} variant="outlined" size="small" onClick={() => state.setSize("M")} >M</Button>
    );
  } else {
    return(
      <div></div>
    );
  }
}

function Large({inventory, state}) {
  const classes = useStyles();

  if (inventory !== window.undefined && inventory["L"] > 0) {
    return (
      <Button className={classes.button} variant="outlined" size="small" onClick={() => state.setSize("L")} >L</Button>
    );
  } else {
    return(
      <div></div>
    );
  }
}

function XLarge({inventory, state}) {
  const classes = useStyles();

  if (inventory !== window.undefined && inventory["XL"] > 0) {
    return (
      <Button className={classes.button} variant="outlined" size="small" onClick={() => state.setSize("XL")} >XL</Button>
    );
  } else {
    return(
      <div></div>
    );
  }
}
