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
import MyLeetcode from "../my_leetcode/myLeetcode";
import CreateJobs from "../jobs/CreateJobs";
import Jobs from "../jobs/Jobs";
import EditJobs from "../jobs/EditJobs";
import AddOA from "../oa/addOA";
import PublicOA from "../oa/publicOA";
import MyOA from "../oa/myOA";
import SolOA from "../oa/solOA";
import SolBQ from "../bq/solBQ";
import MyBQ from "../bq/myBQ";
import PublicBQ from "../bq/publicBQ";
import AddBQ from "../bq/addBQ";
import AddBQSol from "../bq/addBQSol";

function Home({ user }) {
    return (
        user && <HashRouter>
            <div className="all">
                <Row>
                    <Col xs={2}>
                        <div className="left-column">
                            <Navigation uid={user.googleId} />
                        </div>
                    </Col>
                    <Col>
                        <div className="center-column">
                            <Routes>
                                <Route path="/" element={<Jobs user={user} />} />
                                <Route path="/rank" element={<Rank />} />
                                <Route path="/leetcodes/" element={<PublicLeetcode user={user} />} />
                                <Route path="/myleetcodes" element={<MyLeetcode user={user} />} />
                                <Route path="/leetcodes/:lid" element={<SingleLeetcode user={user} />} />
                                <Route path="/leetcodes/addproblem" element={<AddNewLeetcode />} />
                                <Route path="/leetcodes/:lid/addsolution" element={<AddSolution user={user} />} />
                                <Route path="/jobs/new/" element={<CreateJobs user={user} />} />
                                <Route path="/jobs" element={<Jobs user={user} />} />
                                <Route path="/jobs/edit/:jid" element={<EditJobs user={user} />} />

                                <Route path="/oas/addoa" element={<AddOA />} />
                                <Route path="/oas/addoa/:lid" element={<AddOA />} />
                                <Route path="/oas/" element={<PublicOA user={user} />} />
                                <Route path="/myoa/" element={<MyOA user={user} />} />
                                <Route path="/oas/:lid" element={<SolOA user={user} />} />

                                <Route path="/bqs/addbq" element={<AddBQ />} />
                                <Route path="/bqs/addbq/:lid" element={<AddBQ />} />
                                <Route path="/bqs/" element={<PublicBQ user={user} />} />
                                <Route path="/mybq/" element={<MyBQ user={user} />} />
                                <Route path="/bqs/:lid" element={<SolBQ user={user} />} />
                                <Route path="/bqs/:lid/addsol" element={<AddBQSol user={user} />} />
                            </Routes>
                        </div>
                    </Col>
                    {/* <Col xs={2}>
                        <div className="right-column">
                            <WhatsHappening />
                        </div>
                    </Col> */}
                </Row>
            </div>
        </HashRouter>
    );
}
export default Home; 