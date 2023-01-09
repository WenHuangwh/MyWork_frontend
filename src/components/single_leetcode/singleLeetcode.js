import React from "react";
import Select from 'react-select';
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Form from 'react-bootstrap/Form';
import { useCallback, useState, useEffect } from "react";
import { LEETCODE_TAGS } from "../../context.js";
import { Link, useLocation, useParams } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import * as solutionsServices from "../../services/solutions-service";
import * as leetcodeService from "../../services/leetcodes-service";

function SingleLeetcode({ user }) {
    const { lid } = useParams();
    const userId = user.googleId;
    const [leetcode, setLeetcode] = useState({});
    const [mySolution, setMine] = useState({});
    const [otherSolutions, setOthers] = useState([]);

    useEffect(() => {
        leetcodeService.findLeetcodesByID(lid)
            .then(problem => setLeetcode(problem[0]));
        solutionsServices.findSolutionsByLid(lid)
            .then(solutions => {
                const othersArr = [];
                solutions.map(
                    sol => {
                        if (sol.uid == userId) {
                            setMine(sol);
                        } else {
                            othersArr.push(sol);
                        }
                    }
                )
                setOthers(othersArr);
            });
    }, []);

    return (
        <Container fluid>
            <Form>
                <div className="bg-white bg-opacity-10 ttr-rounded-15px mt-2 p-2">
                    <a href={leetcode.link} target="_blank">
                        <Button variant="warning">
                            Go To Leetcode
                        </Button>
                    </a>
                    <p></p>
                    <Table>
                        <thead>
                            <tr>
                                <th>题号</th>
                                <th>题目</th>
                                <th>简介</th>
                            </tr>
                            <tr>
                                <th>{lid}</th>
                                <th>{leetcode.name}</th>
                                <td>{leetcode.intro}</td>
                            </tr>
                        </thead>
                    </Table>
                    <Row>
                        <Card >
                            <Card.Body>
                                <Card.Subtitle className="mb-2 text-muted">我的答案<br /><br /></Card.Subtitle>
                                <Card.Text><h6>关键点:</h6> {mySolution.shortAnswer} <br /></Card.Text>
                                <Card.Text>
                                    <h6>分析:</h6> {mySolution.longAnswer}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Row>
                    <Row>
                        <div>
                            <p></p>
                            <Link to={"/leetcodes/" + leetcode.leetcode_id + "/addsolution"} state={{ solution: mySolution, problem: leetcode }}>
                                <Button variant="danger">
                                    Add/Edit My Solution
                                </Button>
                            </Link>

                        </div>
                    </Row>
                    <p></p>
                    <p></p>
                    <p></p>
                    {
                        otherSolutions.map(sol => {
                            return (
                                <Row>
                                    <Card >
                                        <Card.Body>
                                            <Card.Subtitle className="mb-2 text-muted">User: {sol.user} <br /><br /></Card.Subtitle>
                                            <Card.Text><h6>关键点:</h6> {sol.shortAnswer} <br /></Card.Text>
                                            <Card.Text>
                                                <h6>分析:</h6>  {sol.longAnswer}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Row>
                            );
                        })
                    }
                </div>
            </Form >
        </Container >
    )

}

export default SingleLeetcode;