import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { ClipboardListIcon } from 'lucide-react';

interface InvoiceProps {
    invoices: InvoiceItem[];
}

export default function Invoice({ invoices }: InvoiceProps) {
    return (
        <AppLayout>
            <Head title="Purchase History" />
            <div className="p-4">
                <h1 className="mb-6 text-2xl font-bold">Purchase History</h1>
                {invoices?.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12">
                        <ClipboardListIcon className="mb-4 h-24 w-24 text-gray-400" />
                        <div className="text-center text-muted-foreground">You have no purchase history.</div>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {invoices?.map((invoice) => (
                            <div key={invoice.id} className="rounded-xl border p-4 shadow-sm">
                                <div className="mb-2 flex items-center justify-between">
                                    <div>
                                        <div className="font-semibold">Invoice #{invoice.invoice_code}</div>
                                        <div className="text-xs text-muted-foreground">
                                            {new Date(invoice.created_at).toLocaleString('en-GB', {
                                                day: '2-digit',
                                                month: 'short',
                                                year: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })}
                                        </div>
                                    </div>
                                    <Badge className="ml-2 capitalize">{invoice.status}</Badge>
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
                                                    {item.quantity} × Rp{item.price.toLocaleString('id-ID')}
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
                                <div className="mt-2 flex gap-2">
                                    <Button asChild>
                                        <Link href={route('invoices.show', invoice.id)}>View Details</Link>
                                    </Button>
                                    {invoice.status === 'pending' && (
                                        <Button asChild variant="destructive">
                                            <a href={invoice.invoice_url} target="_blank" rel="noopener noreferrer">
                                                Pay Now
                                            </a>
                                        </Button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
