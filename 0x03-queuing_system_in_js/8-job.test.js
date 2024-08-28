import { expect } from 'chai';
import kue from 'kue';
import createPushNotificationsJobs from './8-job.js';

// Create a queue and enable test mode
const queue = kue.createQueue();
queue.testMode = true;

describe('createPushNotificationsJobs', () => {
  beforeEach((done) => {
    // Clear the queue before each test
    kue.Job.remove({}, done);
  });

  it('should display an error message if jobs is not an array', () => {
    expect(() => createPushNotificationsJobs({}, queue)).to.throw('Jobs is not an array');
  });

  it('should create two new jobs in the queue', (done) => {
    const jobs = [
      { phoneNumber: '4153518780', message: 'This is the code 1234 to verify your account' },
      { phoneNumber: '4153518781', message: 'This is the code 4562 to verify your account' },
    ];

    createPushNotificationsJobs(jobs, queue);

    // Check if the jobs are created
    kue.Job.getJobs('waiting', (err, jobsList) => {
      if (err) return done(err);
      expect(jobsList).to.have.lengthOf(2);
      done();
    });
  });

  afterEach((done) => {
    // Clear the queue and exit test mode
    kue.Job.remove({}, done);
  });
});

