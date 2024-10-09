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
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Button,
} from "reactstrap";
import { RingLoader } from "react-spinners";
import DataTable from "react-data-table-component";
import { GetData, PostData } from "../../services/api";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import validateEmail from "../../helpers/validateEmail";

const EmailValidation = () => {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [email, setEmail] = useState("");
  const [valid, setValid] = useState(false);

  const fetchData = async () => {
    const { data } = await GetData("/email-senders");

    const realData = data[0];
    const mailsObj = Object.keys(realData);
    const mails = [];

    mailsObj.forEach((email) => {
      let valid = realData[email]["VerificationStatus"];
      mails.push({ email, valid: valid === "Success" ? true : false });
    });

    setEmails(mails);
    setModal(false);
    setEmail("");
  };

  useEffect(() => {
    try {
      fetchData();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateInput = (e) => {
    const text = e.target.value;
    setEmail(text);
    setValid(validateEmail(text));
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    await PostData("/email-senders", { email });
    await fetchData();
  };

  const columns = [
    {
      name: <span className="font-weight-bold fs-13">Email</span>,
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Válido</span>,
      selector: (row) => (
        <span>
          <i
            className={
              "mdi " +
              (row.valid
                ? "mdi-check-circle checkGreen"
                : "mdi-close-circle closeRed")
            }
          ></i>
        </span>
      ),
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
              <DropdownItem className="remove-item-btn">
                <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i>{" "}
                Elimiar{" "}
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
        <Breadcrumbs title="IHubG" breadcrumbItem="Validacion emails" />
        <Row className="mb-4">
          <Row className="g-4 mb-3">
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
                  <i className="ri-add-line align-bottom me-1"></i> Registrar email
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
                data={emails}
                columns={columns}
                noDataComponent={<span className="py-4">Sin resultados</span>}
              />
            )}
          </Row>
        </Row>
      </Container>
      <Modal
        isOpen={modal}

        centered
      >
        <ModalHeader
          className="bg-light p-3"
          id="exampleModalLabel"

        >
          Registrar correo electrónico
        </ModalHeader>
        <div className="tablelist-form">
          <ModalBody style={{ height: "auto" }}>
            <div className="mb-3">
              <label htmlFor="titlebot-field" className="form-label">
                Correo electrónico
              </label>
              <input
                className="form-control"
                placeholder="Ingresa el email a registrar"
                value={email}
                onChange={updateInput}
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
                className={"btn btn-success " + (!valid && "disabled")}
                onClick={sendEmail}
              >
                Registrar
              </button>
            </div>
          </ModalFooter>
        </div>
      </Modal>
    </div>
  );
};

export default EmailValidation;
