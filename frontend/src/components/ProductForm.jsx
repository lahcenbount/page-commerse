import React, { useState } from 'react';
import axios from 'axios';

const ProductForm = ({ getProducts }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [image, setImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('stock', stock);
        formData.append('image', image);

        try {
            await axios.post('http://localhost:5000/api/products', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            getProducts(); // Refresh products list
            alert('Produit ajouté avec succès !');
            setTitle('');
            setDescription('');
            setPrice('');
            setStock('');
            setImage(null);
        } catch (error) {
            console.error('Erreur lors de l\'ajout du produit:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Ajouter un produit</h2>
            <input
                type="text"
                placeholder="Titre"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="titre w-full p-2 mb-4 border rounded"
                required
            />
            <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 mb-4 border rounded"
                required
            />
            <input
                type="number"
                placeholder="Prix"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full p-2 mb-4 border rounded"
                required
            />
            <input
                type="number"
                placeholder="Stock"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="w-full p-2 mb-4 border rounded"
                required
            />
            <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                className="img_url w-full p-2 mb-4 border rounded"
                required
            />
            <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
                Ajouter
            </button>
        </form>
    );
};

export default ProductForm;
