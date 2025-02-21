const Product = require('../models/Product');
const multer = require('multer');
const path = require('path');

// Configuration de Multer pour le stockage des images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Make sure 'uploads/' directory exists
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename with timestamp
    },
});

const upload = multer({ storage }).single('image');

// Ajouter un produit
exports.addProduct = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: 'Erreur lors du téléchargement de l\'image.', error: err });
        }

        const { title, description, price, stock } = req.body;
        
        // Check if required fields are provided
        if (!title || !description || !price || !stock) {
            return res.status(400).json({ message: 'Tous les champs sont nécessaires (title, description, price, stock).' });
        }

        const image = req.file ? req.file.path : ''; // Ensure image is optional
        
        try {
            const newProduct = new Product({ title, description, price, stock, image });
            await newProduct.save();
            res.status(201).json(newProduct);
        } catch (error) {
            console.error(error); // Log the error for debugging
            res.status(500).json({ message: 'Erreur lors de l\'ajout du produit.', error });
        }
    });
};

// Obtenir tous les produits
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Erreur lors de la récupération des produits.', error });
    }
};

// Modifier un produit
exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    const { title, description, price, stock } = req.body;

    // Validate if necessary fields are provided
    if (!title || !description || !price || !stock) {
        return res.status(400).json({ message: 'Tous les champs sont nécessaires (title, description, price, stock).' });
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { title, description, price, stock },
            { new: true }
        );
        
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Produit non trouvé.' });
        }

        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Erreur lors de la mise à jour du produit.', error });
    }
};

// Supprimer un produit
exports.deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Produit non trouvé.' });
        }

        res.status(200).json({ message: 'Produit supprimé avec succès.' });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Erreur lors de la suppression du produit.', error });
    }
};
