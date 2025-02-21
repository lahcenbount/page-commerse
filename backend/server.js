const express = require('express');
const routes = require('./routes/productRoutes');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');

dotenv.config();

const app = express();
app.use(cors());
app.use("/uploads", express.static("uploads"));
app.use(express.json());

// Connexion à la base de données MongoDB 
mongoose.connect('mongodb://127.0.0.1:27017/ecommerce').then(() => console.log('Connexion à MongoDB réussie'))

.catch(err => console.log('Erreur de connexion MongoDB:', err));
app.use('/api', productRoutes);
const port = 5000;
app.listen(port, () => {
  console.log(`Serveur en écoute sur le port ${port}`);
});