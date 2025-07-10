import { router } from '@inertiajs/react';
import { toast } from 'sonner';

export function createProduct(values: any, onSuccess?: () => void) {
    const formData = new FormData();

    if (values.image && values.image instanceof File) {
        formData.append('image', values.image);
    }

    formData.append('name', values.name);
    formData.append('description', values.description);
    formData.append('price', values.price.toString());
    formData.append('stock', values.stock.toString());

    if (values.file && values.file instanceof File) {
        formData.append('file', values.file);
    }

    if (values.product_url) {
        formData.append('product_url', values.product_url);
    }

    router.post(route('seller.products.store'), formData, {
        forceFormData: true,
        onSuccess: () => {
            toast.success('Product created successfully');
            if (onSuccess) onSuccess();
        },
        onError: () => {
            toast.error('Failed to create product');
        },
    });
}
