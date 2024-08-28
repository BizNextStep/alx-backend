import express from 'express';
import redis from 'redis';

const app = express();
const port = 1245;
const client = redis.createClient();

// List of products
const listProducts = [
  { id: 1, name: 'Suitcase 250', price: 50, stock: 4 },
  { id: 2, name: 'Suitcase 450', price: 100, stock: 10 },
  { id: 3, name: 'Suitcase 650', price: 350, stock: 2 },
  { id: 4, name: 'Suitcase 1050', price: 550, stock: 5 }
];

// Function to get item by ID
const getItemById = (id) => {
  return listProducts.find(item => item.id === id);
};

// Route to list all products
app.get('/list_products', (req, res) => {
  const products = listProducts.map(({ id, name, price, stock }) => ({
    itemId: id,
    itemName: name,
    price: price,
    initialAvailableQuantity: stock
  }));
  res.json(products);
});

// Route to get details of a product by ID
app.get('/list_products/:itemId', async (req, res) => {
  const itemId = parseInt(req.params.itemId, 10);
  const product = getItemById(itemId);
  if (product) {
    const reservedStock = await getCurrentReservedStockById(itemId);
    res.json({
      itemId: product.id,
      itemName: product.name,
      price: product.price,
      initialAvailableQuantity: product.stock,
      currentQuantity: product.stock - reservedStock
    });
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

// Reserve stock in Redis
const reserveStockById = (itemId, stock) => {
  client.set(`item.${itemId}`, stock, redis.print);
};

// Get reserved stock from Redis
const getCurrentReservedStockById = async (itemId) => {
  return new Promise((resolve, reject) => {
    client.get(`item.${itemId}`, (err, reply) => {
      if (err) {
        reject(err);
      } else {
        resolve(parseInt(reply, 10) || 0);
      }
    });
  });
};

// Server listen
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export { reserveStockById, getCurrentReservedStockById };

