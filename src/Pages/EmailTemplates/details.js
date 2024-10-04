import React from 'react'
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

const DetailsEmailTemplate = () => {

    const { id } = useParams()

    return (
        <div className="page-content">
            <Container fluid={true}>
                <Breadcrumbs title="IHubG" breadcrumbItem="Email templates detalle" />
                <Row className="mb-4">
                    <Row className="g-4 mb-3">
                        {id}
                    </Row>
                </Row>
            </Container>
        </div>
    )
}

export default DetailsEmailTemplate