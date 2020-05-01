import React from 'react';
import ItemCard from "./components/itemCard.js";
import Container from '@material-ui/core/Container';


const App = () => {

  return (
    <div>
      <Container maxWidth="lg">
        <ItemCard />
      </Container>
    </div>
    
  );
};

export default App;