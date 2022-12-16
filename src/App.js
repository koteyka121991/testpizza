
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
// https://cssgrid-generator.netlify.app/ для верстки полезный ресурс
// при помощи контекста можно создать глобальное значение и использовать это значение на разных компонентах
// Prop Drilling процес прокидывания пропсов от основного компонента к дочернему через компоненты которые находяться между основным и конечным


import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from "./components/Header";
import Cart from './pages/Cart';
// при перемещении компонента можно файл переменовать в index и тогда вэб пак найдет его в указаной пакпе 
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import "./scss/app.scss";


function App() {
const [searchValue, setSearchValue]=React.useState('');
console.log(searchValue, 'input changed')
  return (
    <div className="wrapper">
      <Header searchValue={searchValue} setSearchValue={setSearchValue}  />
      <div className="content">
    
          <Routes>
            <Route
              path="/"
              element={<Home searchValue={searchValue} setSearchValue={setSearchValue}/>}
            />
            <Route
              path="/cart"
              element={<Cart />}
            />
            <Route
              //  path="*" * ставим чтобы сделать переход на страницу если ни с чем не совпадает 
              path="*"
              element={<NotFound />}
            />

          </Routes>

      
      </div>
    </div>
  );
}

export default App;
