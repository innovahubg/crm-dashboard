import React, { useEffect } from "react";
import {
  Row,
  Col,
  CardBody,
  Card,
  Alert,
  Container,
  Input,
  Label,
  Form,
  FormFeedback,
} from "reactstrap";

// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";

// action
import { registerUser, apiError } from "../../store/actions";

//redux
import { useSelector, useDispatch } from "react-redux";

import { Link, redirect } from "react-router-dom";

// import images
import logolight from "../../assets/images/logo.png";
import logodark from "../../assets/images/logo.png";

const Register = (props) => {
  const dispatch = useDispatch();

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      email: "",
      password: "",
      name: "",
      lastName: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Ingresa un correo"),
      password: Yup.string().required("Ingresa una contraseña valida"),
      name: Yup.string().required("Ingresa un nombre valido"),
      lastName: Yup.string().required("Ingresa un apellido valido"),
      phone: Yup.string().required("Ingresa un numero valido"),
    }),
    onSubmit: async (values) => {
      console.log("send data", values);
      const req = await fetch(`${process.env.REACT_APP_API}/users/signup`, {
        method: "POST",
      });
      const res = await req.json();
      console.log(res);
      redirect("/login");
      dispatch(registerUser(values));
    },
  });

  const { user, registrationError } = useSelector((state) => ({
    user: state.account.user,
    registrationError: state.account.registrationError,
  }));

  // handleValidSubmit
  // const handleValidSubmit = values => {
  //   dispatch(registerUser(values));
  // };

  useEffect(() => {
    dispatch(apiError(""));
  }, [dispatch]);

  return (
    <div className="accessSpace">
      <div className="leftColAccess"></div>
      <div className="rightColAccess">
        <div className="d-flex flex-column">
          <Card className="w-full flex-column d-flex">
            <CardBody className="p-4">
              <div className="text-center">
                <Link to="/registro" className="">
                  <div className="text-center">
                    <img
                      src={logodark}
                      alt="InnovaHubGroup"
                      className="auth-logo logo-dark mx-auto w-25"
                    />
                    <img
                      src={logolight}
                      alt="InnovaHubGroup"
                      className="auth-logo logo-light mx-auto w-25"
                    />
                  </div>
                </Link>
              </div>

              <Form
                className="form-horizontal"
                onSubmit={(e) => {
                  e.preventDefault();
                  validation.handleSubmit();
                  return false;
                }}
              >
                {user && user ? (
                  <Alert color="success">Register User Successfully</Alert>
                ) : null}

                {registrationError && registrationError ? (
                  <Alert color="danger">
                    <div>{registrationError}</div>
                  </Alert>
                ) : null}

                <Row>
                  <Col md={12} className="bg-orange-500">
                    <div className="mb-2">
                      <Label className="form-label ">Nombre(s)</Label>
                      <Input
                        name="name"
                        type="text"
                        placeholder="Ingresa tu nombre"
                        className="w-full mr-3"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.name || ""}
                        invalid={
                          validation.touched.name && validation.errors.name
                            ? true
                            : false
                        }
                      />
                      {validation.touched.name && validation.errors.name ? (
                        <FormFeedback type="invalid">
                          <div>{validation.errors.name}</div>
                        </FormFeedback>
                      ) : null}
                    </div>
                    <div className="mb-2">
                      <Label className="form-label">Apellido(s)</Label>
                      <Input
                        name="lastName"
                        type="text"
                        placeholder="Ingresa tus apellidos"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.lastName || ""}
                        invalid={
                          validation.touched.lastName &&
                            validation.errors.lastName
                            ? true
                            : false
                        }
                      />
                      {validation.touched.lastName &&
                        validation.errors.lastName ? (
                        <FormFeedback type="invalid">
                          <div>{validation.errors.lastName}</div>
                        </FormFeedback>
                      ) : null}
                    </div>

                    <div className="mb-2">
                      <Label className="form-label">Correo electrónico</Label>
                      <Input
                        id="email"
                        name="email"
                        className="form-control"
                        placeholder="Ingresa tu correo electrónico"
                        type="email"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.email || ""}
                        invalid={
                          validation.touched.email && validation.errors.email
                            ? true
                            : false
                        }
                      />
                      {validation.touched.email && validation.errors.email ? (
                        <FormFeedback type="invalid">
                          <div>{validation.errors.email}</div>
                        </FormFeedback>
                      ) : null}
                    </div>

                    <div className="mb-2">
                      <Label className="form-label">Contraseña</Label>
                      <Input
                        name="password"
                        type="password"
                        placeholder="Ingresar contraseña"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.password || ""}
                        invalid={
                          validation.touched.password &&
                            validation.errors.password
                            ? true
                            : false
                        }
                      />
                      {validation.touched.password &&
                        validation.errors.password ? (
                        <FormFeedback type="invalid">
                          <div>{validation.errors.password}</div>
                        </FormFeedback>
                      ) : null}
                    </div>
                    <div className="mb-2">
                      <Label className="form-label">Número telefónico</Label>
                      <Input
                        name="phone"
                        type="text"
                        placeholder="Ingresar número telefónico"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.phone || ""}
                        invalid={
                          validation.touched.phone && validation.errors.phone
                            ? true
                            : false
                        }
                      />
                      {validation.touched.phone && validation.errors.phone ? (
                        <FormFeedback type="invalid">
                          <div>{validation.errors.phone}</div>
                        </FormFeedback>
                      ) : null}
                    </div>
                    <div className="mb-2">
                      <label htmlFor="titlebot-field" className="form-label">
                        Pais
                      </label>
                      <div className="d-flex">
                        <select className="form-control">
                          <option value="mx">Mexico</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="term-conditionCheck"
                      />
                      <label
                        className="form-check-label fw-normal"
                        htmlFor="term-conditionCheck"
                      >
                        Acepto los&nbsp;
                        <Link to="#" className="text-primary">
                          Términos y Condiciones
                        </Link>
                      </label>
                    </div>
                    <div className="d-grid mt-4">
                      <button
                        className="btn btn-primary waves-effect waves-light"
                        type="submit"
                      >
                        Registro
                      </button>
                    </div>
                  </Col>
                </Row>
              </Form>
            </CardBody>
          </Card>
          <div className="mt-5 text-center">
            <p className="text-black">
              ¿Ya tienes una cuenta?
              <Link to="/login" className="fw-medium text-primary">
                {" "}
                Iniciar sesión{" "}
              </Link>{" "}
            </p>
            <p className="text-black">
              © {new Date().getFullYear()}
              <i className="mdi mdi-heart text-danger"></i> InnovaHubGroup
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
