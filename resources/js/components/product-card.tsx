import { formatRupiah } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { ShoppingBag, ShoppingCart } from 'lucide-react';

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

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    return (
        <Link href={route('products.detail', product.id)} className="block">
            <div className="group overflow-hidden rounded-lg bg-white shadow-md transition hover:shadow-xl">
                <div className="relative h-60 overflow-hidden">
                    <img
                        src={`/storage/${product.image}`}
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        onError={(e) => {
                            e.currentTarget.src = 'https://placehold.co/600x400/indigo/white?text=Produk+Digital';
                        }}
                    />
                    {product.stock === 0 && (
                        <div className="absolute top-4 right-4 rounded-full bg-red-500 px-3 py-1 text-sm font-semibold text-white">Habis</div>
                    )}
                </div>
                <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900">{product.name}</h3>
                    <p className="mt-1 flex gap-1 text-sm text-gray-500">
                        <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                        {product.seller.shop_name}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                        <span className="font-bold text-amber-500">{formatRupiah(product.price)}</span>
                        <button
                            className="rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
                            disabled={product.stock === 0}
                        >
                            {product.stock > 0 ? (
                                <p className="flex items-center gap-1 text-xl">
                                    + <ShoppingCart />
                                </p>
                            ) : (
                                'Stok Habis'
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    );
}
