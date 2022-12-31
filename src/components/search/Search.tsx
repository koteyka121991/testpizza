// установили библиотеку npm i lodash.debounce
import debounce from 'lodash.debounce';
import React from 'react';
import style from './search.module.scss';
import close from '../../assets/img/free-icon-font-cross-3917759.svg';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchValue } from '../../redux/slices/filterSlice';

// инпуты в реакте контролируемые 
const Search = () => {
    const dispatch = useDispatch();    
    const [value, setValue] = React.useState('');    
    const inputRef = React.useRef<HTMLInputElement>(null);
 
    const onClickClear = () => {
        // первое действие очищает инпут
        dispatch (setSearchValue(''));
        setValue('');
        // делает фокус   
        // if (inputRef.current){
        //     inputRef.current.focus();
        // }
        // ?. оператор опциональной последовательности для ts
        inputRef.current?.focus();
       
    }
     // есть проблема debounce теряет ссылку на функцию он пересздает ее из за этого нормально не работает
    // для этого пишем сохрани ссылку на функцию. Используем useCallback.
    // useCallback похожа на useEffect но useEffect не возвращает функцию
    const updateSearchValue =React.useCallback(
        debounce((str)=>{           
            dispatch (setSearchValue(str));
        }, 500),
        [],); 
  

    const onChangeInput= (event:any)=> {
        setValue(event.target.value);
        updateSearchValue(event.target.value);
    }
    return (
        <div className={style.root}>
            <svg className={style.icon} xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512" height="512"><path d="M23.707,22.293l-5.969-5.969a10.016,10.016,0,1,0-1.414,1.414l5.969,5.969a1,1,0,0,0,1.414-1.414ZM10,18a8,8,0,1,1,8-8A8.009,8.009,0,0,1,10,18Z" /></svg>
            <input
                ref={inputRef}
                // рекомендуеться хранить в value то что меняет инпут
                value={value}
                onChange={onChangeInput}
                className={style.input}
                placeholder='Поиск...' />
            {value && (
                // очитска поиска 
                <img onClick={onClickClear}
                    className={style.clearInput} width="25" src={close}
                    alt="input close" />
            )
            }
        </div>
    );
}

export default Search;
