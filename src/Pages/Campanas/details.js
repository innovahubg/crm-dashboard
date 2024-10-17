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
  Button
} from "reactstrap";
import { Link, useParams } from "react-router-dom";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { RingLoader } from "react-spinners";
import ReactPaginate from 'react-paginate';

const CampaignDetails = () => {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await GetData(`/contact-lists/${id}/customers`);
      const sorted = data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setData(sorted);
      setLoading(false);
    };
    fetchData();
  }, [id]);

  const columns = [
    {
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
      name: <span className="font-weight-bold fs-13">Apellidos</span>,
      selector: (row) => row.lastName,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Email</span>,
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Teléfono</span>,
      selector: (row) => row.phone,
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

  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10
  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = data.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(data.length / itemsPerPage);


  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    setItemOffset(newOffset);
  };

  return (
    <div className="page-content p">
      <Container fluid={true} className="pt-4">
        <Breadcrumbs title="IHubG" breadcrumbItem={`Lista de contactos`} />
        <Row className="mb-4 h-75 ">
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
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="< Ant."
                renderOnZeroPageCount={null}
                className='reactPaginate'
                activeClassName="reactPaginate-active"
              />
            </>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default CampaignDetails;
