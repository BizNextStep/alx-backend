import { createClient } from 'redis';

// Create a Redis client
const client = createClient();

// When the client connects successfully
client.on('connect', () => {
  console.log('Redis client connected to the server');
});

// When there is an error connecting to the server
client.on('error', (err) => {
  console.log(`Redis client not connected to the server: ${err.message}`);
});

