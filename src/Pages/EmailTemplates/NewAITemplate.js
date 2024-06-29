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
import { RingLoader } from "react-spinners";
import { PostData } from "../../services/api";
import Builder from "../../components/Builder";
import { useNavigate } from "react-router-dom";
const NewAITemplate = () => {
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState(
    "Un website de invitacion para un evento de venta de lotes residenciales en Merida Yucatan Mexico, el dia 10 de Febrero a las 12:00."
  );
  const [html, setHTML] = useState("");
  const navigate = useNavigate();

  const generateTemplateHtml = async () => {
    try {
      setLoading(true);

      const data = await PostData("/generate-template-email", {
        prompt: prompt + " solo envia el codigo HTML",
        brand: {
          logoUrl: "https://cdn.arcemunoz.tech/assets/arcemunoz.png",
          logoWith: "250px",
          personalBrand: "Arce Muñoz | Líder Digital",
          contact: {
            email: "hola@arcemunoz.tech",
            whatsapp: {
              link: "https://api.whatsapp.com/send/?phone=522291171708&text=Hola+Arce!",
              logoImage:
                "https://upload.wikimedia.org/wikipedia/commons/7/75/Whatsapp_logo_svg.png",
            },
            instagram: {
              link: "https://www.instagram.com/arcemunoz_tech",
              logoImage:
                "https://freelogopng.com/images/all_img/1658586823instagram-logo-transparent.png",
            },
          },
          brandingColors: {
            color1: "#ffffff",
            color2: "#000000",
          },
        },
      });

      setHTML(data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTemplate = async () => {
    // console.log(html);
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

      const { status } = await PostData("/templates", {
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
    } catch (err) { }
  };

  return (
    <div className="page-content">
      <Container fluid={true}>
        <Breadcrumbs title="IHubG" breadcrumbItem="Email templates" />
        {!loading && html === "" && (
          <Row className="mb-4">
            <div className="my-6">
              <h3>Define tu idea y nuestra IA te generará un template:</h3>
              <textarea
                className="w-100"
                onChange={(e) => setPrompt(e.target.value)}
                value={prompt}
                rows="6"
              ></textarea>
              <button
                className="btn btn-success"
                onClick={(e) => {
                  e.preventDefault();
                  generateTemplateHtml();
                }}
              >
                Generar template
              </button>
            </div>
          </Row>
        )}

        {loading && (
          <div className="d-flex justify-content-center p-5 w-full">
            <RingLoader color="#E9553E" />
          </div>
        )}

        {!loading && html !== "" && (
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
        )}
      </Container>
    </div>
  );
};

export default NewAITemplate;
