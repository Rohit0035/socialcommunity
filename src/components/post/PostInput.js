"use client";

import React from "react";
import Link from "next/link";
import { Card, CardBody, Input } from "reactstrap";
import { FaVideo, FaImage, FaSmile, FaUserCircle } from "react-icons/fa";

const PostInput = () => {
    return (
        <>
            <Card className="mb-3 border-0 shadow-sm">
                <CardBody>
                    <div className="d-flex align-items-center rounded gap-2">
                        <FaUserCircle size={50} className="text-secondary" />
                        <Input
                            type="text"
                            placeholder="What's on your mind, John?"
                            className="rounded-pill bg-light border-0 flex-grow-1"
                        />
                        <div className="d-flex align-items-center gap-3 px-2">
                            <Link href="#">
                                <FaVideo size={20} className="text-danger" />
                            </Link>
                            <Link href="#">
                                <FaImage size={20} className="text-success" />
                            </Link>
                            <Link href="#">
                                <FaSmile size={20} className="text-warning" />
                            </Link>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </>

    );
};

export default PostInput;