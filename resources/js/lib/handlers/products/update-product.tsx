import { router } from '@inertiajs/react';
import { toast } from 'sonner';

const MAX_IMAGE_SIZE = 2 * 1024 * 1024;
const MAX_PRODUCT_FILE_SIZE = 10 * 1024 * 1024;
export function updateProduct(productId: number, values: any, onSuccess?: () => void) {
    if (values.image && values.image instanceof File) {
        if (values.image.size > MAX_IMAGE_SIZE) {
            toast.error('Image file is too large', {
                description: 'Maximum image size is 2MB',
            });
            return;
        }
    }

    if (values.file && values.file instanceof File) {
        if (values.file.size > MAX_PRODUCT_FILE_SIZE) {
            toast.error('Product file is too large', {
                description: 'Maximum product file size is 10MB',
            });
            return;
        }
    }
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
        onError: (errors) => {
            if (errors.image) {
                toast.error('Image error', { description: errors.image });
            } else if (errors.file) {
                toast.error('File error', { description: errors.file });
            } else {
                toast.error('Failed to update product');
            }
        },
    });
}
