import { useEffect, useRef } from 'react';
import { toast } from 'sonner';

export function useIncompleteStoreWarning(seller: SellerInfo, onEditClick: () => void) {
    const hasShown = useRef(false);

    useEffect(() => {
        const isIncomplete = !seller.shop_photo || !seller.shop_description || seller.shop_description.trim() === '';
        if (isIncomplete && !hasShown.current) {
            hasShown.current = true;
            toast.warning('Please complete your store profile to build buyer trust', {
                description: 'Add a store photo and a complete description',
                duration: 5000,
                action: {
                    label: 'Edit Profile',
                    onClick: onEditClick,
                },
            });
        }
    }, [seller, onEditClick]);
}
