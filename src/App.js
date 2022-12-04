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

import Categories from "./components/Categories";
import Header from "./components/Header";
import PizzaBlock from "./components/PizzaBlock";
import Sort from "./components/Sort";
import "./scss/app.scss";

function App() {
 
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
            {/* числовые значения можно передовать в фигурных скобках {500}  */}
            <PizzaBlock title='Мексиканская' price={500} />
            <PizzaBlock />
            <PizzaBlock />
            <PizzaBlock />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;