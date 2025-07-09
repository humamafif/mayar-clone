import { ProductCard } from '@/components/product/product-card';
import { Product } from '@/types/product';
import { Link } from '@inertiajs/react';
import { ShoppingBagIcon } from 'lucide-react';

interface ProductCatalogProps {
    products: Product[];
    title: string;
    description: string;
    viewAllLink: string;
    viewAllText: string;
}

export function ProductCatalog({ products = [], title = '', description = '', viewAllLink = '', viewAllText = '' }: ProductCatalogProps) {
    return (
        <div className="py-16" id="products">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-12 text-center">
                    <h2 className="mb-4 text-3xl font-bold text-gray-900">{title}</h2>
                    <p className="mx-auto max-w-2xl text-lg text-gray-600">{description}</p>
                </div>

                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {products.length > 0 ? (
                        products.map((product) => <ProductCard key={product.id} product={product} />)
                    ) : (
                        <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                            <ShoppingBagIcon className="mb-4 h-20 w-20 text-gray-500" />
                            <p className="text-xl text-gray-500">No products available at the moment. Please check back later!</p>
                        </div>
                    )}
                </div>

                {products.length > 0 && (
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
