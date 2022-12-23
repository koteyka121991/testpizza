import React from 'react';
import qs from 'qs';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Categories from "../components/Categories";
import PizzaBlock from '../components/PizzaBlock/PizzaBlock'
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort, { list } from '../components/Sort';
import Pagination from '../components/pagination/Pagination';
import { AppContext } from '../App';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import axios from 'axios';



const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);
  const { categoryId, sort, currentPage } = useSelector((state) => state.filter);
  // const sortType = sort.sortProperty;
  const { searchValue } = React.useContext(AppContext);
  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const onClickCategory = (i) => {
    dispatch(setCategoryId(i));
  }

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  }

  const fetchPizzas = () => {
    setIsLoading(true);
    const sortBy = sort.sortProperty.replace('-', '');
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';
    axios.get(`https://639098ef65ff41831118e35d.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
      .then(response => {
        setPizzas(response.data);
        setIsLoading(false);
      })

  }

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
  }, [categoryId,  sort.sortProperty, currentPage])


  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      fetchPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);



  const pizzaItems = pizzas.filter(obj => {
    if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
      return true;
    }
    return false;
  }
  ).map(obj => <PizzaBlock
    key={obj.id} {...obj} />);
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
        <div className="content__items">
          {
            isLoading ? sceleton
              : pizzaItems
          }
        </div>
        <Pagination currentPage={currentPage} onChangePage={onChangePage} />
      </div>
    </>
  );
}

export default Home;
