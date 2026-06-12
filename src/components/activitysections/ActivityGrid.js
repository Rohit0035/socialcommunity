"use client";

import {
  Row,
  Col,
  Badge,
} from "reactstrap";

import { FiPlay } from "react-icons/fi";

const ActivityGrid = () => {

  const posts = [
    "https://images.unsplash.com/photo-1500648767791",
    "https://images.unsplash.com/photo-1494790108377",
    "https://images.unsplash.com/photo-1506794778202",
    "https://images.unsplash.com/photo-1438761681033",
    "https://images.unsplash.com/photo-1504593811423",
    "https://images.unsplash.com/photo-1500648767791",
  ];

  return (
    <Row className="g-1 mt-3">

      {posts.map((img, index) => (

        <Col
          xs="6"
          md="4"
          key={index}
        >

          <div className="position-relative">

            <img
              src={`${img}?w=600`}
              alt=""
              className="
                w-100
                rounded
              "
              style={{
                height: "260px",
                objectFit: "cover",
              }}
            />

            <Badge
              color="light"
              className="
                position-absolute
                top-0
                end-0
                m-2
              "
            >
              <FiPlay />
            </Badge>

          </div>

        </Col>

      ))}

    </Row>
  );
};

export default ActivityGrid;