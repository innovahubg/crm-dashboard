import React, { useState, useEffect } from "react";
import { GetData, PostData } from "../../services/api";
import DataTable from "react-data-table-component";
import moment from "moment"
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  UncontrolledDropdown,
  Container,
  Row,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Col,
  Button
} from "reactstrap";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { RingLoader } from "react-spinners";
import Swal from 'sweetalert2'


const Campaigns = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [name, setName] = useState("")


  const fetchData = async () => {
    const { data } = await GetData("/contact-lists");
    setData(data);
    setLoading(false);
  };

  useEffect(() => {
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
      selector: (row) => row.company.name,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Contactos</span>,
      selector: (row) => row.count,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Creada</span>,
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
                Editar
              </DropdownItem>
              <DropdownItem className="edit-item-btn">
                <i className="mdi mdi-cog-outline align-bottom me-2 text-muted" />
                Automatizar
              </DropdownItem>
              <DropdownItem className="remove-item-btn" onClick={deleteCampaign}>
                <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i>
                Eliminar
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        );
      },
    },
  ];

  const createCampaign = async () => {
    try {
      const { status } = await PostData("/contact-lists", { name })
      if (status === 200) {
        Swal.fire({
          title: `${name} Campaña creada`,
          icon: "success"
        });
        fetchData()
        setModal(false)
        setName("")
      }
    } catch (err) {
      console.log(err)
    }
  }

  const deleteCampaign = () => {
    Swal.fire({
      title: "¿Deseas eliminar la campaña?",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      denyButtonText: `Cancelar`,
      confirmButtonColor: '#32CD32'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire("Campaña eliminada!", "", "success");
      }
      // else if (result.isDenied) {
      //   Swal.fire("Changes are not saved", "", "info");
      // }
    });
  }

  return (
    <div className="page-content">
      <Container fluid={true}>
        <Breadcrumbs title="IHubG" breadcrumbItem="Campañas" />
        <Row className="my-4">
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
                <i className="ri-add-line align-bottom me-1"></i> Nueva
                campaña
              </Button>
              {/* <Button color="soft-danger"
                                                    onClick="deleteMultiple()"
                                                    ><i className="ri-delete-bin-2-line"></i></Button> */}
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
              data={data}
              columns={columns}
              noDataComponent={<span className="py-4">Sin resultados</span>}
            />
          )}
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
          Nueva Campaña
        </ModalHeader>
        <div className="tablelist-form">
          <ModalBody style={{ height: "auto" }}>

            <div className="mb-3">
              <label htmlFor="titlebot-field" className="form-label">
                Nombre
              </label>
              <input
                type="text"
                id="titlebot-field"
                className="form-control"
                placeholder="Ingresa un nombre a tu campaña"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
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
                onClick={createCampaign}
                className="btn btn-success"
                id="add-btn"
              >
                Crear
              </button>
            </div>
          </ModalFooter>
        </div>
      </Modal>
    </div>
  );
};

export default Campaigns;
