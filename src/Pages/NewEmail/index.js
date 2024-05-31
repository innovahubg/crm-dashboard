import React, { useRef } from 'react';

import EmailEditor from 'react-email-editor';

const EmailComponent = (props) => {
    const emailEditorRef = useRef(null);

    const exportHtml = () => {
        console.log("HTML")
        const unlayer = emailEditorRef.current?.editor;
        console.log({ unlayer })
        unlayer?.exportHtml((data) => {
            const { design, html } = data;
            console.log('exportHtml', html);
            console.log('DESIGN', design)
        });
    };

    const onReady = (unlayer) => {
        // editor is ready
        // you can load your template here;
        // the design json can be obtained by calling
        // unlayer.loadDesign(callback) or unlayer.exportHtml(callback)

        // const templateJson = { DESIGN JSON GOES HERE };
        // unlayer.loadDesign(templateJson);
        //console.log(unlayer)
        // unlayer.loadDesign({
        //     html: '<html><body><div>This is a legacy HTML template.</div></body></html>',
        //     classic: true
        // });
    };

    return (
        <div className='EmailComponent'>
            <div>
                <button onClick={exportHtml} className='saveTemplate'>Guardar</button>
            </div>

            <EmailEditor ref={emailEditorRef} onReady={onReady} style={{
                "width": "100%",
                "height": "75vh"
            }} />
        </div>
    );
};


export default EmailComponent
