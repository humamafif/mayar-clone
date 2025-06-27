import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';

interface SellerInfo {
    id: number;
    user_id: number;
    shop_name: string;
    shop_description: string | null;
    phone_number: string;
    address: string;
    id_card_number: string;
    bank_name: string;
    bank_account: string;
    account_number: string;
    created_at: string;
    updated_at: string;
}

interface StoreInfoProps {
    seller: SellerInfo;
}

export default function StoreInfo({ seller }: StoreInfoProps) {
    const { auth } = usePage<SharedData>().props;

    const breadcrumbs = [
        { title: 'Dashboard', href: '/seller/dashboard' },
        { title: 'Informasi Toko', href: '/seller/store-info' },
    ];

    // Format tanggal untuk tampilan yang lebih baik
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        }).format(date);
    };

    // Menampilkan sebagian nomor rekening untuk keamanan
    const maskedAccountNumber = (accountNumber: string) => {
        if (accountNumber.length <= 4) return accountNumber;
        return '*'.repeat(accountNumber.length - 4) + accountNumber.slice(-4);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Informasi Toko" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="mb-4 flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Informasi Toko</h1>
                    {/* <Button variant="outline">Edit Informasi</Button> */}
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {/* Informasi Toko */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Detail Toko</CardTitle>
                            <CardDescription>Informasi dasar tentang toko Anda</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label className="text-sm font-medium text-gray-500 dark:text-gray-400">Nama Toko</Label>
                                <p className="mt-1 text-lg font-medium">{seller.shop_name}</p>
                            </div>
                            <div>
                                <Label className="text-sm font-medium text-gray-500 dark:text-gray-400">Deskripsi</Label>
                                <p className="mt-1">{seller.shop_description || 'Tidak ada deskripsi'}</p>
                            </div>
                            <div>
                                <Label className="text-sm font-medium text-gray-500 dark:text-gray-400">Terdaftar Sejak</Label>
                                <p className="mt-1">{formatDate(seller.created_at)}</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Informasi Kontak */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Informasi Kontak</CardTitle>
                            <CardDescription>Detail kontak dan alamat</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label className="text-sm font-medium text-gray-500 dark:text-gray-400">Nomor Telepon</Label>
                                <p className="mt-1">{seller.phone_number}</p>
                            </div>
                            <div>
                                <Label className="text-sm font-medium text-gray-500 dark:text-gray-400">Alamat</Label>
                                <p className="mt-1">{seller.address}</p>
                            </div>
                            <div>
                                <Label className="text-sm font-medium text-gray-500 dark:text-gray-400">Nomor KTP</Label>
                                <p className="mt-1">{'*'.repeat(seller.id_card_number.length - 4) + seller.id_card_number.slice(-4)}</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Informasi Rekening Bank */}
                    <Card className="md:col-span-2">
                        <CardHeader>
                            <CardTitle>Informasi Rekening</CardTitle>
                            <CardDescription>Detail rekening bank untuk penerimaan pembayaran</CardDescription>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-3">
                            <div>
                                <Label className="text-sm font-medium text-gray-500 dark:text-gray-400">Nama Bank</Label>
                                <p className="mt-1">{seller.bank_name}</p>
                            </div>
                            <div>
                                <Label className="text-sm font-medium text-gray-500 dark:text-gray-400">Nomor Rekening</Label>
                                <p className="mt-1">{maskedAccountNumber(seller.account_number)}</p>
                            </div>
                            <div>
                                <Label className="text-sm font-medium text-gray-500 dark:text-gray-400">Nama Pemilik</Label>
                                <p className="mt-1">{seller.bank_account}</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
