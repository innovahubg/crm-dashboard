import { useCallback, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import NodeInteraction from './NodeInteraction';

import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import 'reactflow/dist/style.css';


const minimapStyle = {height: 120,};
const nodeTypes = {custom : NodeInteraction};

export default function EditBot() {

    const initInteraction = {
        message : '',
        buttons : [],
        media : []
    }
    const [interaction, setInteraction] = useState(initInteraction);

    const initAddButton = {
        label : ''
    }
    const [buttonInteraction, setButtonInteraction] = useState(initAddButton);

    const [modal, setModal] = useState(false);

    const nodeStyleStart = {
        borderColor: '#E9553E', // Color del borde
        background: '#E9553E', // Color de fondo
        color: '#FFFFFF', // Color del texto
        borderRadius: 50, // Bordes redondeados (ajusta según tu preferencia)
        padding: 10, // Espaciado interno (ajusta según tu preferencia)
    };

    const nodeStyleInteraction = {
        borderColor: '#1b2c3f', // Color del borde
        background: '#1b2c3f', // Color de fondo
        color: '#FFFFFF', // Color del texto
        borderRadius: 10, // Bordes redondeados (ajusta según tu preferencia)
        padding: 10, // Espaciado interno (ajusta según tu preferencia)
    }


  const toggle = () => setModal(!modal);

    const initialNodes = [
        {
            id: '1',
            type: 'input',
            data: {
              label: 'Inicio',
            },
            position: { x: 250, y: 0 },
            style: nodeStyleStart,
        }
    ]

    const initialEdges = [
        // { id: 'e1-2', source: '1', target: '2', animated: true},
    ]

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onInit = (reactFlowInstance) => console.log('flow loaded:', reactFlowInstance);
    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);


    const addInteraction = () => {
        toggle();

        setNodes((nds) => {
            return [...nds, {
                id: (nds.length + 1).toString(),
                type : 'custom',
                data: {...interaction},
                position: { x: 100, y: 100 },
                style : nodeStyleInteraction
            },]
        });
        setInteraction(initInteraction);
    }
    

  return (<>
    <div className="page-content">
        <div style={{ height: 'calc(100vh - 200px)' }}>
            <div>
                <Button onClick={toggle}>Agregar Interacción</Button>
            </div>
            <ReactFlow
                zoom={0.1}
                nodes={nodes}
                nodeTypes={nodeTypes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onClick={(event, element) => console.log('click', event)}
                onInit={onInit}
                fitView
            >
                <MiniMap style={minimapStyle} zoomable pannable />
                <Background />
                <Controls />
            </ReactFlow>
        </div>
    </div>

    <div>
    <div>
      <Button color="primary" onClick={toggle}>
        Abrir Modal
      </Button>
        <Modal isOpen={modal} toggle={toggle} className="right-modal">
            <ModalHeader toggle={toggle} style={{borderRadius: 0}}>Nueva Interacción</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label for="messageInteraction">Mensaje de la interacción</Label>
                        <Input
                            value={interaction.message}
                            onChange={(e) => {setInteraction({...interaction, message: e.target.value})}}
                            id="messageInteraction"
                            name="messageInteraction"
                            type="textarea"
                        />
                    </FormGroup>
                    <div>
                        <div>
                            <Label for="typeInteraction">Botones</Label>
                        </div>
                        <FormGroup>
                            <Label for="messageInteraction">Etiqueta del botón</Label>
                            <Input
                                value={buttonInteraction.label}
                                onChange={(e) => {setButtonInteraction({...buttonInteraction, label: e.target.value})}}
                                id="buttonInteraction"
                                name="buttonInteraction"
                                type="input"
                            />
                        </FormGroup>
                        <Button color='secondary' onClick={(e) => {
                            e.preventDefault();
                            setInteraction({...interaction, buttons: [...interaction.buttons, buttonInteraction]});
                            setButtonInteraction(initAddButton);
                        }}>Agregar Opción</Button>
                        <div>
                            <div style={{marginTop: 10, marginBottom:10}}>Opciones</div>
                            <div>
                                {
                                    interaction.buttons.map((x) => {
                                        return (<div
                                            style={{
                                                background : '#DDD',
                                                borderRadius : 5,
                                                padding: '3px 5px',
                                                marginBottom: 10
                                            }}
                                        >{x.label}</div>)
                                    })
                                }
                            </div>
                        </div>

                    </div>
                    <div>
                        <div className='mt-4'>
                            <Label for="typeInteraction">Media</Label>
                        </div>
                        <Button color='secondary'>Agregar Media</Button>
                    </div>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="success" onClick={addInteraction}>Agregar</Button>
            </ModalFooter>
        </Modal>
        </div>
    </div>
    </>)
}
