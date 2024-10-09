import React, { useState } from 'react'
import { Link, useParams } from "react-router-dom"
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
import Builder from '../../components/Builder';

const EditEmailTemplate = () => {
    const [html, setHTML] = useState("");
    const { id } = useParams()

    return (
        <div className="page-content">
            <Container fluid={true}>
                <Breadcrumbs title="IHubG" breadcrumbItem="Email templates detalle" />
                <Row className="mb-4">
                    <Row className="g-4 mb-3">
                        {id}

                        <Builder html={html} setHTML={setHTML} />
                    </Row>
                </Row>
            </Container>
        </div>
    )
}

export default EditEmailTemplate