import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

const DEFAULT_HANDLE_STYLE = {
    width: 10,
    height: 10,
    bottom: -5,
  };

  export default memo(({ data, isConnectable }) => {
    console.log(data);
    return (
      <>
        <div
        >
          <Handle
              type="target"
              id="red"
              position={Position.Top}
              style={{ ...DEFAULT_HANDLE_STYLE, background: '#325175' }}
              onConnect={(params) => console.log('handle onConnect', params)}
              isConnectable={isConnectable}
            />
          <div
            style={{
              background: '#485665',
              padding: '5px 15px',
            }}
          >{data.message}</div>
          <div
            style={{
              fontSize : 10,
              marginTop: 5
            }}
          >Botones</div>
          {
            data.buttons.map((x) => {
              return (<div style={{
                backgroundColor:'#ecf1f6',
                color : '#4976ab',
                padding: '3px 5px',
                marginTop: 5,
                fontSize : 10,
                borderRadius : 5
            }}>
            <div>{x.label}</div>
            <div style={{ position: 'relative', top: '-7px', left: '10px' }}>
              {/* Coloca aquí tu componente Handle o cualquier otro componente */}
              <Handle
                  type="source"
                  id="red"
                  position={Position.Right}
                  style={{  width: 10, height: 10, background: '#4976ab' }}
                  onConnect={(params) => console.log('handle onConnect', params)}
                  isConnectable={isConnectable}
                />
            </div>
          </div>)
            })
          }

          
        </div>
      </>
    );
  });
