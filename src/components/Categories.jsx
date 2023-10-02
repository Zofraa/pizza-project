import React from 'react';

function Categories({ category, setCategory }) {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

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
}

export default Categories;
