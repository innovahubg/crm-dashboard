import React, { useState, useEffect } from "react";
import moment from "moment";
import { BlobServiceClient } from '@azure/storage-blob';
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


  //   brandingColors: {
  //     color1: "#ffffff",
  //     color2: "#000000",
  //   },

  //En newAITemplate mostrar las brands y usar el obj para crearlo generateTemplateHtml linea 35

  const fetchData = async (id) => {
    const { data } = await GetData(`/companies/${id}`);
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
      //let file = e.target.value
      console.log({ file })

      const connectionString = '';
      console.log({ connectionString })
      const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
      console.log({ blobServiceClient })
      // let reader = new FileReader();
      // console.log("next");

      const containerName = 'corporateIdentity';
      const blobName = file.name
      console.log("blob", blobName)
      const containerClient = blobServiceClient.getContainerClient(containerName);

      await containerClient.createIfNotExists();

      const blockBlobClient = containerClient.getBlockBlobClient(blobName);

      const res = await blockBlobClient.uploadBrowserData(file);

      console.log({ res })

      alert('Archivo subido con éxito!');

      // reader.onload = async function () {
      //   base64String = reader.result.replace("data:", "")
      //     .replace(/^.+,/, "");

      //   //imageBase64Stringsep = base64String;

      //   // alert(imageBase64Stringsep);
      //   //console.log(base64String);
      //   const upload = await PostData("/company/upload-image", { "base64": base64String })
      //   setUrlImg(upload.data.url)
      //   console.log(upload.data.url)
      // }
      // reader.readAsDataURL(file);
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
          logoImage: "https://upload.wikimedia.org/wikipedia/commons/7/75/Whatsapp_logo_svg.png",
        },
        instagram: {
          link: `https://www.instagram.com/${unInsta}`,
          logoImage:
            "https://freelogopng.com/images/all_img/1658586823instagram-logo-transparent.png",
        }
      },
      brandingColors: {
        color1: co,
        color2: ct,
      },
    }

    const saveUser = await PostData("/companies/brands", data)
    console.log({ saveUser })
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
                  identidadXD
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
            </div>
            <div className="mb-3"><img width={200} height={"auto"} src={urlImg} /></div>

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
