import React  from 'react';

const Categories =() => {
    const [activeIndex, setActiveIndex]=React.useState(0);
    // рендиринг списка
    const categories = [
        'Все',
        'Мясные',
        'Вегетарианская',
        'Гриль',
        'Острые',
        'Закрытые'
    ]
    const onClickCategory =(index)=> {
        // функция клика по категориям
        setActiveIndex(index);
    }
    return (
      <div className="categories">
      <ul>
      {/* {()=>onClickCategory()} вызываем анонимную функцию ()=> которая вызовит мою функцию onClickCategory()
       иначе будет ошибка и нифига работать не будет(будет бесконечная отрисовка, которая не рабоает). Проще говоря onClick не надо вызывать сразу функцию, вызови тогда когда я нажму на кнопку*/}
        
        <li onClick={()=>onClickCategory()} className="active">Все</li>
        <li>Мясные</li>
        <li>Вегетарианская</li>
        <li>Гриль</li>
        <li>Острые</li>
        <li>Закрытые</li>
      </ul>
    </div>
    )
  }
  export default Categories;