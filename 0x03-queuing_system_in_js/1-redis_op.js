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
 * Function to set a new value in Redis.
 * @param {string} schoolName - The key for the Redis entry.
 * @param {string} value - The value to set for the specified key.
 */
function setNewSchool(schoolName, value) {
  client.set(schoolName, value, print);  // Use redis.print to show the result of the set operation
}

/**
 * Function to display a value from Redis.
 * @param {string} schoolName - The key to retrieve from Redis.
 */
function displaySchoolValue(schoolName) {
  client.get(schoolName, (err, reply) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(reply);  // Log the value of the specified key
  });
}

// Call the functions to demonstrate functionality
displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');

