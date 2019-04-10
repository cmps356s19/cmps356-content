const path = require("path");
const fs = require("fs-extra");
const jobsFilePath = path.resolve(__dirname,'../data/jobs.json');
const refDataFilePath = path.resolve(__dirname,'../data/reference-data.json');

class JobRepository {

    // To keep it simple you do not need to store reference data in MongoDB keep it in the file only
    // Reference data are data that define the set of permissible values to be used for a data field
    // Returns reference data such as the array of oliveTypes
    // e.g., call getReferenceData('oliveTypes');
    async getReferenceData(name) {
        let refData = await fs.readJson(refDataFilePath);
        return refData[name];
    }

    // ToDo: Implement getJobs. Build a query execute it.
    /* Do not get all jobs then filter on the client-side.
     When fromDate and/or toDate are passed as parameters to this function then
     the query should select jobs having:
     jobs.receptionDate >= fromDate and jobs.receptionDate <= fromDate.

     This method should NOT return the notes attribute.
    */
    async getJobs({customerId, status, fromDate, toDate}) {
        let jobs = await fs.readJson(jobsFilePath);

        if (status)
            jobs = jobs.filter(job => job.status === status);

        if (customerId)
            jobs = jobs.filter(job => job.customerId == customerId);

        // More info about comparing dates @ https://stackoverflow.com/questions/48227286/filter-array-in-array-by-date-between-2-dates
        if (fromDate) {
            fromDate = (new Date(fromDate)).getTime();
            jobs = jobs.filter(job => (new Date(job.receptionDate)).getTime() >= fromDate);
        }

        if (toDate) {
            toDate = (new Date(toDate)).getTime();
            jobs = jobs.filter(job => (new Date(job.receptionDate)).getTime() <= toDate);
        }

        // Remove the notes attribute from each job
        // When doing this with MongoDB database your query should not return the notes
        jobs = jobs.map(job => {
            delete job.notes;
            return job;
        });

        return jobs;
    }

    // ToDo: Implement getJob
    // When moving to MongoDB replace job.jobId with job._id
    async getJob(jobId) {
        const jobs = await this.getJobs();
        return jobs.find( job => job._id == jobId);
    }

    // ToDo: Implement addJob
    async addJob(job) {
        return job;  //return the job with the auto-assigned id
    }

    // ToDo: Implement updateJob
    // This method should merge the received job details with the ones already stored in the database
    async updateJob(job) {
        return job; //return the merged job object
    }

    // ToDo: Implement cancelJob.
    /* This method gets a jobId and simply sets the job status to "Cancelled"
       If the job status is not equal to 'Pending' then this method should throw
       an exception 'Only pending jobs can be cancelled.' */
    async cancelJob(jobId) {
    }

    // ToDo: Implement completeJob
    /*
    This method has a jobCompleteInfo parameter having the following properties:
    {completedDate, completedTime, oilQuantity, invoice}
    This method should sets the job status to "Completed" and store these
    properties in the job.
    */
    async completeJob(jobId, jobCompleteInfo) {
    }

    // ToDo: Implement updateInvoice
    // This method update the invoice of the job having the jobId.
    async updateInvoice(jobId, invoice) {
    }

    // ToDo: Implement payInvoice
    /*
    This method has a paymentInfo parameter having a paymentMethod attribute
    e.g. {paymentInfo: 'Cash'}
    This method should store the payment method as an attribute of the invoice
        and sets the invoice paymentDate to the current date.
    Also it should set the job status to "Paid and Collected".
    */
    async payInvoice(jobId, paymentInfo) {

    }

    // ToDo: Implement rescheduleJobs.
    /* This method reschedule jobs according to the specified mode, days, hours and minutes */
    async rescheduleJobs({jobs, mode, days, hours, minutes}) {
    }

    // ToDo: Implement getJobsSummary
    // This method returns the data required for the jobs summary report.
    async getJobsSummary({fromDate, toDate}) {
    }

    // ToDo: Implement getNotes
    // This method returns the notes by jobId.
    async getNotes(jobId) {
    }

    // ToDo: Implement addNote
    /*
    This method has a note parameter having the following properties:
    {note, createdBy}
    This method should add the note to the job notes.
    It should set the note createdOn to the current date.
    */
    async addNote(jobId, note) {
    }

    //ToDo: Load the jobs into the database if the
    // jobs collection is empty.
    initDb() {

    }
}

module.exports = new JobRepository();