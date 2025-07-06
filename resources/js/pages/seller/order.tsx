import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

interface Invoice {
    id: number;
    invoice_code: string;
    product_name: string;
    quantity: number;
    amount: number;
    status: string;
    buyer_name: string;
    created_at: string;
}

interface Props {
    orders: Invoice[];
}

export default function SellerOrders({ orders }: Props) {
    return (
        <AppLayout>
            <Head title="Transaksi Toko" />
            <div className="space-y-6 p-6">
                <h1 className="text-2xl font-bold">Transaksi Penjualan</h1>

                {orders.length === 0 ? (
                    <p className="text-sm text-muted-foreground">Belum ada transaksi.</p>
                ) : (
                    <div className="space-y-4">
                        {orders.map((order) => (
                            <div key={order.id} className="rounded-xl border bg-white p-4 shadow-sm">
                                <p className="font-medium">#{order.invoice_code}</p>
                                <p className="text-sm text-muted-foreground">Produk: {order.product_name}</p>
                                <p className="text-sm text-muted-foreground">Pembeli: {order.buyer_name}</p>
                                <p className="text-sm text-muted-foreground">Jumlah: {order.quantity}</p>
                                <p className="text-sm text-muted-foreground">Total: Rp {order.amount.toLocaleString()}</p>
                                <p className="mt-1 text-xs text-gray-500">Tanggal: {new Date(order.created_at).toLocaleString()}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
