import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';

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

interface SellerOrdersProps {
  orders: Order[];
}

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: '/seller/dashboard' },
  { title: 'Transaksi', href: '/seller/orders' },
];

export default function SellerOrders({ orders }: SellerOrdersProps) {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Transaksi Seller" />
      <div className="p-6">
        <h1 className="mb-6 text-2xl font-bold">Daftar Transaksi</h1>

        {orders.length === 0 ? (
          <p className="text-muted-foreground">Belum ada transaksi.</p>
        ) : (
          <div className="overflow-auto rounded border">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100 dark:bg-gray-800">
                <tr>
                  <th className="px-4 py-2 text-left">Kode</th>
                  <th className="px-4 py-2 text-left">Produk</th>
                  <th className="px-4 py-2 text-left">Jumlah</th>
                  <th className="px-4 py-2 text-left">Pembeli</th>
                  <th className="px-4 py-2 text-left">Total</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left">Waktu</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-t">
                    <td className="px-4 py-2">{order.order_code}</td>
                    <td className="px-4 py-2">{order.product_name}</td>
                    <td className="px-4 py-2">{order.quantity}</td>
                    <td className="px-4 py-2">{order.buyer_name}</td>
                    <td className="px-4 py-2">Rp {order.amount.toLocaleString()}</td>
                    <td className="px-4 py-2 capitalize">{order.status}</td>
                    <td className="px-4 py-2">{order.created_at}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
