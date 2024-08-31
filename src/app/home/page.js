'use client';
import { useState, useEffect } from "react";

export default function Home() {
    const [products, setProducts] = useState([]);
    const [form, setForm] = useState({ name: '', description: '', price: '', imageUrl: '' });
    const [editMode, setEditMode] = useState(false);
    const [editProductId, setEditProductId] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        const res = await fetch('/api/products');
        const data = await res.json();
        setProducts(data);
    };

    const handleCreateOrUpdateProduct = async () => {
        const method = editMode ? 'PUT' : 'POST';
        const url = '/api/products';
        const productData = editMode ? { ...form, id: editProductId } : form;

        await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData),
        });

        setForm({ name: '', description: '', price: '', imageUrl: '' });
        setEditMode(false);
        setEditProductId(null);
        fetchProducts();
    };

    const handleDeleteProduct = async (id) => {
        await fetch('/api/products', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }),
        });

        fetchProducts();
    };

    const handleEditProduct = (product) => {
        setForm({
            name: product.name,
            description: product.description,
            price: product.price,
            imageUrl: product.imageUrl,
        });
        setEditMode(true);
        setEditProductId(product.id);
    };

    return (
        <div>
            <h1>Products</h1>
            <form onSubmit={(e) => { e.preventDefault(); handleCreateOrUpdateProduct(); }}>
                <input
                    type="text"
                    placeholder="Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) })}
                />
                <input
                    type="text"
                    placeholder="Image URL"
                    value={form.imageUrl}
                    onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                />
                <button type="submit">{editMode ? 'Update' : 'Create'} Product</button>
            </form>

            <div>
                {products.length > 0 ? (
                    products.map((product) => (
                        <div key={product.id}>
                            <img src={product.imageUrl} alt={product.name} />
                            <h2>{product.name}</h2>
                            <p>{product.description}</p>
                            <p>${product.price}</p>
                            <button onClick={() => handleEditProduct(product)}>Edit</button>
                            <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
                        </div>
                    ))
                ) : (
                    <p>No products available.</p>
                )}
            </div>
        </div>
    );
}
