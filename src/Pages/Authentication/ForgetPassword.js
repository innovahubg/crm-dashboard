import PropTypes from "prop-types";
import React, { useEffect, useState, useCallback } from "react";
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

import {
  LoginSocialGoogle,
  LoginSocialFacebook,
  LoginSocialInstagram,
} from 'reactjs-social-login';

import {
  FacebookLoginButton,
  GoogleLoginButton,
  InstagramLoginButton,
} from 'react-social-login-buttons';

//redux
import { useSelector, useDispatch } from "react-redux";

import { Link, redirect } from "react-router-dom";
import withRouter from "../../components/Common/withRouter";
// import FacebookLogin from 'react-facebook-login';
import { Helmet } from "react-helmet";



// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";

//Social Media Imports
import { GoogleLogin } from "react-google-login";
// import TwitterLogin from "react-twitter-auth"
// import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";

// actions
import { loginUser, socialLogin } from "../../store/actions";

//Import config
import { facebook, google } from "../../config";

import { useNavigate } from "react-router-dom";

import { LoginService } from "../../services/auth";

const Login = (props) => {
  document.title = "CRM IHG";
  const navigate = useNavigate();

  const [errorAlert, setEA] = useState();
  const [passInput, setPassInput] = useState("password");

  const [provider, setProvider] = useState('');
  const [profile, setProfile] = useState();

  // const onLoginStart = useCallback(() => {
  //   alert('login start');
  // }, []);

  // const onLogoutSuccess = useCallback(() => {
  //   setProfile(null);
  //   setProvider('');
  //   alert('logout success');
  // }, []);

  const onLogout = useCallback(() => { }, []);


  const dispatch = useDispatch();

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Ingresa tu correo electrónico"),
    }),
    onSubmit: async (values) => {
      try {
        //SEND TO RECOPERY PASSWORD SERVICE
        const next = await LoginService(values);
        if (next) {
          navigate("/dashboard");
        } else {
          setEA(true);
        }
      } catch (err) {
        console.log(err);
      }

      // if(!error)

      // dispatch(loginUser(res, props.router.navigate));
    },
  });

  // const { error } = useSelector((state) => ({
  //   error: state.login.error,
  // }));

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
  const handleFacebookCallback = (response) => {
    console.log(response)
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
      <Helmet>


      </Helmet>
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
                    {errorAlert ? (
                      <Alert color="danger">
                        <div>Credenciales incorrectas</div>
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

                        <div className="d-grid mt-4">
                          <button
                            className="btn btn-primary waves-effect waves-light"
                            type="submit"
                          >
                            Recuperar contraseña
                          </button>
                        </div>

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



{/* 
<script>
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '{your-app-id}',
      cookie     : true,
      xfbml      : true,
      version    : '{api-version}'
    });
      
    FB.AppEvents.logPageView();   
      
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "https://connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
</script>*/}