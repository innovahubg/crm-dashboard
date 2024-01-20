import React from "react";

import { Container } from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

const Automation = () => {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Inicio" breadcrumbItem="Automatización" />
        </Container>
        Automatización
      </div>
    </React.Fragment>
  );
};

export default Automation;
