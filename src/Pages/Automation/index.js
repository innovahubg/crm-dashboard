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


const Automation = () => {

  const [modal, setModal] = useState(false)
  const [type, setType] = useState("")
  const [details, setDetails] = useState({})
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await GetData("/contact-lists");
      setData(data);
      console.log({ data });
      setLoading(false);
    };
    fetchData();
  }, []);

  const columns = [
    {
      name: <span className="font-weight-bold fs-13">Nombre</span>,
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Compañia</span>,
      selector: (row) => row.companyId,
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
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Inicio" breadcrumbItem="Automatización" />
        </Container>

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
                  data={data}
                  columns={columns}
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
                  data={data}
                  columns={columns}
                  noDataComponent={<span className="py-4">Sin resultados</span>}
                />
              )}
            </Row>
          </TabPanel>
          <TabPanel>
            <CalendarComponent setModal={setModal} setType={setType} setDetails={setDetails} />
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
      </div>
    </React.Fragment>
  );
};

export default Automation;
