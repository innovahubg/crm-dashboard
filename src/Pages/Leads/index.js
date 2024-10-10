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

import ReactPaginate from 'react-paginate';


const Leads = () => {

  const [loading, setLoading] = useState(true);
  const [leads, setLeads] = useState([]);

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
    </div>
  );
};

export default Leads;



