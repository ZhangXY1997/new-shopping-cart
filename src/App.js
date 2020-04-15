import React, { useEffect, useState } from 'react';
import ItemCard from "./components/itemCard.js";
import TitlebarGridList from "./components/cardList.js";
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    width: "90%",
  }
});

const App = () => {

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
    <div>
      <Container maxWidth="lg">
        <ItemCard />
      </Container>
    </div>
    
    // <ul>
      // {products.map(product => <li key={product.sku}>{product.title}</li>)}
    // </ul>
  );
};

export default App;