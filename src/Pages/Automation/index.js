import React, { useState, useCallback, useEffect } from 'react';


import {
    Card,
    CardBody,
    CardText,
    CardTitle,
    Col,
    Container,
    Nav,
    NavItem,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    DropdownToggle,
    NavLink,
    Row,
    TabContent,
    TabPane,
    Button,
    Toast,
    ToastHeader,
    ToastBody
} from "reactstrap";

import RegisterXarrow from "./register";
import { useXarrow } from "react-xarrows";
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import classnames from "classnames";
import { GetData, PostData } from "../../services/api";

const Automation = () => {
    //tabs
    const [activeTab, setactiveTab] = useState("1"); // Include your state variables and functions here

    const toggle = (tab) => {
        if (activeTab !== tab) {
            updateXarrow();
            setactiveTab(tab);
        }
    };


    //Botones

    const [btnmenu1, setBtnMenu1] = useState(false);

    //flow
    const updateXarrow = useXarrow();


    const [elements, setElements] = useState([
        { template: "idetificadorokamp1-1", send: "RegisterBox" }
    ]);


    const [templates, setData] = useState([]);
    const [campaigns, setCampaigns] = useState([]);
    const [automation, setAutomation] = useState({});
    const [emails, setEmails] = useState({});

    useEffect(() => {
        updateXarrow();
        const fetchData = async () => {
            const templates  = await GetData("/templates");
            setData(templates.data);
            const campaignsData = await GetData("/contact-lists");
            setCampaigns(campaignsData.data);

            const emails = await GetData("/email-senders");
            setEmails(emails.data);
        };
        fetchData();
    }, [elements]); // Dependency array includes elements


    const getAutomations = (async (campaign) => {
        let aut = await GetData(`/automation/${campaign.id}`);
        aut.data.registered = [elements[0], ...aut.data.registered];
        setAutomation(aut.data);
        setElements(aut.data.registered);
    })


    const addElement = (type) => {
        console.log(elements);
        const newId = `idetificadorokamp1-${elements.length + 1}`;
        setElements([...elements, { template: newId, send: type }]);
    };

    const removeElement = (id) => {
        setElements(elements.filter((element) => element.template !== id));
    };


    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid={true}>
                    <Breadcrumbs title="Dashboard" breadcrumbItem="Automatización" />
                    <Col xl={12}>
                        <Card>
                            <CardBody>
                                {/* <CardTitle className="h4">Selecciona la campaña a automatizar:</CardTitle> */}
                                <Col md={4}>
                                    <div className="form-floating mb-3">
                                        {/* <select
                              className="form-select"
                              id="floatingSelectGrid"
                              aria-label="Floating label select example"
                            >
                              <option defaultValue>
                                ---
                              </option>
                              {campaigns.map((campaign, index) => (
                                    <option key={index} value={campaign.id}>{campaign.name}</option> // Assuming 'id' and 'name' are the properties of campaign
                                ))}
                            </select> */}
                                        {/* <label htmlFor="floatingSelectGrid">
                              Lista de Campañas
                            </label> */}
                                    </div>
                                </Col>
                                <Nav tabs>
                                    <NavItem>
                                        <NavLink
                                            style={{ cursor: "pointer" }}
                                            className={classnames({
                                                active: activeTab === "1",
                                            })}
                                            onClick={() => {
                                                toggle("1");
                                            }}
                                        >
                                            <i className="dripicons-home me-1 align-middle"> </i>{" "}
                                            Configuración de Inicio
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            style={{ cursor: "pointer" }}
                                            className={classnames({
                                                active: activeTab === "2",
                                            })}
                                            onClick={() => {
                                                toggle("2");
                                            }}
                                        >
                                            <i className="dripicons-user me-1 align-middle"></i>{" "}
                                            Calendarizar Eventos
                                        </NavLink>
                                    </NavItem>
                                </Nav>

                                <TabContent activeTab={activeTab} className="p-3">
                                    <TabPane tabId="1" id="home">
                                        <Row>
                                            <Col sm="12">
                                                <CardText className="mb-0">
                                                    <p className="card-title-desc">Configura eventos automáticos post-registro. Puedes enviar emails o mensajes de WhatsApp usando plantillas predefinidas.</p>
                                                    <Col sm="4">
                                                        <Dropdown isOpen={btnmenu1} toggle={() => setBtnMenu1(!btnmenu1)}>
                                                            <DropdownToggle tag="button" className="btn btn-dark">
                                                                Selecciona una campaña para automatizar{" "}
                                                                <i className="mdi mdi-chevron-down" />
                                                            </DropdownToggle>
                                                            <DropdownMenu className="dropdown-menu-end">
                                                                {campaigns.map((campaign, index) => (

                                                                    <DropdownItem key={campaign.id} onClick={() => getAutomations(campaign)}>{campaign.name}</DropdownItem>
                                                                ))}
                                                            </DropdownMenu>
                                                        </Dropdown>
                                                    </Col>
                                                </CardText>
                                            </Col>

                                        </Row>

                                        <Row>



                                                        {automation && automation.id && automation.name && (
                                                            <div style={{ height: '600px', background: '#fff' }} >
                                                            
                                                            <Col sm="12">


                                                            <div className="table-responsive">
                                        <table className="table table-bordered table-striped table-nowrap mb-0">
                                            <thead>
                                                <tr>
                                                    <th scope="col" className="text-center">
                                                        ID
                                                    </th>
                                                    <th scope="col" className="text-center">
                                                        NAME
                                                    </th>
                                                    <th></th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th className="text-nowrap" scope="row">{automation.id}</th>
                                                    <td className="text-nowrap" scope="row">{automation.name}</td>
                                                    <td> <button className='btn btn-primary' onClick={() => addElement("email", updateXarrow)}>Evento de Email</button></td>
                                                    <td><button className='btn btn-success' onClick={() => addElement("whatsapp", updateXarrow)}>Evento de Whatsapp</button></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                                            </Col>
                                                               
                                                                
                                                                <hr></hr>
                                                                <RegisterXarrow removeElement={removeElement} updateXarrow={updateXarrow} automation={elements} templates={templates} emails={emails} idAutomation={automation.id}/>
                                                                <hr></hr>
                                                            </div>
                                                        )}


{/* 
                                                        <Button
                                                            type="button"
                                                            color="primary"
                                                            id="liveToastBtn"
                                                            className="me-2"
                                                            onClick
                                                        >
                                                            Show Live Toast
                                                        </Button> */}

                                                        {/* <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: "11" }}>
                                                            <Toast isOpen>
                                                                <ToastHeader toggle>
                                                                    <img src alt="" className="me-2" height="18" />
                                                                    Upzet
                                                                </ToastHeader>
                                                                <ToastBody color="primary">
                                                                    Hello, world! This is a toast message.
                                                                </ToastBody>
                                                            </Toast>
                                                        </div> */}
                                        
                                     
                                        </Row>
                                    </TabPane>
                                    <TabPane tabId="2" id="profile">
                                        <Row>
                                            <Col sm="12">
                                                <CardText className="mb-0">

                                                </CardText>
                                            </Col>
                                        </Row>
                                    </TabPane>
                                </TabContent>
                            </CardBody>
                        </Card>
                    </Col>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default Automation;