import React from "react";
import OfficeIcon from "./OfficeIcon";
import { Container, Row, Col } from "react-bootstrap";
import SaveIcon from "@material-ui/icons/Save";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import axios from "axios";

function OfficeList() {
  const [officeListArray, setOfficeListArray] = React.useState();

  //get post list
  React.useEffect(() => {
    axios
      .get(`boards/${window.localStorage.getItem("id")}`)
      .then((response) => {
        if (response.status == 200) {
          const arr = response.data;
          setOfficeListArray(arr);
        } else {
          console.log(response);
          //error message
        }
      })
      .catch((err) => {
        //invalid
      });
  }, []);
  console.log(officeListArray);
  return (
    <>
      <Container style={{ marginTop: "1%" }}>
        <div className="shadow-sm p-3 mb-5 bg-body rounded">Add New</div>
        <Row>
          {officeListArray.map((office) => (
            <Col key={office.id} xs="12" lg="4">
              <div className="shadow  mb-2 bg-body rounded">
                <OfficeIcon office={office} />
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default OfficeList;
