import React, { useState, useEffect } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Container, Badge, ListGroupItem, Modal, ModalBody, ModalFooter, Row, ModalHeader } from 'reactstrap';
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import { Link } from 'react-router-dom';
import { GetData, PostData } from '../../../services/api';
import axios from 'axios';

const BotBuilder = () => {

    const [botList, setBotList] = useState([]);
    const initInfoChatBot = {
        name: '',
        companyId: '6566598fe8d1d898b12af425',
        typeInteraction : '',
        channel : '',
        status : true
    }
    const [infoBot, setInfoBot] = useState(initInfoChatBot);

    const [modal_list, setmodal_list] = useState(false);
    function tog_list() {
        setmodal_list(!modal_list);
    }

    const [modal_delete, setmodal_delete] = useState(false);
    function tog_delete() {
        setmodal_delete(!modal_delete);
    }

    const getListBot = async () => {
        const path = `/chatbots?company=6566598fe8d1d898b12af425`;
        const { data } = await GetData(path);
        if(!data){
            console.log('Error');
        }
        setBotList(data);
    }

    const upserBot = async (e) => {
        e.preventDefault();
        const path = `/chatbots`;
        const { data } = await PostData(path, infoBot);
        getListBot();
        console.log(data);

    }

    useEffect(() => {
        if(botList.length <= 0){
            getListBot();
        }
    }, []);

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
                                                        <th className="sort" data-sort="id">Identificador</th>
                                                        <th className="sort" data-sort="name">Nombre</th>
                                                        <th className="sort" data-sort="company">Compañia</th>
                                                        <th className="sort" data-sort="status">Estatus</th>
                                                        {/* <th className="sort" data-sort="createdAt">Fecha de Creación</th> */}
                                                        <th className="sort" data-sort="actions"></th>
                                                    </tr>
                                                </thead>
                                                <tbody className="list form-check-all">
                                                    {
                                                        botList.map((x, index) => (<tr key={`bot-${x.id}`}>
                                                            <th scope="row">
                                                                <div className="form-check">
                                                                    <input className="form-check-input" type="checkbox" name="chk_child" value="option1" />
                                                                </div>
                                                            </th>
                                                            <td>{x.id}</td>
                                                            <td>{x.name}</td>
                                                            <td>{x.companyId}</td>
                                                            <td>{x.status ? <Badge color="success">Activo</Badge> : <Badge color="danger">Inactivo</Badge>}</td>
                                                            {/* <td>{x._id}</td> */}
                                                            <td>
                                                                <div className="d-flex gap-2">
                                                                    <div className="edit">
                                                                        <a className="btn btn-sm btn-success edit-item-btn" href='/dashboard/bot-builder/sample-bot-1'
                                                                            data-bs-toggle="modal" data-bs-target="#showModal">Editar</a>
                                                                    </div>
                                                                    <div className="remove">
                                                                        <button className="btn btn-sm btn-danger remove-item-btn" data-bs-toggle="modal" data-bs-target="#deleteRecordModal">Eliminar</button>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>))
                                                    }
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
            <Modal isOpen={modal_list} toggle={() => { tog_list(); }} >
                <ModalHeader className="bg-light p-3" id="exampleModalLabel" toggle={() => { tog_list(); }}> Nuevo ChatBot </ModalHeader>
                <form className="tablelist-form">
                    <ModalBody>
                        <div className="mb-3" id="modal-id" style={{ display: "none" }}>
                            <label htmlFor="id-field" className="form-label">ID</label>
                            <input type="text" id="id-field" className="form-control" placeholder="ID" readOnly />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="titlebot-field" className="form-label">Título del Chatbot</label>
                            <input type="text" id="titlebot-field" className="form-control" placeholder="Ingresa un título" required 
                                onChange={(e) => setInfoBot({...infoBot, name: e.target.value})}
                            />
                        </div>

                        <div className='mb-3'>
                            <label htmlFor="typeInteraction-field" className="form-label">Tipo de mensajería</label>
                            <select className="form-control" data-trigger name="typeInteraction-field" id="typeInteraction-field"
                                onChange={(e) => setInfoBot({...infoBot, typeInteraction: e.target.value})}
                                value={infoBot.typeInteraction}
                            >
                                <option value="">Selecciona un tipo de mensajería</option>
                                <option value="Chat">Chat</option>
                                <option value="Mail">Mail</option>
                            </select>
                        </div>

                        <div className='mb-3'>
                            <label htmlFor="channel-field" className="form-label">Canal</label>
                            <select className="form-control" data-trigger name="channel-field" id="channel-field"
                                onChange={(e) => setInfoBot({...infoBot, channel: e.target.value})}
                                value={infoBot.channel}
                            >
                                <option value="">Selecciona un tipo de mensajería</option>
                                <option value="Active">WhatsApp 1</option>
                                <option value="Active">WhatsApp 2</option>
                                <option value="Active">WhatsApp 3</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="status-field" className="form-label">Estatus</label>
                            <select className="form-control" data-trigger name="status-field" id="status-field"
                                onChange={(e) => setInfoBot({...infoBot, status: e.target.value})}
                                value={infoBot.status}
                            >
                                <option value="Active">Active</option>
                                <option value="Block">Block</option>
                            </select>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <div className="hstack gap-2 justify-content-end">
                            <button type="button" className="btn btn-light" onClick={() => setmodal_list(false)}>Cerrar</button>
                            <button type="submit" className="btn btn-success" id="add-btn" onClick={upserBot}>Crear y Editar Chatbot</button>
                            {/* <button type="button" className="btn btn-success" id="edit-btn">Update</button> */}
                        </div>
                    </ModalFooter>
                </form>
            </Modal>

        </>
    );
};

export default BotBuilder;
