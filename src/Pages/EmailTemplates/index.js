import React, { useState, useEffect } from "react";
import moment from "moment";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { GetData } from "../../services/api";
import { RingLoader } from "react-spinners";
import { useFormik } from "formik";
import * as Yup from "yup";
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
import { Link, useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";

const EmailTemplates = () => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [newTemplate, setNewTemplate] = useState({
    name: "",
    type: "",
    subject: "",
    from: "",
  });
  const [emails, setEmails] = useState([]);

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      name: "",
      subject: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Ingresa "),
      subject: Yup.string().required("Ingresa "),
    }),
    onSubmit: (values) => {
      // dispatch(userForgetPassword(values, props.router.navigate));
    },
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await GetData("/templates/email");
      const sorted = data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setTemplates(sorted);
      setLoading(false);
    };
    fetchData();
  }, []);

  const getEmails = async () => {
    const { data } = await GetData("/email-senders");
    const realData = data[0];
    const mailsObj = Object.keys(realData);
    const mails = [];
    console.log(realData);
    mailsObj.forEach((email) => {
      let valid = realData[email]["VerificationStatus"];
      if (valid === "Success") {
        mails.push({ email, valid: true });
      }
    });
    console.log(mails);
    setNewTemplate({ ...newTemplate, from: mails[0].email })
    setEmails(mails);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { type } = newTemplate;

    localStorage.setItem("newEmailTemplate", JSON.stringify(newTemplate));

    if (type === "IA") {
      navigate("/email-templates/new/ai");
    } else if (type === "Template") {
      navigate("/email-templates/new/template");
    } else {
      navigate("/email-templates/new/builder");
    }
  };

  const columns = [
    {
      name: <span className="font-weight-bold fs-13">Nombre</span>,
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Creado</span>,
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
                <Link to={`/email-templates/${data.id}`} className="text-muted">
                  <i className="ri-eye-fill align-bottom me-2 text-muted"></i>
                  Detalle
                </Link>
              </DropdownItem>
              <DropdownItem className="edit-item-btn">
                <i className="ri-pencil-fill align-bottom me-2 text-muted"></i>
                Editar
              </DropdownItem>
              <DropdownItem className="remove-item-btn">
                {" "}
                <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i>{" "}
                Eliminar{" "}
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
        <Breadcrumbs title="IHubG" breadcrumbItem="Email templates" />
        <Row className="mb-4">
          <Row className="g-4 mb-3">
            <Col className="col-sm-auto">
              <div className="d-flex gap-1 justify-content-end">
                <Button
                  color="success"
                  className="add-btn"
                  onClick={() => {
                    setModal(true);
                    getEmails();
                  }}
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
                columns={columns}
                noDataComponent={<span className="py-4">Sin resultados</span>}
              />
            )}
          </Row>
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
          Nuevo template
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
                placeholder="Ingresa un nombre a tu template"
                required
                value={newTemplate.name}
                onChange={(e) =>
                  setNewTemplate({ ...newTemplate, name: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <label htmlFor="titlebot-field" className="form-label">
                Asunto
              </label>
              <input
                type="text"
                id="titlebot-field"
                className="form-control"
                placeholder="Ingresa un asunto a tu template"
                required
                value={newTemplate.subject}
                onChange={(e) =>
                  setNewTemplate({ ...newTemplate, subject: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <label htmlFor="titlebot-field" className="form-label">
                Remitente
              </label>
              <select
                className="form-select"
                onChange={(e) =>
                  setNewTemplate({ ...newTemplate, from: e.target.value })
                }
              >
                {emails.map(({ email }) => (
                  <option key={email} value={email}>
                    {email}
                  </option>
                ))}
              </select>
            </div>

            <div className="">
              <label htmlFor="typeChannel-field" className="form-label">
                Crear con:
              </label>
              <div className="d-flex justify-content-around">
                <div
                  className={`d-flex flex-column justify-content-center align-items-center optionHover ${newTemplate.type === "IA" && "optionSelected"
                    }`}
                  onClick={() => setNewTemplate({ ...newTemplate, type: "IA" })}
                >
                  <i className="mdi mdi-robot"></i>
                  <span>IA</span>
                </div>
                <div
                  className={`d-flex flex-column justify-content-center align-items-center optionHover ${newTemplate.type === "Template" && "optionSelected"
                    }`}
                  onClick={() =>
                    setNewTemplate({ ...newTemplate, type: "Template" })
                  }
                >
                  <i className="mdi mdi-ballot"></i>
                  <span>Template</span>
                </div>
                <div
                  className={`d-flex flex-column justify-content-center align-items-center optionHover ${newTemplate.type === "Code" && "optionSelected"
                    }`}
                  onClick={() =>
                    setNewTemplate({ ...newTemplate, type: "Code" })
                  }
                >
                  <i className="bx bx-code"></i>
                  <span>Código</span>
                </div>
              </div>
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
                onClick={handleSubmit}
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

export default EmailTemplates;
