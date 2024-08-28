import { createClient } from 'redis';

// Create a Redis client
const publisher = createClient();

// On successful connection
publisher.on('connect', () => {
  console.log('Redis client connected to the server');
});

// On error
publisher.on('error', (err) => {
  console.log(`Redis client not connected to the server: ${err.message}`);
});

/**
 * Function to publish a message to a Redis channel after a specified delay.
 * @param {string} message - The message to be published.
 * @param {number} time - The delay in milliseconds before publishing the message.
 */
function publishMessage(message, time) {
  setTimeout(() => {
    console.log(`About to send ${message}`);
    publisher.publish('holberton school channel', message);
  }, time);
}

// Call publishMessage with different messages and delays
publishMessage("Holberton Student #1 starts course", 100);
publishMessage("Holberton Student #2 starts course", 200);
publishMessage("KILL_SERVER", 300);
publishMessage("Holberton Student #3 starts course", 400);

