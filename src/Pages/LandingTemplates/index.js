import React, { useState, useEffect } from "react";
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
} from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import Builder from "./builder";
import { RingLoader } from "react-spinners";
import DataTable from "react-data-table-component";
import { GetData } from "../../services/api";
import { Link } from "react-router-dom";

const LandingBuilder = () => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await GetData("/templates/landing");
      setTemplates(data);
      console.log(data);
      setLoading(false);
    };
    fetchData();
  }, []);

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
      name: <span className="font-weight-bold fs-13">Fecha creación</span>,
      selector: (row) => row.createdAt,
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
        <Breadcrumbs title="IHubG" breadcrumbItem="Landing templates" />
        <Row className="mb-4">
          <Row className="g-4 mb-3">
            <Col className="col-sm-auto">
              <div className="d-flex gap-1 justify-content-end">
                <Button
                  color="success"
                  className="add-btn"
                  onClick={() => {}}
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
                columns={[]}
                noDataComponent={<span className="py-4">Sin resultados</span>}
              />
            )}
          </Row>
        </Row>
        <Builder />
      </Container>
    </div>
  );
};

export default LandingBuilder;
