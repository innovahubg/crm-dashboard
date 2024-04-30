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
} from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { RingLoader } from "react-spinners";
import DataTable from "react-data-table-component";
import { GetData } from "../../services/api";
import { Link } from "react-router-dom";

const Leads = () => {
  const [loading, setLoading] = useState(true);
  const [leads, setLeads] = useState([]);

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
      const { data } = await GetData(`/customers`);
      setLeads(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="page-content">
      <Container fluid={true}>
        <Breadcrumbs title="IHubG" breadcrumbItem="Leads" />
        <Row className="mb-4">
          <Row className="mb-4">
            {loading ? (
              <div className="d-flex justify-content-center p-5 w-full">
                <RingLoader color="#E9553E" />
              </div>
            ) : (
              <DataTable
                data={leads}
                columns={columns}
                noDataComponent={<span className="py-4">Sin resultados</span>}
              />
            )}
          </Row>
        </Row>
      </Container>
    </div>
  );
};

export default Leads;



