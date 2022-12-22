import React from 'react';
import Categories from "../components/Categories";
import PizzaBlock from '../components/PizzaBlock/PizzaBlock'
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort from '../components/Sort';
import Pagination from '../components/pagination/Pagination';
import { AppContext } from '../App';
import { useDispatch, useSelector } from 'react-redux'
import { setCategoryId, setCurrentPage} from '../redux/slices/filterSlice';
import axios from 'axios';


const Home = () => {
  const dispatch = useDispatch();
  const { categoryId, sort, currentPage} = useSelector((state) => state.filter);
  const sortType = sort.sortProperty;
  const { searchValue } = React.useContext(AppContext);
  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const onClickCategory = (i) => {
    dispatch(setCategoryId(i));
  }

  const onChangePage= (number)=>{
    dispatch(setCurrentPage(number));
  }
  React.useEffect(() => {
    setIsLoading(true);
    const sortBy = sortType.replace('-', '');
    const order = sortType.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';
    axios.get(`https://639098ef65ff41831118e35d.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
      .then(response => {
        setPizzas(response.data);
        setIsLoading(false);
      })
    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);
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
