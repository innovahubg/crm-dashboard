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

const CorporateIdentity = () => {
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

  const handleUpdateImg = (e) => {
    let base64String = "";
    console.log(e.target.value)
    let file = document.querySelector(
      'input[type=file]')['files'][0];
    //let file = e.target.value

    let reader = new FileReader();
    console.log("next");

    reader.onload = function () {
      base64String = reader.result.replace("data:", "")
        .replace(/^.+,/, "");

      //imageBase64Stringsep = base64String;

      // alert(imageBase64Stringsep);
      console.log(base64String);
    }
    reader.readAsDataURL(file);

  }

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
                Edit
              </DropdownItem>
              <DropdownItem className="remove-item-btn">
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
        <Breadcrumbs title="IHubG" breadcrumbItem="Identidad corporativa" />
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
                  <i className="ri-add-line align-bottom me-1"></i> Nueva
                  identidad
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
                data={[]}
                columns={[]}
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
          Registrar identidad
        </ModalHeader>
        <div className="tablelist-form">
          <ModalBody style={{ height: "auto" }}>
            <div className="mb-3">
              <label htmlFor="titlebot-field" className="form-label">
                Logotipo
              </label>
              <input
                className="form-control"
                placeholder="Ingresa el logotipo a registrar"
                value={email}
                onChange={handleUpdateImg}
                type="file"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="titlebot-field" className="form-label">
                Nombre del brand
              </label>
              <input
                className="form-control"
                placeholder="Ingresa un nombre de referencia"
                value={email}
                onChange={updateInput}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="titlebot-field" className="form-label">
                Marca personal
              </label>
              <input
                className="form-control"
                placeholder="Ingresa tu marca personal"
                value={email}
                onChange={updateInput}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="titlebot-field" className="form-label">
                Link whatsapp
              </label>
              <input
                className="form-control"
                placeholder="Ingresa el link de whatsapp"
                value={email}
                onChange={updateInput}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="titlebot-field" className="form-label">
                Link instagram
              </label>
              <input
                className="form-control"
                placeholder="Ingresa el link de instagram"
                value={email}
                onChange={updateInput}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="titlebot-field" className="form-label">
                Email
              </label>
              <input
                className="form-control"
                placeholder="Ingresa el email a registrar"
                value={email}
                onChange={updateInput}
              />
            </div>
            <div className="d-flex justify-content-between">
              <div className="mb-3 w-50">
                <label htmlFor="titlebot-field" className="form-label">
                  Color primario
                </label>
                <input
                  className="form-control"
                  placeholder="Ingresa el email a registrar"
                  value={email}
                  onChange={updateInput}
                  type="color"
                />
              </div>
              <div className="mb-3 w-50">
                <label htmlFor="titlebot-field" className="form-label">
                  Color secundario
                </label>
                <input
                  className="form-control"
                  placeholder="Ingresa el email a registrar"
                  value={email}
                  onChange={updateInput}
                  type="color"
                />
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

export default CorporateIdentity;
