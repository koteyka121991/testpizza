import React from 'react';
import qs from 'qs';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Categories from "../components/Categories";
import PizzaBlock from '../components/PizzaBlock/PizzaBlock'
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort, { list } from '../components/Sort';
import Pagination from '../components/pagination/Pagination';
import { selectFilter, setCategoryId, setCurrentPage, setFilters, } from '../redux/slices/filterSlice';
import { fetchPizzas, SearchPizzaParams, selectPizzasData, Status } from '../redux/slices/pizzasSlice';
import { useAppDispatch } from '../redux/store';



const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);
  const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);
  const { items, status } = useSelector(selectPizzasData);
  // const sortType = sort.sortProperty;


  // const [isLoading, setIsLoading] = React.useState(true);
  const onClickCategory = (i: number) => {
    dispatch(setCategoryId(i));
  }

  const onChangePage = (number: number) => {
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
      fetchPizzas({
        currentPage: String(currentPage),
        category,
        sortBy,
        order,
        search
      }),
    );
    window.scrollTo(0, 0)
  };

  // React.useEffect(() => {
  //   if (isMounted.current) {
  //     const params = {
  //       categoryId: categoryId > 0 ? categoryId : null,
  //       sortProperty: sort.sortProperty,
  //       currentPage
  //     };
  //     const queryString = qs.stringify(params, { skipNulls: true });
  //     navigate(`/?${queryString}`);
  //   }
  //   if (!window.location.search) {
  //     dispatch(fetchPizzas({} as SearchPizzaParams));
  //   }
  // }, [categoryId, sort.sortProperty, searchValue, currentPage]);


  React.useEffect(() => {
    getPizzas();
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);


  // React.useEffect(() => {
  //   if (window.location.search) {
  //     const params = (window.location.search.substring(1)) as unknown as SearchPizzaParams;
  //     const sort = list.find((obj) => obj.sortProperty === params.sortBy)
  //     dispatch(setFilters({
  //       searchValue: params.search,
  //       categoryId: Number(params.category),
  //       currentPage: Number(params.currentPage),
  //       sort: sort || list[0],
  //     }));
  //     isMounted.current = true;
  //   }
  // }, []);





  const pizzaItems = items.filter((obj: any) => {
    if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
      return true;
    }
    return false;
  }
  ).map((obj: any) => 
 
  <PizzaBlock
    {...obj} />

    );
  const sceleton = [...new Array(6)].map((_, index) => <Skeleton key={index} />)

  return (
    <>
      <div className='container'>
        <div className="content__top">

          <Categories value={categoryId} onClickCat={onClickCategory} getCategories={() => { }} />
          <Sort
          />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        {
          status === Status.ERROR ? <div>Ошибка загрузки</div> : <div className="content__items">
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
