import { HeroSection } from '@/components/home/hero-section';
import { ProductCatalog } from '@/components/home/product-catalog';
import AppLayout from '@/layouts/app-layout';
import { Product } from '@/types/product';
import { Head } from '@inertiajs/react';
interface WelcomeProps {
    bestSellers: Product[];
    latestProducts: Product[];
}
export default function Welcome({ bestSellers = [], latestProducts = [] }: WelcomeProps) {
    return (
        <AppLayout>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>

            {/* Hero Section */}
            <HeroSection />

            {/* Best Sellers Section */}
            {bestSellers.length > 0 && (
                <ProductCatalog
                    products={bestSellers}
                    title="Best Sellers"
                    description="Our most popular digital products loved by customers"
                    viewAllLink="/products?sort=popular"
                    viewAllText="View All Popular Products"
                    variant="featured"
                />
            )}

            {/* Latest Products */}
            <ProductCatalog
                products={latestProducts}
                title="Latest Products"
                description="Discover the best digital products from trusted sellers"
                viewAllLink="/products"
                variant="default"
                viewAllText="View All Products"
            />
        </AppLayout>
    );
}
