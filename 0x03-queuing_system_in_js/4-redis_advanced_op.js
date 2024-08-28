import { createClient, print } from 'redis';

// Create a Redis client
const client = createClient();

// Event listener for successful connection
client.on('connect', () => {
  console.log('Redis client connected to the server');
});

// Event listener for errors
client.on('error', (err) => {
  console.log(`Redis client not connected to the server: ${err.message}`);
});

/**
 * Function to create a hash and store values in Redis.
 * @param {string} key - The key of the hash.
 * @param {string} field - The field name in the hash.
 * @param {string} value - The value to store for the field.
 */
function setNewHashValue(key, field, value) {
  client.hset(key, field, value, print);  // Use redis.print to show the result of the hset operation
}

/**
 * Function to display all fields and values of a hash from Redis.
 * @param {string} key - The key of the hash to retrieve from Redis.
 */
function displayHash(key) {
  client.hgetall(key, (err, result) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(result);  // Log the object stored in the hash
  });
}

// Create Hash: HolbertonSchools with specified fields and values
setNewHashValue('HolbertonSchools', 'Portland', '50');
setNewHashValue('HolbertonSchools', 'Seattle', '80');
setNewHashValue('HolbertonSchools', 'New York', '20');
setNewHashValue('HolbertonSchools', 'Bogota', '20');
setNewHashValue('HolbertonSchools', 'Cali', '40');
setNewHashValue('HolbertonSchools', 'Paris', '2');

// Display Hash: Retrieve all fields and values for HolbertonSchools
displayHash('HolbertonSchools');

