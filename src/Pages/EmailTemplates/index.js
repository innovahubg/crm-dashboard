import React, { useState, useEffect } from "react";
import moment from "moment";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { GetData, PostData } from "../../services/api";
import { RingLoader } from "react-spinners";
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
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";

const EmailTemplates = () => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [newTemplate, setNewTemplate] = useState({
    name: "IA",
    type: "",
  });

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

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await GetData("/templates/email");
      setTemplates(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    console.log(newTemplate);
  }, [newTemplate]);
  const columns = [
    {
      name: (
        <Input
          className="form-check-input fs-15"
          type="checkbox"
          name="checkAll"
          value="option1"
        />
      ),
      cell: () => (
        <input
          className="form-check-input fs-15"
          type="checkbox"
          name="checkAll"
          value="option1"
        />
      ),
    },
    {
      name: <span className="font-weight-bold fs-13">Nombre</span>,
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Creado</span>,
      selector: (row) => moment(row.createdAt).format("DD/MM/YYYY HH:mm"),
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Acción</span>,
      sortable: true,

      cell: (data) => {
        return (
          <UncontrolledDropdown className="dropdown d-inline-block">
            <DropdownToggle
              className="btn btn-soft-secondary btn-sm"
              tag="button"
            >
              <i className="ri-more-fill align-middle"></i>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-end">
              <DropdownItem>
                <Link to={`/campaigns/${data.id}`} className="text-muted">
                  <i className="ri-eye-fill align-bottom me-2 text-muted"></i>
                  Detalle {data.name}
                </Link>
              </DropdownItem>
              <DropdownItem className="edit-item-btn">
                <i className="ri-pencil-fill align-bottom me-2 text-muted"></i>
                Edit
              </DropdownItem>
              <DropdownItem className="remove-item-btn">
                {" "}
                <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i>{" "}
                Delete{" "}
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        );
      },
    },
  ];
  return (
    <div className="page-content">
      <Container fluid={true}>
        <Breadcrumbs title="IHubG" breadcrumbItem="Email templates" />
        <Row className="mb-4">
          <Row className="g-4 mb-3">
            <Col className="col-sm-auto">
              <div className="d-flex gap-1 justify-content-end">
                <Button
                  color="success"
                  className="add-btn"
                  onClick={() => {
                    setModal(true);
                  }}
                  id="create-btn"
                >
                  <i className="ri-add-line align-bottom me-1"></i> Nuevo
                  template
                </Button>
                {/* <Button color="soft-danger"
                                                    onClick="deleteMultiple()"
                                                    ><i className="ri-delete-bin-2-line"></i></Button> */}
              </div>
            </Col>
            <Col className="col-sm">
              <div className="d-flex justify-content-sm-end">
                <div className="search-box ms-2">
                  <input
                    type="text"
                    className="form-control search"
                    placeholder="Buscar..."
                  />
                  <i className="ri-search-line search-icon"></i>
                </div>
              </div>
            </Col>
          </Row>
          <Row className="mb-4">
            {loading ? (
              <div className="d-flex justify-content-center p-5 w-full">
                <RingLoader color="#E9553E" />
              </div>
            ) : (
              <DataTable
                data={templates}
                columns={columns}
                noDataComponent={<span className="py-4">Sin resultados</span>}
              />
            )}
          </Row>
        </Row>
      </Container>
      <Modal
        isOpen={modal}
        toggle={() => {
          setModal(false);
        }}
        centered
      >
        <ModalHeader
          className="bg-light p-3"
          id="exampleModalLabel"
          toggle={() => setModal(false)}
        >
          Nuevo template
        </ModalHeader>
        <form className="tablelist-form">
          <ModalBody style={{ height: "40vh" }}>
            <div className="mb-3">
              <label htmlFor="titlebot-field" className="form-label">
                Nombre
              </label>
              <input
                type="text"
                id="titlebot-field"
                className="form-control"
                placeholder="Ingresa un nombre a tu template"
                required
                value={newTemplate.name}
                onChange={(e) =>
                  setNewTemplate({ ...newTemplate, name: e.target.value })
                }
              />
            </div>

            <div className="">
              <label htmlFor="typeChannel-field" className="form-label">
                Crear con:
              </label>
              <div className="d-flex justify-content-around">
                <div
                  className={`d-flex flex-column justify-content-center align-items-center optionHover ${
                    newTemplate.type === "IA" && "optionSelected"
                  }`}
                  onClick={() => setNewTemplate({ ...newTemplate, type: "IA" })}
                >
                  <i className="mdi mdi-robot"></i>
                  <span>IA</span>
                </div>
                <div
                  className={`d-flex flex-column justify-content-center align-items-center optionHover ${
                    newTemplate.type === "Template" && "optionSelected"
                  }`}
                  onClick={() =>
                    setNewTemplate({ ...newTemplate, type: "Template" })
                  }
                >
                  <i className="mdi mdi-ballot"></i>
                  <span>Template</span>
                </div>
                <div
                  className={`d-flex flex-column justify-content-center align-items-center optionHover ${
                    newTemplate.type === "Code" && "optionSelected"
                  }`}
                  onClick={() =>
                    setNewTemplate({ ...newTemplate, type: "Code" })
                  }
                >
                  <i className="bx bx-code"></i>
                  <span>Código</span>
                </div>
              </div>
            </div>
            {newTemplate.type === "IA" && (
              <div className="my-6">
                <span>
                  Define tu idea y nuestra IA te generará un template:
                </span>
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
            )}
          </ModalBody>
          <ModalFooter>
            <div className="">
              <button
                type="button"
                className="btn btn-light mx-4"
                onClick={() => setModal(false)}
              >
                Cerrar
              </button>
              <button type="submit" className="btn btn-success" id="add-btn">
                Crear
              </button>
            </div>
          </ModalFooter>
        </form>
      </Modal>
    </div>
  );
};

export default EmailTemplates;
