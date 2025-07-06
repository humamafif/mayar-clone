import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

export default function Success() {
    return (
        <AppLayout>
            <Head title="Pembayaran Berhasil" />
            <div className="max-w-3xl mx-auto py-20 text-center">
                <h1 className="text-3xl font-bold text-green-600 mb-4">✅ Pembayaran Berhasil</h1>
                <p className="text-lg text-gray-700 mb-6">Terima kasih! Pembayaran kamu telah diterima.</p>
                <a href="/" className="text-indigo-600 hover:underline">Kembali ke Beranda</a>
            </div>
        </AppLayout>
    );
}
