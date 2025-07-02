'use client';

import { rupiahFormatter } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';
import { Edit, MoreHorizontal, Trash } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Link, router } from '@inertiajs/react';

export type Product = {
    id: number;
    name: string;
    description: string;
    stock: number;
    price: number;
    image: string;
};

export const columns: ColumnDef<Product>[] = [
    {
        accessorKey: 'no',
        header: 'No',
        cell: ({ row }) => {
            const index = row.index + 1;
            return <div className="font-medium">{index}</div>;
        },
    },
    {
        accessorKey: 'name',
        header: 'Product Name',
    },
    {
        accessorKey: 'description',
        header: 'Description',
    },
    {
        accessorKey: 'stock',
        header: 'Stock',
    },
    {
        accessorKey: 'price',
        header: 'Price',
        cell: ({ row }) => {
            const price = parseFloat(row.getValue('price'));
            const formatted = rupiahFormatter.format(price);
            return formatted;
        },
    },
    {
        accessorKey: 'image',
        header: 'Image',
        cell: ({ row }) => {
            const title = row.original.name;
            const image = row.original.image;
            const imageUrl = image ? `/storage/${image}` : '';
            return <img src={imageUrl} alt={title} className="h-16 w-16 rounded object-cover" />;
        },
    },
    {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => {
            const product = row.original;
            const productId = row.original.id;
            const productName = product.name;

            const handleDelete = (e: React.MouseEvent) => {
                e.preventDefault();
                if (confirm(`Are you sure you want to delete "${productName}"?`)) {
                    router.delete(route('products.destroy', productId));
                }
            };

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                            <Button variant="link" asChild>
                                <Link href={route('products.edit', productId)}>
                                    <Edit className="mr-2 h-4 w-4" /> Edit
                                </Link>
                            </Button>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Button variant="link" className="text-destructive hover:text-destructive/90" onClick={handleDelete}>
                                <Trash className="mr-2 h-4 w-4" /> Delete
                            </Button>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
