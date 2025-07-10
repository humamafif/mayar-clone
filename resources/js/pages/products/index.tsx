import { ProductCard } from '@/components/product/product-card';
import AppLayout from '@/layouts/app-layout';
import type { Product } from '@/types/product';
import { Head } from '@inertiajs/react';
import { ShoppingBagIcon } from 'lucide-react';

export default function Products({ products = [] }: { products: Product[] }) {
    return (
        <AppLayout>
            <Head title="All Products" />
            <div className="py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {products.length > 0 ? (
                            products.map((product) => <ProductCard key={product.id} product={product} />)
                        ) : (
                            <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                                <ShoppingBagIcon className="mb-4 h-20 w-20 text-gray-500" />
                                <p className="text-xl text-gray-500">No products available at the moment. Please check back later!</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
