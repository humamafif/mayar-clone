import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { parseRupiah, rupiahFormatter } from '@/lib/utils';
import { BreadcrumbItem } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Head, router } from '@inertiajs/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Seller Dashboard',
        href: '/seller',
    },
    {
        title: 'Products',
        href: '/seller/products',
    },
    {
        title: 'Add New Product',
        href: '/seller/products/create',
    },
];

const formSchema = z.object({
    image: z.any(),
    name: z.string().min(1, 'Product name is required'),
    description: z.string().min(1, 'Product description is required'),
    price: z.number().min(0, 'Price must be a positive number'),
    stock: z.number().int().min(0, 'Stock must be a non-negative integer'),
    file: z.any().optional(),
    external_url: z.string().url('Must be a valid URL').optional().or(z.literal('')),
});

export default function CreateProduct() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            image: null,
            name: '',
            description: '',
            price: 0,
            stock: 0,
            file: null,
            external_url: '',
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        const formData = new FormData();

        if (values.image) formData.append('image', values.image);
        formData.append('name', values.name);
        formData.append('description', values.description);
        formData.append('price', values.price.toString());
        formData.append('stock', values.stock.toString());
        if (values.file) formData.append('file', values.file);
        if (values.external_url) formData.append('external_url', values.external_url);
        router.post(route('seller.products.store'), formData);
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Product" />
            <div className="flex flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="rounded-xl border border-sidebar-border/700 p-8 md:p-8 dark:border-sidebar-border">
                    <h1 className="text-2xl font-semibold">Add Product</h1>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="image"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Product Image</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0];
                                                    if (file) {
                                                        field.onChange(file);
                                                    }
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Product Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Input your product name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Product Description</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Input your product description" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="stock"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Product Stock</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Input your product stock"
                                                type="number"
                                                {...field}
                                                value={field.value}
                                                onChange={(e) => field.onChange(Number(e.target.value))}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="price"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Product Price</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                {...field}
                                                placeholder="Input your product price"
                                                value={rupiahFormatter.format(field.value || 0)}
                                                onChange={(e) => field.onChange(parseRupiah(e.target.value))}
                                                autoComplete="off"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="file"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Downloadable File (Optional)</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="file"
                                                accept=".pdf,.zip,.rar,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0];
                                                    if (file) {
                                                        field.onChange(file);
                                                    }
                                                }}
                                            />
                                        </FormControl>
                                        <FormDescription>Upload file yang akan bisa diunduh pembeli setelah pembelian berhasil</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="external_url"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>External URL (Optional)</FormLabel>
                                        <FormControl>
                                            <Input placeholder="https://example.com/resource" {...field} />
                                        </FormControl>
                                        <FormDescription>Link yang akan diberikan kepada pembeli setelah pembelian berhasil</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" disabled={form.formState.isSubmitting}>
                                {form.formState.isSubmitting ? 'Submitting...' : 'Submit'}
                            </Button>
                        </form>
                    </Form>
                </div>
            </div>
        </AppLayout>
    );
}
