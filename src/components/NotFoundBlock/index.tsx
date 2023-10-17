import { Link } from 'react-router-dom';

import styles from './NotFoundBlock.module.scss';
// console.log(styles);  перед тем как импортировать что-то, необходимо проверять что это такое( для понимания и т.д.)

const NotFoundBlock: React.FC = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span>Ничего не найдено</span>
      </h1>
      <p>
        Такой страницы у нас нет, хотите вернутся на <Link to="/">главную?</Link>
      </p>
    </div>
  );
};

export default NotFoundBlock;
