import { useCallback, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';

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

export default function EditBot() {

    const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

    const initialNodes = [
        {
            id: '1',
            type: 'input',
            data: {
              label: 'Inicio',
            },
            position: { x: 250, y: 0 },
        },
        {
            id: '2',
            data: {
              label: 'Mensaje de bienvenida',
            },
            position: { x: 100, y: 100 },
        },
        {
            id: '3',
            data: {
              label: '¿Te gusta el helado?',
            },
            position: { x: 200, y: 100 },
        },
    ]

    const initialEdges = [
        { id: 'e1-2', source: '1', target: '2', animated: true},
    ]

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onInit = (reactFlowInstance) => console.log('flow loaded:', reactFlowInstance);
    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);
    

  return (<>
    <div className="page-content">
        <div style={{ height: 'calc(100vh - 200px)' }}>
            <div>
                <Button onClick={toggle}>Agregar Interacción</Button>
            </div>
            <ReactFlow
                nodes={nodes}
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
                        id="messageInteraction"
                        name="messageInteraction"
                        type="textarea"
                        />
                    </FormGroup>
                    <div>
                        <div>
                            <Label for="typeInteraction">Botones</Label>
                        </div>
                        <Button color='success'>Agregar Opción</Button>
                    </div>
                    <div>
                        <div className='mt-4'>
                            <Label for="typeInteraction">Media</Label>
                        </div>
                        <Button color='success'>Agregar Media</Button>
                    </div>
                </Form>
            </ModalBody>
            <ModalFooter>
            <Button color="secondary" onClick={toggle}>
                Agregar
            </Button>
            </ModalFooter>
        </Modal>
        </div>
    </div>
    </>)
}
