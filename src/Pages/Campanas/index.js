import React, { useState, useEffect } from "react";
import { GetData } from "../../services/api";
import DataTable from "react-data-table-component";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  UncontrolledDropdown,
  Container,
  Row,
} from "reactstrap";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../components/Common/Breadcrumb";

const Campaigns = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await GetData("/contact-lists");
      setData(data);
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
      name: <span className="font-weight-bold fs-13">ID</span>,
      selector: (row) => row.id,
      sortable: true,
    },
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
    <div className="page-content">
      <Container fluid={true}>
        <Breadcrumbs title="IHubG" breadcrumbItem="Campañas" />
        <Row className="mb-4">
          <DataTable data={data} columns={columns} />
        </Row>
      </Container>
    </div>
  );
};

export default Campaigns;
