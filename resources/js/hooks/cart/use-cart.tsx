import axios from 'axios';
import { useEffect, useState } from 'react';

export function useCart(userId: number) {
    const [cart, setCart] = useState<CartItem[]>([]);

    useEffect(() => {
        if (!userId) return;

        const fetchCart = async () => {
            const res = await axios.get('/cart/list');
            setCart(res.data);
        };

        fetchCart();

        window.addEventListener('cart-updated', fetchCart);
        return () => window.removeEventListener('cart-updated', fetchCart);
    }, [userId]);

    return { cart, setCart };
}
