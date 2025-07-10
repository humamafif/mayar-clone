interface CartItem {
    id: number;
    quantity: number;
    price: number;
    product: {
        id: number;
        title: string;
        image: string;
        price: number;
    };
}
