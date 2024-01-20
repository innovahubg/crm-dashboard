import React, { useState } from "react";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  UncontrolledDropdown,
  Container,
  Row,
  Col,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Button,
} from "reactstrap";
import { PostData } from "../../services/api";
const NewTemplate = () => {
  return (
    <div className="page-content">
      <Container fluid={true}>
        <Breadcrumbs title="IHubG" breadcrumbItem="Email templates" />
        <Row className="mb-4">
          <div className="my-6">
            <span>Selecciona un template:</span>

            <button
              className="btn btn-success"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              Generar template
            </button>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default NewTemplate;
