import React from "react";
import grapesjs, { Editor } from "grapesjs";
import GjsEditor from "@grapesjs/react";
import plugin from "grapesjs-preset-webpage";
import newsLetterPlugin from "grapesjs-preset-newsletter";
import grapesJSMJML from "grapesjs-mjml";

const Builder = () => {
  const onEditor = (editor) => {
    console.log("Editor loaded", { editor });
  };

  return (
    <div>
      <GjsEditor
        // Pass the core GrapesJS library to the wrapper (required).
        // You can also pass the CDN url (eg. "https://unpkg.com/grapesjs")
        grapesjs={grapesjs}
        // Load the GrapesJS CSS file asynchronously from URL.
        // This is an optional prop, you can always import the CSS directly in your JS if you wish.
        grapesjsCss="https://unpkg.com/grapesjs/dist/css/grapes.min.css"
        // GrapesJS init options
        options={{
          height: "100vh",
          storageManager: false,
        }}
        onEditor={onEditor}
        plugins={[plugin, newsLetterPlugin]}
      />
    </div>
  );
};

export default Builder;
