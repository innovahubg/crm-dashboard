import React, { useState, useEffect } from "react";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import CalendarComponent from "./CalendarComponent";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { GetData } from "../../services/api";
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
import { RingLoader } from "react-spinners";
import DataTable from "react-data-table-component";
import moment from "moment"


const Automation = () => {

  const [modal, setModal] = useState(false)
  const [newModal, setNewModal] = useState(false)
  const [newAuto, setNewAuto] = useState({})
  const [type, setType] = useState("")
  const [details, setDetails] = useState({})
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [templates, setTemplates] = useState([])
  const [automations, setAutomations] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await GetData("/contact-lists");
      setData(data);
      console.log({ data });
      setLoading(false);
    };
    fetchData();
  }, []);

  const getTemplates = async () => {
    console.log(`/templates/${newAuto.send}`)
    const { data } = await GetData(`/templates/${newAuto.send}`);
    setTemplates(data)
    console.log(data)
  }


  const getAutomations = async (idContactList) => {
    const { data } = await GetData(`/automation/${idContactList}`);
    console.log(data)
    setAutomations(data)
  }

  const columnsRegistered = [
    {
      name: <span className="font-weight-bold fs-13">Envio</span>,
      selector: (row) => <span>{row.send}</span>,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">From</span>,
      selector: (row) => row.from,
    },
    {
      name: <span className="font-weight-bold fs-13">Template</span>,
      selector: (row) => row.template,
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


  const columnsScheduled = [
    {
      name: <span className="font-weight-bold fs-13">Nombre</span>,
      selector: (row) => <span>{row.name}</span>,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Tipo</span>,
      selector: (row) => row.send,
    },
    {
      name: <span className="font-weight-bold fs-13">Ejecutar el</span>,
      selector: (row) => {
        const { run } = row

        const { day, hour, minute, month, year } = run

        const realDate = new Date(year, month, day, hour, minute)

        return moment(realDate).format("DD/MM/YYYY HH:mm")
      },
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
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Inicio" breadcrumbItem="Automatización" />
        </Container>

        <Row className="g-4 mb-3">
          <Col className="col-sm-auto">
            <div className="d-flex gap-1 justify-content-end">
              <Button
                color="success"
                className="add-btn"
                onClick={() => {
                  setNewModal(true)
                }}
                id="create-btn"
              >
                <i className="ri-add-line align-bottom me-1"></i> Nueva Automatización
              </Button>
              {/* <Button color="soft-danger"
                                                    onClick="deleteMultiple()"
                                                    ><i className="ri-delete-bin-2-line"></i></Button> */}
            </div>
          </Col>

          <Row className="g-4 mb-3">
            <Col className="col-sm-auto">
              <div className="d-flex gap-1 justify-content-end">
                <div className="mb-3">
                  <label htmlFor="titlebot-field" className="form-label">
                    Campaña
                  </label>
                  <div className="d-flex">
                    <select className="form-control" onChange={(e) => getAutomations(e.target.value)}>
                      {
                        data.map(({ id, name }) => <option value={id} key={id}>{name}</option>)
                      }
                    </select>
                    <span className="mx-4">{automations.status === "Activated" ? (<span> Activo </span>) : (<span> Desactivo </span>)}</span>
                  </div>
                </div>
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

        </Row>

        <Tabs>
          <TabList>
            <Tab>Registro</Tab>
            <Tab>Agendados</Tab>
            <Tab>Calendario</Tab>
          </TabList>

          <TabPanel>
            <Row className="mb-4">
              {loading ? (
                <div className="d-flex justify-content-center p-5 w-full">
                  <RingLoader color="#E9553E" />
                </div>
              ) : (
                <DataTable
                  data={automations.registered}
                  columns={columnsRegistered}
                  noDataComponent={<span className="py-4">Sin resultados</span>}
                />
              )}
            </Row>
          </TabPanel>
          <TabPanel>
            <Row className="mb-4">
              {loading ? (
                <div className="d-flex justify-content-center p-5 w-full">
                  <RingLoader color="#E9553E" />
                </div>
              ) : (
                <DataTable
                  data={automations.scheduled}
                  columns={columnsScheduled}
                  noDataComponent={<span className="py-4">Sin resultados</span>}
                />
              )}
            </Row>
          </TabPanel>
          <TabPanel>
            <CalendarComponent setModal={setModal} setType={setType} setDetails={setDetails} events={automations.scheduled} />
          </TabPanel>
        </Tabs>


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
            {type === "new" && <>Nuevo evento</>}
            {type === "details" && <>Detalles</>}

          </ModalHeader>
          <form className="tablelist-form">
            <ModalBody style={{ height: "auto" }}>
              {
                type === "new" && (<div className="mb-3">
                  <label htmlFor="titlebot-field" className="form-label">
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="titlebot-field"
                    className="form-control"
                    placeholder="Ingresa un nombre a tu evento"
                    required
                    value={""}
                    onChange={(e) =>
                      console.log({})
                    }
                  />
                </div>)
              }

              {
                type === "details" && (<div className="mb-3">
                  <h4 htmlFor="titlebot-field" className="form-label">
                    Titulo: {details.title}
                  </h4>

                </div>)
              }

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
                <button
                  onClick={() => { }}
                  className="btn btn-success"
                  id="add-btn"
                >
                  Crear
                </button>
              </div>
            </ModalFooter>
          </form>
        </Modal>

        <Modal
          isOpen={newModal}
          toggle={() => {
            setNewModal(false);
          }}
          centered
        >
          <ModalHeader
            className="bg-light p-3"
            id="exampleModalLabel"
            toggle={() => setNewModal(false)}
          >
            Nueva Automatización
          </ModalHeader>
          <form className="tablelist-form">
            <ModalBody style={{ height: "auto" }}>
              <div className="mb-3">
                <label htmlFor="titlebot-field" className="form-label">
                  Nombre
                </label>
                <input
                  type="text"
                  id="titlebot-field"
                  className="form-control"
                  placeholder="Ingresa un nombre de automatizacion"
                  required
                  value={""}
                  onChange={(e) =>
                    console.log({})
                  }
                />
              </div>

              <div className="mb-3">
                <label htmlFor="titlebot-field" className="form-label">
                  Campaña
                </label>
                <select className="form-control">
                  <option>crm_list</option>
                  <option>dev autoevaluacion</option>
                  <option>Marca Personal</option>
                  <option>Masterclass Desbloquea Potencial 2</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="titlebot-field" className="form-label">
                  Tipo
                </label>
                <div>
                  <button
                    type="button"
                    className={`btn w-50 mr-4 ${newAuto.type === "registered" ? "btn-success" : "btn-light"} `}
                    onClick={() => setNewAuto((data) => ({ ...data, type: "registered" }))}
                  >
                    Registro
                  </button>
                  <button
                    type="button"
                    className={`btn w-50 ${newAuto.type === "scheduled" ? "btn-success" : "btn-light"}`}
                    onClick={() => setNewAuto((data) => ({ ...data, type: "scheduled" }))}
                  >
                    Agendado
                  </button>
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="titlebot-field" className="form-label">
                  Enviar
                </label>
                <div>
                  <button
                    type="button"
                    className={`btn w-50 ${newAuto.send === "whatsapp" ? "btn-success" : "btn-light"} `}
                    onClick={() => {
                      setNewAuto((data) => ({ ...data, send: "whatsapp" }))
                    }}
                  >
                    <i className="mdi mdi-whatsapp align-bottom me-2 text-muted" /> Whatsapp
                  </button>
                  <button
                    type="button"
                    className={`btn w-50 ${newAuto.send === "email" ? "btn-success" : "btn-light"}`}
                    onClick={() => {
                      setNewAuto((data) => ({ ...data, send: "email" }))
                    }}
                  >
                    <i className="mdi mdi-email align-bottom me-2 text-muted" /> Email
                  </button>
                </div>
              </div>
              {
                templates && (
                  <div className="mb-3">
                    <label htmlFor="titlebot-field" className="form-label">
                      Templates
                    </label>
                    <select className="form-control">
                      <option>crm_list</option>
                      <option>dev autoevaluacion</option>
                      <option>Marca Personal</option>
                      <option>Masterclass Desbloquea Potencial 2</option>
                    </select>
                  </div>
                )
              }
              {
                newAuto.type === "scheduled" && (
                  <div className="mb-3">
                    <label htmlFor="titlebot-field" className="form-label">
                      Definir horario
                    </label>
                    <input
                      type="datetime-local"
                      id="titlebot-field"
                      className="form-control"
                      placeholder="Ingresa un nombre a tu evento"
                      required
                      value={""}
                      onChange={(e) =>
                        console.log({})
                      }
                    />
                  </div>
                )
              }






              {
                type === "details" && (<div className="mb-3">
                  <h4 htmlFor="titlebot-field" className="form-label">
                    Titulo: {details.title}
                  </h4>

                </div>)
              }

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
                <button
                  onClick={() => { }}
                  className="btn btn-success"
                  id="add-btn"
                >
                  Crear
                </button>
              </div>
            </ModalFooter>
          </form>
        </Modal>
      </div>
    </React.Fragment>
  );
};

export default Automation;
