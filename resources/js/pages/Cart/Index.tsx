import { Head, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { formatRupiah } from '@/lib/utils';

export default function Cart({ cartItems = [] }: { cartItems: any[] }) {
    const handleRemove = (id: number) => {
        if (confirm('Yakin hapus dari keranjang?')) {
            router.delete(`/cart/remove/${id}`);
        }
    };

    const handleCheckout = () => {
        router.post('/cart/checkout');
    };

    return (
        <AppLayout>
            <Head title="Keranjang Belanja" />
            <div className="max-w-5xl mx-auto p-6">
                <h1 className="text-2xl font-bold mb-4">Keranjang Belanja</h1>
                {cartItems.length === 0 ? (
                    <p>Keranjang kamu kosong.</p>
                ) : (
                    <>
                        <table className="w-full text-left border">
                            <thead>
                                <tr>
                                    <th className="border px-4 py-2">Produk</th>
                                    <th className="border px-4 py-2">Harga</th>
                                    <th className="border px-4 py-2">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.map(item => (
                                    <tr key={item.id}>
                                        <td className="border px-4 py-2">{item.product.name}</td>
                                        <td className="border px-4 py-2">{formatRupiah(item.product.price)}</td>
                                        <td className="border px-4 py-2">
                                            <button
                                                className="text-red-500"
                                                onClick={() => handleRemove(item.id)}
                                            >
                                                Hapus
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className="mt-6">
                            <button
                                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                                onClick={handleCheckout}
                            >
                                Checkout Sekarang
                            </button>
                        </div>
                    </>
                )}
            </div>
        </AppLayout>
    );
}
