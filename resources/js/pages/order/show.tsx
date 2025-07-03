import { Head, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { SharedData } from '@/types';

interface OrderShowProps {
    order: {
        id: number;
        order_code: string;
        status: string;
        amount: number;
        paid_at?: string;
    };
}

export default function OrderShow({ order }: OrderShowProps) {
    return (
        <AppLayout>
            <Head title={`Order ${order.order_code}`} />
            <div className="container mx-auto py-8">
                <h1 className="text-2xl font-bold mb-4">Detail Pesanan</h1>
                <div className="space-y-2">
                    <p><strong>Kode Pesanan:</strong> {order.order_code}</p>
                    <p><strong>Status:</strong> {order.status}</p>
                    <p><strong>Total:</strong> Rp {order.amount.toLocaleString()}</p>
                    {order.paid_at && <p><strong>Dibayar pada:</strong> {order.paid_at}</p>}
                </div>
            </div>
        </AppLayout>
    );
}
