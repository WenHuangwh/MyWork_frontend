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
import * as solutionsService from "../../services/solutions-service";

function MyLeetcode({ user }) {

    const leetcode_tags = LEETCODE_TAGS;
    let tag;
    const [allLeetcodes, setAll] = useState([]);
    const [selectedLeetcodes, setSelected] = useState([]);

    useEffect(async () => {
        leetcodeService.findAllLeetcodes()
            .then(all => {
                solutionsService.findAllSolutions()
                    .then((solutions) => {
                        const allLeetcodes = [];
                        for (let each of all) {
                            for (let sol of solutions) {
                                // console.log(sol.uid);
                                // console.log(user.googleId);
                                if (sol.leetcode_id === each.leetcode_id && sol.uid === user.googleId) {
                                    each.importance = sol.ratingImportance;
                                    each.repeat = sol.ratingRepeat;
                                    each.date = sol.date;
                                    allLeetcodes.push(each);
                                }
                            }
                        }
                        allLeetcodes.sort((a, b) => {
                            return Date.parse(b.date) - Date.parse(a.date);
                        });
                        // console.log(allLeetcodes);
                        setSelected(allLeetcodes);
                        setAll(allLeetcodes);
                    });
            })
    }, [])

    const refreshByTag = () => {
        if (tag === 'All' || tag === "-") {
            setSelected(allLeetcodes);
        } else {
            const tagLeetcodes = [];
            for (let problem of allLeetcodes) {
                for (let tagOfProblem of problem.tags) {
                    if (tagOfProblem === tag) {
                        tagLeetcodes.push(problem);
                    }
                }
            }
            setSelected(tagLeetcodes);
        }
    };

    const sortProblems = (event) => {
        const sort = event.target.value;
        const toSort = selectedLeetcodes;
        if (sort === "leetcode_id") {
            toSort.sort((a, b) => { return b.leetcode_id - a.leetcode_id });
            console.log(toSort);
            setSelected(toSort);
        } else if (sort === "importance") {
            toSort.sort((a, b) => b.importance - a.importance);
            console.log(toSort);
            setSelected(toSort);
        }
        else if (sort === "repeat") {
            toSort.sort((a, b) => b.repeat - a.repeat);
            setSelected(toSort);
        }

    }

    const selectLeetcode = (leetcode_id) => {
        const tagLeetcodes = [];
        for (let problem of allLeetcodes) {
            if (problem.leetcode_id === leetcode_id) {
                tagLeetcodes.push(problem);
                break;
            }
        }
        setSelected(tagLeetcodes);
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
                                    // sort = e.target.value;
                                    sortProblems(e);
                                }}
                            >
                                <option value="-">-</option>
                                <option value="leetcode_id">题号</option>
                                <option value="importance">重要</option>
                                <option value="repeat">多刷</option>
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
                            <th>重要</th>
                            <th>多刷</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            selectedLeetcodes.map(problem => {
                                // console.log(problem.leetcode_id);
                                return (
                                    <tr>
                                        <td>
                                            <Nav.Item>
                                                <Nav.Link href={"#/leetcodes/" + problem.leetcode_id}>{problem.leetcode_id}</Nav.Link>
                                            </Nav.Item>
                                        </td>
                                        <td>{problem.name}</td>
                                        <td>{problem.intro}</td>
                                        <td>{problem.importance.toFixed(0)}</td>
                                        <td>{problem.repeat.toFixed(0)}</td>
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

export default MyLeetcode;