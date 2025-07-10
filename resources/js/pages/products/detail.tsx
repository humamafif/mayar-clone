import { ProductCard } from '@/components/product/product-card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useAddToCart } from '@/hooks/cart/use-add-to-cart';
import AppLayout from '@/layouts/app-layout';
import { formatRupiah } from '@/lib/utils';
import { SharedData } from '@/types';
import { Product } from '@/types/product';
import { Head, router, usePage } from '@inertiajs/react';
import { AlertCircle, Minus, Plus, ShoppingCart, Store, TrendingUp } from 'lucide-react';
import { useState } from 'react';

export default function ProductDetail({ product, relatedProducts }: { relatedProducts: Product[]; product: Product }) {
    const [quantity, setQuantity] = useState(1);
    const { auth } = usePage<SharedData>().props;
    const isLoggedIn = !!auth?.user;
    const { addToCart, processing } = useAddToCart();
    const isOwnProduct = auth.user && product.seller && Number(product.seller.user_id) === Number(auth.user.id);
    const isButtonDisabled = product.stock === 0 || !isLoggedIn || processing || isOwnProduct;

    const getButtonText = () => {
        if (processing) return 'Processing...';
        if (product.stock === 0) return 'Out of Stock';
        if (isOwnProduct) return 'Your Own Product';
        return 'Add to Cart';
    };

    const increaseQuantity = () => {
        if (quantity < product.stock) {
            setQuantity(quantity + 1);
        }
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleAddToCart = () => {
        if (!isLoggedIn) {
            router.visit('/login');
            return;
        }
        addToCart(product.id, quantity);
    };

    return (
        <AppLayout>
            <Head title={product.name} />

            <div className="container py-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    <div className="overflow-hidden rounded-lg">
                        <img
                            src={`/storage/${product.image}`}
                            alt={product.name}
                            className="h-full w-full object-cover"
                            onError={(e) => {
                                e.currentTarget.src = 'https://placehold.co/600x400/indigo/white?text=Digital+Product';
                            }}
                        />
                    </div>

                    {/* Product details section */}
                    <div className="flex flex-col">
                        <h1 className="text-3xl font-bold">{product.name}</h1>

                        <div className="mt-6 flex justify-between">
                            <div className="flex-col gap-2">
                                <h2 className="text-2xl font-bold text-amber-500">{formatRupiah(product.price)}</h2>
                                <p className="flex items-center gap-1 text-sm text-emerald-600">
                                    <TrendingUp className="h-4 w-4" />
                                    <span>{product.total_sold && product.total_sold > 0 ? `${product.total_sold} sold` : 'New product'}</span>
                                </p>
                            </div>
                            <div className="mt-2">
                                <span
                                    className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${
                                        product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                    }`}
                                >
                                    {product.stock > 0 ? `Stock: ${product.stock}` : 'Out of Stock'}
                                </span>
                            </div>
                        </div>
                        <Separator className="my-6" />

                        <div className="my-2 flex items-center space-x-2">
                            {product.seller.shop_photo ? (
                                <img
                                    src={`/storage/${product.seller.shop_photo}`}
                                    alt={product.seller.shop_name}
                                    className="h-12 w-12 rounded-full border border-gray-500 object-cover"
                                    onError={(e) => {
                                        e.currentTarget.src = 'https://placehold.co/40x40/gray/white?text=S';
                                        e.currentTarget.className = 'h-5 w-5 rounded-full';
                                    }}
                                />
                            ) : (
                                <Store className="h-4 w-4 text-gray-500" />
                            )}
                            <span className="text-gray-600">{product.seller.shop_name}</span>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold">Description</h3>
                            <p className="mt-2 text-gray-600">{product.description}</p>
                        </div>

                        <Separator className="my-6" />

                        {product.stock > 0 && (
                            <div>
                                <h3 className="text-lg font-semibold">Quantity</h3>
                                <div className="mt-3 flex items-center space-x-3">
                                    <Button variant="outline" size="icon" onClick={decreaseQuantity} disabled={quantity <= 1}>
                                        <Minus className="h-4 w-4" />
                                    </Button>
                                    <span className="w-12 text-center text-lg font-medium">{quantity}</span>
                                    <Button variant="outline" size="icon" onClick={increaseQuantity} disabled={quantity >= product.stock}>
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        )}

                        <div className="mt-8">
                            {isOwnProduct && (
                                <Alert className="mb-4 bg-amber-50">
                                    <AlertCircle className="h-4 w-4 text-amber-600" />
                                    <AlertDescription className="text-amber-800">
                                        This is your own product. You cannot purchase your own products.
                                    </AlertDescription>
                                </Alert>
                            )}
                            <Button className="w-full" disabled={isButtonDisabled} size="lg" onClick={handleAddToCart}>
                                <ShoppingCart className="mr-2 h-5 w-5" />
                                {getButtonText()}
                            </Button>

                            {!isLoggedIn && (
                                <p className="mt-2 text-center text-sm text-gray-500">
                                    Please{' '}
                                    <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                                        login
                                    </a>{' '}
                                    to make a purchase.
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Related products section */}
                {relatedProducts.length > 0 && (
                    <div className="mt-16">
                        <h2 className="mb-6 text-2xl font-bold">Related Products</h2>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                            {relatedProducts.map((relatedProduct) => (
                                <ProductCard key={relatedProduct.id} product={relatedProduct} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
