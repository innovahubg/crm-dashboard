import React, { useState, useEffect } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Container, ListGroup, ListGroupItem, Modal, ModalBody, ModalFooter, Row, ModalHeader } from 'reactstrap';
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import SimpleBar from 'simplebar-react';
import { Link } from 'react-router-dom';
import List from 'list.js';
// Import Flatepicker
import Flatpickr from "react-flatpickr";

// Import Images
import avatar1 from "../../../assets/images/users/avatar-1.jpg";
import avatar2 from "../../../assets/images/users/avatar-2.jpg";
import avatar3 from "../../../assets/images/users/avatar-3.jpg";
import avatar4 from "../../../assets/images/users/avatar-4.jpg";
import avatar5 from "../../../assets/images/users/avatar-5.jpg";

const BotBuilder = () => {

    /* IHG */
    const blankList = {
        id : null,
        name : '',
        companyId : '',
        userId : ''
    }
    const [contactList, setContactList] = useState(blankList);

    const [modal_list, setmodal_list] = useState(false);
    function tog_list() {
        setmodal_list(!modal_list);
    }

    const [modal_delete, setmodal_delete] = useState(false);
    function tog_delete() {
        setmodal_delete(!modal_delete);
    }

    useEffect(() => {

        const attroptions = {
            valueNames: [
                'name',
                'born',
                {
                    data: ['id']
                },
                {
                    attr: 'src',
                    name: 'image'
                },
                {
                    attr: 'href',
                    name: 'link'
                },
                {
                    attr: 'data-timestamp',
                    name: 'timestamp'
                }
            ]
        };
        

        // Existing List
        const existOptionsList = {
            valueNames: ['contact-name', 'contact-message']
        };

        new List('contact-existing-list', existOptionsList);

        // Fuzzy Search list
        new List('fuzzysearch-list', {
            valueNames: ['name']
        });

        // pagination list

        new List('pagination-list', {
            valueNames: ['pagi-list'],
            page: 3,
            pagination: true
        });
    });

    return (
        <>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumbs title="Chatbot Builder" breadcrumbItem="Mis Bots" />

                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardHeader>
                                    <h4 className="card-title mb-0">Administra los flujos de tus Chat bots</h4>
                                </CardHeader>

                                <CardBody>
                                    <div id="chatbotsList">
                                        <Row className="g-4 mb-3">
                                            <Col className="col-sm-auto">
                                                <div className="d-flex gap-1">
                                                    <Button color="success" className="add-btn" onClick={() => tog_list()} id="create-btn"><i className="ri-add-line align-bottom me-1"></i> Nuevo Chatbot</Button>
                                                    {/* <Button color="soft-danger"
                                                    onClick="deleteMultiple()"
                                                    ><i className="ri-delete-bin-2-line"></i></Button> */}
                                                </div>
                                            </Col>
                                            <Col className="col-sm">
                                                <div className="d-flex justify-content-sm-end">
                                                    <div className="search-box ms-2">
                                                        <input type="text" className="form-control search" placeholder="Buscar..." />
                                                        <i className="ri-search-line search-icon"></i>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>

                                        <div className="table-responsive table-card mt-3 mb-1">
                                            <table className="table align-middle table-nowrap" id="customerTable">
                                                <thead className="table-light">
                                                    <tr>
                                                        <th scope="col" style={{ width: "50px" }}>
                                                            <div className="form-check">
                                                                <input className="form-check-input" type="checkbox" id="checkAll" value="option" />
                                                            </div>
                                                        </th>
                                                        <th className="sort" data-sort="name">Nombre</th>
                                                        <th className="sort" data-sort="typeBot">Tipo</th>
                                                        <th className="sort" data-sort="channel">Canal</th>
                                                        <th className="sort" data-sort="date">Creado</th>
                                                        <th className="sort" data-sort="num_chats">Número de Chats</th>
                                                        <th className="sort" data-sort="num_chats_end">Chats Finalizados</th>
                                                        <th className="sort" data-sort="status">Status</th>
                                                        <th className="sort" data-sort="action"></th>
                                                    </tr>
                                                </thead>
                                                <tbody className="list form-check-all">
                                                    <tr>
                                                        <th scope="row">
                                                            <div className="form-check">
                                                                <input className="form-check-input" type="checkbox" name="chk_child" value="option1" />
                                                            </div>
                                                        </th>
                                                        <td className="id" style={{ display: "none" }}><Link to="#" className="fw-medium link-primary">#VZ2101</Link></td>
                                                        <td className="customer_name">Chat bot para dar información de ventas</td>
                                                        <td className="email">Chat</td>
                                                        <td className="phone">WhatsApp</td>
                                                        <td className="date">06 Apr, 2024</td>
                                                        <td className="date">10</td>
                                                        <td className="date">7</td>
                                                        <td className="status"><span className="badge badge-soft-success text-uppercase">Active</span></td>
                                                        <td>
                                                            <div className="d-flex gap-2">
                                                                <div className="edit">
                                                                    <button className="btn btn-sm btn-success edit-item-btn"
                                                                        data-bs-toggle="modal" data-bs-target="#showModal">Edit</button>
                                                                </div>
                                                                <div className="remove">
                                                                    <button className="btn btn-sm btn-danger remove-item-btn" data-bs-toggle="modal" data-bs-target="#deleteRecordModal">Remove</button>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <div className="noresult" style={{ display: "none" }}>
                                                <div className="text-center">
                                                    <lord-icon src="https://cdn.lordicon.com/msoeawqm.json" trigger="loop"
                                                        colors="primary:#121331,secondary:#08a88a" style={{ width: "75px", height: "75px" }}>
                                                    </lord-icon>
                                                    <h5 className="mt-2">Sorry! No Result Found</h5>
                                                    <p className="text-muted mb-0">We've searched more than 150+ Orders We did not find any
                                                        orders for you search.</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* <div className="d-flex justify-content-end">
                                            <div className="pagination-wrap hstack gap-2">
                                                <Link className="page-item pagination-prev disabled" to="#">
                                                    Previous
                                                </Link>
                                                <ul className="pagination listjs-pagination mb-0"></ul>
                                                <Link className="page-item pagination-next" to="#">
                                                    Next
                                                </Link>
                                            </div>
                                        </div> */}
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                </Container>
            </div>

            {/* Add Modal */}
            <Modal isOpen={modal_list} toggle={() => { tog_list(); }} centered >
                <ModalHeader className="bg-light p-3" id="exampleModalLabel" toggle={() => { tog_list(); }}> Nuevo ChatBot </ModalHeader>
                <form className="tablelist-form">
                    <ModalBody>
                        <div className="mb-3" id="modal-id" style={{ display: "none" }}>
                            <label htmlFor="id-field" className="form-label">ID</label>
                            <input type="text" id="id-field" className="form-control" placeholder="ID" readOnly />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="titlebot-field" className="form-label">Título del Chatbot</label>
                            <input type="text" id="titlebot-field" className="form-control" placeholder="Ingresa un título" required />
                        </div>

                        <div className='mb-3'>
                            <label htmlFor="typeChannel-field" className="form-label">Tipo de mensajería</label>
                            <select className="form-control" data-trigger name="typeChannel-field" id="typeChannel-field" >
                                <option value="">Selecciona un tipo de mensajería</option>
                                <option value="Active">Chat</option>
                                <option value="Block">Mail</option>
                            </select>
                        </div>

                        <div className='mb-3'>
                            <label htmlFor="channel-field" className="form-label">Canal</label>
                            <select className="form-control" data-trigger name="channel-field" id="channel-field" >
                                <option value="">Selecciona un tipo de mensajería</option>
                                <option value="Active">WhatsApp 1</option>
                                <option value="Active">WhatsApp 2</option>
                                <option value="Active">WhatsApp 3</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="status-field" className="form-label">Estatus</label>
                            <select className="form-control" data-trigger name="status-field" id="status-field" >
                                <option value="Active">Active</option>
                                <option value="Block">Block</option>
                            </select>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <div className="hstack gap-2 justify-content-end">
                            <button type="button" className="btn btn-light" onClick={() => setmodal_list(false)}>Cerrar</button>
                            <button type="submit" className="btn btn-success" id="add-btn">Crear y Editar Chatbot</button>
                            {/* <button type="button" className="btn btn-success" id="edit-btn">Update</button> */}
                        </div>
                    </ModalFooter>
                </form>
            </Modal>

        </>
    );
};

export default BotBuilder;
