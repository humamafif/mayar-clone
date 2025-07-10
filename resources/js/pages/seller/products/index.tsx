import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Product } from '@/types/product';
import { Head, Link, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { columns } from './columns';
import { DataTable } from './data-table';

const breadcrumb: BreadcrumbItem[] = [
    {
        title: 'Seller Dashboard',
        href: '/seller',
    },
    {
        title: 'Products',
        href: '/seller/products',
    },
];

export default function Products({ products }: { products: Product[] }) {
    const { flash } = usePage().props as {
        flash?: {
            success?: string;
            error?: string;
        };
    };

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }
        if (flash?.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    return (
        <AppLayout breadcrumbs={breadcrumb}>
            <Head title="Products" />
            <div className="flex flex-1 flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Products</h1>
                        <p className="mt-1 text-muted-foreground">Manage your products</p>
                    </div>
                    <Button asChild className="whitespace-nowrap">
                        <Link href={route('seller.products.create')} className="flex items-center gap-2">
                            <span className="flex items-center gap-2">Add Product</span>
                        </Link>
                    </Button>
                </div>
                <DataTable columns={columns} data={products} />
            </div>
        </AppLayout>
    );
}
