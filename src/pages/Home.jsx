import React from 'react';
import qs from 'qs';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Categories from '../components/Categories';
import Sort, { sortTypes } from '../components/Sort';
import PizzaSkeleton from '../components/PizzaBlock/PizzaSkeleton';
import PizzaBlock from '../components/PizzaBlock';
import Pagination from '../components/Pagination';

import { setCategoryId, setCurrentPage, setFilters } from '../redux/slises/filterSlice';
import axios from 'axios';
import { someContext } from '../App';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isMounted = React.useRef(false);

  const isSearch = React.useRef(false);

  const { activeCategory, sort, currentPage } = useSelector((state) => state.filter);

  const { searchText } = React.useContext(someContext);
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const setActiveCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (page) => {
    dispatch(setCurrentPage(page));
  };

  const fetchPizzas = () => {
    setIsLoading(true);

    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const sorting = sort.sortProperty.replace('-', '');
    const category = activeCategory > 0 ? `category=${activeCategory}` : '';
    const search = searchText ? `&search=${searchText}` : '';

    axios
      .get(`https://65019992736d26322f5bfd85.mockapi.io/items?limit=4&page=${currentPage}&${category}&sortBy=${sorting}&order=${order}${search}`)
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      });
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
    if (!isSearch.current) {
      fetchPizzas();
    }
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
      if (pizza.name.toLowerCase().includes(searchText.toLowerCase())) {
        return true;
      }
      return false;
    })
    .map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />);
  const skeletons = [...new Array(8)].map((_, index) => <PizzaSkeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories category={activeCategory} setCategory={setActiveCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination value={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
