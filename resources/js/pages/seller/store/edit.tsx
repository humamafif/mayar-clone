import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { updateStore } from '@/lib/handlers/store/update-store';
import { formatDate } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRef, useState } from 'react';
import { useForm as useHookForm } from 'react-hook-form';
import * as z from 'zod';
const formSchema = z.object({
    shop_name: z.string().min(3, { message: 'Store name must be at least 3 characters long' }),
    shop_description: z.string().nullable().optional(),
    shop_photo: z.any().optional(),
    phone_number: z.string().min(10, { message: 'Phone number must be valid' }),
    address: z.string().min(5, { message: 'Address must be at least 5 characters long' }),
    bank_name: z.string().min(2, { message: 'Bank name is required' }),
    account_number: z.string().min(5, { message: 'Valid account number is required' }),
    bank_account: z.string().min(3, { message: 'Account holder name is required' }),
});

interface StoreEditFormProps {
    data: any;
    setData: (key: string, value: any) => void;
    errors: any;
    processing: boolean;
    seller: SellerInfo;
    onCancel: () => void;
    onSuccess: () => void;
    put: (url: string, data: any, options?: any) => void;
}

export function StoreEditForm({ data, setData, errors, processing, seller, onCancel, onSuccess }: StoreEditFormProps) {
    const form = useHookForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: data,
    });

    const [preview, setPreview] = useState<string | null>(seller.shop_photo ? `/storage/${seller.shop_photo}` : null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (values: z.infer<typeof formSchema>) => updateStore(data, onSuccess);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6" encType="multipart/form-data">
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700">Store Photo</label>
                    <div className="mt-2 flex items-center gap-4">
                        <img src={preview || '/images/image-not-found.jpg'} alt="Store Photo" className="h-20 w-20 rounded border object-cover" />
                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            className="hidden"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    setData('shop_photo', file);
                                    const reader = new FileReader();
                                    reader.onload = (ev) => setPreview(ev.target?.result as string);
                                    reader.readAsDataURL(file);
                                }
                            }}
                        />
                        <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()}>
                            Change Photo
                        </Button>
                    </div>
                    {errors.shop_photo && <p className="mt-1 text-sm text-red-500">{errors.shop_photo}</p>}
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {/* Store Details */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Details</CardTitle>
                            <CardDescription>Basic information about your store</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <FormField
                                control={form.control}
                                name="shop_name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Store Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                value={field.value}
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    setData('shop_name', e.target.value);
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage>{errors.shop_name}</FormMessage>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="shop_description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                value={field.value || ''}
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    setData('shop_description', e.target.value);
                                                }}
                                                placeholder="Tell customers about your store"
                                            />
                                        </FormControl>
                                        <FormMessage>{errors.shop_description}</FormMessage>
                                    </FormItem>
                                )}
                            />

                            <div>
                                <Label className="text-sm font-medium text-gray-500 dark:text-gray-400">Registered Since</Label>
                                <p className="mt-1">{formatDate(seller.created_at)}</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Contact Info */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Contact Information</CardTitle>
                            <CardDescription>Contact details and store address</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <FormField
                                control={form.control}
                                name="phone_number"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Phone Number</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                value={field.value}
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    setData('phone_number', e.target.value);
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage>{errors.phone_number}</FormMessage>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="address"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Address</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                value={field.value}
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    setData('address', e.target.value);
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage>{errors.address}</FormMessage>
                                    </FormItem>
                                )}
                            />

                            <div>
                                <Label className="text-sm font-medium text-gray-500 dark:text-gray-400">ID Card Number</Label>
                                <p className="mt-1">{'*'.repeat(seller.id_card_number.length - 4) + seller.id_card_number.slice(-4)}</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Bank Information */}
                    <Card className="md:col-span-2">
                        <CardHeader>
                            <CardTitle>Bank Account</CardTitle>
                            <CardDescription>Bank account details for receiving payments</CardDescription>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-3">
                            <FormField
                                control={form.control}
                                name="bank_name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Bank Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                value={field.value}
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    setData('bank_name', e.target.value);
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage>{errors.bank_name}</FormMessage>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="account_number"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Account Number</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                value={field.value}
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    setData('account_number', e.target.value);
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage>{errors.account_number}</FormMessage>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="bank_account"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Account Holder</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                value={field.value}
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    setData('bank_account', e.target.value);
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage>{errors.bank_account}</FormMessage>
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>
                </div>

                <div className="flex justify-end space-x-4">
                    <Button type="button" variant="outline" onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button type="submit" disabled={processing}>
                        {processing ? 'Updating...' : 'Save Changes'}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
