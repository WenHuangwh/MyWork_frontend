import React from "react";
import Select from 'react-select';
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from "react";
import { LEETCODE_TAGS } from "../../context.js";
import { useLocation, useParams, useNavigate, Navigate } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './style.css';
import { Table } from "react-bootstrap";
import * as solutionsServices from "../../services/solutions-service";


function AddSolution({ user }) {

    const navigate = useNavigate();
    const location = useLocation();
    const { solution, problem } = location.state;
    const [shortAnswer, setShort] = useState("");
    const [longAnswer, setLong] = useState("");
    const [code, setCode] = useState("");
    const [importance, setImportance] = useState();
    const [repeat, setRepeat] = useState();
    const [newSolution, setSolution] = useState({});

    useEffect(() => {
        setShort(solution.shortAnswer);
        setLong(solution.longAnswer);
        setCode(solution.code);
        setImportance(solution.ratingImportance);
        setRepeat(solution.ratingRepeat);
        setSolution({
            "uid": user.googleId,
            "username": user.name,
            "leetcode_id": problem.leetcode_id,
            "shortAnswer": shortAnswer,
            "longAnswer": longAnswer,
            "code": code,
            "ratingImportance": importance,
            "ratingRepeat": repeat
        })
    }, [])

    const sendData = () => {

        if (newSolution.shortAnswer !== '') {
            if (solution._id) {
                solutionsServices.updateSolution(solution._id, newSolution)
                    .then(reset());
            }
            else {
                solutionsServices.createSolution(newSolution)
                    .then(reset());
            }
        } else {
            reset();
        }
    }

    const reset = () => {
        navigate(`/leetcodes/${problem.leetcode_id}`);
    }

    return (

        <Form>
            <p></p>
            <Table>
                <thead>
                    <tr>
                        <th>题号</th>
                        <th>题目</th>
                        <th>简介</th>
                    </tr>
                    <tr>
                        <th>{problem.leetcode_id}</th>
                        <th>{problem.name}</th>
                        <td>{problem.intro}</td>
                    </tr>
                </thead>
            </Table>
            <Form.Group className="mb-3">
                <Form.Label>关键点</Form.Label>
                <Form.Control
                    as="textarea"
                    type="text"
                    value={shortAnswer}
                    rows={2}
                    onChange={e => {
                        setShort(e.target.value);
                        setSolution({
                            "uid": user.googleId,
                            "username": user.name,
                            "leetcode_id": problem.leetcode_id,
                            "shortAnswer": e.target.value,
                            "longAnswer": longAnswer,
                            "code": code,
                            "ratingImportance": importance,
                            "ratingRepeat": repeat
                        })
                    }} />
                <Form.Text>
                    一句话
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label>分析</Form.Label>
                <Form.Control
                    as="textarea"
                    type="text"
                    value={longAnswer}
                    rows={4}
                    onChange={e => {
                        setLong(e.target.value);
                        setSolution({
                            "uid": user.googleId,
                            "username": user.name,
                            "leetcode_id": problem.leetcode_id,
                            "shortAnswer": shortAnswer,
                            "longAnswer": e.target.value,
                            "code": code,
                            "ratingImportance": importance,
                            "ratingRepeat": repeat
                        })
                    }} />
                <Form.Text>
                    详细分析
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label>Code</Form.Label>
                <Form.Control
                    as="textarea"
                    type="text"
                    rows={10}
                    value={code}
                    onChange={e => {
                        setCode(e.target.value);
                        setSolution({
                            "uid": user.googleId,
                            "username": user.name,
                            "leetcode_id": problem.leetcode_id,
                            "shortAnswer": shortAnswer,
                            "longAnswer": longAnswer,
                            "code": e.target.value,
                            "ratingImportance": importance,
                            "ratingRepeat": repeat
                        })
                    }} />
                <Form.Text>
                    代码
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label>评分： 是否重要</Form.Label>
                <Form.Control
                    type="text"
                    value={importance}
                    onChange={e => {
                        setImportance(e.target.value);
                        setSolution({
                            "uid": user.googleId,
                            "username": user.name,
                            "leetcode_id": problem.leetcode_id,
                            "shortAnswer": shortAnswer,
                            "longAnswer": longAnswer,
                            "code": code,
                            "ratingImportance": e.target.value,
                            "ratingRepeat": repeat
                        })
                    }} />
                <Form.Text>
                    1-5 越高越重要
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label>评分： 是否建议多刷</Form.Label>
                <Form.Control
                    type="text"
                    value={repeat}
                    onChange={e => {
                        setRepeat(e.target.value);
                        setSolution({
                            "uid": user.googleId,
                            "username": user.name,
                            "leetcode_id": problem.leetcode_id,
                            "shortAnswer": shortAnswer,
                            "longAnswer": longAnswer,
                            "code": code,
                            "ratingImportance": importance,
                            "ratingRepeat": e.target.value
                        })
                    }} />
                <Form.Text>
                    1-5 越高越容易错
                </Form.Text>
            </Form.Group>

            <Button variant="primary" type="submit" onClick={sendData}>
                Submit
            </Button>

        </Form>
    )

}

export default AddSolution;