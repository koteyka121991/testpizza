// компонент сортировки
// imr сокращеный импорт реакта
// блогодря стэйту мы ожим наш компонент, буду проиходить манипуляции с ним
import React from 'react';

const Sort = () => {
  // false по умолчанию, так как мы хоти в начале скрыть элимет сортировки попап
  const [openPopup, setOpenPopup] = React.useState(false);
  // state для сортировки 0 закинули значение что бы отображался активный первый элимент
  const [selected, setSelected] = React.useState(0);
  const list = [
    'популярности',
    'цене',
    'алфавиту'
  ]
  // перменая которой присвоили значение выбороно элимента списка 
  const sortName = list[selected];
  const onClickListItem = (i) => {
    // функция когда мы выбираем какое то значение попап должен скрываться
    // выбери какой то пункт
    setSelected(i);
    // потом скройся
    setOpenPopup(false);
  }

  

  return (
    <div className="sort">
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        {/* !openPopup !переварачивает знчение (не) */}
        {/* окрываем попап */}
        <span onClick={() => setOpenPopup(!openPopup)}>{sortName}</span>
      </div>
      {/* Логическое И (&&) вычисляет операнды(значения) слева направо, возвращая сразу 
              значение первого попавшего ложноподобного операнда; если все значения 
              истиноподобны, возвращается значение последнего операнда. */}
      {/* 
 если тут true isOpen  && то иди в  <div className="sort__popup">
                <ul>
                  <li className="active">популярности</li>
                  <li>цене</li>
                  <li>алфавиту</li>
                </ul>
              </div>  */}
      {openPopup && (
        <div className="sort__popup">
          <ul>
            {/* выбор сортировки */}
          {list.map((item,i) => (
          <li key={item} onClick={() => onClickListItem(i)} className={selected === i ? 'active' : ''}>{item}</li>
        ))}
            {/* <li className="active">популярности</li>
            <li>цене</li>
            <li>алфавиту</li> */}
          </ul>
        </div>
      )}
      {
      /* альтернитивное напиcсания условий  при помощи теренарного опетратора 
      условия если тру то отобржаем попап если фолс 'скрто'. IF else тут не пишем jsx не отрисует 
      {openPopup ? (
        <div className="sort__popup">
          <ul>
            <li className="active">популярности</li>
            <li>цене</li>
            <li>алфавиту</li>
          </ul>
        </div>
      ): (
        'скрыто'
      )}
       */}
    </div>
  )
}
export default Sort;