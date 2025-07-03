import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { ShoppingBag, Wallet } from 'lucide-react';

interface Order {
    id: number;
    order_code: string;
    product_name: string;
    quantity: number;
    amount: number;
    status: string;
    buyer_name: string;
    created_at: string;
}

interface DashboardProps {
    stats: {
        products_count: number;
        balance: number;
    };
    orders?: Order[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/seller/dashboard',
    },
];

export default function SellerDashboard({ stats, orders = [] }: DashboardProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard Seller" />
            <div className="space-y-6 p-6">
                <h1 className="text-3xl font-bold">Dashboard Seller</h1>

                {/* Stat Cards */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Total Produk</CardTitle>
                            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.products_count}</div>
                            <p className="text-xs text-muted-foreground">Produk yang aktif</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Saldo Toko</CardTitle>
                            <Wallet className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">Rp {stats.balance.toLocaleString()}</div>
                            <p className="text-xs text-muted-foreground">Saldo hasil penjualan</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Transaksi Terakhir */}
                <div>
                    <h2 className="mb-4 text-xl font-semibold text-white">Transaksi Terakhir</h2>
                    {orders.length === 0 ? (
                        <p className="text-sm text-muted-foreground">Belum ada transaksi.</p>
                    ) : (
                        <div className="space-y-4">
                            {orders.slice(0, 3).map((order) => (
                                <div
                                    key={order.id}
                                    className="rounded-lg border border-gray-700 bg-neutral-900 p-4 text-white shadow transition hover:shadow-lg"
                                >
                                    <div className="mb-2 flex items-center justify-between">
                                        <span className="text-base font-semibold text-blue-400">#{order.order_code}</span>
                                        <span
                                            className={`rounded-full px-2 py-1 text-xs ${
                                                order.status === 'paid' ? 'bg-green-700 text-green-200' : 'bg-yellow-700 text-yellow-200'
                                            }`}
                                        >
                                            {order.status}
                                        </span>
                                    </div>
                                    <div className="space-y-1 text-sm">
                                        <p>
                                            🛒 Produk: <span className="text-gray-300">{order.product_name}</span>
                                        </p>
                                        <p>
                                            📦 Jumlah: <span className="text-gray-300">{order.quantity}</span>
                                        </p>
                                        <p>
                                            🙍 Pembeli: <span className="text-gray-300">{order.buyer_name}</span>
                                        </p>
                                        <p>
                                            💰 Total: <span className="text-green-400">Rp {order.amount.toLocaleString()}</span>
                                        </p>
                                        <p className="mt-1 text-xs text-gray-500">🕒 {new Date(order.created_at).toLocaleString()}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
