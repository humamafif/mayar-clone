import { Button } from '@/components/ui/button';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Home } from 'lucide-react';

export default function PageNotFound() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-white dark:bg-gray-900">
            <Head title="Page Not Found" />
            <div className="container flex min-h-[70vh] flex-col items-center justify-center py-12 text-center">
                <img src="404-illustration.svg" alt="Page not found" className="mb-8 max-w-md" />

                <h1 className="mb-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">Oops! Page not found</h1>

                <p className="mb-8 max-w-md text-base text-gray-600 dark:text-gray-400">
                    We can't seem to find the page you're looking for. It might have been moved or deleted.
                </p>

                <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
                    <Button asChild size="lg">
                        <Link href="/">
                            <Home className="mr-2 h-5 w-5" />
                            Back to Home
                        </Link>
                    </Button>

                    <Button asChild variant="outline" size="lg">
                        <Link href="/">
                            <ArrowLeft className="mr-2 h-5 w-5" />
                            Go Back
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
