type Categories = {
  category: number;
  setCategory: any;
};

const Categories: React.FC<Categories> = ({ category, setCategory }) => {
  // или можно было бы так: ({ category, setCategory }:Categories)   хотя это не очень способ
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
};

export default Categories;
