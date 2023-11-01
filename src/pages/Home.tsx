import React from 'react';
import qs from 'qs';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Sort, Categories, PizzaSkeleton, PizzaBlock, Pagination } from '../components';
// это называется Reexport, сокращает кол-во import, но также можно и оптимизировать с его помощью

import { sortTypes } from '../components/Sort';

import { FilterSliceState, filterSelector, setCategoryId, setCurrentPage, setFilters } from '../redux/slises/filterSlice';
import { fetchPizzas, selectPizzaData } from '../redux/slises/pizzaSlice';
import { useAppDispatch } from '../redux/store';

const Home: React.FC = () => {
  const temp: any = window;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isMounted = React.useRef(false);

  const isSearch = React.useRef(false);
  const { items, status } = useSelector(selectPizzaData);
  const { activeCategory, sort, currentPage, searchText } = useSelector(filterSelector);

  const setActiveCategory = React.useCallback((id: number) => {
    dispatch(setCategoryId(id));
  }, []);

  const onChangePage = (page: number) => {
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
        currentPage: String(currentPage),
      })
    );
  };

  React.useEffect(() => {
    if (temp.Location.search) {
      // в начале функционального компонента указал константу temp = window, т.к в TS такого типа нет
      const params = qs.parse(temp.Location.search) as unknown as FilterSliceState;

      const sortList = sortTypes.find((obj) => obj.sortProperty === params.sort.sortProperty);
      if (sortList) {
        params.searchText = searchText;
      }
      dispatch(setFilters(params));
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
    .filter((pizza: any) => {
      if (pizza.name.toLowerCase().includes(searchText.toLowerCase())) {
        return true;
      }
      return false;
    })
    .map((pizza: any) => <PizzaBlock key={pizza.id} {...pizza} />);
  const skeletons = [...new Array(8)].map((_, index) => <PizzaSkeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories category={activeCategory} setCategory={setActiveCategory} />
        <Sort value={sort} />
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
