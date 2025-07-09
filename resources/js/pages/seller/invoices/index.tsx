import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { columns } from './columns';
import { DataTable } from './data-table';

const breadcrumb: BreadcrumbItem[] = [
    {
        title: 'Seller Dashboard',
        href: '/seller',
    },
    {
        title: 'Transactions',
        href: '/seller/transactions',
    },
];

export default function Transactions({ invoices }: { invoices: Invoice[] }) {
    return (
        <AppLayout breadcrumbs={breadcrumb}>
            <Head title="Transactions" />
            <div className="flex flex-1 flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
                    </div>
                </div>
                <DataTable columns={columns} data={invoices} />
            </div>
        </AppLayout>
    );
}
