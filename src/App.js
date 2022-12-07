
  // это реактовский компонент, обязательно называем с большой буквы
  // функциональный компонент возвращает html разметку(jsx), без возврата это не функциональный компонент
  // внутри {} должен быть написан какой то код, перменая jsx вернет содержимое кода
  // npm run start перезагрузка приложения
  // npm i sass установка scss
  // state состояния (данные)
  // хуки позволяют использовать состояние без использования классов , ранее использовались классы
  // useState хук для хранения сосояния
  // реакт создает вирутальное дерево. Реакт сверяет виртуальное дерево с реальным. Реакт точечно делает перересовку этим самым он оптимизирует отрисовку приложения, тем самым производительность приложения растет 
  // в обычном js каждое изменение в дом дереве может затронуть лишнюю память и производительность приложения снижаеться если делать много операций с дом деревом. Реакт не позволяет этого делать
  // реакт оптимизирует этот процесс. Тем самым увеличиваеться скорость работы приложения
  import React, { useEffect } from 'react';
  import Categories from "./components/Categories";
  import Header from "./components/Header";
  import PizzaBlock from "./components/PizzaBlock";
  import Sort from "./components/Sort";
  import "./scss/app.scss";

  
  function App() {
    // получение пицц с сервера
    const[pizzas, setPizzas]=React.useState([]);
    // useEffect не получает значение, он получе функцию которую он буде вызывать ессли произойдет какой то эфект.
    // useEffect позволяе отлавливать действия которые будет происходить в компоненте
    // сосояние жизненого цикла сосояние когда компонен отрисовался componentDidMount и когда потом он исчизает  , componentWillUnmount
    // useEffect позволяет выполнить какое то дейсвие один раз, если мы его не применим будет бесконечная отрисовка. К примеру бесконечные запросы на сервер
    React.useEffect(()=> {
      fetch('https://639098ef65ff41831118e35d.mockapi.io/items')
      .then((response)=> response.json())
      // return не обязательно в useEffect писать
        .then((json)=>{
          setPizzas(json);
        })
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
      <div className="wrapper">
        <Header />
        <div className="content">
          <div className="container">
            <div className="content__top">
              <Categories />
              <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
  
              {pizzas.map((obj)=> (    
                // сокращеная запись копирования объектов применяеться спред опертор ... {...obj}     
              <PizzaBlock key={obj.id} {...obj}
                          /* наименование пропса не обязательно должно совпадать с названием объекта. Пример image={obj.imageUrl} */
              //  title={obj.title} price={obj.price} imageUrl={obj.imageUrl} sizes={obj.sizes} types={obj.types} 
               />
               ))}
              {/* числовые значения можно передовать в фигурных скобках {500}  */}
              {/* <PizzaBlock title='Мексиканская' price={500} /> */}
           
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default App;
 