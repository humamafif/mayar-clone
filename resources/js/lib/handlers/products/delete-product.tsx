import { router } from '@inertiajs/react';
import { toast } from 'sonner';

export function deleteProduct(productId: number, productName: string, onSuccess?: () => void) {
    if (!confirm(`Are you sure you want to delete "${productName}"?`)) return;

    router.delete(route('seller.products.destroy', { product: productId }), {
        onSuccess: () => {
            toast.success(`"${productName}" has been deleted.`);
            if (onSuccess) onSuccess();
        },
        onError: () => {
            toast.error(`Failed to delete "${productName}"`);
        },
    });
}
