import { Head, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { SharedData } from '@/types';

interface Order {
  id: number;
  order_code: string;
  status: string;
  amount: number;
  paid_at?: string;
}

interface Props {
  orders: Order[];
}

export default function OrderIndex({ orders }: Props) {
  return (
    <AppLayout>
      <Head title="Daftar Pesanan" />
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-4">Daftar Pesanan</h1>
        <ul className="space-y-4">
          {orders.map((order) => (
            <li key={order.id} className="border p-4 rounded-md">
              <p><strong>Kode:</strong> {order.order_code}</p>
              <p><strong>Status:</strong> {order.status}</p>
              <p><strong>Total:</strong> Rp {order.amount.toLocaleString()}</p>
              <a
                href={`/order/${order.id}`}
                className="text-blue-600 underline"
              >
                Lihat Detail
              </a>
            </li>
          ))}
        </ul>
      </div>
    </AppLayout>
  );
}
