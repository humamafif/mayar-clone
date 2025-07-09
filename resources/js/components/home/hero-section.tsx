import { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';

export function HeroSection() {
    const { auth } = usePage<SharedData>().props;

    return (
        <div className="mt-8 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
                    <div className="text-white">
                        <h1 className="mb-4 text-4xl font-bold md:text-5xl">Shop Premium Digital Products</h1>
                        <p className="mb-8 text-xl text-blue-100">
                            Discover high-quality digital products from trusted sellers. Safe, easy, and affordable!
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
                                <p className="text-blue-100">Authentic and high-quality digital products</p>
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
                                <p className="text-blue-100">Secure and reliable transactions</p>
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
                                <p className="text-blue-100">24/7 seller support</p>
                            </div>
                        </div>
                        <div className="mt-10">
                            <a
                                href="#products"
                                className="mr-4 inline-block rounded-lg bg-white px-6 py-3 text-lg font-semibold text-blue-600 transition hover:bg-blue-50"
                            >
                                Shop Now
                            </a>

                            {!auth.user ? (
                                <a
                                    href="/login"
                                    className="hover:bg-opacity-10 inline-block rounded-lg border border-white px-6 py-3 text-lg font-semibold text-white transition hover:bg-white hover:text-blue-600"
                                >
                                    Login/Register
                                </a>
                            ) : auth.user.role == 'seller' ? (
                                <a
                                    href="/seller/dashboard"
                                    className="hover:bg-opacity-10 inline-block rounded-lg border border-white px-6 py-3 text-lg font-semibold text-white transition hover:bg-white hover:text-blue-600"
                                >
                                    My Store
                                </a>
                            ) : (
                                <a
                                    href="/seller/join"
                                    className="hover:bg-opacity-10 inline-block rounded-lg border border-white px-6 py-3 text-lg font-semibold text-white transition hover:bg-white hover:text-blue-600"
                                >
                                    Start Selling
                                </a>
                            )}
                        </div>
                    </div>
                    <div className="relative">
                        <div className="relative z-10 rotate-3 transform rounded-lg bg-white p-2 shadow-xl">
                            <img
                                src="/images/card-hero-section.jpeg"
                                alt="Digital Products"
                                className="h-64 w-full rounded object-cover"
                                onError={(e) => {
                                    e.currentTarget.src = 'https://placehold.co/600x400/blue/white?text=Digital+Products';
                                }}
                            />
                        </div>
                        <div className="absolute top-8 -left-4 z-0 hidden -rotate-6 transform rounded-lg bg-white p-2 shadow-xl md:block">
                            <img
                                src="/images/card-hero-section.jpeg"
                                alt="Digital Store"
                                className="h-48 w-full rounded object-cover"
                                onError={(e) => {
                                    e.currentTarget.src = 'https://placehold.co/500x300/indigo/white?text=Digital+Store';
                                }}
                            />
                        </div>
                        <div className="absolute -right-4 -bottom-4 z-20 hidden rounded-lg bg-gradient-to-r from-green-500 to-blue-500 p-4 text-white shadow-lg md:block">
                            <p className="text-xl font-bold">100% Secure</p>
                            <p>Satisfaction guaranteed!</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
