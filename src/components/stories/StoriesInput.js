"use client";

import React from "react";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import { Card, CardBody } from "reactstrap";
const CreateStory = () => {
    return (
        <Link href="#" className="text-decoration-none">
            <Card className="border-0 mb-3 shadow-sm">
                <CardBody>
                    <div className="d-flex align-items-center gap-3">
                        <div
                            className="d-flex align-items-center justify-content-center bg-light rounded-circle"
                            style={{ width: "40px", height: "40px" }}
                        >
                            <FaPlus className="text-primary" />
                        </div>
                        <div>
                            <h6 className="mb-0 text-dark">Create story</h6>
                            <small className="text-muted">
                                Share a photo or write something.
                            </small>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </Link>
    );
};

export default CreateStory;