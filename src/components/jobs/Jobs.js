import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import { Link } from "react-router-dom";
import "./styles.css";
import * as jobsService from "../../services/jobs-service";
import Spinner from 'react-bootstrap/Spinner';

function Jobs({ user }) {
    const [allJobs, setAll] = useState([]);
    const [displayJobs, setDisplay] = useState([]);
    const [myJobs, setMyJobs] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const filteredJobs = allJobs.filter(job =>
            job.company.toLowerCase().includes(searchInput.toLowerCase())
        );
        setDisplay(filteredJobs);
    }, [searchInput, allJobs]);

    useEffect(() => {
        setIsLoading(true);
        jobsService.findAllJobs()
            .then(all => {
                all.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
                setAll(all);
                setIsLoading(false);
            });

        jobsService.findMyJobsById(user.googleId)
            .then(myJobs => {
                if (myJobs[0]?.uid) {
                    setMyJobs(myJobs[0].list);
                } else {
                    const newMyJobs = { uid: user.googleId, list: [] };
                    jobsService.createMyJobs(user.googleId, newMyJobs)
                        .then(data => setMyJobs(data.list));
                }
            });
    }, [user.googleId]);

    const toggleApply = (jid) => {
        const newList = myJobs.includes(jid)
            ? myJobs.filter(my => my !== jid)
            : [...myJobs, jid];

        setMyJobs(newList);
        const newMyJob = { uid: user.googleId, list: newList };
        jobsService.updateMyJobs(newMyJob.uid, newMyJob);
    };

    return (
        <Container fluid>
            <div className="bg-white bg-opacity-10 ttr-rounded-15px mt-2 p-2">
                <Form>
                    <Row>
                        <Col md={4}>
                            <Form.Group>
                                <Form.Label>Search by Company Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter company name"
                                    value={searchInput}
                                    onChange={e => setSearchInput(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                        <Form.Group as={Col}>
                            <Link to="/jobs/new">
                                <Button className="button" type="button" class="btn">New</Button>
                            </Link>
                        </Form.Group>
                    </Row>
                </Form>

                {isLoading ? (
                    <div>
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </div>
                ) : (
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>公司</th>
                                <th>备注</th>
                                <th>已投</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayJobs.map(job => (
                                <tr key={job._id}>
                                    <td>
                                        <Nav.Item>
                                            <Nav.Link href={job.link} target="_blank">{job.company}</Nav.Link>
                                        </Nav.Item>
                                    </td>
                                    <td>{job.comment}</td>
                                    <td>
                                        <div className="icons">
                                            <span onClick={() => toggleApply(job._id)}>
                                                {myJobs.includes(job._id)
                                                    ? <i className="fa-sharp fa-solid fa-file-check fa-2x" style={{ color: 'red' }}></i>
                                                    : <i className="fa-sharp fa-light fa-file-check fa-2x"></i>
                                                }
                                            </span>
                                        </div>
                                    </td>
                                    <td>
                                        <Nav.Link href={`#/jobs/edit/${job._id}`}>编辑</Nav.Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}

            </div>
        </Container>
    );
}

export default Jobs;
