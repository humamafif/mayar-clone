import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { updateProduct } from '@/lib/handlers/products/update-product';
import { parseRupiah, rupiahFormatter } from '@/lib/utils';
import { BreadcrumbItem } from '@/types';
import { Product } from '@/types/product';
import { zodResolver } from '@hookform/resolvers/zod';
import { Head } from '@inertiajs/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
    image: z.any().optional(),
    name: z.string().min(1, 'Product name is required'),
    description: z.string().min(1, 'Product description is required'),
    price: z.number().min(0, 'Price must be a positive number'),
    stock: z.number().int().min(0, 'Stock must be a non-negative integer'),
    file: z.any().optional(),
    product_url: z.string().url('Must be a valid URL').optional().or(z.literal('')),
});

export default function EditProduct({ product }: { product: Product }) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Seller Dashboard', href: '/seller' },
        { title: 'Products', href: '/seller/products' },
        { title: `Edit: ${product.name}`, href: `/seller/products/${product.id}/edit` },
    ];

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            image: null,
            name: product.name,
            description: product.description,
            price: product.price,
            stock: product.stock,
            product_url: product.product_url || '',
            file: null,
        },
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => updateProduct(product.id, values);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit Product: ${product.name}`} />
            <div className="flex flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="rounded-xl border border-border p-8">
                    <h1 className="mb-6 text-2xl font-semibold">Edit Product</h1>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="image"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Product Image</FormLabel>
                                        {product.image && (
                                            <div className="mb-3">
                                                <p className="mb-1 text-sm text-gray-500">Current image:</p>
                                                <img
                                                    src={`/storage/${product.image}`}
                                                    alt={product.name}
                                                    className="h-40 w-40 rounded-md border object-cover"
                                                />
                                            </div>
                                        )}
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
                                        <p className="text-sm text-gray-500">Leave blank if you do not want to change the image</p>
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
                                            <Input placeholder="Enter product name" {...field} />
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
                                            <Input placeholder="Enter product description" {...field} />
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
                                        <FormLabel>Stock</FormLabel>
                                        <FormControl>
                                            <Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
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
                                        <FormLabel>Price</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                placeholder="Input product price"
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
                                        {product.file_path && (
                                            <div className="mb-3">
                                                <p className="mb-1 text-sm text-gray-500">Current file: {product.file_path.split('/').pop()}</p>
                                            </div>
                                        )}
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
                                        <FormDescription>Upload a file that buyers can download after a successful purchase.</FormDescription>
                                        <p className="text-sm text-gray-500">Leave blank if you do not want to change the file</p>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="product_url"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Product URL (Optional)</FormLabel>
                                        <FormControl>
                                            <Input placeholder="https://example.com/resource" {...field} />
                                        </FormControl>
                                        <FormDescription>Provide a link that will be shared with buyers after a successful purchase.</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit">Update Product</Button>
                        </form>
                    </Form>
                </div>
            </div>
        </AppLayout>
    );
}
