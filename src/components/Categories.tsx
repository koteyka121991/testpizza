import React from 'react';


type CategoriesProps = {
  value: number;
  onClickCat: (i: number)=> void;
  getCategories:(categories: string[]) => void;
} ;
// рендиринг списка
const categories = [
  'Все',
  'Мясные',
  'Вегетарианская',
  'Гриль',
  'Острые',
  'Закрытые'
]
const Categories: React.FC<CategoriesProps> =  React.memo(({value, onClickCat}) => {
  // const [activeIndex, setActiveIndex] = React.useState(0);

  // getCategories(categories);
  // const onClickCategory = (index) => {
  //   // функция клика по категориям
  //   setActiveIndex(index);
  // }
  return (
    <div className="categories">
      <ul>
        {/* рендер списка */}
        {/* {()=>onClickCategory()} вызываем анонимную функцию ()=> которая вызовит мою функцию onClickCategory()
       иначе будет ошибка и нифига работать не будет(будет бесконечная отрисовка, которая не рабоает). Проще говоря onClick не надо вызывать сразу функцию, вызови тогда когда я нажму на кнопку*/}
        {/* <li onClick={()=>onClickCategory()} className="active">Все</li> */}
        {/* Метод map() позволяет из одного массива создавать другой. Длина массива не меняеться , но значение массива меняеться */}
        {/* index i номер элимента начинаеться с 0 */}
        {/* Итерация  — повторение какого-либо действия */}
        {/* вместо (activeIndex === 0) 0 мы передаем индех i activeIndex === i  */}
        {categories.map((catName, i) => (
          <li key={catName} onClick={() => onClickCat(i)} className={value === i ? 'active' : ''}>{catName}</li>
        ))}

      </ul>
    </div>
  )
})
export default Categories;