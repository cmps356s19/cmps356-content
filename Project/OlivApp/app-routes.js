const jobService = require('./services/JobService');
const userService = require('./services/UserService');
const productService = require('./services/ProductService');
const router = require('express').Router();

// Use GET to get refData by name: e.g., GET /api/refdata/oliveTypes
router.get('/refdata/:name', jobService.getReferenceData);

// Use GET to query jobs: GET /api/jobs?status=Pending&fromDate=2019-04-10&toDate=2019-04-30
// Use POST to add a job: POST /api/jobs and place the job object to add in the request body
/* Use PATCH to reschedule jobs. The request body object should have
    {jobs, mode, days, hours, minutes}  */
router.route('/jobs')
    .get(jobService.getJobs)
    .post(jobService.addJob)
    .patch(jobService.rescheduleJobs);

// Use GET to get a job: GET /api/jobs/123
// Use PUT to update a job: PUT /api/jobs/123 and place the job object to update in the request body
/* Use PATCH to complete a job: PATCH /api/jobs/123
      and place in the body an object having the following properties:
      {completedDate, completedTime, oilQuantity, invoice} */
// Use DELETE to cancel a job: DELETE /api/jobs/123
router.route('/jobs/:id')
    .get(jobService.getJob)
    .put(jobService.updateJob)
    .patch(jobService.completeJob)
    .delete(jobService.cancelJob);

// Use PUT to update an invoice: PUT /api/jobs/123/invoice and place the invoice object to update in the request body
// Use PATCH to pay an invoice: PATCH /api/jobs/123/invoice and place the paymentInfo object in the request body
//          The paymentInfo object has a paymentMethod attribute e.g. {paymentInfo: 'Cash'}
router.route('/jobs/:id/invoice')
    .put(jobService.updateInvoice)
    .patch(jobService.payInvoice);


// Use Get to get a job notes, e.g.,: GET /api/jobs/123/notes
// Use Post to add a job note, e.g., : POST /api/jobs/123/notes and place the note object to add in the request body
router.route('/jobs/:id/notes')
    .get(jobService.getNotes)
    .post(jobService.addNote);

// Returns the data required for the jobs summary report.
// Example call: GET /api/reports/summary/2019-04-10/2019-04-30
router.get('/reports/summary/:fromDate/:toDate', jobService.getJobsSummary);


// **** Users Web API  ***
router.get('/users/login', userService.login);

router.route('/users')
    .get(userService.getCustomers)
    .post(userService.addUser);

router.route('/users/:id')
    .get(userService.getUser)
    .put(userService.updateUser);


// *** Products Web API ***
// e.g., GET /api/products?category=container
router.route('/products')
    .get(productService.getProducts)
    .post(productService.addProduct);

router.route('/products/:id')
    .get(productService.getProduct)
    .put(productService.updateProduct);

module.exports = router;