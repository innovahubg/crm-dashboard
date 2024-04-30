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
    const [loading, setLoading] = useState(false);
    const [leads, setLeads] = useState([]);



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
                                    <button type="button" class="btn btn-secondary me-2"> <i className="mdi mdi-account-edit"></i>Editar</button>
                                    <button type="button" class="btn btn-danger"><i className="mdi mdi-close"></i>Eliminar</button>
                                </div>
                                <div className="card text-bg-light w-full">
                                    <div className="card-header">Detalles</div>
                                    <div className="card-body">

                                        <div className="card-text">
                                            <div className="d-flex mb-3">
                                                <div className="w-50">Nombre: nombre</div>
                                                <div className="w-50">Apellido: apellido</div>
                                            </div>

                                            <div className="d-flex mb-3">
                                                <div className="w-50">Email: hola@email.com</div>
                                                <div className="w-50">Telefono: 55403434242</div>
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
        </div>
    );
};

export default Leads;





//El detalle ver que listas de contactos pertenece
//Desuscribirse
//Cambiar el status del lead para la lista de contacto en especifico