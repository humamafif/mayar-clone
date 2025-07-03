import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

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

interface Props {
  orders: Order[];
}

export default function SellerOrders({ orders }: Props) {
  return (
    <AppLayout>
      <Head title="Transaksi Toko" />
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold">Transaksi Penjualan</h1>

        {orders.length === 0 ? (
          <p className="text-sm text-muted-foreground">Belum ada transaksi.</p>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="border p-4 rounded-xl shadow-sm bg-white"
              >
                <p className="font-medium">#{order.order_code}</p>
                <p className="text-sm text-muted-foreground">
                  Produk: {order.product_name}
                </p>
                <p className="text-sm text-muted-foreground">
                  Pembeli: {order.buyer_name}
                </p>
                <p className="text-sm text-muted-foreground">
                  Jumlah: {order.quantity}
                </p>
                <p className="text-sm text-muted-foreground">
                  Total: Rp {order.amount.toLocaleString()}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Tanggal: {new Date(order.created_at).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
