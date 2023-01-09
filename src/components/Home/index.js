import React from "react";
import Navigation from "../navigation";
import WhatsHappening from "../whats-happening";
import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Rank from "../rank/rank";
import PublicLeetcode from "../public_leetcode/publicLeetcode";
import SingleLeetcode from "../single_leetcode/singleLeetcode";
import AddNewLeetcode from "../LeetcodeProblem/addNewLeetcode";
import AddSolution from "../LeetcodeProblem/addSolution";
import { useState, useEffect } from "react";


function Home({ user }) {
    return (
        user && <HashRouter>
            <Row>
                <Col xs={2}>
                    <div className="left-column">
                        <Navigation uid={user.googleId} />
                    </div>
                </Col>
                <Col>
                    <div className="center-column">
                        <Routes>
                            <Route path="/rank" element={<Rank />} />
                            <Route path="/leetcodes/" element={<PublicLeetcode user={user} />} />
                            <Route path="/leetcodes/:lid" element={<SingleLeetcode user={user} />} />
                            <Route path="/leetcodes/addproblem" element={<AddNewLeetcode />} />
                            <Route path="/leetcodes/:lid/addsolution" element={<AddSolution user={user} />} />
                        </Routes>
                    </div>
                </Col>
                <Col xs={2}>
                    <div className="right-column">
                        <WhatsHappening />
                    </div>
                </Col>
            </Row>
        </HashRouter>
    );
}
export default Home; 