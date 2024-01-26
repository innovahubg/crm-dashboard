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
import templates from "./templates.json";
const NewTemplate = () => {
  const [temp, setTemp] = useState(templates);
  const [tempSelected, setTempS] = useState(null);
  console.log(templates);
  return (
    <div className="page-content">
      <Container fluid={true}>
        <Breadcrumbs title="IHubG" breadcrumbItem="Email templates" />
        <Row className="mb-4">
          <div className="my-6">
            <span>
              Selecciona un template lo podrás editar en el siguiente paso:
            </span>
            <div className="w-100 d-flex align-items-center justify-content-around p-12">
              {temp.map(({ _id, preview }) => {
                return (
                  <div
                    key={_id}
                    className="d-flex align-items-center justify-content-around"
                  >
                    <img src={preview} alt="template" className="w-75" />
                  </div>
                );
              })}
            </div>
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
