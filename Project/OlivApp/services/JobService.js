const jobRepo = require("../repositories/JobRepository")

class JobService {

    // Returns ref data such as the array of oliveTypes
    // Example call: GET /api/refdata/oliveTypes
    async getReferenceData(req, res) {
        try {
            const name = req.params.name;
            const refData = await jobRepo.getReferenceData(name)
            res.status(200).json(refData);
        } catch (err) {
            res.status(500).send(err);
        }
    }

    // Accepts a get request with any of the following query parameters:
    // customerId, status, fromDate, toDate
    // Example call: GET /api/jobs?status=Pending&fromDate=2019-04-10&toDate=2019-04-30
    async getJobs(req, res) {
        try {
            const jobs = await jobRepo.getJobs(req.query);
            res.status(200).json(jobs);
        } catch (err) {
            res.status(500).send(err);
        }
    }

    // Example call: GET /api/jobs/123
    async getJob(req, res) {
        try {
            const job = await jobRepo.getJob(req.params.id);
            res.status(200).json(job);
        } catch (err) {
            res.status(500).send(err);
        }
    }

    // Example call: POST /api/jobs and place the job object to add in the request body
    async addJob(req, res) {
        try {
            const job = await jobRepo.addJob(req.body);
            res.status(201).json(job);
        } catch (err) {
            res.status(500).send(err);
        }
    }

    // Example call: PUT /api/jobs/123 and place the job object to update in the request body
    async updateJob(req, res) {
        try {
            await jobRepo.updateJob(req.body);
            res.status(200).send("Job updated successfully.");
        } catch (err) {
            res.status(500).send(err);
        }
    }

    // Example call: DELETE /api/jobs/123  to cancel Job 123
    async cancelJob(req, res) {
        try {
            await jobRepo.cancelJob(req.params.id);
            res.status(200).send("Job successfully cancelled.");
        } catch (err) {
            res.status(500).send(err);
        }
    }

    /* Use PATCH to complete a job: PATCH /api/jobs/123
          and place in the body an object having the following properties:
          {completedDate, completedTime, oilQuantity, invoice} */
    async completeJob(req, res) {
        try {
            const jobId = req.params.id;
            await jobRepo.completeJob(jobId, req.body);
            res.status(200).json("Job successfully completed.");
        } catch (err) {
            res.status(500).send(err);
        }
    }

    // Use PUT to update an invoice: PUT /api/jobs/123/invoice and place the invoice object to update in the request body
    async updateInvoice(req, res) {
        try {
            const jobId = req.params.id;
            await jobRepo.updateInvoice(jobId, req.body);
            res.status(200).send("Invoice successfully updated");
        } catch (err) {
            res.status(500).send(err)
        }
    }

    // Use PATCH to pay an invoice: PATCH /api/jobs/123/invoice and place the paymentInfo object in the request body
    //          The paymentInfo object has a paymentMethod attribute e.g. {paymentInfo: 'Cash'}
    async payInvoice(req, res) {
        try {
            const jobId = req.params.id;
            await jobRepo.payInvoice(jobId, req.body);
            res.status(200).send("Invoice successfully paid");
        } catch (err) {
            res.status(500).send(err);
        }
    }

    /* Use PATCH to reschedule jobs. The request body object should have
        {jobs, mode, days, hours, minutes}  */
    async rescheduleJobs(req, res) {
        try {
            await jobRepo.rescheduleJobs(req.body);
            res.status(200).send("Invoice successfully updated");
        } catch (err) {
            res.status(500).send(err)
        }
    }

    // Returns the data required for the jobs summary report.
    // Example call: GET /api/reports/summary/2019-04-10/2019-04-30
    async getJobsSummary(req, res) {
        try {
            const jobsSummary = await jobRepo.getJobsSummary(req.params);
            res.status(200).json(jobsSummary);
        } catch (err) {
            res.status(500).send(err);
        }
    }

    //Get a job notes, e.g.,: GET /api/jobs/123/notes
    async getNotes(req, res) {
        try {
            const jobId = req.params.id;
            const notes = await jobRepo.getNotes(jobId);
            res.status(200).json(notes);
        } catch (err) {
            res.status(500).send(err);
        }
    }

    // Add a job note, e.g., : POST /api/jobs/123/notes and place the note object to add in the request body
    // Example note: {note: "Customer was called to collect his olive oil", createdBy: "Oliva"}
    async addNote(req, res) {
        try {
            const jobId = req.params.id;
            await jobRepo.addNote(jobId, req.body);
            res.status(201).json("Note created.");
        } catch (err) {
            res.status(500).send(err);
        }
    }
}

module.exports = new JobService();