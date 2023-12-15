import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import Form from 'react-bootstrap/Form';
import { useNavigate, useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import * as jobsService from "../../services/jobs-service";
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';

function EditJobs({ user }) {

    const { jid } = useParams();
    const navigate = useNavigate();
    const [alter, setAlter] = useState(false);
    const [company, setCompany] = useState("");
    const [link, setLink] = useState("");
    const [comment, setComment] = useState("");
    const [allJobs, setAll] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        jobsService.findJobById(jid)
            .then((job) => {
                setCompany(job[0].company);
                setLink(job[0].link);
                setComment(job[0].comment);
                setIsLoading(false);
            });

        jobsService.findAllJobs()
            .then(all => setAll(all));

    }, [jid]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const newJob = {};
        newJob.author = user.name;
        newJob.link = event.target[0].value;
        newJob.company = event.target[1].value;
        newJob.comment = event.target[2].value;

        if (newJob.company !== "" && newJob.company !== null
            && newJob.link !== "" && newJob.link !== null) {
            jobsService.updateJob(jid, newJob)
                .then(() => {
                    setAlter(false);
                    navigate('/jobs');
                })
                .catch(err => {
                    console.error('Error creating job:', err);
                });
        } else {
            setAlter(true);
        }
    };

    return (
        <Container>
            {isLoading ? (
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            ) : (
                <Form onSubmit={handleSubmit}>
                    <p></p>
                    {alter ?
                        <Alert key="danger" variant="danger">
                            Something is missing!
                        </Alert> : null
                    }
                    <Form.Group className="mb-3" >
                        <Form.Label>链接（必填）</Form.Label>
                        <Form.Control
                            type="text"
                            value={link}
                            onChange={e => {
                                setLink(e.target.value);
                            }} />
                        <Form.Text>
                            投递链接
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>公司名称（必填）</Form.Label>
                        <Form.Control
                            type="text"
                            value={company}
                            onChange={e => {
                                setCompany(e.target.value);
                            }} />
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label>备注</Form.Label>
                        <Form.Control
                            type="text"
                            value={comment}
                            onChange={e => {
                                setComment(e.target.value);
                            }} />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            )}

        </Container>
    )

}

export default EditJobs;