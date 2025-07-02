import { ProductCard, type Product } from '@/components/product-card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { formatRupiah } from '@/lib/utils';
import { SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Minus, Plus, ShoppingBag, Store } from 'lucide-react';
import { useState } from 'react';

interface SellerDetails {
    user: {
        name: string;
    };
    shop_name: string;
}

interface ProductDetailProps {
    product: Product & {
        seller: SellerDetails;
    };
    relatedProducts: Product[];
}

export default function ProductDetail({ product, relatedProducts }: ProductDetailProps) {
    const [quantity, setQuantity] = useState(1);
    const { auth } = usePage<SharedData>().props;
    const isLoggedIn = !!auth.user;
    const isButtonDisabled = product.stock === 0 || !isLoggedIn;
    const getButtonText = () => {
        if (product.stock === 0) return 'Stok Habis';
        return 'Tambahkan ke Keranjang';
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

    return (
        <AppLayout>
            <Head title={product.name} />

            <div className="container py-8">
                {/* Product Detail Section */}
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    {/* Product Image */}
                    <div className="overflow-hidden rounded-lg">
                        <img
                            src={`/storage/${product.image}`}
                            alt={product.name}
                            className="h-full w-full object-cover"
                            onError={(e) => {
                                e.currentTarget.src = 'https://placehold.co/600x400/indigo/white?text=Produk+Digital';
                            }}
                        />
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col">
                        <h1 className="text-3xl font-bold">{product.name}</h1>

                        <div className="mt-2 flex items-center space-x-2">
                            <Store className="h-4 w-4 text-gray-500" />
                            <span className="text-gray-600">{product.seller.shop_name}</span>
                        </div>

                        <div className="mt-6">
                            <h2 className="text-2xl font-bold text-amber-500">{formatRupiah(product.price)}</h2>
                            <div className="mt-2">
                                <span
                                    className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${
                                        product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                    }`}
                                >
                                    {product.stock > 0 ? `Stok: ${product.stock}` : 'Stok Habis'}
                                </span>
                            </div>
                        </div>

                        <Separator className="my-6" />

                        <div>
                            <h3 className="text-lg font-semibold">Deskripsi</h3>
                            <p className="mt-2 text-gray-600">{product.description}</p>
                        </div>

                        <Separator className="my-6" />

                        {product.stock > 0 && (
                            <div>
                                <h3 className="text-lg font-semibold">Jumlah</h3>
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
                            <Button
                                className="w-full"
                                disabled={isButtonDisabled}
                                size="lg"
                                onClick={() => (isLoggedIn ? console.log('Add to cart') : (window.location.href = '/login'))}
                            >
                                <ShoppingBag className="mr-2 h-5 w-5" />
                                {getButtonText()}
                            </Button>

                            {!isLoggedIn && (
                                <p className="mt-2 text-center text-sm text-gray-500">
                                    Silakan{' '}
                                    <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                                        login
                                    </a>{' '}
                                    untuk menambahkan produk ke keranjang
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <div className="mt-16">
                        <h2 className="mb-6 text-2xl font-bold">Produk Terkait</h2>
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
