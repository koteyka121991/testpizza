

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../../redux/slices/cartSlice';
//  Props это объект коорый харнит в себе какие то атрибуты которые мы передаем компонентам
const PizzaBlock = ({id, title, price, imageUrl, sizes, types }) => {
  const dispatch = useDispatch();
  const cartItem = useSelector((state) => state.cart.items.find((obj) => obj.id ===id))
  // const {items, totalPrice } = useSelector(state=>state.cart);
  // по умолчанию передаем 0 (0) по умолчанию будет выбран первый тип пицы
  const [activePizzaType, setActivePizzaType]=React.useState(0) 
  const [activePizzaSize, setActivePizzaSize]=React.useState(0) 
  //  массив типов пиц
  const typeNames = ['тонкое', 'традиционное'];
  const addedCount =cartItem ? cartItem.count : 0;
  // деструктуризация это разбор на части, сокращает код
  // useState(0)-вызов функции useState со значением 0 (0)
  // [pizzaCount, setPizzaCount] pizzaCount значение состояние которого мы меняем setPizzaCount функция для изменения значения
  //   тут мы изменяем количество заказываемых пиц
  // useState хук для хранения сосояния. Нсли нам нужно хранить просто значения переменых без изменения состояния хук useState не используеться просто присваивааем значения переменой
  // React.useState альтарнативное взятие хука из реакта
  // const [pizzaCount, setPizzaCount]=React.useState(0);
  //   onClickAdd переменая харнит ссылку на эту функцию
  //   const onClickAdd = () => {
  //     // в реакте мы передали функцию setPizzaCount в () указали занчение которое можно увиличить (pizzaCount +1)
  // //    благодаря этой функции произошла перересовка состояния
  //     setPizzaCount(pizzaCount +1);
  //   }


  const onClickAdd =()=> {
const item= {
  id,
  title,
  price,
  imageUrl,
  type:typeNames[activePizzaType],
  size:sizes[activePizzaSize]
};
dispatch(addItem(item))
  }
  return (
    <div className='pizza-block__wrapper'>
    <div className="pizza-block">
      <img
        className="pizza-block__image"
        src={imageUrl}
        alt="Pizza"
      />
      <h4 className="pizza-block__title">{title}</h4>
      <div className="pizza-block__selector">
        <ul>
          {/* при рендеринге массива типов пиц, значения массива
           мы берем typeNames (const typeNames = ['тонкое', 'традиционное']). Тип преобразуеться в строку (тонкое, традиционое) */}
           {/* onClick={()=> setActivePizzaType(typeId) второй более коротки й варинт функции выбора активного клика */}
          {types.map((typeId) => (<li key={typeId} onClick={()=> setActivePizzaType(typeId)} className={activePizzaType===typeId ? 'active' : ''}>{typeNames[typeId]}</li>))}
        </ul>
        <ul>
        {/* ключи нужны в списках иначе реакт может не корректо отрендерить список
        при изменении элмента массива напрмер удаление , в ключи не стоит передать индекс          */}
          {sizes.map((value, i) => (<li key={value} onClick={()=> setActivePizzaSize(i)} className={activePizzaSize===i ? 'active' : ''}>{value} см.</li>))}

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
          {addedCount >0 &&
            <i>{addedCount}</i>
          }
          
        </div>
      </button>
    </div>
    </div>
  );
};
export default PizzaBlock;
