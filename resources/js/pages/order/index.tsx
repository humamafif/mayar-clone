import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';

interface InvoiceProduct {
    name: string;
    image: string;
}
interface InvoiceItemDetail {
    id: number;
    product: InvoiceProduct;
    quantity: number;
    price: number;
}
interface InvoiceItem {
    id: number;
    amount: number;
    status: string;
    invoice_code: string;
    invoice_url: string;
    created_at: string;
    items: InvoiceItemDetail[];
}

interface InvoiceProps {
    invoices: InvoiceItem[];
}

export default function Invoice({ invoices }: InvoiceProps) {
    return (
        <AppLayout>
            <Head title="Riwayat Pembelian" />
            <div className="p-4">
                <h1 className="mb-6 text-2xl font-bold">Riwayat Pembelian</h1>
                {invoices?.length === 0 ? (
                    <div className="text-center text-muted-foreground">Belum ada riwayat pembelian.</div>
                ) : (
                    <div className="space-y-6">
                        {invoices?.map((invoice) => (
                            <div key={invoice.id} className="rounded-xl border p-4 shadow-sm">
                                <div className="mb-2 flex items-center justify-between">
                                    <div>
                                        <div className="font-semibold">Invoice #{invoice.invoice_code}</div>
                                        <div className="text-xs text-muted-foreground">{new Date(invoice.created_at).toLocaleString('id-ID')}</div>
                                    </div>
                                    <Badge className="ml-2">{invoice.status}</Badge>
                                </div>
                                <div className="divide-y">
                                    {invoice.items.map((item) => (
                                        <div key={item.id} className="flex items-center gap-3 py-2">
                                            <img
                                                src={`/storage/${item.product.image}`}
                                                alt={item.product.name}
                                                className="h-12 w-12 rounded border object-cover"
                                            />
                                            <div className="flex-1">
                                                <div className="font-medium">{item.product.name}</div>
                                                <div className="text-xs text-muted-foreground">
                                                    {item.quantity} x Rp{item.price.toLocaleString('id-ID')}
                                                </div>
                                            </div>
                                            <div className="text-sm font-semibold">Rp{(item.quantity * item.price).toLocaleString('id-ID')}</div>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-3 flex items-center justify-between font-semibold">
                                    <span>Total</span>
                                    <span>Rp{invoice.amount.toLocaleString('id-ID')}</span>
                                </div>
                                <Button className="mt-2" asChild>
                                    <Link href={route('order.show', invoice.id)}>Lihat Detail</Link>
                                </Button>
                                {invoice.status === 'pending' && (
                                    <Button asChild variant={'destructive'} className="ml-2">
                                        <a href={invoice.invoice_url} target="_blank">
                                            Bayar
                                        </a>
                                    </Button>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
