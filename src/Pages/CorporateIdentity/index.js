import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
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
import { RingLoader } from "react-spinners";
import DataTable from "react-data-table-component";
import { GetData, PostData } from "../../services/api";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import validateEmail from "../../helpers/validateEmail";
import axios from "axios";

const CorporateIdentity = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [email, setEmail] = useState("");
  const [valid, setValid] = useState(true);
  const [urlImg, setUrlImg] = useState("");
  const [personalBrand, setPB] = useState("")
  const [phone, setPhone] = useState("")
  const [msg, setMsg] = useState("")
  const [unInsta, setUNI] = useState("")
  const [name, setName] = useState("")
  const [co, setCO] = useState("#000000")
  const [ct, setCT] = useState("#000000")

  const [base64Image, setBase64Image] = useState(null);


  //   brandingColors: {
  //     color1: "#ffffff",
  //     color2: "#000000",
  //   },

  //En newAITemplate mostrar las brands y usar el obj para crearlo generateTemplateHtml linea 35

  const fetchData = async (id) => {
    const { data } = await GetData(`/companies/${id}`);
    console.log({ data })
    setBrands(data.brand)
  };

  useEffect(() => {
    try {
      //fetchData();
      const { companyId } = JSON.parse(localStorage.getItem("authUser"))
      fetchData(companyId)
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateInput = (e) => {
    const { name, value } = e.target;
    console.log(name, value)

  };

  const handleUpdateImg = async (e) => {
    // let base64String = "";
    // console.log(e.target.value)
    try {
      let file = document.querySelector(
        'input[type=file]')['files'][0];

      const formData = new FormData()
      let reader = new FileReader();
      // let ext = file.name.split('.').pop().toLowerCase()

      const { token } = JSON.parse(localStorage.getItem("authUser"));

      reader.onload = async () => {
        const result = reader.result
        // const name = uuidv4() + "." + ext



        setBase64Image(result);
        formData.append("file", file)
        console.log({ formData })


        // const response = await axios.post("https://builder.crearnegociodigital.com/upload", {
        //   headers: {
        //     "Content-Type": "application/json"
        //   },
        //   body: formData
        // })

        const { url } = await axios.post(`${process.env.REACT_APP_API}/company/upload-image`, formData, {
          headers: {
            'content-type': 'multipart/form-data',
            'authorization': "Bearer " + token
          }
        })

        setUrlImg(url)
        alert('Archivo subido con éxito!');
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.log(err)
    }
  }

  const sendNewBrand = async (e) => {
    e.preventDefault();
    const data = {
      logoUrl: urlImg,
      personalBrand,
      name,
      contact: {
        email,
        whatsapp: {
          link: `https://api.whatsapp.com/send/?phone=${phone}&text=${msg}`,
          logoImage: "https://cdn.ihubg.tech/crm/image-2024-08-29T05-32-34-404Z-47021265-90fb-4bf8-9539-d79f47eabae7.png",
        },
        instagram: {
          link: `https://www.instagram.com/${unInsta}`,
          logoImage:
            "https://cdn.ihubg.tech/crm/image-2024-08-29T05-33-12-999Z-47e95b3a-7804-4ce8-8dec-a5c02a73d82c.webp",
        }
      },
      brandingColors: {
        color1: co,
        color2: ct,
      },
    }

    console.log({ data })

    const saveBrand = await PostData("/companies/brands", data)
    console.log({ saveBrand })
  };


  const columns = [
    {
      name: <span className="font-weight-bold fs-13">Nombre</span>,
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Personal brand</span>,
      selector: (row) => (
        <span>
          <i
            className={
              "mdi " +
              (row.valid
                ? "mdi-check-circle checkGreen"
                : "mdi-close-circle closeRed")
            }
          ></i>
        </span>
      ),
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Acción</span>,
      sortable: true,

      cell: (data) => {
        return (
          <UncontrolledDropdown className="dropdown d-inline-block">
            <DropdownToggle
              className="btn btn-soft-secondary btn-sm"
              tag="button"
            >
              <i className="ri-more-fill align-middle"></i>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-end">
              <DropdownItem>
                <Link to={`/campaigns/${data.id}`} className="text-muted">
                  <i className="ri-eye-fill align-bottom me-2 text-muted"></i>
                  Detalle {data.name}
                </Link>
              </DropdownItem>
              <DropdownItem className="edit-item-btn">
                <i className="ri-pencil-fill align-bottom me-2 text-muted"></i>
                Edit
              </DropdownItem>
              <DropdownItem className="remove-item-btn">
                <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i>{" "}
                Delete{" "}
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        );
      },
    },
  ];

  return (
    <div className="page-content">
      <Container fluid={true}>
        <Breadcrumbs title="IHubG" breadcrumbItem="Identidad corporativa" />
        <Row className="mb-4">
          <Row className="g-4 mb-3">
            <Col className="col-sm-auto">
              <div className="d-flex gap-1 justify-content-end">
                <Button
                  color="success"
                  className="add-btn"
                  onClick={() => {
                    setModal(true);
                  }}
                  id="create-btn"
                >
                  <i className="ri-add-line align-bottom me-1"></i> Nueva
                  identidad
                </Button>
                {/* <Button color="soft-danger"
                                                    onClick="deleteMultiple()"
                                                    ><i className="ri-delete-bin-2-line"></i></Button> */}
              </div>
            </Col>
            <Col className="col-sm">
              <div className="d-flex justify-content-sm-end">
                <div className="search-box ms-2">
                  <input
                    type="text"
                    className="form-control search"
                    placeholder="Buscar..."
                  />
                  <i className="ri-search-line search-icon"></i>
                </div>
              </div>
            </Col>
          </Row>
          <Row className="mb-4">
            {loading ? (
              <div className="d-flex justify-content-center p-5 w-full">
                <RingLoader color="#E9553E" />
              </div>
            ) : (
              <DataTable
                data={brands}
                columns={columns}
                noDataComponent={<span className="py-4">Sin resultados</span>}
              />
            )}
          </Row>
        </Row>
      </Container>
      <Modal
        isOpen={modal}
        toggle={() => {
          setModal(false);
        }}
        centered
      >
        <ModalHeader
          className="bg-light p-3"
          id="exampleModalLabel"
          toggle={() => setModal(false)}
        >
          Registrar identidads
        </ModalHeader>
        <div className="tablelist-form">
          <ModalBody style={{ height: "auto" }}>
            <div className="mb-3">
              <label htmlFor="titlebot-field" className="form-label">
                Logotipo
              </label>
              <input
                className="form-control"
                placeholder="Ingresa el logotipo a registrar"
                // value={urlImg}
                onChange={handleUpdateImg}
                type="file"
              />
              {base64Image && <img src={base64Image} alt="Uploaded Image" className="w-full my-4" />}
            </div>
            {/* <div className="mb-3"><img width={200} height={"auto"} src={urlImg} /></div> */}

            <div className="mb-3">
              <label htmlFor="titlebot-field" className="form-label">
                Nombre del brand
              </label>
              <input
                className="form-control"
                placeholder="Ingresa un nombre de referencia"
                value={name}
                name="name"
                onChange={e => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="titlebot-field" className="form-label">
                Marca personal
              </label>
              <input
                className="form-control"
                placeholder="Ingresa tu marca personal"
                value={personalBrand}
                name="personalBrand"
                onChange={e => setPB(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="titlebot-field" className="form-label">
                Numero de whatsapp
              </label>
              <input
                className="form-control"
                placeholder="Ingresa el numero de whatsapp"
                value={phone}
                onChange={e => setPhone(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="titlebot-field" className="form-label">
                Mensaje de whatsapp
              </label>
              <input
                className="form-control"
                placeholder="Ingresa el mensaje de whatsapp"
                value={msg}
                onChange={e => setMsg(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="titlebot-field" className="form-label">
                Nombre de usuario instagram
              </label>
              <input
                className="form-control"
                placeholder="Ingresa el link de instagram"
                value={unInsta}
                onChange={e => setUNI(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="titlebot-field" className="form-label">
                Email
              </label>
              <input
                className="form-control"
                placeholder="Ingresa el email a registrar"
                value={email}
                name="email"
                type="email"
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className="d-flex justify-content-between">
              <div className="mb-3 w-50">
                <label htmlFor="titlebot-field" className="form-label">
                  Color primario
                </label>
                <input
                  className="form-control"
                  placeholder="Ingresa el email a registrar"
                  value={co}
                  name="color1"
                  onChange={e => setCO(e.target.value)}
                  type="color"
                />
              </div>
              <div className="mb-3 w-50">
                <label htmlFor="titlebot-field" className="form-label">
                  Color secundario
                </label>
                <input
                  className="form-control"
                  placeholder="Ingresa el email a registrar"
                  value={ct}
                  onChange={e => setCT(e.target.value)}
                  type="color"
                />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <div className="">
              <button
                type="button"
                className="btn btn-light mx-4"
                onClick={() => setModal(false)}
              >
                Cerrar
              </button>
              <button
                className={"btn btn-success " + (!valid && "disabled")}
                onClick={sendNewBrand}
              >
                Registrar
              </button>
            </div>
          </ModalFooter>
        </div>
      </Modal>
    </div>
  );
};

export default CorporateIdentity;
