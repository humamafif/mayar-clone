import { useAddToCart } from '@/hooks/cart/use-add-to-cart';
import { formatRupiah } from '@/lib/utils';
import { SharedData } from '@/types';
import type { Product } from '@/types/product';
import { Link, usePage } from '@inertiajs/react';
import { ShoppingBag, ShoppingCart, TrendingUp } from 'lucide-react';

export function ProductCard({ product }: { product: Product }) {
    const { addToCart, processing } = useAddToCart();
    const { auth } = usePage<SharedData>().props;
    const isOwnProduct = auth.user && product.seller.user_id === auth.user.id;
    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        if (isOwnProduct) {
            return;
        }
        addToCart(product.id, 1);
    };

    return (
        <Link
            href={route('products.detail', product.id)}
            className="group block overflow-hidden rounded-lg bg-white shadow-md transition hover:shadow-xl"
        >
            <div className="relative h-60 overflow-hidden">
                <img
                    src={`/storage/${product.image}`}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => {
                        e.currentTarget.src = 'https://placehold.co/600x400/indigo/white?text=Digital+Product';
                    }}
                />
                {product.stock === 0 && (
                    <div className="absolute top-4 right-4 rounded-full bg-red-500 px-3 py-1 text-sm font-semibold text-white">Out of Stock</div>
                )}
            </div>
            <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900">{product.name}</h3>
                <p className="mt-1 flex gap-1 text-sm text-gray-500">
                    <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                    {product.seller?.shop_name ?? 'Unknown Store'}
                </p>
                <p className="flex items-center gap-1 text-sm text-emerald-600">
                    <TrendingUp className="h-4 w-4" />
                    <span>{product.total_sold && product.total_sold > 0 ? `${product.total_sold} sold` : 'New product'}</span>
                </p>
                <div className="mt-4 flex items-center justify-between">
                    <span className="font-bold text-amber-500">{formatRupiah(product.price)}</span>
                    <button
                        onClick={handleAddToCart}
                        className="rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
                        disabled={product.stock === 0 || processing || isOwnProduct}
                    >
                        {processing ? (
                            '...'
                        ) : product.stock > 0 ? (
                            isOwnProduct ? (
                                'Your Product'
                            ) : (
                                <p className="flex items-center gap-1 text-xl">
                                    + <ShoppingCart />
                                </p>
                            )
                        ) : (
                            'Out of Stock'
                        )}
                    </button>
                </div>
            </div>
        </Link>
    );
}
