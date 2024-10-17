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

import Breadcrumbs from "../../components/Common/Breadcrumb";
import { RingLoader } from "react-spinners";
import DataTable from "react-data-table-component";
import { GetData } from "../../services/api";
import { Link } from "react-router-dom";
import ReactPaginate from 'react-paginate';



//Leads

// Paginador
// Creado por createdBy en tabla


const Leads = () => {
    const [loading, setLoading] = useState(false);
    const [leads, setLeads] = useState([]);
    const [modal, setModal] = useState(false);
    const [edit, setEdit] = useState(false)

    const [userData, setUserData] = useState({
        name: "Harland",
        lastName: "Lohora",
        email: "harland@lohora.com",
        phone: "55 4085 6635"
    })

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await GetData(`/customers`);
            setLeads(data);
            setLoading(false);
        };
        //fetchData();
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
                            <div>
                                <div className="w-full d-flex justify-content-end">
                                    {!edit && <>
                                        <button type="button" className="btn btn-secondary me-2" onClick={() => setEdit(true)}> <i className="mdi mdi-account-edit"></i>Editar</button>
                                        <button type="button" className="btn btn-danger" onClick={() => setModal(true)}><i className="mdi mdi-close"></i>Eliminar</button>

                                    </>
                                    }
                                    {edit && <>
                                        <button type="button" className="btn btn-success me-2" onClick={() => {
                                            alert("Editar --> ")
                                            setEdit(false)
                                        }}> <i className="mdi mdi-account-edit"></i>Aceptar</button>
                                        <button type="button" className="btn btn-danger" onClick={() => setEdit(false)}><i className="mdi mdi-close"></i>Cancelar</button>
                                    </>}


                                </div>
                                <div className="card text-bg-light w-full">
                                    <h4 className="card-header">Detalles</h4>
                                    <div className="card-body">

                                        <div className="card-text">
                                            <div className="d-flex mb-3">
                                                <div className="w-50 d-flex align-items-center">
                                                    Nombre:
                                                    {!edit && <span> {userData.name}</span>}
                                                    {edit && <input placeholder="Ingresa un nombre" value={userData.name} className="form-control w-50" />}
                                                </div>
                                                <div className="w-50 d-flex align-items-center">
                                                    Apellido:
                                                    {!edit && <span> {userData.lastName}</span>}
                                                    {edit && <input placeholder="Ingresa un apellido" value={userData.lastName} className="form-control w-50" />}
                                                </div>
                                            </div>

                                            <div className="d-flex mb-3">
                                                <div className="w-50 d-flex align-items-center">
                                                    Email:
                                                    {!edit && <span> {userData.email}</span>}
                                                    {edit && <input placeholder="Ingresa un email" value={userData.email} className="form-control w-50" />}
                                                </div>
                                                <div className="w-50 d-flex lign-items-center">
                                                    Telefono:
                                                    {!edit && <span> {userData.phone}</span>}
                                                    {edit && <input placeholder="Ingresa un numero telefonico" value={userData.phone} className="form-control w-50" />}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="card text-bg-light w-full">
                                    <div className="card-header">Campañas</div>
                                    <div className="card-body">
                                        <div className="card-text">
                                            <div className="d-flex mb-3">
                                                <div className="w-50">Campaña: crm_list</div>
                                                <div className="w-50">creada: 29/04/2024 23:06</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
                    ¿Deseas eliminar el lead?
                </ModalHeader>
                <div className="tablelist-form">
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
                                onClick={() => { alert("eliminar") }}
                                className="btn btn-success"
                                id="add-btn"
                            >
                                Aceptar
                            </button>
                        </div>
                    </ModalFooter>
                </div>
            </Modal>
        </div>
    );
};

export default Leads;





//El detalle ver que listas de contactos pertenece
//Desuscribirse
//Cambiar el status del lead para la lista de contacto en especifico