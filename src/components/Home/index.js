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
import SingleJob from "../single_job/singleJob";
import PublicJob from "../public_job/publicJob";

function Home() {

    return (
        // <Container className="container" fluid='xl'>
        <HashRouter>
            <Row>
                <Col xs={2}>
                    <div className="left-column">
                        <Navigation />
                    </div>
                </Col>
                <Col>
                    <div className="center-column">
                        <Routes>
                            <Route path="/rank" element={<Rank />} />
                            <Route path="/leetcodes" element={<PublicLeetcode />} />
                            <Route path="/users/:uid/leetcodes/:lid" element={<SingleLeetcode />} />
                            <Route path="/jobs" element={<PublicJob/>} />
                            <Route path="/users/:uid/jobs/:jid" element={<SingleJob/>}/>
                            <Route path="/leetcodes/new" element={<AddNewLeetcode />} />
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
        // </Container >

    );
}
export default Home; 