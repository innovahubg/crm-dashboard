import React, { useState, useEffect, useId } from "react";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import CalendarComponent from "./CalendarComponent";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { GetData, PostData } from "../../services/api";
import { useNavigate } from "react-router-dom";
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
import moment from "moment";
import Swal from "sweetalert2";

const Automation = () => {
  const [modal, setModal] = useState(false);
  const [newModal, setNewModal] = useState(false);
  const [newAuto, setNewAuto] = useState({});
  const [type, setType] = useState("");
  const [details, setDetails] = useState({});
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [templates, setTemplates] = useState([]);
  const [automations, setAutomations] = useState([]);
  const [emailSenders, setEmailSenders] = useState([]);
  const [templateType, setTemplateType] = useState();
  const [idList, setIdList] = useState("")

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await GetData("/contact-lists");
      setData(data);
      console.log({ data })
      setLoading(false);
      if (data.length > 0) {
        getAutomations(data[0].id)
        setIdList(data[0].id)
        console.log(data[0].id)
        setNewAuto(() => ({ idLista: data[0].id }))
        console.log("IDLIST", data[0].id)
      }
    };
    fetchData();
  }, []);

  const getTemplates = async () => {
    // console.log(`/templates/${newAuto.send}`);
    const { data } = await GetData(`/templates/${templateType}`);
    setTemplates(data);
  };

  const getAutomations = async (idContactList) => {
    setIdList(idContactList)
    const { data } = await GetData(`/automation/${idContactList}`);
    setAutomations(data);
  };

  const getEmailSenders = async () => {
    const { data } = await GetData(`/email-senders`);
    setEmailSenders(data);
  };

  const columnsRegistered = [
    {
      name: <span className="font-weight-bold fs-13">Envio</span>,
      selector: (row) => <span>{row.send}</span>,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Name</span>,
      selector: (row) => row.name,
    },
    {
      name: <span className="font-weight-bold fs-13">Template</span>,
      selector: (row) => row.template,
    },
    {
      name: <span className="font-weight-bold fs-13">Acción</span>,
      sortable: true,

      cell: (data) => {
        console.log({ data })
        return (
          <UncontrolledDropdown className="dropdown d-inline-block z-99">
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
                Editar
              </DropdownItem>
              <DropdownItem className="remove-item-btn" onClick={() => handleDelete(data.template)}>
                {" "}
                <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i>{" "}
                Eliminar
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
        const { run } = row;

        const { day, hour, minute, month, year } = run;

        const realDate = new Date(year, month, day, hour, minute);

        return moment(realDate).format("DD/MM/YYYY HH:mm");
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

  useEffect(() => {
    console.log("newAuto", newAuto, data)
    if (templateType) {
      getTemplates();
    }
  }, [newAuto]);

  const handleCreate = async () => {
    Swal.fire({
      title: "¿Estás seguro de crear la automatización?",
      // text: "You won't be able to revert this!",
      icon: "check",
      showCancelButton: true,
      confirmButtonColor: "#09A363",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar"
    }).then(async (confirm) => {
      if (confirm.isConfirmed) {
        try {
          const scheduledObj = { ...newAuto };

          const typeAuto = newAuto.type === "registered" ? "register" : "schedule"

          const find = templates.find((t) => t.id === newAuto.template);
          scheduledObj["from"] = find?.["from"];



          if (newAuto.type === "scheduled") {
            const dates = newAuto.date.split("-");
            const day = dates[2].split("T")[0];
            const time = newAuto.date.split("T");
            const times = time[1].split(":");
            const run = {
              year: Number(dates[0]),
              month: Number(dates[1]),
              day: Number(day),
              hour: Number(times[0]),
              minute: Number(times[1]),
            };
            scheduledObj["run"] = run;
            scheduledObj["idLista"] = scheduledObj.idLista
          } else {
            scheduledObj["idAutomation"] = scheduledObj.idLista
            scheduledObj["registered"] = [{ ...newAuto }]
            scheduledObj["registered"][0]["params"] = { name: 'string' }
            scheduledObj["registered"][0]["from"] = find["from"]
          }

          const { status } = await PostData(`/automation/${typeAuto}`, scheduledObj);
          if (status === 200) {
            navigate("/automation");
          }
          Swal.fire({
            title: `Automatización creada`,
            icon: "success"
          });
          setNewModal(false)
        } catch (err) {
          console.log(err);
        }
      }
    })


  };


  const handleDelete = async (template) => {
    Swal.fire({
      title: "¿Estás seguro de eliminar la automatización?",
      // text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#09A363",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar"
    }).then(async (result) => {
      if (result.isConfirmed) {


        const cpRegistered = automations.registered || []

        console.log({ cpRegistered, automations })

        const index = cpRegistered.findIndex(r => r.template === template)

        cpRegistered.splice(index, 1)

        console.log({ cpRegistered, automations })
        const { status } = await PostData(`/automation/register`, { ...automations, idAutomation: automations.id });
        if (status === 200) {
          navigate("/automation");
        }

        Swal.fire({
          title: "Eliminado!",
          text: "La automatización ha sido eliminada",
          icon: "success"
        });



      }
    });
  }


  const handleCreateCalendar = async () => {
    const confirm = Swal.fire({
      title: "¿Estás seguro de crear la automatización?",
      // text: "You won't be able to revert this!",
      icon: "check",
      showCancelButton: true,
      confirmButtonColor: "#09A363",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar"
    })
      (async () => {
        if (confirm.isConfirmed) {
          try {
            const scheduledObj = { ...newAuto };

            const typeAuto = newAuto.type === "registered" ? "register" : "schedule"

            const find = templates.find((t) => t.id === newAuto.template);
            scheduledObj["from"] = find["from"];

            if (newAuto.type === "scheduled") {
              const dates = newAuto.date.split("-");
              const day = dates[2].split("T")[0];
              const time = newAuto.date.split("T");
              const times = time[1].split(":");
              const run = {
                year: Number(dates[0]),
                month: Number(dates[1]),
                day: Number(day),
                hour: Number(times[0]),
                minute: Number(times[1]),
              };
              scheduledObj["run"] = run;
            } else {
              scheduledObj["idAutomation"] = idList
              scheduledObj["registered"] = [{ ...newAuto }]
              scheduledObj["registered"][0]["params"] = { name: 'string' }
              scheduledObj["registered"][0]["from"] = find["from"]
            }
            // console.log(scheduledObj);
            // console.log({ typeAuto })
            console.log(scheduledObj)

            const { status } = await PostData(`/automation/${typeAuto}`, scheduledObj);
            if (status === 200) {
              navigate("/automation");
            }
            Swal.fire({
              title: `Automatización creada`,
              icon: "success"
            });
            setNewModal(false)
          } catch (err) {
            console.log(err);
          }
        }
      });
  }

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
                  setNewModal(true);
                }}
                id="create-btn"
              >
                <i className="ri-add-line align-bottom me-1"></i> Nueva
                Automatización
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
                    Listas de contacto
                  </label>
                  <div className="d-flex">
                    <select
                      className="form-control"
                      onChange={(e) => getAutomations(e.target.value)}
                    >
                      {data.map(({ id, name }) => (
                        <option value={id} key={id}>
                          {name}
                        </option>
                      ))}
                    </select>
                    <span className="mx-4">
                      {automations?.status === "Activated" ? (
                        <span> Activo </span>
                      ) : (
                        <span> Desactivado </span>
                      )}
                    </span>
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
                  data={automations?.registered ? automations?.registered : []}
                  columns={columnsRegistered}
                  noDataComponent={<span className="py-4">Sin resultados</span>}
                  className="dataTableHeight"
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
                  className="dataTableHeight"
                />
              )}
            </Row>
          </TabPanel>
          <TabPanel>
            <CalendarComponent
              setModal={setModal}
              setType={setType}
              setDetails={setDetails}
              events={automations.scheduled}
              idLista={newAuto.idLista}
            />
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
              {type === "new" && (
                <>
                  <div className="mb-3">
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
                      onChange={(e) => console.log({})}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="titlebot-field" className="form-label">
                      Nombre
                    </label>
                    <input
                      type="time"
                      id="titlebot-field"
                      className="form-control"
                      required
                      value={""}
                      onChange={(e) => console.log(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="titlebot-field" className="form-label">
                      Campaña
                    </label>
                    <select
                      className="form-control"
                      onChange={(e) => {
                        setNewAuto((data) => ({ ...data, idLista: e.target.value }))
                        setIdList(e.target.value)
                      }
                      }

                    >
                      {data.map(({ id, name }) => {

                        if (idList === id) {
                          return <option value={id} key={id} selected>
                            {name}
                          </option>
                        } else {
                          return <option value={id} key={id}>
                            {name}
                          </option>
                        }
                      })}
                    </select>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="titlebot-field" className="form-label">
                      Enviar
                    </label>
                    <div>
                      <button
                        type="button"
                        className={`btn w-50 ${newAuto.send === "whatsapp" ? "btn-success" : "btn-light"
                          } `}
                        onClick={() => {
                          setNewAuto((data) => ({ ...data, send: "whatsapp" }));
                          setTemplateType("whatsapp");
                        }}
                      >
                        <i className="mdi mdi-whatsapp align-bottom me-2 text-muted" />{" "}
                        Whatsapp
                      </button>
                      <button
                        type="button"
                        className={`btn w-50 ${newAuto.send === "email" ? "btn-success" : "btn-light"
                          }`}
                        onClick={() => {
                          setNewAuto((data) => ({ ...data, send: "email" }));
                          setTemplateType("email");
                        }}
                      >
                        <i className="mdi mdi-email align-bottom me-2 text-muted" />{" "}
                        Email
                      </button>
                    </div>
                  </div>
                  {templates && (
                    <div className="mb-3">
                      <label htmlFor="titlebot-field" className="form-label">
                        Templates
                      </label>
                      <select
                        className="form-control"
                        onChange={(e) =>
                          setNewAuto((data) => ({
                            ...data,
                            template: e.target.value,
                          }))
                        }
                      >
                        {templates.map(({ id, name }) => (
                          <option value={id} key={id}>
                            {name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </>
              )}

              {type === "details" && (
                <div className="mb-3">
                  <h4 htmlFor="titlebot-field" className="form-label">
                    Titulo: {details.name}
                  </h4>
                  <h6 htmlFor="titlebot-field" className="form-label">
                    Tipo: {details.type}
                  </h6>
                  <h6 htmlFor="titlebot-field" className="form-label">
                    Fecha: {details.date}
                  </h6>
                  <h6 htmlFor="titlebot-field" className="form-label">
                    Enviado por: {details.from}
                  </h6>
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
                {type != "details" && (

                  <button
                    onClick={() => { }}
                    className="btn btn-success"
                    id="add-btn"
                  >
                    Crear
                  </button>
                )}
              </div>
            </ModalFooter>
          </form>
        </Modal>

        <Modal
          isOpen={newModal}
          centered
        >
          <ModalHeader
            className="bg-light p-3"
            id="exampleModalLabel"
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
                  value={newAuto.name}
                  onChange={(e) =>
                    setNewAuto((data) => ({ ...data, name: e.target.value }))
                  }
                />
              </div>

              <div className="mb-3">
                <label htmlFor="titlebot-field" className="form-label">
                  Lista de contacto
                </label>
                <select
                  className="form-control"
                  onChange={(e) =>
                    setNewAuto((data) => ({ ...data, idLista: e.target.value }))
                  }
                >
                  {data.map(({ id, name }) => (
                    <option value={id} key={id}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="titlebot-field" className="form-label">
                  Tipo
                </label>
                <div>
                  <button
                    type="button"
                    className={`btn w-50 mr-4 ${newAuto.type === "registered"
                      ? "btn-success"
                      : "btn-light"
                      } `}
                    onClick={() =>
                      setNewAuto((data) => ({ ...data, type: "registered" }))
                    }
                  >
                    Registro
                  </button>
                  <button
                    type="button"
                    className={`btn w-50 ${newAuto.type === "scheduled" ? "btn-success" : "btn-light"
                      }`}
                    onClick={() =>
                      setNewAuto((data) => ({ ...data, type: "scheduled" }))
                    }
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
                    className={`btn w-50 ${newAuto.send === "whatsapp" ? "btn-success" : "btn-light"
                      } `}
                    onClick={() => {
                      setNewAuto((data) => ({ ...data, send: "whatsapp" }));
                      setTemplateType("whatsapp");
                    }}
                  >
                    <i className="mdi mdi-whatsapp align-bottom me-2 text-muted" />{" "}
                    Whatsapp
                  </button>
                  <button
                    type="button"
                    className={`btn w-50 ${newAuto.send === "email" ? "btn-success" : "btn-light"
                      }`}
                    onClick={() => {
                      setNewAuto((data) => ({ ...data, send: "email" }));
                      setTemplateType("email");
                    }}
                  >
                    <i className="mdi mdi-email align-bottom me-2 text-muted" />{" "}
                    Email
                  </button>
                </div>
              </div>
              {templates && (
                <div className="mb-3">
                  <label htmlFor="titlebot-field" className="form-label">
                    Templates
                  </label>
                  <select
                    className="form-control"
                    onChange={(e) =>
                      setNewAuto((data) => ({
                        ...data,
                        template: e.target.value,
                      }))
                    }
                  >
                    {templates.map(({ id, name }) => (
                      <option value={id} key={id}>
                        {name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              {newAuto.type === "scheduled" && (
                <>
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
                      value={newAuto.date}
                      onChange={(e) =>
                        setNewAuto((data) => ({
                          ...data,
                          date: e.target.value,
                        }))
                      }
                    />
                  </div>
                </>
              )}

              {type === "details" && (
                <div className="mb-3">
                  <h4 htmlFor="titlebot-field" className="form-label">
                    Titulo: {details.title}
                  </h4>
                </div>
              )}
            </ModalBody>
            <ModalFooter>
              <div className="">
                <button
                  type="button"
                  className="btn btn-light mx-4"
                  onClick={() => {
                    setModal(false)
                    setNewModal(false)
                  }}
                >
                  Cerrar
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleCreate();
                  }}
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
