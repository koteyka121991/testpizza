import React from 'react';
import style from './search.module.scss'
import close from '../../assets/img/free-icon-font-cross-3917759.svg'
import { AppContext } from '../../App';

// инпуты в реакте контролируемые 
const Search = () => {
     const {searchValue, setSearchValue} = React.useContext(AppContext);
    return (
        <div className={style.root}>
            <svg className={style.icon} xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512" height="512"><path d="M23.707,22.293l-5.969-5.969a10.016,10.016,0,1,0-1.414,1.414l5.969,5.969a1,1,0,0,0,1.414-1.414ZM10,18a8,8,0,1,1,8-8A8.009,8.009,0,0,1,10,18Z" /></svg>
            <input
                // рекомендуеться хранить в value то что меняет инпут
                value={searchValue}
                onChange={(event) => { setSearchValue(event.target.value) }}
                className={style.input}
                placeholder='Поиск...' />
            {searchValue && (
                // очитска поиска 
                <img onClick={()=>{setSearchValue('')}}
                 className={style.clearInput} width="25" src={close}
                    alt="input close" />
            )
            }
        </div>
    );
}

export default Search;
