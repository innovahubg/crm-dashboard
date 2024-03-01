import React, { useState } from "react";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import CalendarComponent from "./CalendarComponent";

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

const Automation = () => {

  const [modal, setModal] = useState(false)
  const [type, setType] = useState("")
  const [details, setDetails] = useState({})
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Inicio" breadcrumbItem="Automatización" />
        </Container>
        <CalendarComponent setModal={setModal} setType={setType} setDetails={setDetails} />
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
            {type === "new" && <>Nuevo evento</>}
            {type === "details" && <>Detalles</>}

          </ModalHeader>
          <form className="tablelist-form">
            <ModalBody style={{ height: "auto" }}>
              {
                type === "new" && (<div className="mb-3">
                  <label htmlFor="titlebot-field" className="form-label">
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="titlebot-field"
                    className="form-control"
                    placeholder="Ingresa un nombre a tu evento"
                    required
                    value={""}
                    onChange={(e) =>
                      console.log({})
                    }
                  />
                </div>)
              }

              {
                type === "details" && (<div className="mb-3">
                  <h4 htmlFor="titlebot-field" className="form-label">
                    Titulo: {details.title}
                  </h4>

                </div>)
              }

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
                  onClick={() => { }}
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
    </React.Fragment>
  );
};

export default Automation;
