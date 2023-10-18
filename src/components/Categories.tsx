import React from 'react';

type CategoriesProps = {
  category: number;
  setCategory: (i: number) => void; // плевать как назвать тут аргумент, void значит что функция ничего не вернет
};

const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

const Categories: React.FC<CategoriesProps> = ({ category, setCategory }) => {
  // или можно было бы так: ({ category, setCategory }:Categories)   хотя это не очень способ

  return (
    <div className="categories">
      <ul>
        {categories.map((value, index /*рендер списка ёмаё*/) => (
          <li key={index} onClick={() => setCategory(index)} className={category === index ? 'active' : ''}>
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
