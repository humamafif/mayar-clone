import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

export default function Failure() {
    return (
        <AppLayout>
            <Head title="Pembayaran Gagal" />
            <div className="max-w-3xl mx-auto py-20 text-center">
                <h1 className="text-3xl font-bold text-red-600 mb-4">❌ Pembayaran Gagal</h1>
                <p className="text-lg text-gray-700 mb-6">Oops! Ada masalah dengan pembayaran kamu.</p>
                <a href="/cart" className="text-indigo-600 hover:underline">Kembali ke Keranjang</a>
            </div>
        </AppLayout>
    );
}
