import { Link } from '@inertiajs/react';
import { Button } from '../ui/button';

export default function AuthButton() {
    return (
        <>
            <Button className="font-semibold hover:bg-blue-600 hover:text-white">
                <Link href={route('login')}>Login</Link>
            </Button>
            <Button className="border border-blue-600 bg-transparent font-semibold text-blue-600 hover:bg-blue-600 hover:text-white">
                <Link href={route('register')}>Register</Link>
            </Button>
        </>
    );
}
