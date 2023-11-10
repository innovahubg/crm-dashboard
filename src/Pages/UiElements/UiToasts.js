import React, { useState } from "react";

import {
  Container,
  Row,
  Col,
  Card,
  CardTitle,
  CardBody,
  Button,
  Toast,
  ToastHeader,
  ToastBody,
  Spinner,
} from "reactstrap";

import logo from "../../assets/images/logo-sm.png";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
const UiToasts = () => {
  document.title = "Toast | Upzet - React Admin & Dashboard Template";

  const [toast, settoast] = useState(false);
  const [toast1, settoast1] = useState(false);
  const [toast2, settoast2] = useState(false);
  const [toast3, settoast3] = useState(false);
  const [toast4, settoast4] = useState(false);
  const [toast5, settoast5] = useState(true);
  const [toast6, settoast6] = useState(true);
  const [toast7, settoast7] = useState(true);
  const [toast8, settoast8] = useState(true);
  const [toast9, settoast9] = useState(true);

  const toggleToast = () => {
    settoast(!toast);
  };

  const toggleToast1 = () => {
    settoast1(!toast1);
  };

  const toggleToast2 = () => {
    settoast2(!toast2);
  };

  const toggleToast3 = () => {
    settoast3(!toast3);
  };

  const toggleToast4 = () => {
    settoast4(!toast4);
  };

  const toggleToast5 = () => {
    settoast5(!toast5);
  };

  const toggleToast6 = () => {
    settoast6(!toast6);
  };

  const toggleToast7 = () => {
    settoast7(!toast7);
  };

  const toggleToast8 = () => {
    settoast8(!toast8);
  };

  const toggleToast9 = () => {
    settoast9(!toast9);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="UI Elements" breadcrumbItem="Toasts" />
          <Row>
            <Col xl={12}>
              <Card>
                <CardBody>
                  <CardTitle>Live Example</CardTitle>
                  <p className="card-title-des">
                    Click the button below to show a toast (positioned with our
                    utilities in the lower right corner) that has been hidden by
                    default.
                  </p>

                  <Button
                    type="button"
                    color="primary"
                    id="liveToastBtn"
                    className="me-2"
                    onClick={toggleToast4}
                  >
                    Show Live Toast
                  </Button>

                  <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: "11" }}>
                    <Toast isOpen={toast4}>
                      <ToastHeader toggle={toggleToast4}>
                        <img src={logo} alt="" className="me-2" height="18" />
                        Upzet
                      </ToastHeader>
                      <ToastBody color="primary">
                        Hello, world! This is a toast message.
                      </ToastBody>
                    </Toast>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col xl={6}>
              <Card>
                <CardBody>
                  <CardTitle>Basic Toast</CardTitle>
                  <p className="card-title-desc">
                    Toasts are as flexible as you need and have very little
                    required markup. At a minimum, we require a single element
                    to contain your “toasted” content and strongly encourage a
                    dismiss button.
                  </p>

                  <div style={{minHeight: "110px"}}>
                    <Toast>
                      <ToastHeader>
                        <img src={logo} alt="" className="me-2" height="18" />
                        Upzet
                      </ToastHeader>
                      <ToastBody>
                        Hello, world! This is a toast message.
                      </ToastBody>
                    </Toast>
                  </div>
                </CardBody>
              </Card>
            </Col>

            <Col xl={6}>
              <Card>
                <CardBody>
                  <CardTitle>Translucent</CardTitle>
                  <p className="card-title-desc">
                    Toasts are slightly translucent, too, so they blend over
                    whatever they might appear over. For browsers that support
                    the <code>backdrop-filter</code> CSS property, we'll also
                    attempt to blur the elements under a toast.
                  </p>
                  <div style={{minHeight: "110px"}}>
                    <Toast isOpen={toast5}>
                      <ToastHeader toggle={toggleToast5}>
                        <img src={logo} alt="" className="me-2" height="18" />
                        <strong className="me-auto">Upzet</strong>
                        <small
                          className="text-muted"
                          style={{ marginLeft: "165px", fontWeight: "500" }}
                        >
                          11 min ago
                        </small>
                      </ToastHeader>
                      <ToastBody color="primary">
                        Hello, world! This is a toast message.
                      </ToastBody>
                    </Toast>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col xl={6}>
              <Card>
                <CardBody>
                  <CardTitle>Stacking</CardTitle>
                  <p className="card-title-desc">
                    For systems that generate more notifications, consider using
                    a wrapping element so they can easily stack.
                  </p>

                  <div style={{ minHeight: "230px" }}>
                    <div
                      aria-live="polite"
                      aria-atomic="true"
                      className="position-relative"
                    >
                      <div className="toast-container position-absolute top-0 end-0 p-2 p-lg-3">
                        <div className="rounded" style={{ zIndex: "11" }}>
                          <Toast isOpen={toast6}>
                            <ToastHeader toggle={toggleToast6}>
                              <img
                                src={logo}
                                alt=""
                                className="me-2"
                                height="18"
                              />
                              <strong className="me-auto">Upzet</strong>
                              <small
                                className="text-muted"
                                style={{
                                  marginLeft: "170px",
                                  fontWeight: "500",
                                }}
                              >
                                just now
                              </small>
                            </ToastHeader>
                            <ToastBody color="primary">
                              See? Just like this.
                            </ToastBody>
                          </Toast>
                        </div>
                        <div className="toast fade show" style={{ zIndex: "11" }}>
                          <Toast isOpen={toast7}>
                            <ToastHeader toggle={toggleToast7}>
                              <img
                                src={logo}
                                alt=""
                                className="me-2"
                                height="18"
                              />
                              <strong className="me-auto">Upzet</strong>
                              <small
                                className="text-muted"
                                style={{
                                  marginLeft: "170px",
                                  fontWeight: "500",
                                }}
                              >
                                2 sec ago
                              </small>
                            </ToastHeader>
                            <ToastBody color="primary">
                              Heads up, toasts will stack automatically
                            </ToastBody>
                          </Toast>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>

            <Col xl={6}>
              <Card>
                <CardBody>
                  <CardTitle>Custom content</CardTitle>
                  <p className="card-title-desc">
                    Customize your toasts by removing sub-components, tweaking
                    them with utilities, or by adding your own markup.
                  </p>

                  <div className="d-flex flex-column gap-3">
                    <div
                      className="toast fade show align-items-center text-white border-0"
                      role="alert"
                      aria-live="assertive"
                      aria-atomic="true"
                    >
                      <div className="d-flex">
                        <Toast isOpen={toast8}>
                          <ToastHeader toggle={toggleToast8}>
                            Hello, world! This is a toast message.
                          </ToastHeader>
                        </Toast>
                      </div>
                    </div>

                    <div aria-live="polite" aria-atomic="true">
                      <div
                        className="toast fade show align-items-center text-white bg-primary border-0"
                        role="alert"
                        aria-live="assertive"
                        aria-atomic="true"
                      >
                        <div className="d-flex">
                          <Toast isOpen={toast9}>
                            <ToastHeader toggle={toggleToast9}>
                              Hello, world! This is a toast message.
                            </ToastHeader>
                          </Toast>
                        </div>
                      </div>
                    </div>
                    <Toast>
                      <ToastHeader
                        icon={
                          <Spinner color="primary" size="sm">
                            Loading...
                          </Spinner>
                        }
                      >
                        Upzet{" "}
                      </ToastHeader>
                      <ToastBody>
                        Hello, world! This is a toast message.
                      </ToastBody>
                    </Toast>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col xl={12}>
              <Card>
                <CardBody>
                  <CardTitle>Toasts Example</CardTitle>
                  <p className="card-title-des">
                    Click the button below to show a toast
                  </p>
                  <div className="d-flex flex-wrap gap-2">
                    <div className="position-relative">
                      <Button
                        type="button"
                        color="primary"
                        id="liveToastBtn"
                        className="me-2"
                        onClick={toggleToast}
                      >
                        Right Side Bottom toast
                      </Button>

                      <div
                        className="position-fixed bottom-0 end-0 p-3"
                        style={{ zIndex: "1005" }}
                      >
                        <Toast isOpen={toast}>
                          <ToastHeader toggle={toggleToast}>
                            <img
                              src={logo}
                              alt=""
                              className="me-2"
                              height="18"
                            />
                            Upzet
                          </ToastHeader>
                          <ToastBody color="primary">
                            Hello, world! This is a toast message.
                          </ToastBody>
                        </Toast>
                      </div>

                      <Button
                        type="button"
                        color="success"
                        id="liveToastBtn"
                        className="me-2"
                        onClick={toggleToast1}
                      >
                        Left Side Top Toast
                      </Button>

                      <div
                        className="position-fixed top-0 end-0 p-3"
                        style={{ zIndex: "1005" }}
                      >
                        <Toast isOpen={toast1}>
                          <ToastHeader toggle={toggleToast1}>
                            <img
                              src={logo}
                              alt=""
                              className="me-2"
                              height="18"
                            />
                            Upzet
                          </ToastHeader>
                          <ToastBody color="primary">
                            Hello, world! This is a toast message.
                          </ToastBody>
                        </Toast>
                      </div>

                      <Button
                        type="button"
                        color="warning"
                        id="liveToastBtn"
                        className="me-2"
                        onClick={toggleToast2}
                      >
                        Right Side Top Toast
                      </Button>

                      <div
                        className="position-fixed top-0 start-0 p-3"
                        style={{ zIndex: "1005" }}
                      >
                        <Toast isOpen={toast2}>
                          <ToastHeader toggle={toggleToast2}>
                            <img
                              src={logo}
                              alt=""
                              className="me-2"
                              height="18"
                            />
                            Upzet
                          </ToastHeader>
                          <ToastBody color="primary">
                            Hello, world! This is a toast message.
                          </ToastBody>
                        </Toast>
                      </div>

                      <Button
                        type="button"
                        color="danger"
                        id="liveToastBtn"
                        className="me-2"
                        onClick={toggleToast3}
                      >
                        Right Side Bottom Toast
                      </Button>

                      <div
                        className="position-fixed bottom-0 start-0 p-3"
                        style={{ zIndex: "1005" }}
                      >
                        <Toast isOpen={toast3}>
                          <ToastHeader toggle={toggleToast3}>
                            <img
                              src={logo}
                              alt=""
                              className="me-2"
                              height="18"
                            />
                            Upzet
                          </ToastHeader>
                          <ToastBody color="primary">
                            Hello, world! This is a toast message.
                          </ToastBody>
                        </Toast>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default UiToasts;
