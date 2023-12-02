import PropTypes from "prop-types";
import React, { useEffect } from "react";
import logolight from "../../assets/images/logo.png";
import logodark from "../../assets/images/logo.png";

import {
  Row,
  Col,
  CardBody,
  Card,
  Alert,
  Container,
  Form,
  Input,
  FormFeedback,
  Label,
} from "reactstrap";

//redux
import { useSelector, useDispatch } from "react-redux";

import { Link, redirect } from "react-router-dom";
import withRouter from "../../components/Common/withRouter";

// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";

//Social Media Imports
import { GoogleLogin } from "react-google-login";
// import TwitterLogin from "react-twitter-auth"
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";

// actions
import { loginUser, socialLogin } from "../../store/actions";

//Import config
import { facebook, google } from "../../config";

import { useNavigate } from "react-router-dom";

import { LoginService } from "../../services/auth";

const Login = (props) => {
  document.title = "CRM IHG";
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      email: "hola@arcemunoz.tech" || "",
      password: "amocampo" || "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Your Email"),
      password: Yup.string().required("Please Enter Your Password"),
    }),
    onSubmit: async (values) => {
      try {
        const next = await LoginService(values);
        if (next) {
          navigate("/dashboard");
        }
      } catch (err) {
        console.log(err);
      }

      // if(!error)

      // dispatch(loginUser(res, props.router.navigate));
    },
  });

  const { error } = useSelector((state) => ({
    error: state.login.error,
  }));

  // handleValidSubmit
  // const handleValidSubmit = (event, values) => {
  //   dispatch(loginUser(values, props.router.navigate));
  // };

  const signIn = (res, type) => {
    if (type === "google" && res) {
      const postData = {
        name: res.profileObj.name,
        email: res.profileObj.email,
        token: res.tokenObj.access_token,
        idToken: res.tokenId,
      };
      dispatch(socialLogin(postData, props.router.navigate, type));
    } else if (type === "facebook" && res) {
      const postData = {
        name: res.name,
        email: res.email,
        token: res.accessToken,
        idToken: res.tokenId,
      };
      dispatch(socialLogin(postData, props.router.navigate, type));
    }
  };

  //handleGoogleLoginResponse
  const googleResponse = (response) => {
    signIn(response, "google");
  };

  //handleTwitterLoginResponse
  // const twitterResponse = e => {}

  //handleFacebookLoginResponse
  const facebookResponse = (response) => {
    signIn(response, "facebook");
  };

  useEffect(() => {
    //document.body.className = "bg-pattern";
    // remove classname when component will unmount
    return function cleanup() {
      document.body.className = "";
    };
  });

  return (
    <React.Fragment>
      {/*
        <div className="bg-overlay"></div>
      */}
      <div className="accessSpace">
        <div className="leftColAccess"></div>
        <div className="rightColAccess">
          <div className="d-flex flex-column">
            <Card className="w-full flex-column d-flex">
              <CardBody className="p-4">
                <div>
                  <div className="text-center">
                    <img
                      src={logodark}
                      alt="InnovaHubGroup"
                      className="auth-logo logo-dark mx-auto"
                    />
                    <img
                      src={logolight}
                      alt="InnovaHubGroup"
                      className="auth-logo logo-light mx-auto"
                    />
                  </div>

                  <Form
                    className="form-horizontal"
                    onSubmit={(e) => {
                      e.preventDefault();
                      validation.handleSubmit();
                      return false;
                    }}
                  >
                    {error ? (
                      <Alert color="danger">
                        <div>{error}</div>
                      </Alert>
                    ) : null}
                    <Row>
                      <Col md={12}>
                        <div className="mb-4">
                          <Label className="form-label">
                            Correo electrónico
                          </Label>
                          <Input
                            name="email"
                            className="form-control"
                            placeholder="Ingresar correo electrónico"
                            type="email"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.email || ""}
                            invalid={
                              validation.touched.email &&
                              validation.errors.email
                                ? true
                                : false
                            }
                          />
                          {validation.touched.email &&
                          validation.errors.email ? (
                            <FormFeedback type="invalid">
                              <div>{validation.errors.email}</div>
                            </FormFeedback>
                          ) : null}
                        </div>
                        <div className="mb-4">
                          <Label className="form-label">Contraseña</Label>
                          <Input
                            name="password"
                            value={validation.values.password || ""}
                            type="password"
                            placeholder="Ingresar contraseña"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
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
                              <div> {validation.errors.password} </div>
                            </FormFeedback>
                          ) : null}
                        </div>

                        <Row>
                          {/* <Col>
                              <div className="form-check">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  id="customControlInline"
                                />
                                <label
                                  className="form-label form-check-label"
                                  htmlFor="customControlInline"
                                >
                                  Remember me
                                </label>
                              </div>
                            </Col> */}
                          <Col className="text-center">
                            <div className="text-center mt-3">
                              <Link to="/auth-recoverpw" className="text-muted">
                                <i className="mdi mdi-lock"></i> Recuperar
                                contraseña
                              </Link>
                            </div>
                          </Col>
                        </Row>
                        <div className="d-grid mt-4">
                          <button
                            className="btn btn-primary waves-effect waves-light"
                            type="submit"
                          >
                            Acceder
                          </button>
                        </div>
                        {/*
                          <div className="mt-4 text-center">
                            <h5 className="font-size-14 mb-3">Sign in with</h5>

                            <ul className="list-inline">
                              <li className="list-inline-item">
                                <FacebookLogin
                                  appId={facebook.APP_ID}
                                  autoLoad={false}
                                  callback={facebookResponse}
                                  render={(renderProps) => (
                                    <Link
                                      to="#"
                                      className="social-list-item bg-primary text-white border-primary"
                                      onClick={renderProps.onClick}
                                    >
                                      <i className="mdi mdi-facebook" />
                                    </Link>
                                  )}
                                />
                              </li>

                              <li className="list-inline-item">
                                <GoogleLogin
                                  clientId={google.CLIENT_ID}
                                  render={(renderProps) => (
                                    <Link
                                      to="#"
                                      className="social-list-item bg-danger text-white border-danger"
                                      onClick={renderProps.onClick}
                                    >
                                      <i className="mdi mdi-google" />
                                    </Link>
                                  )}
                                  onSuccess={googleResponse}
                                  onFailure={() => {}}
                                />
                              </li>
                            </ul>
                          </div>
                          */}
                      </Col>
                    </Row>
                  </Form>
                </div>
              </CardBody>
            </Card>
            <div className="mt-5 text-center">
              <p className="text-black">
                <Link to="/registro" className="fw-medium text-primary">
                  Registrarse
                </Link>
              </p>
              <p className="text-black">
                © {new Date().getFullYear()}
                <i className="mdi mdi-heart text-danger"></i> InnovaHubGroup
              </p>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default withRouter(Login);

Login.propTypes = {
  history: PropTypes.object,
};
