import { router } from '@inertiajs/react';
import { toast } from 'sonner';

export function updateProduct(productId: number, values: any, onSuccess?: () => void) {
    const formData = new FormData();

    formData.append('name', values.name);
    formData.append('description', values.description);
    formData.append('price', values.price.toString());
    formData.append('stock', values.stock.toString());

    if (values.image && values.image instanceof File) {
        formData.append('image', values.image);
    }

    if (values.file && values.file instanceof File) {
        formData.append('file', values.file);
    }

    if (values.product_url) {
        formData.append('product_url', values.product_url);
    }

    formData.append('_method', 'PUT');

    router.post(route('seller.products.update', { product: productId }), formData, {
        forceFormData: true,
        onSuccess: () => {
            toast.success('Product updated successfully');
            if (onSuccess) onSuccess();
        },
        onError: () => {
            toast.error('Failed to update product');
        },
    });
}
