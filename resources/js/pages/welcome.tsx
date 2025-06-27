import AppLayout from '@/layouts/app-layout';
import { type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <AppLayout>
            <Head title="Selamat Datang">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            {/* HERO SECTION */}
            <div className="mt-8 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
                        <div className="text-white">
                            <h1 className="mb-4text-4xl font-bold md:text-5xl">Premium Digital Templates</h1>
                            <p className="mb-8 text-xl text-indigo-100">
                                Unlock your creativity with our exclusive collection of professional digital templates. Perfect for social media,
                                presentations, and more!
                            </p>
                            <div className="space-y-3">
                                <div className="flex items-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="mr-2 h-6 w-6 text-indigo-200"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <p className="text-indigo-100">Thousands of premium templates</p>
                                </div>
                                <div className="flex items-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="mr-2 h-6 w-6 text-indigo-200"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <p className="text-indigo-100">Exclusive discount for new users</p>
                                </div>
                                <div className="flex items-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="mr-2 h-6 w-6 text-indigo-200"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <p className="text-indigo-100">Regular updates with new content</p>
                                </div>
                            </div>
                            <div className="mt-10">
                                <a
                                    href="#"
                                    className="mr-4 inline-block rounded-lg bg-white px-6 py-3 text-lg font-semibold text-indigo-600 transition hover:bg-indigo-50"
                                >
                                    Get 50% Off Today
                                </a>
                                <a
                                    href="#"
                                    className="hover:bg-opacity-10 inline-block rounded-lg border border-white px-6 py-3 text-lg font-semibold text-white transition hover:bg-white"
                                >
                                    Browse Templates
                                </a>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="relative z-10 rotate-3 transform rounded-lg bg-white p-2 shadow-xl">
                                <img
                                    src="https://placehold.co/600x400/indigo/white?text=Premium+Template"
                                    alt="Premium Template"
                                    className="w-full rounded"
                                />
                            </div>
                            <div className="absolute top-8 -left-4 z-0 hidden -rotate-6 transform rounded-lg bg-white p-2 shadow-xl md:block">
                                <img
                                    src="https://placehold.co/500x300/purple/white?text=Digital+Design"
                                    alt="Digital Design"
                                    className="w-full rounded"
                                />
                            </div>
                            <div className="absolute -right-4 -bottom-4 z-20 hidden rounded-lg bg-gradient-to-r from-pink-500 to-orange-500 p-4 text-white shadow-lg md:block">
                                <p className="text-xl font-bold">50% OFF</p>
                                <p>Limited time offer!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* KATALOG */}
            <div className="py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-12 text-center">
                        <h2 className="mb-4 text-3xl font-bold text-gray-900">Our Premium Templates</h2>
                        <p className="mx-auto max-w-2xl text-lg text-gray-600">Browse our collection of high-quality templates for every need</p>
                    </div>

                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {/* Card 1 */}
                        <div className="group overflow-hidden rounded-lg bg-white shadow-md transition hover:shadow-xl">
                            <div className="relative h-60 overflow-hidden">
                                <img
                                    src="https://placehold.co/600x400/orange/white?text=Social+Media+Pack"
                                    alt="Social Media Template"
                                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                                <div className="absolute top-4 right-4 rounded-full bg-indigo-600 px-3 py-1 text-sm font-semibold text-white">
                                    Popular
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-900">Social Media Pack</h3>
                                <p className="mt-2 text-gray-600">Complete pack with Instagram, Facebook and Twitter templates</p>
                                <div className="mt-4 flex items-center justify-between">
                                    <span className="font-bold text-indigo-600">$29.99</span>
                                    <button className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700">
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="group overflow-hidden rounded-lg bg-white shadow-md transition hover:shadow-xl">
                            <div className="relative h-60 overflow-hidden">
                                <img
                                    src="https://placehold.co/600x400/purple/white?text=Presentation"
                                    alt="Presentation Template"
                                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-900">Presentation Template</h3>
                                <p className="mt-2 text-gray-600">Professional presentation templates for business and education</p>
                                <div className="mt-4 flex items-center justify-between">
                                    <span className="font-bold text-indigo-600">$19.99</span>
                                    <button className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700">
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Card 3 */}
                        <div className="group overflow-hidden rounded-lg bg-white shadow-md transition hover:shadow-xl">
                            <div className="relative h-60 overflow-hidden">
                                <img
                                    src="https://placehold.co/600x400/pink/white?text=CV+Template"
                                    alt="CV Template"
                                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                                <div className="absolute top-4 right-4 rounded-full bg-green-500 px-3 py-1 text-sm font-semibold text-white">New</div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-900">CV Template</h3>
                                <p className="mt-2 text-gray-600">Stand out with our professional resume templates</p>
                                <div className="mt-4 flex items-center justify-between">
                                    <span className="font-bold text-indigo-600">$15.99</span>
                                    <button className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700">
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 text-center">
                        <a
                            href="#"
                            className="inline-block rounded-lg border border-indigo-600 px-6 py-3 text-lg font-semibold text-indigo-600 transition hover:bg-indigo-600 hover:text-white"
                        >
                            View All Templates
                        </a>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
