import { createClient } from 'redis';

// Create a Redis client
const subscriber = createClient();

// On successful connection
subscriber.on('connect', () => {
  console.log('Redis client connected to the server');
});

// On error
subscriber.on('error', (err) => {
  console.log(`Redis client not connected to the server: ${err.message}`);
});

// Subscribe to the 'holberton school channel'
subscriber.subscribe('holberton school channel');

// Listen for messages on the 'holberton school channel'
subscriber.on('message', (channel, message) => {
  console.log(message);

  // If the message is 'KILL_SERVER', unsubscribe and quit
  if (message === 'KILL_SERVER') {
    subscriber.unsubscribe('holberton school channel');
    subscriber.quit();
  }
});

