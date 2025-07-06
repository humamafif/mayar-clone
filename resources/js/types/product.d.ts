export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    stock: number;
    seller: {
        shop_name: string;
    };
}
