import kue from 'kue';

// Blacklisted phone numbers
const blacklistedNumbers = [
  '4153518780',
  '4153518781',
];

/**
 * Function to send a notification.
 * @param {string} phoneNumber - The phone number to send the notification to.
 * @param {string} message - The message to be sent in the notification.
 * @param {object} job - The Kue job object.
 * @param {function} done - The callback to mark the job as done.
 */
function sendNotification(phoneNumber, message, job, done) {
  // Track the job progress
  job.progress(0, 100);

  if (blacklistedNumbers.includes(phoneNumber)) {
    // Fail the job if the phone number is blacklisted
    job.fail(new Error(`Phone number ${phoneNumber} is blacklisted`));
    console.error(`Failed: Phone number ${phoneNumber} is blacklisted`);
    done(new Error(`Phone number ${phoneNumber} is blacklisted`));
    return;
  }

  // Track progress to 50%
  job.progress(50, 100);
  
  // Log the notification being sent
  console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);

  // Mark the job as done
  done();
}

// Create a Kue queue
const queue = kue.createQueue();

// Process jobs in the 'push_notification_code_2' queue
queue.process('push_notification_code_2', 2, (job, done) => {
  // Extract phoneNumber and message from the job data
  const { phoneNumber, message } = job.data;

  // Call the sendNotification function with job data
  sendNotification(phoneNumber, message, job, done);
});

