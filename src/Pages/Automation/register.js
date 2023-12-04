import React, {useState} from "react";
import Xarrow, { useXarrow, Xwrapper } from "react-xarrows";
import { GetData, PostData } from "../../services/api";
import Draggable from "react-draggable";
import {
  Col,
  Card,
  CardBody,
  CardTitle
} from "reactstrap";

const boxStyle = {
  border: "grey solid 2px",
  borderRadius: "5px",
  padding: "5px"
};


const DraggableBox = ({ id, removeElement, updateXarrow, templates, automation, emails}) => {

  let [selectedEmailValue, setSelectedEmailValue] = useState({ id: '', name: 'Selecciona un remitente' });
  console.log(id);
  let selectedTemplateValue;
  let valuebtn = 0;
  // Buscar el template con el id específico
  let foundTemplate = templates.find(template => template.id === id);
  
  if (foundTemplate!=undefined){
    selectedEmailValue =  { id: foundTemplate.from , name: foundTemplate.from};
    console.log(foundTemplate);
    console.log("entra");
  }
  if (valuebtn!=0){
    valuebtn=0;
  }


  const handleTemplateChange = (event) => {
    selectedEmailValue =  { id: event.target.value , name:event.target.value};
    console.log(selectedEmailValue);
    setTimeout(()=>{
      
        updateXarrow();
      
    },1)
    
    console.log(event.target.value);
    const selectedTemplateId = event.target.value;
    console.log(selectedTemplateId);
    const selectedTemplate = templates.find(template => template.id === selectedTemplateId);
    console.log(selectedTemplate);
    if (selectedTemplate) {
      console.log(selectedEmailValue);
      setSelectedEmailValue({ id: selectedTemplate.from, name: selectedTemplate.from });
      valuebtn = 1;
    }
  };

  // Si se encuentra el template, establecer su valor para usarlo en la opción seleccionada
  selectedTemplateValue = foundTemplate ? foundTemplate : { id: '', name: 'Selecciona un template' };


  return (
    <Draggable onDrag={updateXarrow}>
      <div id={id} style={boxStyle}>
        <Col lg={12}>
          <div
            className="modal bs-example-modal"
            tabIndex="-1"
            role="dialog"
          >

            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Plantillas de Email</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={() => removeElement(id)}
                ></button>
              </div>
              <div className="modal-body">
              <label htmlFor="floatingSEmail">
                Escoge una Plantilla
                </label>
                <select onChange={handleTemplateChange}
                  className="form-select"
                  id="floatingSelectGrid"
                  aria-label="Floating label select example"
                >
                  <option value={selectedTemplateValue.id}>
                    {selectedTemplateValue.name}
                  </option>
                  {/* Filtrar y mostrar las opciones de templates, excluyendo el seleccionado */}
                  {templates.filter(template => template.id !== selectedTemplateValue.id).map((template) => (
                    <option key={template.id} value={template.id}>
                      {template.name}
                    </option>
                  ))}

                </select>
                <label htmlFor="floatingSEmail">
                Selecciona un remitente
                </label>
                <select value={selectedEmailValue.id}
                  className="form-select"
                  id="floatingSEmail"
                  aria-label="Floating label select example"
                >

                  {/* Filtrar y mostrar las opciones de templates, excluyendo el seleccionado */}
                    <option key={selectedEmailValue.id} value={selectedEmailValue.name}>
                      {selectedEmailValue.name}
                    </option>
                </select>

              </div>
            </div>
          </div>
        </Col>
      </div>
    </Draggable>
  );
};

const DraggableBoxWhat = ({ id, removeElement, updateXarrow , templates, automation, emails}) => {

  let  value = {};
  
  if (id.startsWith("idetificadorokamp1-")) {
    value = {
      id: '',
      text: 'Selecciona un template'
    }
} else {
    value = {
      id,
      text: id
    }
}

  return (
    <Draggable onDrag={updateXarrow}>
      <div id={id} style={boxStyle}>
        <Col lg={12}>
          <div
            className="modal bs-example-modal"
            tabIndex="-1"
            role="dialog"
          >

            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Plantilla de Whatsapp</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={() => removeElement(id)}
                ></button>
              </div>
              <div className="modal-body">
                <select
                  className="form-select"
                  id="floatingSelectGrid"
                  aria-label="Floating label select example"
                >
                  <option defaultValue>
                    {value.text}
                  </option>
                  <option defaultValue={value.id}>{value.text}</option>
                </select>
                <label htmlFor="floatingSelectGrid">
                  Lista de Templates
                </label>

              </div>
            </div>
          </div>
        </Col>
      </div>
    </Draggable>
  );
};

