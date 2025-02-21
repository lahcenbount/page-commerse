import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editProduct, setEditProduct] = useState(null); // pour gérer le produit à éditer
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        stock: '',
    });

    useEffect(() => {
        getProducts();
    }, []);

    // Récupérer les produits depuis l'API
    const getProducts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/products');
            setProducts(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des produits:', error);
            setError('Erreur lors de la récupération des produits');
        } finally {
            setLoading(false);
        }
    };

    // Supprimer un produit
    const deleteProduct = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/products/${id}`);
            getProducts();
            alert('Produit supprimé avec succès !');
        } catch (error) {
            console.error('Erreur lors de la suppression du produit:', error);
            alert('Erreur lors de la suppression du produit');
        }
    };

    // Ouvrir le modal de modification
    const openEditModal = (product) => {
        setEditProduct(product);
        setFormData({
            title: product.title,
            description: product.description,
            price: product.price,
            stock: product.stock,
        });
    };

    // Gérer les changements dans le formulaire
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Mettre à jour un produit
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/products/${editProduct._id}`, formData);
            alert('Produit mis à jour avec succès!');
            getProducts();
            setEditProduct(null); // Fermer le modal après la mise à jour
        } catch (error) {
            console.error('Erreur lors de la mise à jour du produit:', error);
            alert('Erreur lors de la mise à jour du produit');
        }
    };

    if (loading) {
        return <div>Chargement en cours...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Liste des produits</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                    <div key={product._id} className="bg-white p-4 rounded-lg shadow-md">
                        <img
                            src={`http://localhost:5000/${product.image}`}
                            alt={product.title}
                            className="w-full h-48 object-cover rounded"
                            loading="lazy"
                        />
                        <h3 className="text-xl font-semibold mt-4">{product.title}</h3>
                        <p className="text-gray-600">{product.description}</p>
                        <p className="text-gray-800 font-bold">Prix: {product.price}dh</p>
                        <p className="text-gray-800">Stock: {product.stock}</p>
                        <div className="mt-4 flex space-x-2">
                            <button
                                onClick={() => openEditModal(product)} // Ouvrir le modal pour modifier le produit
                                className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600"
                            >
                                Modifier
                            </button>
                            <button
                                onClick={() => deleteProduct(product._id)} // Supprimer le produit
                                className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                            >
                                Supprimer
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal pour modifier un produit */}
            {editProduct && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                        <h3 className="text-xl font-semibold mb-4">Modifier le produit</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700">Titre</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    className="mt-2 p-2 w-full border rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    className="mt-2 p-2 w-full border rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Prix</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleInputChange}
                                    className="mt-2 p-2 w-full border rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Stock</label>
                                <input
                                    type="number"
                                    name="stock"
                                    value={formData.stock}
                                    onChange={handleInputChange}
                                    className="mt-2 p-2 w-full border rounded"
                                />
                            </div>
                            <div className="flex justify-end space-x-2">
                                <button
                                    type="button"
                                    onClick={() => setEditProduct(null)} // Fermer le modal sans enregistrer
                                    className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
                                >
                                    Annuler
                                </button>
                                <button
                                    type="submit"
                                    className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
                                >
                                    Enregistrer
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductList;
