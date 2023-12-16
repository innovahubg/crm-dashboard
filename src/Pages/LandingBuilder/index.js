import React from "react";
import { Container, Row } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import Builder from "./builder";

const LandingBuilder = () => {
  return (
    <div className="page-content">
      <Container fluid={true}>
        <Breadcrumbs title="IHubG" breadcrumbItem="Landings" />
        <Row className="mb-4">
          <Builder />
        </Row>
      </Container>
    </div>
  );
};

export default LandingBuilder;
