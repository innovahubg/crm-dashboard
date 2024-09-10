import React, { useState, useEffect } from "react";
import Builder from "../../components/Builder";
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
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const NewBuilder = () => {
  const [modal, setModal] = useState(false);
  const [html, setHTML] = useState("");
  const navigate = useNavigate();

  const handleCreateTemplate = async () => {
    try {
      const { data } = await PostData("/templates/escape-html", html, {
        headers: {
          "Content-Length": 0,
          "Content-Type": "text/plain",
        },
        responseType: "text",
      });
      const { name, subject, from } = JSON.parse(
        localStorage.getItem("newEmailTemplate")
      );

      const params = {}

      if (data.includes("{{name}}")) {
        params['name'] = "string"
      }

      if (data.includes("{{lastName}}")) {
        params['lastName'] = "string"
      }

      if (data.includes("{{email}}")) {
        params['email'] = "string"
      }

      if (data.includes("{{phone}}")) {
        params['phone'] = "string"
      }

      console.log({ params })
      const { status } = await PostData("/templates", {
        type: "email",
        templateName: name,
        template: data,
        subject,
        from,
        params,
      });

      if (status === 200) {
        navigate("/email-templates");
      }
    } catch (err) { }
  };

  return (
    <div className="page-content">
      <Container fluid={true}>
        <Breadcrumbs title="IHubG" breadcrumbItem="Email templates" />
        <Row className="mb-4">
          <Row className="g-4 mb-3">
            <Col className="col-sm"></Col>
            <Col className="col-sm-auto">
              <div className="d-flex gap-1 justify-content-end">
                <Button
                  color="success"
                  className="add-btn"
                  onClick={() => {
                    handleCreateTemplate();
                  }}
                  id="create-btn"
                >
                  <i className="mdi mdi-content-save align-bottom me-1"></i>{" "}
                  Guardar
                </Button>
              </div>
            </Col>
          </Row>
          <Row className="mb-4">
            <Builder html={html} setHTML={setHTML} />
          </Row>
        </Row>
      </Container>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default NewBuilder;
