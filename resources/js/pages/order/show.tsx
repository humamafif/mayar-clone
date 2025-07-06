import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Download, FileText, LinkIcon } from 'lucide-react';

interface InvoiceProduct {
    name: string;
    image: string;
    file_path?: string;
    external_url?: string;
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
    invoice: InvoiceItem;
}

export default function InvoiceDetail({ invoice }: InvoiceProps) {
    const isPaid = invoice.status === 'paid';
    return (
        <AppLayout>
            <Head title={`Invoice #${invoice.id}`} />
            <div className="p-4">
                <h1 className="mb-4 text-2xl font-bold">Detail Invoice #{invoice.id}</h1>
                <div className="mb-4 flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">{new Date(invoice.created_at).toLocaleString('id-ID')}</div>
                    <Badge>{invoice.status}</Badge>
                </div>
                <div className="rounded-xl border p-4 shadow-sm">
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
                                    <div className="text-sm font-semibold">Rp{(item.quantity * item.price).toLocaleString('id-ID')}</div>
                                </div>

                                {isPaid && (
                                    <div className="mt-3 space-y-2">
                                        {item.product.file_path && (
                                            <div className="flex items-center gap-2">
                                                <FileText className="h-4 w-4 text-blue-500" />
                                                <a
                                                    href={`/storage/${item.product.file_path}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    download={item.product.file_path.split('/').pop()}
                                                    className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
                                                >
                                                    Download File <Download className="h-3 w-3" />
                                                </a>
                                            </div>
                                        )}

                                        {item.product.external_url && (
                                            <div className="flex items-center gap-2">
                                                <LinkIcon className="h-4 w-4 text-blue-500" />
                                                <a
                                                    href={item.product.external_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
                                                >
                                                    Access Resource
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="mt-3 flex items-center justify-between font-semibold">
                        <span>Total</span>
                        <span>Rp{invoice.amount.toLocaleString('id-ID')}</span>
                    </div>
                </div>
                <Button className="mt-6" variant={'outline'} asChild>
                    <Link href={route('order.index')}>Kembali ke riwayat</Link>
                </Button>
            </div>
        </AppLayout>
    );
}
