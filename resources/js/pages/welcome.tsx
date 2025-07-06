import { ProductCard } from '@/components/product-card';
import AppLayout from '@/layouts/app-layout';
import { type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';

// Definisikan interface untuk produk
interface Product {
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

export default function Welcome({ products = [] }: { products: Product[] }) {
    const { auth } = usePage<SharedData>().props;

    return (
        <AppLayout>
            <Head title="Selamat Datang">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>

            {/* HERO SECTION*/}
            <div className="mt-8 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
                        <div className="text-white">
                            <h1 className="mb-4 text-4xl font-bold md:text-5xl">Belanja Produk Digital Terbaik</h1>
                            <p className="mb-8 text-xl text-blue-100">
                                Temukan berbagai produk digital berkualitas dari penjual terpercaya. Aman, mudah, dan harga terjangkau!
                            </p>
                            <div className="space-y-3">
                                <div className="flex items-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="mr-2 h-6 w-6 text-blue-200"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <p className="text-blue-100">Produk digital asli dan berkualitas</p>
                                </div>
                                <div className="flex items-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="mr-2 h-6 w-6 text-blue-200"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <p className="text-blue-100">Transaksi aman dan terpercaya</p>
                                </div>
                                <div className="flex items-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="mr-2 h-6 w-6 text-blue-200"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <p className="text-blue-100">Dukungan penjual 24/7</p>
                                </div>
                            </div>
                            <div className="mt-10">
                                <a
                                    href="#produk"
                                    className="mr-4 inline-block rounded-lg bg-white px-6 py-3 text-lg font-semibold text-blue-600 transition hover:bg-blue-50"
                                >
                                    Belanja Sekarang
                                </a>

                                {!auth.user ? (
                                    <a
                                        href="/login"
                                        className="hover:bg-opacity-10 inline-block rounded-lg border border-white px-6 py-3 text-lg font-semibold text-white transition hover:bg-white hover:text-blue-600"
                                    >
                                        Masuk/Daftar
                                    </a>
                                ) : auth.user.role == 'seller' ? (
                                    <a
                                        href="/seller/dashboard"
                                        className="hover:bg-opacity-10 inline-block rounded-lg border border-white px-6 py-3 text-lg font-semibold text-white transition hover:bg-white hover:text-blue-600"
                                    >
                                        Toko Saya
                                    </a>
                                ) : (
                                    <a
                                        href="/seller/join"
                                        className="hover:bg-opacity-10 inline-block rounded-lg border border-white px-6 py-3 text-lg font-semibold text-white transition hover:bg-white hover:text-blue-600"
                                    >
                                        Mulai Jualan
                                    </a>
                                )}
                            </div>
                        </div>
                        <div className="relative">
                            <div className="relative z-10 rotate-3 transform rounded-lg bg-white p-2 shadow-xl">
                                <img
                                    src="/images/card-hero-section.jpeg"
                                    alt="Produk Digital"
                                    className="h-64 w-full rounded object-cover"
                                    onError={(e) => {
                                        e.currentTarget.src = 'https://placehold.co/600x400/blue/white?text=Produk+Digital';
                                    }}
                                />
                            </div>
                            <div className="absolute top-8 -left-4 z-0 hidden -rotate-6 transform rounded-lg bg-white p-2 shadow-xl md:block">
                                <img
                                    src="/images/card-hero-section.jpeg"
                                    alt="Toko Digital"
                                    className="h-48 w-full rounded object-cover"
                                    onError={(e) => {
                                        e.currentTarget.src = 'https://placehold.co/500x300/indigo/white?text=Toko+Digital';
                                    }}
                                />
                            </div>
                            <div className="absolute -right-4 -bottom-4 z-20 hidden rounded-lg bg-gradient-to-r from-green-500 to-blue-500 p-4 text-white shadow-lg md:block">
                                <p className="text-xl font-bold">100% Aman</p>
                                <p>Garansi kepuasan!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* KATALOG PRODUK */}
            <div className="py-16" id="produk">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-12 text-center">
                        <h2 className="mb-4 text-3xl font-bold text-gray-900">Produk Terbaru</h2>
                        <p className="mx-auto max-w-2xl text-lg text-gray-600">Temukan produk digital terbaik dari penjual terpercaya</p>
                    </div>

                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {products.length > 0 ? (
                            products.map((product) => <ProductCard key={product.id} product={product} />)
                        ) : (
                            <div className="col-span-full py-12 text-center">
                                <p className="text-xl text-gray-500">Belum ada produk tersedia. Silakan periksa kembali nanti!</p>
                            </div>
                        )}
                    </div>

                    <div className="mt-12 text-center">
                        <a
                            href="/products"
                            className="inline-block rounded-lg border border-indigo-600 px-6 py-3 text-lg font-semibold text-indigo-600 transition hover:bg-indigo-600 hover:text-white"
                        >
                            Lihat Semua Produk
                        </a>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
