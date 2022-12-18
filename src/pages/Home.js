import React from 'react';
import Categories from "../components/Categories";
// при перемещении компонента можно файл переменовать в index и тогда вэб пак найдет его в указаной пакпе 
import PizzaBlock from '../components/PizzaBlock/PizzaBlock'
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort from '../components/Sort'
import ReactPaginate from 'react-paginate';
import Pagination from '../components/pagination/Pagination';
import { AppContext } from '../App';

const Home = () => {
  const {searchValue} = React.useContext(AppContext);
  // получение пицц с сервера
  const [pizzas, setPizzas] = React.useState([]);
  // соятояние загрузки пиц с сервера отображение фэйковых пиц
  const [isLoading, setIsLoading] = React.useState(true);
  // состояния активного индекса категории 
  const [categoryId, setCategoryId] = React.useState(0);
  // состояние индекс сортировки
  const [sortType, setSortType] = React.useState(
    { name: 'популярности', sort: 'rating' }
   );
   const[currentPage,setCurrentPage ] =React.useState(1);
  // useEffect не получает значение, он получе функцию которую он буде вызывать ессли произойдет какой то эфект.
  // useEffect позволяе отлавливать действия которые будет происходить в компоненте
  // сосояние жизненого цикла сосояние когда компонен отрисовался componentDidMount и когда потом он исчизает  , componentWillUnmount
  // useEffect позволяет выполнить какое то дейсвие один раз, если мы его не применим будет бесконечная отрисовка. К примеру бесконечные запросы на сервер
  React.useEffect(() => {
    setIsLoading(true);
  //  переменые для условий сортировки
// из свойства мы удаляем минус  если он есть
  const sortBy = sortType.sort.replace('-','');
// проверяеть есть в сортировке минус если есть делай сторировку по возрастанию asc если нет то по убыванию desc
    const order =sortType.sort.includes('-') ? 'asc' : 'desc';   
    const category = categoryId>0? `category=${categoryId}`:'';
    const search = searchValue? `&search=${searchValue}`:'';
    // поверка чтобы выводились пицы в категории все (занчение 0) если categoryId>0 то выводим пицы иначе  передаем пустую строку 
    fetch(`https://639098ef65ff41831118e35d.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
    )
      .then((response) => response.json())
      // return не обязательно в useEffect писать
      .then((json) => {
        setPizzas(json);
        setIsLoading(false);
      })
    // при первом рендере страницы будет перекидвать в верх
    window.scrollTo(0, 0);
    // если передать чо то в массив то то что ты пердал в массив }, []); измениться будет вызываться эта функция (бесконечный запрос)
  }, [categoryId, sortType, searchValue, currentPage]);
  // https://639098ef65ff41831118e35d.mockapi.io/items
  // fetch функция которая делает запросы  
  // fetch('https://639098ef65ff41831118e35d.mockapi.io/items').then((response)=>{
  //  return response.json();
  // })
  // .then((json)=>{
  //   setPizzas(json);
  // })

// данные способ реализации поиска не плох когда есть статичный массив 
  const pizzaItems= pizzas.filter( obj=> 
    // Метод includes() определяет, содержит ли массив определённый элемент, возвращая в зависимости от этого true или false.
    // если в каждом объекте title есть что содержиться в searchValue то мы оставляем это в массиве иначе ничего не остаеться
    // toLowerCase() метод первода значения в нижний регистр
    {if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
      return true;
    }
    return false;
    }
  ).map(obj => <PizzaBlock
    // сокращеная запись копирования объектов применяеться спред опертор ... {...obj}     
    /* наименование пропса не обязательно должно совпадать с названием объекта. Пример image={obj.imageUrl} */
    //  title={obj.title} price={obj.price} imageUrl={obj.imageUrl} sizes={obj.sizes} types={obj.types} 
    key={obj.id} {...obj} />);
    const sceleton =[...new Array(6)].map((_, index) => <Skeleton key={index} />)

  return (
    <>
      <div className='container'>
        <div className="content__top">
          {/* categoryId  и sortType прокидываем через пропты в нужный нам компонент */}
          <Categories value={categoryId} onClickCat={(i) => setCategoryId(i)} />
          <Sort sortValue={sortType} onClickType={(i) => setSortType(i)} />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
          { /* генерируем фэйковый массив [...new Array(6)] 
    (_, index) _передаем потому что у нас пустой массив и js может ругаться
    */
            isLoading ? sceleton
              : pizzaItems 
          }
          {/* числовые значения можно передовать в фигурных скобках {500}  */}
          {/* <PizzaBlock title='Мексиканская' price={500} /> */}
        </div>
      <Pagination onChangePage={number=>setCurrentPage(number)}/>
      </div>
    </>
  );
}

export default Home;
