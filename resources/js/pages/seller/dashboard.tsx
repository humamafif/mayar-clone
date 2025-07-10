import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { ShoppingBag, Wallet } from 'lucide-react';
import { columns } from './invoices/columns';
import { DataTable } from './invoices/data-table';

interface DashboardProps {
    stats: {
        products_count: number;
        balance: number;
    };
    invoices?: Invoice[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Seller Dashboard',
        href: '/seller/dashboard',
    },
];

export default function SellerDashboard({ stats, invoices = [] }: DashboardProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Seller Dashboard" />
            <div className="space-y-6 p-6">
                <h1 className="text-3xl font-bold">Seller Dashboard</h1>

                {/* Stat Cards */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.products_count}</div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Store Balance</CardTitle>
                            <Wallet className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">Rp {stats.balance.toLocaleString()}</div>
                        </CardContent>
                    </Card>
                </div>

                {/* Transaksi Terakhir */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-semibold">Recent Transactions</h2>
                    {invoices.length === 0 ? (
                        <p className="text-sm text-muted-foreground">No recent transactions</p>
                    ) : (
                        <DataTable data={invoices} columns={columns} isDashboard={true} />
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
