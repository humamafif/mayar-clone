<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProductController extends Controller
{

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $seller = $request->user()->seller;
        $products = $seller->products()->latest()->get();

        return Inertia::render('seller/products/index', [
            'products' => $products
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('seller/products/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'image' => 'required|image|mimes:jpg,jpeg,png|max:2048',
            'file' => 'nullable|file|max:10240',
            'product_url' => 'nullable|url|max:255',
        ]);

        $imagePath = $request->file('image')->store('products', 'public');

        $seller = $request->user()->seller;

        $filePath = null;
        if ($request->hasFile('file')) {
            $filePath = $request->file('file')->store('product_files', 'public');
        }

        $seller->products()->create([
            'image' => $imagePath,
            'name' => $request->name,
            'description' => $request->description,
            'price' => $request->price,
            'stock' => $request->stock,
            'file_path' => $filePath,
            'product_url' => $request->product_url ?? null,
        ]);


        return redirect()->route('seller.products.index')
            ->with('success', 'Product added successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product) {}

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {


        return Inertia::render('seller/products/edit', [
            'product' => $product
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {


        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'file' => 'nullable|file|max:10240',
            'product_url' => 'nullable|url|max:255',
        ]);

        $imagePath = $product->image;

        if ($request->hasFile('image')) {

            if ($product->image) {
                Storage::disk('public')->delete($product->image);
            }

            $imagePath = $request->file('image')->store('products', 'public');
        }
        if ($request->hasFile('file')) {
            if ($product->file_path) {
                Storage::disk('public')->delete($product->file_path);
            }
            $filePath = $request->file('file')->store('product_files', 'public');
            $validated['file_path'] = $filePath;
        }

        $product->update([
            'image' => $imagePath,
            'name' => $request->name,
            'description' => $request->description,
            'price' => $request->price,
            'stock' => $request->stock,
            'file_path' => $request->hasFile('file') ? $filePath : $product->file_path,
            'product_url' => $request->product_url ?? $product->product_url,
        ]);

        return redirect()->route('seller.products.index')
            ->with('success', 'Product updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {

        if ($product->image) {
            Storage::disk('public')->delete($product->image);
        }

        $product->delete();

        return redirect()->route('seller.products.index')
            ->with('success', 'Product deleted successfully.');
    }
}
