import React, { useState, useEffect } from "react";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  UncontrolledDropdown,
  Container,
  Row,
  Col,
  Button,
} from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { RingLoader } from "react-spinners";
import DataTable from "react-data-table-component";
import { GetData } from "../../services/api";
import { Link } from "react-router-dom";

const Leads = () => {
  const [loading, setLoading] = useState(false);
  return (
    <div className="page-content">
      <Container fluid={true}>
        <Breadcrumbs title="IHubG" breadcrumbItem="Leads" />
        <Row className="mb-4">
          <Row className="mb-4">
            {loading ? (
              <div className="d-flex justify-content-center p-5 w-full">
                <RingLoader color="#E9553E" />
              </div>
            ) : (
              <DataTable
                data={[]}
                columns={[]}
                noDataComponent={<span className="py-4">Sin resultados</span>}
              />
            )}
          </Row>
        </Row>
      </Container>
    </div>
  );
};

export default Leads;
