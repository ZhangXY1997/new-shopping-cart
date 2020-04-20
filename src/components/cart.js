import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import RemoveIcon from '@material-ui/icons/Remove';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: 90,
    padding: 22,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
    width: 310,
  },
  cover: {
    width: 60,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  text: {
    marginTop: -10,
  }
}));

export default function MediaControlCard({product}) {
  const classes = useStyles();

  const [count, setCount] = useState(product.quantity);

  const addItem = () => {
    setCount(count+ 1);
    product.quantity=count;
  }

  const reduce = () => {
    setCount(Math.max(count - 1, 0));
    product.quantity=count;
  }
  product.quantity=count;
  

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.cover}
        image={"/data/products/"+product.sku +"_1.jpg"}
      />
      <div>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <CardContent className={classes.content}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={9}>
                  <Typography gutterBottom variant="subtitle1" >
                    {product.title}
                  </Typography>
                  <Typography className={classes.text} gutterBottom variant="subtitle1" >
                    {"size|"+ product.description}
                  </Typography>
                  <Typography className={classes.text} gutterBottom variant="subtitle1" >
                    {"Quantity:" + count}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Typography gutterBottom variant="subtitle1" >
                    {product.currencyFormat}{product.price}
                  </Typography>
                  <ButtonGroup>
                    <IconButton aria-label="increase" onClick={() => addItem() } >
                      <AddIcon />
                    </IconButton>
                    <IconButton aria-label="reduce" onClick={() => reduce() } >
                      <RemoveIcon />
                    </IconButton>
                  </ButtonGroup>
                </Grid>
              </Grid>
            </CardContent>
          </Grid>
        </Grid>
      </div>
    </Card>
  );
}
