import React from "react";
import Select from 'react-select';
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from "react";
import { LEETCODE_TAGS } from "../../context.js";
import Table from 'react-bootstrap/Table';
import { Link, useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import "./styles.css";
import * as leetcodeService from "../../services/leetcodes-service";

function PublicLeetcode({ user }) {

    const leetcode_tags = LEETCODE_TAGS;
    let tag;
    const [allProblems, setAll] = useState([]);
    const [leetcodes, setLeetcodes] = useState(allProblems);
    let sort = null;

    useEffect(() => {
        leetcodeService.findAllLeetcodes()
            .then(all => setLeetcodes(all))
        leetcodeService.findAllLeetcodes()
            .then(all => setAll(all))
    }, [])

    const refreshByTag = () => {
        const allLeetcodes = allProblems;
        if (tag === 'All' || tag === "-") {
            setLeetcodes(allLeetcodes);
        } else {
            const tagLeetcodes = [];
            for (let problem of allLeetcodes) {
                for (let tagOfProblem of problem.tags) {
                    if (tagOfProblem === tag) {
                        tagLeetcodes.push(problem);
                    }
                }
            }
            setLeetcodes(tagLeetcodes);
        }
    };

    // const sortProblems = () => {
    //     if (sort) { 
    //         const allLeetcodes = problems;
    //         if (sort === "Ratings") { 

    //         }
    //     }
    // }


    const selectLeetcode = (leetcode_id) => {
        const allLeetcodes = allProblems;
        const tagLeetcodes = [];
        for (let problem of allLeetcodes) {
            if (problem.leetcode_id === leetcode_id) {
                tagLeetcodes.push(problem);
                break;
            }
        }
        setLeetcodes(tagLeetcodes);
    }

    return (
        <Container fluid>
            <div className="bg-white bg-opacity-10 ttr-rounded-15px mt-2 p-2">
                <Form>
                    <Row>
                        <Form.Group controlId="formBasicSelect" as={Col}>
                            <Form.Label>Select A Tag</Form.Label>
                            <Form.Control
                                as="select"
                                onChange={e => {
                                    tag = e.target.value;
                                    refreshByTag();
                                }}
                            >
                                {leetcode_tags.map(option => {
                                    return <option value={option}>{option}</option>
                                })}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formBasicSelect" as={Col}>
                            <Form.Label>Sort Problems</Form.Label>
                            <Form.Control
                                as="select"
                                onChange={e => {
                                    sort = e.target.value;
                                }}
                            >
                                <option value="ID">题号</option>
                                <option value="Ratings">Ratings</option>
                                <option value="Repeat">Repeat</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formBasicSelect" as={Col}>
                            <Form.Label>Search</Form.Label>
                            <Form.Control
                                type="text"
                                onChange={e => {
                                    selectLeetcode(e.target.value);
                                    tag = "All";
                                }}
                            >
                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <a href="#/leetcodes/addproblem">
                                <Button className="button" type="button" class="btn">
                                    New/Edit
                                </Button>
                            </a>
                        </Form.Group>

                    </Row>
                </Form>

                <p></p>

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>题号</th>
                            <th>题目</th>
                            <th>简介</th>
                            <th>重要性</th>
                            <th>错误率</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            leetcodes.map(problem => {
                                return (
                                    <tr>

                                        <td>
                                            <Nav.Item>
                                                <Nav.Link href={"#/leetcodes/" + problem.leetcode_id}>{problem.leetcode_id}</Nav.Link>
                                            </Nav.Item>
                                        </td>
                                        <td>{problem.name}</td>
                                        <td>{problem.intro}</td>
                                        {/* <td>{averageValue(problem.ratings)}</td>
                                        <td>{averageValue(problem.failure)}</td> */}
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </Table>
            </div>
        </Container >
    )
}

export default PublicLeetcode;