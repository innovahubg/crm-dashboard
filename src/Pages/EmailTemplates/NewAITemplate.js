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
const NewAITemplate = () => {
  const [prompt, setPrompt] = useState(
    "Un website de invitacion para un evento de venta de lotes residenciales en Merida Yucatan Mexico, el dia 10 de Febrero a las 12:00."
  );

  const [htmlPrompt, setHtmlPrompt] = useState("");

  const generateTemplateHtml = async () => {
    console.log({
      prompt,
      brand: {},
    });
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

    setHtmlPrompt(data.data);
    console.log(data);
  };

  return (
    <div className="page-content">
      <Container fluid={true}>
        <Breadcrumbs title="IHubG" breadcrumbItem="Email templates" />
        <Row className="mb-4">
          <div className="my-6">
            <span>Define tu idea y nuestra IA te generará un template:</span>
            <textarea
              className="w-100"
              onChange={(e) => setPrompt(e.target.value)}
              value={prompt}
              rows="6"
            ></textarea>

            <iframe
              name="frame"
              title="frame"
              srcDoc={htmlPrompt}
              className="w-100"
            ></iframe>

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
        <Row></Row>
      </Container>
    </div>
  );
};

export default NewAITemplate;
