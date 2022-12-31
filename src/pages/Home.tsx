import React from 'react';
import qs from 'qs';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Categories from "../components/Categories";
import PizzaBlock from '../components/PizzaBlock/PizzaBlock'
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort, { list } from '../components/Sort';
import Pagination from '../components/pagination/Pagination';
import { selectFilter, setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { fetchPizzas, selectPizzasData } from '../redux/slices/pizzasSlice';



const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);
  const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);
  const { items, status } = useSelector(selectPizzasData);
  // const sortType = sort.sortProperty;


  // const [isLoading, setIsLoading] = React.useState(true);
  const onClickCategory = (i:number) => {
    dispatch(setCategoryId(i));
  }

  const onChangePage = (number:number) => {
    dispatch(setCurrentPage(number));
  }

  const getPizzas = async () => {
    // setIsLoading(true);
    const sortBy = sort.sortProperty.replace('-', '');
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';
    // ассинхроный запрос на бэкенд
    // Синхронно: скрипт останавливается и ждет, пока сервер отправит ответ, прежде чем продолжить.
    // Асинхронно: скрипт разрешает обработку страницы и обрабатывает ответ, когда и если он придет.
    // await axios.get(`https://639098ef65ff41831118e35d.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
    //   .then(response => {
    //     setPizzas(response.data);
    //     setIsLoading(false);
    //   })

    // promise преврщает синхроный код в асинхроный. Ахион возвращает промис 
    // отлавливаем ошибки

    dispatch(
      //@ts-ignore
      fetchPizzas({
      currentPage, category, sortBy, order, search
    }),
    );
    window.scrollTo(0, 0)
  };

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = list.find((obj) => obj.sortProperty === params.sortProperty)
      dispatch(setFilters({
        ...params,
        sort
      }),
      );
      isSearch.current = true;
    }
  }, []);

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, currentPage])


  React.useEffect(() => {
    // window.scrollTo(0, 0);
    // if (!isSearch.current) 
    // {
    getPizzas();
    // }
    // isSearch.current = false;
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);



  const pizzaItems = items.filter((obj:any) => {
    if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
      return true;
    }
    return false;
  }
  ).map((obj:any) => <Link key={obj.id} to={`/pizza/${obj.id}`}> <PizzaBlock
    {...obj} /></Link>);
  const sceleton = [...new Array(6)].map((_, index) => <Skeleton key={index} />)
  
  return (
    <>
      <div className='container'>
        <div className="content__top">

          <Categories value={categoryId} onClickCat={onClickCategory} />
          <Sort
          />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        {
          status === 'error' ? <div>Ошибка загрузки</div> : <div className="content__items">
            {
              status === 'Loading' ? sceleton
                : pizzaItems
            }
          </div>
        }

        <Pagination currentPage={currentPage} onChangePage={onChangePage} />
      </div>
    </>
  );
}

export default Home;
