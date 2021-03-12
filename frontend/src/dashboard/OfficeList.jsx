import React from "react";
import OfficeIcon from "./OfficeIcon";
import { Container, Row, Col } from "react-bootstrap";

function OfficeList() {
  return (
    <>
      <Container style={{ marginTop: "1%" }}>
        <Row>
          <Col xs lg="4">
            <OfficeIcon />
          </Col>
          <Col xs lg="4">
            <OfficeIcon />
          </Col>
          <Col xs lg="4">
            <OfficeIcon />
          </Col>
          <Col xs lg="4">
            <OfficeIcon />
          </Col>
          <Col xs lg="4">
            <OfficeIcon />
          </Col>
          <Col xs lg="2">
            <OfficeIcon />
          </Col>
          <Col xs lg="4">
            <OfficeIcon />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default OfficeList;
