import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

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
                <Grid item xs={12} sm={10}>
                  <Typography gutterBottom variant="subtitle1" >
                    {product.title}
                  </Typography>
                  <Typography className={classes.text} gutterBottom variant="subtitle1" >
                    {"size|"+ product.description}
                  </Typography>
                  <Typography className={classes.text} gutterBottom variant="subtitle1" >
                    {"Quantity:" + product.quantity}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={2}>
                  <Typography gutterBottom variant="subtitle1" >
                    {product.currencyFormat}{product.price}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Grid>
        </Grid>
      </div>
    </Card>
  );
}
