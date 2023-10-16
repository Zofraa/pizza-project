import React from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const FullPizza: React.FC = () => {
  // FC - функциональный компонент
  const [pizza, setPizza] = React.useState<{
    imageUrl: string;
    name: string;
    price: number;
  }>();
  const { id } = useParams();
  const navigate = useNavigate();
  console.log(useParams());

  React.useEffect(() => {
    // useEffect не типизируется вообще
    async function fetchPizza() {
      try {
        const { data } = await axios.get('https://65019992736d26322f5bfd85.mockapi.io/items/' + id);
        setPizza(data);
      } catch (error) {
        alert('ошибк');
        navigate('/');
      }
    }

    fetchPizza();
  }, []);

  if (!pizza) {
    return <>загрузка...</>;
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
