import {useParams} from "react-router-dom";
import jobs from "./jobs.json";

function SingleJob() {
    const { uid, jid } = useParams();
    const userId = uid;
    const jobId = jid;

    const allJobs = jobs;
    let jobList = {};

    const findJob = () => {
        for (let job of allJobs) {
            if (job._id === jid) {
                jobList = job;
                break;
            }
        }
    }

    return (
        <container fluid>
            {findJob()}

        </container>
    )

}

export default SingleJob;