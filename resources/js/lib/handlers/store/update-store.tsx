import { router } from '@inertiajs/react';
import { toast } from 'sonner';

export function updateStore(data: any, onSuccess: () => void) {
    const formData = new FormData();

    formData.append('shop_name', data.shop_name);
    formData.append('shop_description', data.shop_description || '');
    formData.append('phone_number', data.phone_number);
    formData.append('address', data.address);
    formData.append('bank_name', data.bank_name);
    formData.append('account_number', data.account_number);
    formData.append('bank_account', data.bank_account);

    if (data.shop_photo && data.shop_photo instanceof File) {
        formData.append('shop_photo', data.shop_photo);
    }

    formData.append('_method', 'PUT');

    router.post(route('seller.store-info.update'), formData, {
        forceFormData: true,
        onSuccess: () => {
            toast.success('Store information updated successfully');
            onSuccess();
        },
        onError: () => {
            toast.error('Failed to update store information');
        },
    });
}
