import { useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import { Container } from '@mui/material';

import BasketList from '../components/BasketList';
import GoodsList from '../components/GoodsList';
import Search from '../components/Search';
import Header from '../components/Header';

import AuthProvider from '../hoc/AuthProvider';
import { router } from '../hoc/router';

import { goods } from '../data/goods';

const App = () => {
    const [order, setOrder] = useState([]);
    const [search, setSearch] = useState('');
    const [products, setProducts] = useState(goods);

    const handleChange = (e) => {
        if (!e.target.value) {
            setProducts(goods);
            setSearch('');
            return;
        }

        setSearch(e.target.value);
        setProducts(
            products.filter((good) =>
                good.name.toLowerCase().includes(e.target.value.toLowerCase())
            ))
    };

    const addToOrder = (goodsItem) => {
        let quantity = 1;

        const indexInOrder = order.findIndex(
            (item) => item.id === goodsItem.id
        );

        if (indexInOrder > -1) {
            quantity = order[indexInOrder].quantity + 1;

            setOrder(order.map((item) => {
                if (item.id !== goodsItem.id) return item;

                return {
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    quantity,
                };
            }),
            );
        } else {
            setOrder([
                ...order,
                {
                    id: goodsItem.id,
                    name: goodsItem.name,
                    price: goodsItem.price,
                    quantity,
                },
            ],
            );
        }
    };

    const removeFromOrder = (goodsItem) => {
        setOrder(order.filter((item) => item.id !== goodsItem));
    };

    return (
        <AuthProvider>
            <RouterProvider router={router} />
            <Header />
            <Container
                sx={{
                    mt: '1rem'
                }}
            >
                <Search
                    value={search}
                    onChange={handleChange}
                />
                <GoodsList
                    goods={products}
                    setOrder={addToOrder}
                />
                <BasketList
                    order={order}
                    setOrder={removeFromOrder}
                />
            </Container>
        </AuthProvider >
    );
}

export default App;