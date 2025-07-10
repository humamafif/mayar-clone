'use client';

import { rupiahFormatter } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';
import { Edit, Eye, LinkIcon, MoreHorizontal, Trash } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { deleteProduct } from '@/lib/handlers/products/delete-product';
import { Product } from '@/types/product';
import { Link } from '@inertiajs/react';

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
            return rupiahFormatter.format(price);
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
        accessorKey: 'file_path',
        header: 'File',
        cell: ({ row }) => {
            const filePath = row.original.file_path;

            if (!filePath) {
                return (
                    <Badge variant="outline" className="text-gray-500">
                        No File
                    </Badge>
                );
            }

            const fileName = filePath.split('/').pop();
            const fileUrl = `/storage/${filePath}`;

            return (
                <div className="flex items-center gap-2">
                    <a
                        href={fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="max-w-[150px] truncate text-sm text-blue-600 hover:text-blue-800"
                        title={fileName}
                    >
                        View File
                        <Eye className="h-4 w-4 text-blue-500" />
                    </a>
                </div>
            );
        },
    },
    {
        accessorKey: 'product_url',
        header: 'Product URL',
        cell: ({ row }) => {
            const url = row.original.product_url;

            if (!url) {
                return (
                    <Badge variant="outline" className="text-gray-500">
                        No URL
                    </Badge>
                );
            }

            return (
                <div className="flex items-center gap-2">
                    <LinkIcon className="h-4 w-4 text-blue-500" />
                    <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="max-w-[150px] truncate text-sm text-blue-600 hover:text-blue-800"
                        title={url}
                    >
                        {url}
                    </a>
                </div>
            );
        },
    },
    {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => {
            const product = row.original;
            const productId = product.id;
            const productName = product.name;

            const handleDelete = (e: React.MouseEvent) => {
                e.preventDefault();
                deleteProduct(productId, productName);
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
                                <Link href={route('seller.products.edit', { product: productId })}>
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
