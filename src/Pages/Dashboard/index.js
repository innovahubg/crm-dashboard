import React, { useState, useEffect } from "react";
import UsePanel from "./UserPanel";
import OrderStatus from "./OrderStatus";
import Notifications from "./Notifications";
import SocialSource from "./SocialSource";
import OverView from "./OverView";
import RevenueByLocation from "./RevenueByLocation";
import LatestTransation from "./LatestTransation";
import { GetData } from "../../services/api";

import { Row, Container } from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";



const Dashboard = () => {
  document.title = "CRM Innova Hub Group";
  const [customers, setCustomers] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await GetData(`/customers`);
      setCustomers(data)
      // setLeads(data);
      // setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="IHG" breadcrumbItem="Dashboard" />
          {/* User Panel Charts */}
          <UsePanel customers={customers} />

          <Row>
            {/* Overview Chart */}
            <OverView />
            {/* Social Source Chart */}
            <SocialSource />
          </Row>

          <Row>
            {/* Order Stats */}
            <OrderStatus />
            {/* Notifications */}
            <Notifications />
            {/* Revenue by Location Vector Map */}
            <RevenueByLocation />
          </Row>

          {/* Latest Transaction Table */}
          <LatestTransation />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
