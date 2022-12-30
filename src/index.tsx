// npm install --save typescript @types/node @types/react @types/react-dom @types/jest установка ts в готовый проект

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { store } from "./redux/store";
import { Provider } from "react-redux";
const rootElement = document.getElementById("root")

// render оображение, отрисовка html взятый из какого либо компонента
// ctrl +j открытие терминала
// в js запускать html нельзя
// JSX – это расширение синтаксиса JavaScript, которое во время компиляции транслируется в обычный JavaScript.
// npm install sass установка sass
// slice куски с логикой коорая будет обрабатыать хранилище раньше это называлось reduce
if(rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  );
}


