import React  from 'react';
//  Props это объект коорый харнит в себе какие то атрибуты которые мы передаем компонентам
const PizzaBlock = ({title, price}) => {
    // деструктуризация это разбор на части, сокращает код
     // useState(0)-вызов функции useState со значением 0 (0)
  // [pizzaCount, setPizzaCount] pizzaCount значение состояние которого мы меняем setPizzaCount функция для изменения значения
//   тут мы изменяем количество заказываемых пиц
// useState хук для хранения сосояния. Нсли нам нужно хранить просто значения переменых без изменения состояния хук useState не используеться просто присваивааем значения переменой
// React.useState альтарнативное взятие хука из реакта
  const [pizzaCount, setPizzaCount]=React.useState(0);
//   onClickAdd переменая харнит ссылку на эту функцию
  const onClickAdd = () => {
    // в реакте мы передали функцию setPizzaCount в () указали занчение которое можно увиличить (pizzaCount +1)
//    благодаря этой функции произошла перересовка состояния
    setPizzaCount(pizzaCount +1);
  }
  return (
    <div className="pizza-block">
      <img
        className="pizza-block__image"
        src="https://dodopizza-a.akamaihd.net/static/Img/Products/Pizza/ru-RU/b750f576-4a83-48e6-a283-5a8efb68c35d.jpg"
        alt="Pizza"
      />
      <h4 className="pizza-block__title">{title}</h4>
      <div className="pizza-block__selector">
        <ul>
          <li className="active">тонкое</li>
          <li>традиционное</li>
        </ul>
        <ul>
          <li className="active">26 см.,/</li>
          <li>30 см.</li>
          <li>40 см.</li>
        </ul>
      </div>
      {/* onClick должен получиь функцию для этого пишем фигурные скобки */}
      <button onClick={onClickAdd} className="pizza-block__bottom">
        <div className="pizza-block__price">от {price} ₽</div>
        <div className="button button--outline button--add">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Добавить</span>
          <i>{pizzaCount}</i>
        </div>
      </button>
    </div>
  );
};
export default PizzaBlock;
