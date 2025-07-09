'use client';

import { rupiahFormatter } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<Invoice>[] = [
    {
        accessorKey: 'no',
        header: 'No',
        cell: ({ row }) => {
            const index = row.index + 1;
            return <div className="font-medium">{index}</div>;
        },
    },
    {
        accessorKey: 'invoice_code',
        header: 'Invoice Code',
    },
    {
        accessorKey: 'product_name',
        header: 'Product Name',
    },
    {
        accessorKey: 'buyer_name',
        header: 'Buyer Name',
    },
    {
        accessorKey: 'quantity',
        header: 'Quantity',
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
            const status = row.getValue('status') as string;
            return (
                <div
                    className={`inline-block rounded-md px-2 py-1 text-xs font-medium ${
                        status.toLowerCase() === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : status.toLowerCase() === 'paid'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                    }`}
                >
                    {status}
                </div>
            );
        },
    },
    {
        accessorKey: 'amount',
        header: 'Total Amount',
        cell: ({ row }) => {
            const price = parseFloat(row.getValue('amount'));
            return rupiahFormatter.format(price);
        },
    },
    {
        accessorKey: 'created_at',
        header: 'Date',
    },
];
