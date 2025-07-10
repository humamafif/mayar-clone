import { ProductCard } from '@/components/product/product-card';
import { Product } from '@/types/product';
import { Link } from '@inertiajs/react';

interface ProductCatalogProps {
    products: Product[];
    title: string;
    description: string;
    viewAllLink: string;
    viewAllText: string;
    variant?: 'default' | 'featured';
}

export function ProductCatalog({
    products = [],
    title = '',
    description = '',
    viewAllLink = '',
    viewAllText = '',
    variant = 'default',
}: ProductCatalogProps) {
    const isFeatured = variant === 'featured';

    return (
        <div className="py-16" id="products">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-12 text-center">
                    <h2 className={`mb-4 text-3xl font-bold ${isFeatured ? 'text-blue-700' : 'text-gray-900'}`}>{title}</h2>
                    <p className="mx-auto max-w-2xl text-lg text-gray-600">{description}</p>
                </div>

                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {products.length > 0 ? (
                        products.map((product) => (
                            <div key={product.id}>
                                <ProductCard product={product} />
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full py-12 text-center">
                            <p className="text-xl text-gray-500">No products available yet. Please check back later!</p>
                        </div>
                    )}
                </div>

                {products.length > 0 && !isFeatured && (
                    <div className="mt-12 text-center">
                        <Link
                            href={viewAllLink}
                            className="inline-block rounded-lg border border-indigo-600 px-6 py-3 text-lg font-semibold text-indigo-600 transition hover:bg-indigo-600 hover:text-white"
                        >
                            {viewAllText}
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
