import { Button } from '@/components/ui/button';
import { useIncompleteStoreWarning } from '@/hooks/store/use-incomplete-store-warning';
import AppLayout from '@/layouts/app-layout';
import { formatDate } from '@/lib/utils';
import { Head, useForm } from '@inertiajs/react';
import { PencilIcon, TriangleAlert, X } from 'lucide-react';
import { useState } from 'react';
import { StoreDetail } from './store-detail';
import { StoreEditForm } from './store-edit';

interface StoreInfoProps {
    seller: SellerInfo;
}

function isStoreDataIncomplete(seller: SellerInfo): boolean {
    return !seller.shop_photo || !seller.shop_description || seller.shop_description.trim() === '';
}

export default function StoreInfo({ seller }: StoreInfoProps) {
    const [isEditing, setIsEditing] = useState(false);

    const breadcrumbs = [
        { title: 'Seller Dashboard', href: '/seller/dashboard' },
        { title: 'Store Settings', href: '/seller/store-info' },
    ];

    const { data, setData, put, processing, errors } = useForm({
        shop_name: seller.shop_name,
        shop_description: seller.shop_description || '',
        phone_number: seller.phone_number,
        address: seller.address,
        bank_name: seller.bank_name,
        account_number: seller.account_number,
        bank_account: seller.bank_account,
        shop_photo: null,
    });

    useIncompleteStoreWarning(seller, () => setIsEditing(true));

    const maskedAccountNumber = (accountNumber: string) => {
        if (accountNumber.length <= 4) return accountNumber;
        return '*'.repeat(accountNumber.length - 4) + accountNumber.slice(-4);
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Store Information" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="mb-4 flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Store Settings</h1>
                    <Button onClick={() => setIsEditing(!isEditing)} variant={isEditing ? 'outline' : 'default'}>
                        {isEditing ? (
                            <>
                                <X />
                                Cancel
                            </>
                        ) : (
                            <>
                                <PencilIcon className="mr-2 h-4 w-4" />
                                Edit Store Info
                            </>
                        )}
                    </Button>
                </div>
                {isStoreDataIncomplete(seller) && !isEditing && (
                    <div className="mb-4 rounded-md bg-amber-50 p-4 text-amber-800">
                        <div className="flex items-center align-middle">
                            <TriangleAlert />
                            <div className="ml-3">
                                <h3 className="text-sm font-medium">Store profile is incomplete!</h3>
                                <div className="mt-2 text-sm">
                                    <p>Complete your store profile to build buyer trust. Add a store photo and a detailed description.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {isEditing ? (
                    <StoreEditForm
                        data={data}
                        setData={setData}
                        errors={errors}
                        processing={processing}
                        seller={seller}
                        onCancel={() => setIsEditing(false)}
                        onSuccess={() => setIsEditing(false)}
                        put={put}
                    />
                ) : (
                    <StoreDetail seller={seller} formatDate={formatDate} maskedAccountNumber={maskedAccountNumber} />
                )}
            </div>
        </AppLayout>
    );
}
