import kue from 'kue';

/**
 * Create push notifications jobs.
 * @param {Array} jobs - Array of job objects.
 * @param {Object} queue - Kue queue.
 * @throws Will throw an error if jobs is not an array.
 */
export default function createPushNotificationsJobs(jobs, queue) {
  if (!Array.isArray(jobs)) {
    throw new Error('Jobs is not an array');
  }

  jobs.forEach((jobData) => {
    const job = queue.create('push_notification_code_3', jobData)
      .save((err) => {
        if (err) {
          console.error(`Error creating job: ${err}`);
        } else {
          console.log(`Notification job created: ${job.id}`);
        }
      });

    job.on('complete', () => {
      console.log(`Notification job ${job.id} completed`);
    });

    job.on('failed', (err) => {
      console.error(`Notification job ${job.id} failed: ${err}`);
    });

    job.on('progress', (progress, total) => {
      console.log(`Notification job ${job.id} ${progress}% complete`);
    });
  });
}

