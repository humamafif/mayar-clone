import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Head, useForm } from '@inertiajs/react';

interface SellerFormData {
    shop_name: string;
    shop_description: string;
    phone_number: string;
    address: string;
    id_card_number: string;
    bank_account: string;
    bank_name: string;
    account_number: string;
    agree_to_terms: boolean;
    [key: string]: any;
}

export default function Join() {
    const { data, setData, post, processing, errors } = useForm<SellerFormData>({
        shop_name: '',
        shop_description: '',
        phone_number: '',
        address: '',
        id_card_number: '',
        bank_account: '',
        bank_name: '',
        account_number: '',
        agree_to_terms: false,
    });

    function submit(e: React.FormEvent) {
        e.preventDefault();
        post(route('seller.process'));
    }

    return (
        <>
            <Head title="Daftar sebagai Seller" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white p-6 shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <h1 className="mb-6 text-2xl font-semibold">Daftar sebagai Seller</h1>

                        <form onSubmit={submit}>
                            <div className="space-y-6">
                                {/* Informasi Toko */}
                                <div>
                                    <h2 className="text-lg font-medium">Informasi Toko</h2>
                                    <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                                        Isi detail toko Anda untuk membantu pembeli mengenal bisnis Anda.
                                    </p>

                                    <div>
                                        <Label htmlFor="shop_name">
                                            Nama Toko <span className="text-red-500">*</span>
                                        </Label>
                                        <Input
                                            id="shop_name"
                                            type="text"
                                            value={data.shop_name}
                                            onChange={(e) => setData('shop_name', e.target.value)}
                                            required
                                            className="mt-1 block w-full"
                                        />
                                        {errors.shop_name && <div className="mt-1 text-red-500">{errors.shop_name}</div>}
                                    </div>

                                    <div className="mt-4">
                                        <Label htmlFor="shop_description">
                                            Deskripsi Toko <span className="text-red-500">*</span>
                                        </Label>
                                        <Input
                                            id="shop_description"
                                            required
                                            value={data.shop_description}
                                            onChange={(e) => setData('shop_description', e.target.value)}
                                            className="mt-1 block w-full"
                                            placeholder="Jelaskan secara singkat tentang toko dan produk Anda..."
                                        />
                                        {errors.shop_description && <div className="mt-1 text-red-500">{errors.shop_description}</div>}
                                    </div>
                                </div>

                                {/* Informasi Kontak */}
                                <div>
                                    <h2 className="text-lg font-medium">Informasi Kontak</h2>
                                    <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                                        Informasi kontak yang bisa dihubungi oleh admin marketplace.
                                    </p>

                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                        <div>
                                            <Label htmlFor="phone_number">
                                                Nomor Telepon <span className="text-red-500">*</span>
                                            </Label>
                                            <Input
                                                id="phone_number"
                                                type="tel"
                                                value={data.phone_number}
                                                onChange={(e) => setData('phone_number', e.target.value)}
                                                required
                                                className="mt-1 block w-full"
                                            />
                                            {errors.phone_number && <div className="mt-1 text-red-500">{errors.phone_number}</div>}
                                        </div>

                                        <div>
                                            <Label htmlFor="id_card_number">
                                                Nomor KTP <span className="text-red-500">*</span>
                                            </Label>
                                            <Input
                                                id="id_card_number"
                                                type="number"
                                                value={data.id_card_number}
                                                onChange={(e) => setData('id_card_number', e.target.value)}
                                                required
                                                className="mt-1 block w-full"
                                                maxLength={16}
                                            />
                                            {errors.id_card_number && <div className="mt-1 text-red-500">{errors.id_card_number}</div>}
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <Label htmlFor="address">
                                            Alamat <span className="text-red-500">*</span>
                                        </Label>
                                        <Input
                                            id="address"
                                            value={data.address}
                                            onChange={(e) => setData('address', e.target.value)}
                                            className="mt-1 block w-full"
                                            required
                                        />
                                        {errors.address && <div className="mt-1 text-red-500">{errors.address}</div>}
                                    </div>
                                </div>

                                {/* Informasi Pembayaran */}
                                <div>
                                    <h2 className="text-lg font-medium">Informasi Rekening</h2>
                                    <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                                        Rekening untuk menerima pembayaran dari penjualan.
                                    </p>

                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                        <div>
                                            <Label htmlFor="bank_name">
                                                Nama Bank <span className="text-red-500">*</span>
                                            </Label>
                                            <Input
                                                id="bank_name"
                                                type="text"
                                                value={data.bank_name}
                                                onChange={(e) => setData('bank_name', e.target.value)}
                                                required
                                                className="mt-1 block w-full"
                                                placeholder="Masukkan nama bank"
                                            />
                                            {errors.bank_name && <div className="mt-1 text-red-500">{errors.bank_name}</div>}
                                        </div>

                                        <div>
                                            <Label htmlFor="account_number">
                                                Nomor Rekening <span className="text-red-500">*</span>
                                            </Label>
                                            <Input
                                                id="account_number"
                                                type="number"
                                                value={data.account_number}
                                                onChange={(e) => setData('account_number', e.target.value)}
                                                required
                                                maxLength={20}
                                                className="mt-1 block w-full"
                                            />
                                            {errors.account_number && <div className="mt-1 text-red-500">{errors.account_number}</div>}
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <Label htmlFor="bank_account">
                                            Nama Pemilik Rekening <span className="text-red-500">*</span>
                                        </Label>
                                        <Input
                                            id="bank_account"
                                            type="text"
                                            value={data.bank_account}
                                            onChange={(e) => setData('bank_account', e.target.value)}
                                            required
                                            className="mt-1 block w-full"
                                        />
                                        {errors.bank_account && <div className="mt-1 text-red-500">{errors.bank_account}</div>}
                                    </div>
                                </div>

                                {/* Syarat dan Ketentuan */}
                                <div className="mt-6">
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={data.agree_to_terms}
                                            onChange={(e) => setData('agree_to_terms', e.target.checked)}
                                            required
                                            className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:focus:ring-indigo-600 dark:focus:ring-offset-gray-800"
                                        />
                                        <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                                            Saya menyetujui{' '}
                                            <a href="#" className="text-blue-600 hover:underline dark:text-blue-400">
                                                syarat dan ketentuan
                                            </a>{' '}
                                            yang berlaku
                                        </span>
                                    </label>
                                    {errors.agree_to_terms && <div className="mt-1 text-red-500">{errors.agree_to_terms}</div>}
                                </div>

                                <div className="mt-6 flex items-center justify-end">
                                    <button
                                        type="submit"
                                        className="inline-flex items-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none active:bg-gray-900 dark:bg-gray-200 dark:text-gray-800 dark:hover:bg-white dark:focus:bg-white dark:focus:ring-offset-gray-800 dark:active:bg-gray-300"
                                        disabled={processing}
                                    >
                                        Menjadi Seller
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
