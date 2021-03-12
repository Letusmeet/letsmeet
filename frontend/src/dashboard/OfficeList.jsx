import React from "react";
import OfficeIcon from "./OfficeIcon";
import { Container, Row, Col } from "react-bootstrap";
import SaveIcon from "@material-ui/icons/Save";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

function OfficeList() {
  return (
    <>
      <Container style={{ marginTop: "1%" }}>
        <div className="shadow-sm p-3 mb-5 bg-body rounded">Add New</div>
        <Row>
          <Col xs="12" lg="4">
            <div className="shadow  mb-2 bg-body rounded">
              <OfficeIcon />
            </div>
          </Col>
          <Col xs lg="4">
            <div className="shadow  mb-2 bg-body rounded">
              <OfficeIcon />
            </div>
          </Col>
          <Col xs lg="4">
            <div className="shadow  mb-2 bg-body rounded">
              <OfficeIcon />
            </div>
          </Col>
          <Col xs lg="4">
            <div className="shadow  mb-2 bg-body rounded">
              <OfficeIcon />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default OfficeList;
