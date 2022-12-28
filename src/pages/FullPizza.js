import axios from 'axios';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const FullPizza = () => {
    const [pizza, setPizza] = React.useState();
    const navigate = useNavigate();
    // Хук useParams возвращает объект пар ключ/значение динамических 
    // параметров из текущего URL-адреса, которые были сопоставлены <Route path>
    const { id } = useParams();
    React.useEffect(() => {
        async function fetchPizza() {
            // awaitключевое слово с вызовом функции. Из-за await 
            // ключевого слова асинхронная функция приостанавливается до тех пор, 
            // пока обещание не будет разрешено.
            try {
                const { data } = await axios.get('https://639098ef65ff41831118e35d.mockapi.io/items/' + id)
                setPizza(data);
            } catch (error) {
                alert('ошибка загрузки питсы');
                navigate('/');
            }
        }
        fetchPizza();
    }, [])
    if (!pizza) {
        return 'загрузка...'
    }
    return (
        <div className='container'>
            <h1>{pizza.title}</h1>
            <img src={pizza.imageUrl}></img>
            <span>{pizza.price}</span>
            <p>Очень вкусная пицца </p>

        </div>
    );
}

export default FullPizza;
