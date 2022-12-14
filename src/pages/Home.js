import React from 'react';
import Categories from "../components/Categories";
// при перемещении компонента можно файл переменовать в index и тогда вэб пак найдет его в указаной пакпе 
import PizzaBlock from '../components/PizzaBlock/PizzaBlock'
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort from '../components/Sort'

const Home = () => {
  // получение пицц с сервера
  const [pizzas, setPizzas] = React.useState([]);
  // соятояние загрузки пиц с сервера отображение фэйковых пиц
  const [isLoading, setIsLoading] = React.useState(true);
  // useEffect не получает значение, он получе функцию которую он буде вызывать ессли произойдет какой то эфект.
  // useEffect позволяе отлавливать действия которые будет происходить в компоненте
  // сосояние жизненого цикла сосояние когда компонен отрисовался componentDidMount и когда потом он исчизает  , componentWillUnmount
  // useEffect позволяет выполнить какое то дейсвие один раз, если мы его не применим будет бесконечная отрисовка. К примеру бесконечные запросы на сервер
  React.useEffect(() => {
    fetch('https://639098ef65ff41831118e35d.mockapi.io/items')
      .then((response) => response.json())
      // return не обязательно в useEffect писать
      .then((json) => {
        setPizzas(json);
        setIsLoading(false);
      })
  // при первом рендере страницы будет перекидвать в верх
      window.scrollTo(0,0);
    // если передать чо то в массив то то что ты пердал в массив }, []); измениться будет вызываться эта функция (бесконечный запрос)
  }, []);

  // https://639098ef65ff41831118e35d.mockapi.io/items
  // fetch функция которая делает запросы  
  // fetch('https://639098ef65ff41831118e35d.mockapi.io/items').then((response)=>{
  //  return response.json();
  // })
  // .then((json)=>{
  //   setPizzas(json);
  // })
  return (
    <>
      <div className='container'>
        <div className="content__top">
          <Categories />
          <Sort />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">

          { /* генерируем фэйковый массив [...new Array(6)] 
    (_, index) _передаем потому что у нас пустой массив и js может ругаться
    */
            isLoading ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
              : pizzas.map(obj => <PizzaBlock
                // сокращеная запись копирования объектов применяеться спред опертор ... {...obj}     
                /* наименование пропса не обязательно должно совпадать с названием объекта. Пример image={obj.imageUrl} */
                //  title={obj.title} price={obj.price} imageUrl={obj.imageUrl} sizes={obj.sizes} types={obj.types} 
                key={obj.id} {...obj} />)

          }
          {/* числовые значения можно передовать в фигурных скобках {500}  */}
          {/* <PizzaBlock title='Мексиканская' price={500} /> */}

        </div>
      </div>
    </>
  );
}

export default Home;