const RegisterBox = ({ id, removeElement, updateXarrow, templates,  automation, emails, idAutomation }) => {

  let activaciones = []
  let tem = templates;
  let updated = 0;
  console.log(updated);
  const getElements=()=>{
    automation.forEach(ele => {
      const elementId = ele.template;
      const element = getSelectedValueFromDiv(elementId);
      console.log(element, JSON.stringify(templates));
      
      let elementoEncontrado = tem.find(elemento => elemento.id === element);
      if (elementoEncontrado) {
        console.log("Elemento encontrado:", elementoEncontrado);
        activaciones.push({template: elementoEncontrado.id, send: elementoEncontrado.type, type:"single", params: elementoEncontrado.params, body:{html:""}, from: elementoEncontrado.from});
        
      }
    });
    activaciones.unshift();
    console.log("aqui entra...", activaciones);
    save(idAutomation, activaciones);
  }

  const save = async (id, registered)=>{

    console.log(updated,"aqui llega");
    if (updated === 0){
      try{
        const  data  = await PostData("/automation/register",{idAutomation:id, registered});
        updated=1;
      }
      catch(e){
  
      }
    }

  }

  const Activate = async (id, activate)=>{
    try{
      const  data  = await PostData("/automation/register/activate",{idAutomation:id, activate});
    }
    catch(e){

    }
  }

  function getSelectedValueFromDiv(divId) {
    // Busca el elemento select dentro del div contenedor
    const selectElement = document.querySelector(`#${divId} select`);
    if (selectElement) {
      return selectElement.value;
    } else {
      return null; // o maneja la situación de que no se encontró el elemento
    }
  }

  return (
    <Draggable onDrag={updateXarrow}>
      <div id={id} style={boxStyle}>
        <Col lg={12}>

          <div
            className="modal bs-example-modal"
            tabIndex="-1"
            role="dialog"
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Registro</h5>
              </div>
              <div className="modal-body">
                <p>El prospecto se <code>registra</code> en tu campaña!</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-success" onClick={getElements}>
                  Activar
                </button>
                <button
                  type="button"
                  className="btn btn-dark"
                  data-dismiss="modal"
                >
                  Probar
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  data-dismiss="modal"
                >
                  Detener
                </button>

              </div>
            </div>
          </div>
        </Col>
      </div>
    </Draggable>
  );
};


const RegisterXarrow = ({ removeElement, updateXarrow, automation, templates, emails, idAutomation }) => {

  console.log(automation);
  const renderElements = () => {
    let jsxElements = [];

    if (automation && automation.length > 0) {
      const registeredElements = automation.map((element, index) => {

        let Component;
        switch (element.send) {
          case "email":
            Component = DraggableBox;
            break;
          case "RegisterBox":
            Component =   RegisterBox;
            break;
          case "whatsapp":
            Component = DraggableBoxWhat;
            break;
          default:
            Component = null;
        }

        return (
          <React.Fragment key={element.template}>
            {Component && <Component id={element.template} removeElement={removeElement} updateXarrow={updateXarrow} templates={templates} automation={automation} emails={emails} idAutomation={idAutomation} />}
            {index < automation.length - 1 && (
              <Xarrow
                key={`arrow-${element.template}-${automation[index + 1].template}`}
                start={element.template}
                end={automation[index + 1].template}
                // Configuración adicional de Xarrow si es necesario
              />
            )}
          </React.Fragment>
        );
      });

      // Concatenar los elementos de 'registeredElements' después del primer elemento de 'elements'
      jsxElements = jsxElements.concat(registeredElements);
    }

    return jsxElements;
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-evenly", width: "100%" }}>
      <Xwrapper>
        {renderElements()}
      </Xwrapper>
    </div>
  );
};


export { DraggableBox, RegisterBox, DraggableBoxWhat };
export default RegisterXarrow;
