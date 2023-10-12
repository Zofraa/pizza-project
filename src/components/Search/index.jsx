import React from 'react';
import { useDispatch } from 'react-redux';
import { setSearchText } from '../../redux/slises/filterSlice';
import debounce from 'lodash.debounce';
import styles from './Search.module.scss';

const Search = () => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState('');

  const updateImput = React.useCallback(
    debounce((str) => {
      dispatch(setSearchText(str));
    }, 500),
    []
  );

  const onChangeImput = (ev) => {
    setValue(ev.target.value);
    updateImput(ev.target.value);
  };

  return <input value={value} onChange={onChangeImput} className={styles.root} placeholder="Поиск пиццы..." />;
  // дальше должна быть свгшка с онКлик очисткой поля, и ее оптимизировали( хуком useRef ), но я решил этого не делать, ибо думал не надо:
  // https://youtu.be/YAsKVCNqdy4?feature=shared&t=493
  // сonst imputRef = React.useRef();
  // <imput ref={imputRef} />
  // и там потом онКлик (){inputRef.current.focus()}; вместо document.querySelector..... понятно короч
  // нельзя обращатся к dom-элементам через querySelector, надо юзать useRef
};

export default Search;
