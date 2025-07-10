import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

interface StoreDetailProps {
    seller: SellerInfo;
    formatDate: (dateString: string) => string;
    maskedAccountNumber: (accountNumber: string) => string;
}

export function StoreDetail({ seller, formatDate, maskedAccountNumber }: StoreDetailProps) {
    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Store Details */}
            <Card>
                <CardHeader>
                    <CardTitle>Details</CardTitle>
                    <CardDescription>Basic information about your store</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <Label className="text-sm font-medium text-gray-500 dark:text-gray-400">Store Photo</Label>
                        <img
                            src={seller.shop_photo ? `/storage/${seller.shop_photo}` : '/images/image-not-found.jpg'}
                            alt="Store Photo"
                            className="mt-1 h-20 w-20 rounded border object-cover"
                        />
                    </div>
                    <div>
                        <Label className="text-sm font-medium text-gray-500 dark:text-gray-400">Store Name</Label>
                        <p className="mt-1 text-lg font-medium">{seller.shop_name}</p>
                    </div>
                    <div>
                        <Label className="text-sm font-medium text-gray-500 dark:text-gray-400">Description</Label>
                        <p className="mt-1">{seller.shop_description || 'No description available'}</p>
                    </div>
                    <div>
                        <Label className="text-sm font-medium text-gray-500 dark:text-gray-400">Registered Since</Label>
                        <p className="mt-1">{formatDate(seller.created_at)}</p>
                    </div>
                </CardContent>
            </Card>

            {/* Contact Info */}
            <Card>
                <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                    <CardDescription>Contact details and store address</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <Label className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone Number</Label>
                        <p className="mt-1">{seller.phone_number}</p>
                    </div>
                    <div>
                        <Label className="text-sm font-medium text-gray-500 dark:text-gray-400">Address</Label>
                        <p className="mt-1">{seller.address}</p>
                    </div>
                    <div>
                        <Label className="text-sm font-medium text-gray-500 dark:text-gray-400">ID Card Number</Label>
                        <p className="mt-1">{'*'.repeat(seller.id_card_number.length - 4) + seller.id_card_number.slice(-4)}</p>
                    </div>
                </CardContent>
            </Card>

            {/* Bank Information */}
            <Card className="md:col-span-2">
                <CardHeader>
                    <CardTitle>Bank Account</CardTitle>
                    <CardDescription>Bank account details for receiving payments</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div>
                        <Label className="text-sm font-medium text-gray-500 dark:text-gray-400">Bank Name</Label>
                        <p className="mt-1 uppercase">{seller.bank_name}</p>
                    </div>
                    <div>
                        <Label className="text-sm font-medium text-gray-500 dark:text-gray-400">Account Number</Label>
                        <p className="mt-1">{maskedAccountNumber(seller.account_number)}</p>
                    </div>
                    <div>
                        <Label className="text-sm font-medium text-gray-500 dark:text-gray-400">Account Holder</Label>
                        <p className="mt-1">{seller.bank_account}</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
