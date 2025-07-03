// ✅ Gunakan 'default import' tanpa kurung kurawal {} sesuai saran error
import AppLayoutTemplate from '@/layouts/app/app-header-layout';
import AdminLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { usePage } from '@inertiajs/react';
import { type ReactNode } from 'react';
import { Toaster } from 'sonner';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
    
}

const AppLayout = ({ children, breadcrumbs, ...props }: AppLayoutProps) => {
    const page = usePage<SharedData>();
    const { auth } = page.props;
    const currentURL = page.url;

    if (auth?.user && auth.user.role === 'seller' && /^\/seller(?:\/|$)/.test(currentURL)) {
        return (
            <AdminLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
                <Toaster richColors position="top-right" />
                {children}
            </AdminLayoutTemplate>
        );
    }

    return (
        <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
            <Toaster richColors position="top-right" />
            {children}
        </AppLayoutTemplate>
    );
};

export default AppLayout;
