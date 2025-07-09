import { router } from '@inertiajs/react';
import { useState } from 'react';
import { toast } from 'sonner';

export function useAddToCart() {
    const [processing, setProcessing] = useState(false);

    const addToCart = (productId: number, quantity: number = 1, onSuccessMessage?: string) => {
        router.post(
            route('cart.store'),
            { product_id: productId, quantity },
            {
                preserveScroll: true,
                onStart: () => setProcessing(true),
                onSuccess: () => {
                    window.dispatchEvent(new Event('cart-updated'));
                    toast.success(onSuccessMessage ?? 'Product added to cart');
                },
                onError: () => {
                    toast.error('Failed to add to cart');
                },
                onFinish: () => setProcessing(false),
            },
        );
    };

    return { addToCart, processing };
}
