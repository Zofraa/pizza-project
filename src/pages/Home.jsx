import React from 'react';
import qs from 'qs';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Categories from '../components/Categories';
import Sort, { sortTypes } from '../components/Sort';
import PizzaSkeleton from '../components/PizzaBlock/PizzaSkeleton';
import PizzaBlock from '../components/PizzaBlock';
import Pagination from '../components/Pagination';

import { filterSelector, setCategoryId, setCurrentPage, setFilters } from '../redux/slises/filterSlice';
import { fetchPizzas, selectPizzaData } from '../redux/slises/pizzaSlice';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isMounted = React.useRef(false);

  const isSearch = React.useRef(false);
  const { items, status } = useSelector(selectPizzaData);
  const { activeCategory, sort, currentPage, searchText } = useSelector(filterSelector);

  const setActiveCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (page) => {
    dispatch(setCurrentPage(page));
  };

  const getPizzas = async () => {
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const sorting = sort.sortProperty.replace('-', '');
    const category = activeCategory > 0 ? `category=${activeCategory}` : '';
    const search = searchText ? `&search=${searchText}` : '';

    dispatch(
      fetchPizzas({
        order,
        sorting,
        category,
        search,
        currentPage,
      })
    );
  };

  React.useEffect(() => {
    if (window.Location.search) {
      const params = qs.parse(window.Location.search);

      const sortList = sortTypes.find((obj) => obj.sortProperty === params.sortProperty);

      dispatch(
        setFilters({
          ...params,
          sortList,
        })
      );
      isSearch.current = true;
    }
  });

  React.useEffect(() => {
    getPizzas();
    isSearch.current = false;
  }, [activeCategory, sort.sortProperty, searchText, currentPage]);

  React.useEffect(() => {
    if (isMounted.current) {
      const querryStr = qs.stringify({
        sortProperty: sort.sortProperty,
        activeCategory,
        currentPage,
      });

      navigate(`?${querryStr}`);
    }
    isMounted.current = true;
  }, [activeCategory, sort.sortProperty, currentPage, navigate]);

  const pizzas = items
    .filter((pizza) => {
      console.log(pizza);
      if (pizza.name.toLowerCase().includes(searchText.toLowerCase())) {
        return true;
      }
      return false;
    })
    .map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />);
  console.log(pizzas);
  const skeletons = [...new Array(8)].map((_, index) => <PizzaSkeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories category={activeCategory} setCategory={setActiveCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div>
          <h1>Ошибка при получении пицц</h1>
          <h4>Похоже, кто-то их сьел...</h4>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
      )}
      <Pagination value={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
