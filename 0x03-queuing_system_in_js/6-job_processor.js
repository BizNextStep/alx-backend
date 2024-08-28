import kue from 'kue';

// Create a Kue queue
const queue = kue.createQueue();

/**
 * Function to send a notification.
 * @param {string} phoneNumber - The phone number to send the notification to.
 * @param {string} message - The message to be sent in the notification.
 */
function sendNotification(phoneNumber, message) {
  console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
}

// Process jobs in the 'push_notification_code' queue
queue.process('push_notification_code', (job, done) => {
  // Extract phoneNumber and message from the job data
  const { phoneNumber, message } = job.data;
  // Call the sendNotification function with job data
  sendNotification(phoneNumber, message);
  done();  // Mark the job as done
});

