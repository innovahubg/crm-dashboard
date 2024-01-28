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
import Builder from "../../components/Builder";
import { useNavigate } from "react-router-dom";
const NewTemplate = () => {
  const [temp, setTemp] = useState(templates);
  const [tempSelected, setTempS] = useState(null);
  const [showBuilder, setShowBuilder] = useState(false);
  const [html, setHTML] = useState("");
  const navigate = useNavigate();

  const handleClick = (id) => {
    setTempS(id);
  };

  const handleCreateTemplate = async () => {
    try {
      console.log({ html });
      const { data } = await PostData("templates/escape-html", html, {
        headers: {
          "Content-Length": 0,
          "Content-Type": "text/plain",
        },
        responseType: "text",
      });
      const { name, subject, from } = JSON.parse(
        localStorage.getItem("newEmailTemplate")
      );

      const { status } = await PostData("templates", {
        type: "email",
        templateName: name,
        template: data,
        subject,
        from,
        params: {},
      });

      if (status === 200) {
        navigate("/email-templates");
      }
    } catch (err) {}
  };

  return (
    <div className="page-content">
      <Container fluid={true}>
        <Breadcrumbs title="IHubG" breadcrumbItem="Email templates" />
        <Row className="mb-4">
          {!showBuilder && (
            <div className="my-6">
              <div className="d-flex justify-content-between mb-4">
                <span>
                  Selecciona un template lo podrás editar en el siguiente paso:
                </span>
                <div className="">
                  <button
                    className={
                      "btn btn-success " + (!tempSelected && "disabled")
                    }
                    onClick={(e) => {
                      e.preventDefault();
                      setShowBuilder(true);
                      const html = templates.find(
                        (t) => t._id === tempSelected
                      );
                      setHTML(html.template);
                    }}
                  >
                    Siguiente paso
                  </button>
                </div>
              </div>

              <div className="w-100 d-flex align-items-center justify-content-around p-12">
                {temp.map(({ _id, preview }) => {
                  return (
                    <div
                      key={_id}
                      className="d-flex align-items-center justify-content-around"
                      onClick={() => handleClick(_id)}
                    >
                      <img
                        src={preview}
                        alt="template"
                        className={
                          "w-75 templateSelection " +
                          (tempSelected === _id ? "templateSelected" : "")
                        }
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {showBuilder && (
            <Row className="mb-4">
              <div className="d-flex justify-content-end mb-4">
                <button
                  className={"btn btn-success " + (!tempSelected && "disabled")}
                  onClick={(e) => {
                    e.preventDefault();
                    handleCreateTemplate();
                  }}
                >
                  Crear template
                </button>
              </div>
              <Builder html={html} setHTML={setHTML} />
            </Row>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default NewTemplate;
