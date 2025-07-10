import axios from 'axios';
import { useState } from 'react';
import { toast } from 'sonner';

export function useCheckout() {
    const [isLoading, setIsLoading] = useState(false);

    const checkout = async () => {
        try {
            setIsLoading(true);
            const res = await axios.post(route('invoices.store'));

            if (res.data.url) {
                toast.success('Checkout successful! Redirecting...');
                window.dispatchEvent(new Event('cart-updated'));
                setTimeout(() => {
                    window.location.href = res.data.url;
                }, 4000);
            }
        } catch (err) {
            toast.error('Checkout failed');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return { checkout, isLoading };
}
