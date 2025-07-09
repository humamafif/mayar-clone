interface Invoice {
    id: number;
    invoice_code: string;
    product_name: string;
    quantity: number;
    amount: number;
    status: string;
    buyer_name: string;
    created_at: string;
}

interface InvoiceProduct {
    name: string;
    image: string;
    file_path?: string;
    product_url?: string;
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
