import { createClient, print } from 'redis';
import { promisify } from 'util';

// Create a Redis client
const client = createClient();

// Promisify the client.get method
const getAsync = promisify(client.get).bind(client);

// Event listener for successful connection
client.on('connect', () => {
  console.log('Redis client connected to the server');
});

// Event listener for errors
client.on('error', (err) => {
  console.log(`Redis client not connected to the server: ${err.message}`);
});

/**
 * Function to set a new value in Redis.
 * @param {string} schoolName - The key for the Redis entry.
 * @param {string} value - The value to set for the specified key.
 */
function setNewSchool(schoolName, value) {
  client.set(schoolName, value, print);  // Use redis.print to show the result of the set operation
}

/**
 * Asynchronous function to display a value from Redis using async/await.
 * @param {string} schoolName - The key to retrieve from Redis.
 */
async function displaySchoolValue(schoolName) {
  try {
    const reply = await getAsync(schoolName);  // Await the result of the get operation
    console.log(reply);
  } catch (err) {
    console.error(err);
  }
}

// Call the functions to demonstrate functionality
displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');

