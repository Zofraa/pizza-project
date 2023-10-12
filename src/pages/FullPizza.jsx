import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const FullPizza = () => {
  const [pizza, setPizza] = React.useState();
  const { id } = useParams();
  console.log(id);
  console.log(useParams());

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get('https://65019992736d26322f5bfd85.mockapi.io/items/' + id);
        setPizza(data);
      } catch (error) {
        alert('ошибк');
      }
    }

    fetchPizza();
  }, []);

  if (!pizza) {
    return 'загрузка';
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="" />
      <p>{pizza.name}</p>
      <h4>{pizza.price}</h4>
    </div>
  );
};

export default FullPizza;
