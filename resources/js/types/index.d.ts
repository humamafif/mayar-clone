import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface User {
    id: number;
    name: string;
    email: string;
    role: 'user' | 'seller';
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown;
}

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    image: string;
    seller: {
        shop_name: string;
    };
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth?: {
        user: User;
    };
    ziggy?: Config & { location: string };
    jetstream?: {
        flash: unknown;
    };
    [key: string]: any;
};

export interface SharedData extends PageProps {
    name: string;
    quote: { message: string; author: string };
    sidebarOpen: boolean;
}
