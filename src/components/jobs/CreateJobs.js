import React from "react";
import Container from "react-bootstrap/esm/Container";
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import * as jobsService from "../../services/jobs-service";
import Alert from 'react-bootstrap/Alert';

function CreateJobs({ user }) {

    const [alter, setAlter] = useState(false);
    const [repeat, setRepeat] = useState(false);
    const [link, setLink] = useState("");
    const [allJobs, setAll] = useState([]);

    useEffect(async () => {
        jobsService.findAllJobs()
            .then(all => setAll(all));
    }, [])

    useEffect(async () => {
        for (let each of allJobs) {
            if (each.link === link) {
                setRepeat(true);
                console.log("repeat");
                return;
            }
        }
        setRepeat(false);
    }, [link, setLink])

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const newJob = {};
        newJob.author = user.name;
        newJob.link = event.target[0].value;
        newJob.company = event.target[1].value;
        newJob.comment = event.target[2].value;

        if (newJob.company !== "" && newJob.company !== null
            && newJob.link !== "" && newJob.link !== null) {
            jobsService.createJob(newJob)
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

            <Form onSubmit={handleSubmit}>
                <p></p>
                {alter ?
                    <Alert key="danger" variant="danger">
                        Something is missing!
                    </Alert> : null
                }
                {repeat ?
                    <Alert key="danger" variant="danger">
                        这个链接已经上传过了!
                    </Alert> : null
                }

                <Form.Group className="mb-3" >
                    <Form.Label>链接（必填）</Form.Label>
                    <Form.Control
                        type="text"
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
                    />
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>备注</Form.Label>
                    <Form.Control
                        type="text"
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>

            </Form>
        </Container>
    )

}

export default CreateJobs;