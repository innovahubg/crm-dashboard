import React, { useState, useEffect } from "react";
import moment from "moment";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  UncontrolledDropdown,
  Container,
  Row,
  Col,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { RingLoader } from "react-spinners";
import DataTable from "react-data-table-component";
import { GetData } from "../../services/api";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

import ReactPaginate from 'react-paginate';


const Leads = () => {
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [leads, setLeads] = useState([]);
  const [newModal, setNewModal] = useState(false);
  const [newAuto, setNewAuto] = useState({});
  const [type, setType] = useState("");
  const [details, setDetails] = useState({});
  const [data, setData] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [automations, setAutomations] = useState([]);
  const [emailSenders, setEmailSenders] = useState([]);
  const [templateType, setTemplateType] = useState();

  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10
  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = leads.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(leads.length / itemsPerPage);


  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % leads.length;
    // console.log(
    //     `User requested page number ${event.selected}, which is offset ${newOffset}`
    // );
    setItemOffset(newOffset);
  };

  const columns = [
    {
      name: <span className="font-weight-bold fs-13">Nombre</span>,
      selector: (row) => <Link to={`/leads/${row.id}`} className="text-muted">{row.name}</Link>,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Apellidos</span>,
      selector: (row) => (row.lastName ? row.lastName : "-"),
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Email</span>,
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Teléfono</span>,
      selector: (row) => <a href={`tel:${row.phone}`}>{row.phone}</a>,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Creado</span>,
      selector: (row) => moment(row.createdAt).format("DD/MM/YYYY HH:mm"),
      sortable: true,
    }
  ];

  useEffect(() => {
    const fetchData = async () => {
      //limit = 10
      //offset = 0
      //createdBy
      //Checar calendario aendados automatizacion
      //Dashboard Numero de leads 
      //Dashboard Visitas de landing pages
      //Whatsapp Crear --> 

      const { data } = await GetData(`/customers`);
      const sorted = data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setLeads(sorted);
      setLoading(false);
    };
    fetchData();
  }, []);


  const handleCreate = async () => {

  }

  return (
    <div className="page-content">
      <Container fluid={true}>
        <Breadcrumbs title="IHubG" breadcrumbItem="Leads" />
        <Row className="g-4 mb-3 d-flex flex-row">
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
                <i className="ri-add-line align-bottom me-1"></i> Nuevo contacto
              </Button>
              {/* <Button color="soft-danger"
                                                    onClick="deleteMultiple()"
                                                    ><i className="ri-delete-bin-2-line"></i></Button> */}
            </div>
          </Col>
        </Row>
        <Row className="mb-4">
          <Row className="mb-4">
            {loading ? (
              <div className="d-flex justify-content-center p-5 w-full">
                <RingLoader color="#E9553E" />
              </div>
            ) : (
              <>
                <DataTable
                  data={currentItems}
                  columns={columns}
                  noDataComponent={<span className="py-4">Sin resultados</span>}
                />
                <ReactPaginate
                  breakLabel="..."
                  nextLabel="Sig. >"
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={10}
                  pageCount={pageCount}
                  previousLabel="< Ant."
                  renderOnZeroPageCount={null}
                  className='reactPaginate'
                  activeClassName="reactPaginate-active"
                />
              </>
            )}
          </Row>
        </Row>
      </Container>

      <Modal
        isOpen={newModal}
        centered
      >
        <ModalHeader
          className="bg-light p-3"
          id="exampleModalLabel"
        >
          Nuevo contacto
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
                placeholder="Ingresar nombre(s)"
                required
                value={newAuto.name}
                onChange={(e) =>
                  setNewAuto((data) => ({ ...data, name: e.target.value }))
                }
              />
            </div>

            <div className="mb-3">
              <label htmlFor="titlebot-field" className="form-label">
                Apellidos
              </label>
              <input
                type="text"
                id="titlebot-field"
                className="form-control"
                placeholder="Ingresar apellido(s)"
                required
                value={newAuto.name}
                onChange={(e) =>
                  setNewAuto((data) => ({ ...data, name: e.target.value }))
                }
              />
            </div>

            <div className="mb-3">
              <label htmlFor="titlebot-field" className="form-label">
                Número telefónico
              </label>
              <div className="d-flex flex-row">
                <select>
                  <option>MX +52</option>
                  <option>USA +1</option>
                  <option>Canada +1</option>
                  <option>Colombia +57</option>
                  <option>Argentina +54</option>
                  <option>Chile +56</option>
                </select>
                <input
                  type="text"
                  id="titlebot-field"
                  className="form-control"
                  placeholder="Ingresar número telefónico"
                  required
                  value={newAuto.name}
                  onChange={(e) =>
                    setNewAuto((data) => ({ ...data, name: e.target.value }))
                  }
                />
              </div>
            </div>


            <div className="mb-3">
              <label htmlFor="titlebot-field" className="form-label">
                Correo electrónico
              </label>
              <input
                type="email"
                id="titlebot-field"
                className="form-control"
                placeholder="Ingresar correo electrónico"
                required
                value={newAuto.name}
                onChange={(e) =>
                  setNewAuto((data) => ({ ...data, name: e.target.value }))
                }
              />
            </div>

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
  );
};

export default Leads;



