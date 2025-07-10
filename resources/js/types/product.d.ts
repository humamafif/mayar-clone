export interface Product {
    id: number;
    name: string;
    description: string;
    stock: number;
    price: number;
    image: string;
    file_path?: string;
    product_url?: string;
    total_sold?: number;
    seller: SellerInfo;
}
