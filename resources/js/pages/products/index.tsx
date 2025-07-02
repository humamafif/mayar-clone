import { Product, ProductCard } from '@/components/product-card';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

export default function Products({ products = [] }: { products: Product[] }) {
    return (
        <AppLayout>
            <Head title="Semua Produk" />
            <div className="py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">Semua Produk</h1>
                        <p className="mt-2 text-gray-600">Temukan berbagai produk digital yang tersedia di platform kami</p>
                    </div>

                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {products.length > 0 ? (
                            products.map((product) => <ProductCard key={product.id} product={product} />)
                        ) : (
                            <div className="col-span-full py-12 text-center">
                                <p className="text-xl text-gray-500">Belum ada produk tersedia. Silakan periksa kembali nanti!</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
