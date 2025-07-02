import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { ShoppingBag } from 'lucide-react';
interface DashboardProps {
    stats: {
        products_count: number;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/seller/dashboard',
    },
];

export default function Dashboard({ stats }: DashboardProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="p-6">
                <h1 className="mb-6 text-3xl font-bold">Dashboard Seller</h1>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Produk</CardTitle>
                            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.products_count}</div>
                            <p className="text-xs text-muted-foreground">Produk yang terdaftar</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
