import { Icon } from '@/components/icon';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useCart } from '@/hooks/cart/use-cart';
import { useCheckout } from '@/hooks/cart/use-checkout';
import { useForm } from '@inertiajs/react';
import { ShoppingCart, Trash } from 'lucide-react';

interface ShoppingCartPopoverProps {
    userId: number;
}

export function ShoppingCartPopover({ userId }: ShoppingCartPopoverProps) {
    const { post } = useForm();
    const { checkout, isLoading } = useCheckout();
    const { cart, setCart } = useCart(userId);

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="ghost"
                    className="group ml-1 inline-flex h-9 w-9 items-center justify-center rounded-md bg-transparent p-0 text-sm font-medium text-accent-foreground ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
                >
                    <span className="sr-only">Cart</span>
                    <Icon iconNode={ShoppingCart} className="size-5 opacity-80 group-hover:opacity-100" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
                <div className="mb-2 font-semibold">Shopping Cart</div>
                {cart.length === 0 ? (
                    <div className="text-sm text-muted-foreground">Your cart is empty</div>
                ) : (
                    <>
                        <div className="divide-y">
                            {cart.map((item) => (
                                <div key={item.id} className="flex items-center gap-3 py-2">
                                    <img
                                        src={`/storage/${item.product.image}`}
                                        alt={item.product.title}
                                        className="h-12 w-12 rounded border object-cover"
                                    />
                                    <div className="flex-1">
                                        <div className="font-medium">{item.product.title}</div>
                                        <div className="text-xs text-muted-foreground">
                                            {item.quantity} × Rp{item.product.price.toLocaleString('id-ID')}
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end gap-1">
                                        <div className="text-sm font-semibold">Rp{(item.quantity * item.product.price).toLocaleString('id-ID')}</div>
                                        <button
                                            type="button"
                                            className="flex items-center text-xs text-red-500 hover:underline"
                                            title="Remove"
                                            onClick={() => {
                                                post(route('cart.cancel', item.id), {
                                                    onSuccess: () => window.dispatchEvent(new Event('cart-updated')),
                                                    preserveScroll: true,
                                                });
                                            }}
                                        >
                                            <Trash className="mr-1 h-3 w-3" /> Remove
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-3 flex items-center justify-between font-semibold">
                            <span>Total</span>
                            <span>
                                Rp
                                {cart.reduce((sum, item) => sum + item.quantity * item.product.price, 0).toLocaleString('id-ID')}
                            </span>
                        </div>
                        <Button className="mt-4 w-full cursor-pointer" size="sm" onClick={checkout} disabled={isLoading}>
                            {isLoading ? 'Processing...' : 'Proceed to Checkout'}
                        </Button>
                    </>
                )}
            </PopoverContent>
        </Popover>
    );
}
