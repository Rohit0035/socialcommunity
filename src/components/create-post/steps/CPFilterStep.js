"use client";

import {
  Row,
  Col,
  Button,
} from "reactstrap";

import filters from "../data/filters";

const CPFilterStep = ({
  media,
  selectedFilter,
  setSelectedFilter,
  prevStep,
  nextStep,
}) => {
  return (
    <div className="cp-filter-wrapper">

      <div className="cp-filter-header">

        <Button
          color="link"
          onClick={prevStep}
          className="text-decoration-none"
        >
          Back
        </Button>

        <h5>Edit</h5>

        <Button
          color="link"
          onClick={nextStep}
          className="text-decoration-none"
        >
          Next
        </Button>

      </div>

      <Row className="g-0">

        <Col lg="7">

          <div className="cp-left-panel">

            <img
              src={media.preview}
              alt=""
              className="cp-filter-preview"
              style={{
                filter: selectedFilter,
              }}
            />

          </div>

        </Col>

        <Col lg="5">

          <div className="cp-filter-grid">

            {filters.map((item, index) => (
              <div
                key={index}
                className="cp-filter-item"
                onClick={() =>
                  setSelectedFilter(item.filter)
                }
              >

                <img
                  src={media.preview}
                  alt=""
                  style={{
                    filter: item.filter,
                  }}
                />

                <span>
                  {item.name}
                </span>

              </div>
            ))}

          </div>

        </Col>

      </Row>

    </div>
  );
};

export default CPFilterStep;