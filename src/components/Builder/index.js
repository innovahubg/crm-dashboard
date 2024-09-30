import React, { useState, useCallback } from "react";
import grapesjs, { Editor } from "grapesjs";
import GjsEditor from "@grapesjs/react";
import plugin from "grapesjs-preset-webpage";
import newsLetterPlugin from "grapesjs-preset-newsletter";
import grapeform from "grapesjs-plugin-forms"
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import CodeMirror from "@uiw/react-codemirror";
import beautify from 'js-beautify';
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import axios from "axios";

const Builder = ({ html, setHTML }) => {
    let editorRef
    const [modal, setModal] = useState(false)
    const onEditor = (editor) => {
        editorRef = editor
        console.log("Editor loaded", { editor });
        editor.setComponents(html);
        // editor.setComponents(`<!-- Free to use, HTML email template designed & built by FullSphere. Learn more about us at www.fullsphere.co.uk -->

        // <!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        // <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">

        // <head>

        //   <!--[if gte mso 9]>
        //   <xml>
        //     <o:OfficeDocumentSettings>
        //       <o:AllowPNG/>
        //       <o:PixelsPerInch>96</o:PixelsPerInch>
        //     </o:OfficeDocumentSettings>
        //   </xml>
        //   <![endif]-->

        //   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        //   <meta name="viewport" content="width=device-width, initial-scale=1.0">
        //   <meta name="x-apple-disable-message-reformatting">
        //   <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->

        //     <!-- Your title goes here -->
        //     <title>Newsletter</title>
        //     <!-- End title -->

        //     <!-- Start stylesheet -->
        //     <style type="text/css">
        //       a,a[href],a:hover, a:link, a:visited {
        //         /* This is the link colour */
        //         text-decoration: none!important;
        //         color: #0000EE;
        //       }
        //       .link {
        //         text-decoration: underline!important;
        //       }
        //       p, p:visited {
        //         /* Fallback paragraph style */
        //         font-size:15px;
        //         line-height:24px;
        //         font-family:'Helvetica', Arial, sans-serif;
        //         font-weight:300;
        //         text-decoration:none;
        //         color: #000000;
        //       }
        //       h1 {
        //         /* Fallback heading style */
        //         font-size:22px;
        //         line-height:24px;
        //         font-family:'Helvetica', Arial, sans-serif;
        //         font-weight:normal;
        //         text-decoration:none;
        //         color: #000000;
        //       }
        //       .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td {line-height: 100%;}
        //       .ExternalClass {width: 100%;}
        //     </style>
        //     <!-- End stylesheet -->

        // </head>

        //   <!-- You can change background colour here -->
        //   <body style="text-align: center; margin: 0; padding-top: 10px; padding-bottom: 10px; padding-left: 0; padding-right: 0; -webkit-text-size-adjust: 100%;background-color: #f2f4f6; color: #000000" align="center">

        //   <!-- Fallback force center content -->
        //   <div style="text-align: center;">

        //     <!-- Email not displaying correctly -->
        //     <table align="center" style="text-align: center; vertical-align: middle; width: 600px; max-width: 600px;" width="600">
        //       <tbody>
        //         <tr>
        //           <td style="width: 596px; vertical-align: middle;" width="596">

        //             <p style="font-size: 11px; line-height: 20px; font-family: 'Helvetica', Arial, sans-serif; font-weight: 400; text-decoration: none; color: #000000;">Is this email not displaying correctly? <a class="link" style="text-decoration: underline;" target="_blank" href="https://fullsphere.co.uk/html-emails/free-template/"><u>Click here</u></a> to view in browser</p>

        //           </td>
        //         </tr>
        //       </tbody>
        //     </table>
        //     <!-- Email not displaying correctly -->

        //     <!-- Start container for logo -->
        //     <table align="center" style="text-align: center; vertical-align: top; width: 600px; max-width: 600px; background-color: #ffffff;" width="600">
        //       <tbody>
        //         <tr>
        //           <td style="width: 596px; vertical-align: top; padding-left: 0; padding-right: 0; padding-top: 15px; padding-bottom: 15px;" width="596">

        //             <!-- Your logo is here -->
        //             <img style="width: 180px; max-width: 180px; height: 85px; max-height: 85px; text-align: center; color: #ffffff;" alt="Logo" src="https://fullsphere.co.uk/misc/free-template/images/logo-white-background.jpg" align="center" width="180" height="85">

        //           </td>
        //         </tr>
        //       </tbody>
        //     </table>
        //     <!-- End container for logo -->

        //     <!-- Hero image -->
        //     <img style="width: 600px; max-width: 600px; height: 350px; max-height: 350px; text-align: center;" alt="Hero image" src="https://fullsphere.co.uk/misc/free-template/images/hero.jpg" align="center" width="600" height="350">
        //     <!-- Hero image -->

        //     <!-- Start single column section -->
        //     <table align="center" style="text-align: center; vertical-align: top; width: 600px; max-width: 600px; background-color: #ffffff;" width="600">
        //         <tbody>
        //           <tr>
        //             <td style="width: 596px; vertical-align: top; padding-left: 30px; padding-right: 30px; padding-top: 30px; padding-bottom: 40px;" width="596">

        //               <h1 style="font-size: 20px; line-height: 24px; font-family: 'Helvetica', Arial, sans-serif; font-weight: 600; text-decoration: none; color: #000000;">Single column, dolor sit amet</h1>

        //               <p style="font-size: 15px; line-height: 24px; font-family: 'Helvetica', Arial, sans-serif; font-weight: 400; text-decoration: none; color: #919293;">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam mattis ante sed imperdiet euismod. Vivamus fermentum bibendum turpis, et tempor dui. Sed vitae lectus egestas, finibus purus ac, rutrum mauris.</p>

        //               <p style="font-size: 15px; line-height: 24px; font-family: 'Helvetica', Arial, sans-serif; font-weight: 400; text-decoration: none; color: #919293;">You can download this template <a target="_blank" style="text-decoration: underline; color: #000000;" href="https://fullsphere.co.uk/misc/free-template/html-email-template.zip" download="HTML Email Template"><u>here</u></a></p>

        //               <!-- Start button (You can change the background colour by the hex code below) -->
        //               <a href="#" target="_blank" style="background-color: #000000; font-size: 15px; line-height: 22px; font-family: 'Helvetica', Arial, sans-serif; font-weight: normal; text-decoration: none; padding: 12px 15px; color: #ffffff; border-radius: 5px; display: inline-block; mso-padding-alt: 0;">
        //                   <!--[if mso]>
        //                   <i style="letter-spacing: 25px; mso-font-width: -100%; mso-text-raise: 30pt;">&nbsp;</i>
        //                 <![endif]-->

        //                   <span style="mso-text-raise: 15pt; color: #ffffff;">Learn more</span>
        //                   <!--[if mso]>
        //                   <i style="letter-spacing: 25px; mso-font-width: -100%;">&nbsp;</i>
        //                 <![endif]-->
        //               </a>
        //               <!-- End button here -->

        //             </td>
        //           </tr>
        //         </tbody>
        //       </table>
        //       <!-- End single column section -->

        //       <!-- Start image -->
        //       <img style="width: 600px; max-width: 600px; height: 240px; max-height: 240px; text-align: center;" alt="Image" src="https://fullsphere.co.uk/misc/free-template/images/image-2.jpg" align="center" width="600" height="240">
        //       <!-- End image -->

        //       <!-- Start heading for double column section -->
        //       <table align="center" style="text-align: center; vertical-align: top; width: 600px; max-width: 600px; background-color: #ffffff;" width="600">
        //         <tbody>
        //           <tr>
        //             <td style="width: 596px; vertical-align: top; padding-left: 30px; padding-right: 30px; padding-top: 30px; padding-bottom: 0;" width="596">

        //               <h1 style="font-size: 20px; line-height: 24px; font-family: 'Helvetica', Arial, sans-serif; font-weight: 600; text-decoration: none; color: #000000; margin-bottom: 0;">Double column, dolor sit amet</h1>

        //             </td>
        //           </tr>
        //         </tbody>
        //       </table>
        //       <!-- End heading for double column section -->

        //       <!-- Start double column section -->
        //       <table align="center" style="text-align: center; vertical-align: top; width: 600px; max-width: 600px; background-color: #ffffff;" width="600">
        //         <tbody>
        //             <tr>
        //               <td style="width: 252px; vertical-align: top; padding-left: 30px; padding-right: 15px; padding-top: 0; padding-bottom: 30px; text-align: center;" width="252">

        //                 <p style="font-size: 15px; line-height: 24px; font-family: 'Helvetica', Arial, sans-serif; font-weight: 400; text-decoration: none; color: #919293;">Vivamus felis velit, iaculis eu eros sed, consequat viverra libero. Aliquam ipsum eros, imperdiet eget fermentum eget, cursus a sapien.</p>

        //               </td>

        //               <td style="width: 252px; vertical-align: top; padding-left: 15px; padding-right: 30px; padding-top: 0; padding-bottom: 30px; text-align: center;" width="252">
        //                 <p style="font-size: 15px; line-height: 24px; font-family: 'Helvetica', Arial, sans-serif; font-weight: 400; text-decoration: none; color: #919293;">Pellentesque mollis bibendum sollicitudin. Aenean tempor eros at risus mollis gravida. Aenean in urna eget elit pretium ultrices eu vitae elit.</p>

        //             </td>
        //           </tr>
        //         </tbody>
        //       </table>
        //       <!-- End double column section -->

        //       <!-- Start image -->
        //       <img style="width: 600px; max-width: 600px; height: 240px; max-height: 240px; text-align: center;" alt="Image" src="https://fullsphere.co.uk/misc/free-template/images/image-3.jpg" align="center" width="600" height="240">
        //       <!-- End image -->

        //       <!-- Start footer -->
        //       <table align="center" style="text-align: center; vertical-align: top; width: 600px; max-width: 600px; background-color: #000000;" width="600">
        //         <tbody>
        //           <tr>
        //             <td style="width: 596px; vertical-align: top; padding-left: 30px; padding-right: 30px; padding-top: 30px; padding-bottom: 30px;" width="596">

        //               <!-- Your inverted logo is here -->
        //               <img style="width: 180px; max-width: 180px; height: 85px; max-height: 85px; text-align: center; color: #ffffff;" alt="Logo" src="https://fullsphere.co.uk/misc/free-template/images/logo-black-background.jpg" align="center" width="180" height="85">

        //               <p style="font-size: 13px; line-height: 24px; font-family: 'Helvetica', Arial, sans-serif; font-weight: 400; text-decoration: none; color: #ffffff;">
        //                 Address line 1, London, L2 4LN
        //               </p>

        //               <p style="margin-bottom: 0; font-size: 13px; line-height: 24px; font-family: 'Helvetica', Arial, sans-serif; font-weight: 400; text-decoration: none; color: #ffffff;">
        //                 <a target="_blank" style="text-decoration: underline; color: #ffffff;" href="https://fullsphere.co.uk">
        //                   www.fullsphere.co.uk
        //                 </a>
        //               </p>

        //             </td>
        //           </tr>
        //         </tbody>
        //       </table>
        //       <!-- End footer -->

        //       <!-- Start unsubscribe section -->
        //       <table align="center" style="text-align: center; vertical-align: top; width: 600px; max-width: 600px;" width="600">
        //         <tbody>
        //           <tr>
        //             <td style="width: 596px; vertical-align: top; padding-left: 30px; padding-right: 30px; padding-top: 30px; padding-bottom: 30px;" width="596">

        //               <p style="font-size: 12px; line-height: 12px; font-family: 'Helvetica', Arial, sans-serif; font-weight: normal; text-decoration: none; color: #000000;">
        //                 Not wanting to receive these emails?
        //               </p>

        //               <p style="font-size: 12px; line-height: 12px; font-family: 'Helvetica', Arial, sans-serif; font-weight: normal; text-decoration: none; color: #000000;">
        //                 You can <a style="text-decoration: underline; color: #000000;" href="insert-unsubscribe-link-here"><u>unsubscribe here</u></a>
        //               </p>

        //               <p style="font-size: 12px; line-height: 12px; font-family: 'Helvetica', Arial, sans-serif; font-weight: normal; text-decoration: none; color: #919293; margin-top: 30px;">
        //                 Email template built by <a style="text-decoration: none; color: #919293;" href="https://fullsphere.co.uk"><u>FullSphere</u></a>
        //               </p>

        //             </td>
        //           </tr>
        //         </tbody>
        //       </table>
        //       <!-- End unsubscribe section -->

        //   </div>

        //   </body>

        // </html>

        // // Resources`);

        editor.on("change:changesCount", (e) => {
            const code = editor.runCommand("gjs-get-inlined-html");
            // console.log(editor.getHtml());
            // console.log(editor.getCss());
            let t = "abc";
            const options = { indent_size: 2, space_in_empty_paren: true }
            // console.log(typeof t);
            // setHTML(code);
            console.log("UPDATE DE CODIGO")
            const codigo = beautify.html(code, options)
            console.log({ codigo })
            setHTML(codigo)
        });
    };

    const onChange = React.useCallback((val, viewUpdate) => {
        //console.log('val:', val);
        console.log("UPDATE ONCHANGE")
        setHTML(val);
        // const options = { indent_size: 2, space_in_empty_paren: true }
        // console.log("-------------------------------------ABD")
        // console.log(beautify)
        // console.log(beautify.html(val, options))

    }, []);

    function myPlugin(editor) {
        // Use the API: https://grapesjs.com/docs/api/
        editor.Blocks.add('my-first-block', {
            label: 'Simple block',
            content: '<div class="my-block"> <form><input placeholder="nombre" /> <button>ENVIAR</button></form> </div>',
        });
        editor.Blocks.add('Button 1', {
            label: 'Button 1',
            content: '<style>button { padding: 10px 20px; text-transform: uppercase; border-radius: 8px; font-size: 17px; font-weight: 500; color: #ffffff; text-shadow: none; background: black; cursor: pointer; box-shadow: transparent; border: 1px solid #ffffff; transition: 0.5s ease; user-select: none; } #btn:hover,:focus {color: #ffffff;background: #008cff;border: 1px solid #008cff;text-shadow: 0 0 5px #ffffff, 0 0 10px #ffffff, 0 0 20px #ffffff;box-shadow: 0 0 5px #008cff, 0 0 20px #008cff, 0 0 50px #008cff,0 0 100px #008cff;} </style> <button id="btn">Mensaje</button>',
        });
        editor.Blocks.add('Button 2', {
            label: 'Button 2',
            content: `
                <style>
                    .button-2 {
                        background-color: #000;
                        color: #fff;
                        width: 8.5em;
                        height: 2.9em;
                        border: #3654ff 0.2em solid;
                        border-radius: 11px;
                        text-align: right;
                        transition: all 0.6s ease;
                    }

                    .button-2:hover {
                        background-color: #3654ff;
                        cursor: pointer;
                    }

                    .button-2 svg {
                        width: 1.6em;
                        margin: -0.2em 0.8em 1em;
                        position: absolute;
                        display: flex;
                        transition: all 0.6s ease;
                    }

                    .button-2:hover svg {
                        transform: translateX(5px);
                    }

                    .text-button-2 {
                        margin: 0 1.5em
                    }
                </style>
                <button class="button-2">
                    
                    <div class="text-button-2">
                        Button
                    </div>
                </button>
            `
        });
        editor.Blocks.add('Galeria', {
            label: 'Galeria 1',
            content: `
                <style>
    /* Three columns side by side */
.column-galeria-1 {
  float: left;
  width: 33.3%;
  margin-bottom: 16px;
  padding: 0 8px;
}

/* Display the columns below each other instead of side by side on small screens */
@media screen and (max-width: 650px) {
  .column-galeria-1 {
    width: 100%;
    display: block;
  }
}

/* Add some shadows to create a card effect */
.card-galeria-1 {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}

/* Some left and right padding inside the container */
.container-galeria-1 {
  padding: 0 16px;
}

/* Clear floats */
.container-galeria-1::after, .row-galeria-1::after {
  content: "";
  clear: both;
  display: table;
}

.title-galeria-1 {
  color: grey;
}

.button-galeria-1 {
  border: none;
  outline: 0;
  display: inline-block;
  padding: 8px;
  color: white;
  background-color: #000;
  text-align: center;
  cursor: pointer;
  width: 100%;
}

.button-galeria-1:hover {
  background-color: #555;
}
</style>

<div class="row-galeria-1">
  <div class="column-galeria-1">
    <div class="card-galeria-1">
      <img src="https://picsum.photos/200/300" alt="Jane" style="width:100%">
      <div class="container-galeria-1">
        <h2>Jane Doe</h2>
        <p class="title-galeria-1">CEO &amp; Founder</p>
        <p>Some text that describes me lorem ipsum ipsum lorem.</p>
        <p>example@example.com</p>
        <p><button class="button-galeria-1">Contact</button></p>
      </div>
    </div>
  </div>

  <div class="column-galeria-1">
    <div class="card-galeria-1">
      <img src="https://picsum.photos/200/300" alt="Mike" style="width:100%">
      <div class="container-galeria-1">
        <h2>Mike Ross</h2>
        <p class="title-galeria-1">Art Director</p>
        <p>Some text that describes me lorem ipsum ipsum lorem.</p>
        <p>example@example.com</p>
        <p><button class="button-galeria-1">Contact</button></p>
      </div>
    </div>
  </div>

  <div class="column-galeria-1">
    <div class="card-galeria-1">
      <img src="https://picsum.photos/200/300" alt="John" style="width:100%">
      <div class="container-galeria-1">
        <h2>John Doe</h2>
        <p class="title-galeria-1">Designer</p>
        <p>Some text that describes me lorem ipsum ipsum lorem.</p>
        <p>example@example.com</p>
        <p><button class="button-galeria-1">Contact</button></p>
      </div>
    </div>
  </div>
</div>   
            `,
        });
        editor.Blocks.add('NavBar', {
            label: 'Nav',
            content: `<ul style="display: flex;">
      <li style="display: inline; "><a href="default.asp" style="display: block; padding: 8px; background-color: #04AA6D;">Home</a></li>
      <li style="display: inline; "><a href="news.asp" style="display: block; padding: 8px; background-color: #04AA6D;">News</a></li>
      <li style="display: inline; "><a href="contact.asp" style="display: block; padding: 8px; background-color: #04AA6D;">Contact</a></li>
      <li style="display: inline; "><a href="about.asp" style="display: block; padding: 8px; background-color: #04AA6D;">About</a></li>
    </ul>
    `,
        });
        editor.Blocks.add('Template Uno', {
            label: 'Template Uno',
            content: `<!doctype html>
<html lang="en">
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Simple Transactional Email</title>
    <style media="all" type="text/css">
@media all {
  .btn-primary table td:hover {
    background-color: #ec0867 !important;
  }

  .btn-primary a:hover {
    background-color: #ec0867 !important;
    border-color: #ec0867 !important;
  }
}
@media only screen and (max-width: 640px) {
  .main p,
.main td,
.main span {
    font-size: 16px !important;
  }

  .wrapper {
    padding: 8px !important;
  }

  .content {
    padding: 0 !important;
  }

  .container {
    padding: 0 !important;
    padding-top: 8px !important;
    width: 100% !important;
  }

  .main {
    border-left-width: 0 !important;
    border-radius: 0 !important;
    border-right-width: 0 !important;
  }

  .btn table {
    max-width: 100% !important;
    width: 100% !important;
  }

  .btn a {
    font-size: 16px !important;
    max-width: 100% !important;
    width: 100% !important;
  }
}
@media all {
  .ExternalClass {
    width: 100%;
  }

  .ExternalClass,
.ExternalClass p,
.ExternalClass span,
.ExternalClass font,
.ExternalClass td,
.ExternalClass div {
    line-height: 100%;
  }

  .apple-link a {
    color: inherit !important;
    font-family: inherit !important;
    font-size: inherit !important;
    font-weight: inherit !important;
    line-height: inherit !important;
    text-decoration: none !important;
  }

  #MessageViewBody a {
    color: inherit;
    text-decoration: none;
    font-size: inherit;
    font-family: inherit;
    font-weight: inherit;
    line-height: inherit;
  }
}
</style>
  </head>
  <body style="font-family: Helvetica, sans-serif; -webkit-font-smoothing: antialiased; font-size: 16px; line-height: 1.3; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; background-color: #f4f5f6; margin: 0; padding: 0;">
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f4f5f6; width: 100%;" width="100%" bgcolor="#f4f5f6">
      <tr>
        <td style="font-family: Helvetica, sans-serif; font-size: 16px; vertical-align: top;" valign="top">&nbsp;</td>
        <td class="container" style="font-family: Helvetica, sans-serif; font-size: 16px; vertical-align: top; max-width: 600px; padding: 0; padding-top: 24px; width: 600px; margin: 0 auto;" width="600" valign="top">
          <div class="content" style="box-sizing: border-box; display: block; margin: 0 auto; max-width: 600px; padding: 0;">

            <!-- START CENTERED WHITE CONTAINER -->
            <span class="preheader" style="color: transparent; display: none; height: 0; max-height: 0; max-width: 0; opacity: 0; overflow: hidden; mso-hide: all; visibility: hidden; width: 0;">This is preheader text. Some clients will show this text as a preview.</span>
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="main" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background: #ffffff; border: 1px solid #eaebed; border-radius: 16px; width: 100%;" width="100%">

              <!-- START MAIN CONTENT AREA -->
              <tr>
                <td class="wrapper" style="font-family: Helvetica, sans-serif; font-size: 16px; vertical-align: top; box-sizing: border-box; padding: 24px;" valign="top">
                  <p style="font-family: Helvetica, sans-serif; font-size: 16px; font-weight: normal; margin: 0; margin-bottom: 16px;">Hi there</p>
                  <p style="font-family: Helvetica, sans-serif; font-size: 16px; font-weight: normal; margin: 0; margin-bottom: 16px;">Sometimes you just want to send a simple HTML email with a simple design and clear call to action. This is it.</p>
                  <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="btn btn-primary" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; box-sizing: border-box; width: 100%; min-width: 100%;" width="100%">
                    <tbody>
                      <tr>
                        <td align="left" style="font-family: Helvetica, sans-serif; font-size: 16px; vertical-align: top; padding-bottom: 16px;" valign="top">
                          <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: auto;">
                            <tbody>
                              <tr>
                                <td style="font-family: Helvetica, sans-serif; font-size: 16px; vertical-align: top; border-radius: 4px; text-align: center; background-color: #0867ec;" valign="top" align="center" bgcolor="#0867ec"> <a href="http://htmlemail.io" target="_blank" style="border: solid 2px #0867ec; border-radius: 4px; box-sizing: border-box; cursor: pointer; display: inline-block; font-size: 16px; font-weight: bold; margin: 0; padding: 12px 24px; text-decoration: none; text-transform: capitalize; background-color: #0867ec; border-color: #0867ec; color: #ffffff;">Call To Action</a> </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <p style="font-family: Helvetica, sans-serif; font-size: 16px; font-weight: normal; margin: 0; margin-bottom: 16px;">This is a really simple email template. It's sole purpose is to get the recipient to click the button with no distractions.</p>
                  <p style="font-family: Helvetica, sans-serif; font-size: 16px; font-weight: normal; margin: 0; margin-bottom: 16px;">Good luck! Hope it works.</p>
                </td>
              </tr>

              <!-- END MAIN CONTENT AREA -->
              </table>

            <!-- START FOOTER -->
            <div class="footer" style="clear: both; padding-top: 24px; text-align: center; width: 100%;">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;" width="100%">
                <tr>
                  <td class="content-block" style="font-family: Helvetica, sans-serif; vertical-align: top; color: #9a9ea6; font-size: 16px; text-align: center;" valign="top" align="center">
                    <span class="apple-link" style="color: #9a9ea6; font-size: 16px; text-align: center;">Company Inc, 7-11 Commercial Ct, Belfast BT1 2NB</span>
                    <br> Don't like these emails? <a href="http://htmlemail.io/blog" style="text-decoration: underline; color: #9a9ea6; font-size: 16px; text-align: center;">Unsubscribe</a>.
                  </td>
                </tr>
                <tr>
                  <td class="content-block powered-by" style="font-family: Helvetica, sans-serif; vertical-align: top; color: #9a9ea6; font-size: 16px; text-align: center;" valign="top" align="center">
                    Powered by <a href="http://htmlemail.io" style="color: #9a9ea6; font-size: 16px; text-align: center; text-decoration: none;">HTMLemail.io</a>
                  </td>
                </tr>
              </table>
            </div>

            <!-- END FOOTER -->
            
<!-- END CENTERED WHITE CONTAINER --></div>
        </td>
        <td style="font-family: Helvetica, sans-serif; font-size: 16px; vertical-align: top;" valign="top">&nbsp;</td>
      </tr>
    </table>
  </body>
</html>`,
        });

        editor.Blocks.add('Hibrido', {
            label: 'Hibrido',
            content: `
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
    <meta charset="utf-8"> <!-- utf-8 works for most cases -->
    <meta name="viewport" content="width=device-width"> <!-- Forcing initial-scale shouldn't be necessary -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge"> <!-- Use the latest (edge) version of IE rendering engine -->
    <meta name="x-apple-disable-message-reformatting">  <!-- Disable auto-scale in iOS 10 Mail entirely -->
    <meta name="format-detection" content="telephone=no,address=no,email=no,date=no,url=no"> <!-- Tell iOS not to automatically link certain text strings. -->
    <meta name="color-scheme" content="light">
    <meta name="supported-color-schemes" content="light">
    <title></title> <!-- The title tag shows in email notifications, like Android 4.4. -->

    <!-- What it does: Makes background images in 72ppi Outlook render at correct size. -->
    <!--[if gte mso 9]>
    <xml>
        <o:OfficeDocumentSettings>
            <o:AllowPNG/>
            <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
    </xml>
    <![endif]-->

    <!-- Web Font / @font-face : BEGIN -->
    <!-- NOTE: If web fonts are not required, lines 23 - 41 can be safely removed. -->

    <!-- Desktop Outlook chokes on web font references and defaults to Times New Roman, so we force a safe fallback font. -->
    <!--[if mso]>
        <style>
            * {
                font-family: sans-serif !important;
            }
        </style>
    <![endif]-->

    <!-- All other clients get the webfont reference; some will render the font and others will silently fail to the fallbacks. More on that here: http://stylecampaign.com/blog/2015/02/webfont-support-in-email/ -->
    <!--[if !mso]><!-->
    <!-- insert web font reference, eg: <link href='https://fonts.googleapis.com/css?family=Roboto:400,700' rel='stylesheet' type='text/css'> -->
    <!--<![endif]-->

    <!-- Web Font / @font-face : END -->

    <!-- CSS Reset : BEGIN -->
    <style>

        /* What it does: Tells the email client that only light styles are provided but the client can transform them to dark. A duplicate of meta color-scheme meta tag above. */
        :root {
          color-scheme: light;
          supported-color-schemes: light;
        }

        /* What it does: Remove spaces around the email design added by some email clients. */
        /* Beware: It can remove the padding / margin and add a background color to the compose a reply window. */
        html,
        body {
            margin: 0 auto !important;
            padding: 0 !important;
            height: 100% !important;
            width: 100% !important;
        }

        /* What it does: Stops email clients resizing small text. */
        * {
            -ms-text-size-adjust: 100%;
            -webkit-text-size-adjust: 100%;
        }

        /* What it does: Centers email on Android 4.4 */
        div[style*="margin: 16px 0"] {
            margin: 0 !important;
        }
        /* What it does: forces Samsung Android mail clients to use the entire viewport */
        #MessageViewBody, #MessageWebViewDiv{
            width: 100% !important;
        }

        /* What it does: Stops Outlook from adding extra spacing to tables. */
        table,
        td {
            mso-table-lspace: 0pt !important;
            mso-table-rspace: 0pt !important;
        }

        /* What it does: Fixes webkit padding issue. */
        table {
            border-spacing: 0 !important;
            border-collapse: collapse !important;
            table-layout: fixed !important;
            margin: 0 auto !important;
        }

        /* What it does: Uses a better rendering method when resizing images in IE. */
        img {
            -ms-interpolation-mode:bicubic;
        }

        /* What it does: Prevents Windows 10 Mail from underlining links despite inline CSS. Styles for underlined links should be inline. */
        a {
            text-decoration: none;
        }

        /* What it does: A work-around for email clients meddling in triggered links. */
        a[x-apple-data-detectors],  /* iOS */
        .unstyle-auto-detected-links a,
        .aBn {
            border-bottom: 0 !important;
            cursor: default !important;
            color: inherit !important;
            text-decoration: none !important;
            font-size: inherit !important;
            font-family: inherit !important;
            font-weight: inherit !important;
            line-height: inherit !important;
        }

        /* What it does: Prevents Gmail from changing the text color in conversation threads. */
        .im {
            color: inherit !important;
        }

        /* What it does: Prevents Gmail from displaying a download button on large, non-linked images. */
        .a6S {
            display: none !important;
            opacity: 0.01 !important;
        }
        /* If the above doesn't work, add a .g-img class to any image in question. */
        img.g-img + div {
            display: none !important;
        }

        /* What it does: Removes right gutter in Gmail iOS app: https://github.com/TedGoas/Cerberus/issues/89  */
        /* Create one of these media queries for each additional viewport size you'd like to fix */

        /* iPhone 4, 4S, 5, 5S, 5C, and 5SE */
        @media only screen and (min-device-width: 320px) and (max-device-width: 374px) {
            u ~ div .email-container {
                min-width: 320px !important;
            }
        }
        /* iPhone 6, 6S, 7, 8, and X */
        @media only screen and (min-device-width: 375px) and (max-device-width: 413px) {
            u ~ div .email-container {
                min-width: 375px !important;
            }
        }
        /* iPhone 6+, 7+, and 8+ */
        @media only screen and (min-device-width: 414px) {
            u ~ div .email-container {
                min-width: 414px !important;
            }
        }

    </style>
    <!-- CSS Reset : END -->

    <!-- Progressive Enhancements : BEGIN -->
    <style>

	    /* What it does: Hover styles for buttons */
	    .button-td,
	    .button-a {
	        transition: all 100ms ease-in;
	    }
	    .button-td-primary:hover,
	    .button-a-primary:hover {
	        background: #555555 !important;
	        border-color: #555555 !important;
	    }

	    /* Media Queries */
	    @media screen and (max-width: 480px) {

	        /* What it does: Forces table cells into full-width rows. */
	        .stack-column,
	        .stack-column-center {
	            display: block !important;
	            width: 100% !important;
	            max-width: 100% !important;
	            direction: ltr !important;
	        }
	        /* And center justify these ones. */
	        .stack-column-center {
	            text-align: center !important;
	        }

	        /* What it does: Generic utility class for centering. Useful for images, buttons, and nested tables. */
	        .center-on-narrow {
	            text-align: center !important;
	            display: block !important;
	            margin-left: auto !important;
	            margin-right: auto !important;
	            float: none !important;
	        }
	        table.center-on-narrow {
	            display: inline-block !important;
	        }

	        /* What it does: Adjust typography on small screens to improve readability */
	        .email-container p {
	            font-size: 17px !important;
	        }
	    }

    </style>
    <!-- Progressive Enhancements : END -->

</head>
<!--
	The email background color (#222222) is defined in three places:
	1. body tag: for most email clients
	2. center tag: for Gmail and Inbox mobile apps and web versions of Gmail, GSuite, Inbox, Yahoo, AOL, Libero, Comcast, freenet, Mail.ru, Orange.fr
	3. mso conditional: For Windows 10 Mail
-->
<body width="100%" style="margin: 0; padding: 0 !important; mso-line-height-rule: exactly; background-color: #222222;">
  <center role="article" aria-roledescription="email" lang="en" style="width: 100%; background-color: #222222;">
    <!--[if mso | IE]>
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #222222;">
    <tr>
    <td>
    <![endif]-->

        <!-- Visually Hidden Preheader Text : BEGIN -->
        <div style="max-height:0; overflow:hidden; mso-hide:all;" aria-hidden="true">
            (Optional) This text will appear in the inbox preview, but not the email body. It can be used to supplement the email subject line or even summarize the email's contents. Extended text preheaders (~490 characters) seems like a better UX for anyone using a screenreader or voice-command apps like Siri to dictate the contents of an email. If this text is not included, email clients will automatically populate it using the text (including image alt text) at the start of the email's body.
        </div>
        <!-- Visually Hidden Preheader Text : END -->

        <!-- Create white space after the desired preview text so email clients don’t pull other distracting text into the inbox preview. Extend as necessary. -->
        <!-- Preview Text Spacing Hack : BEGIN -->
        <div style="display: none; font-size: 1px; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all; font-family: sans-serif;">
	        &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
        </div>
        <!-- Preview Text Spacing Hack : END -->

        <!--
            Set the email width. Defined in two places:
            1. max-width for all clients except Desktop Windows Outlook, allowing the email to squish on narrow but never go wider than 680px.
            2. MSO tags for Desktop Windows Outlook enforce a 680px width.
            Note: The Fluid and Responsive templates have a different width (600px). The hybrid grid is more "fragile", and I've found that 680px is a good width. Change with caution.
        -->
        <div style="max-width: 680px; margin: 0 auto;" class="email-container">
            <!--[if mso]>
            <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="680">
            <tr>
            <td>
            <![endif]-->

	        <!-- Email Body : BEGIN -->
	        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: auto;">
		        <!-- Email Header : BEGIN -->
	            <tr>
	                <td style="padding: 20px 0; text-align: center">
	                    <img src="https://via.placeholder.com/200x50" width="200" height="50" alt="alt_text" border="0" style="height: auto; background: #dddddd; font-family: sans-serif; font-size: 15px; line-height: 15px; color: #555555;">
	                </td>
	            </tr>
		        <!-- Email Header : END -->

	            <!-- Hero Image, Flush : BEGIN -->
                <tr>
                    <td style="background-color: #ffffff;">
                        <img src="https://via.placeholder.com/1360x600" width="680" height="" alt="alt_text" border="0" style="width: 100%; max-width: 680px; height: auto; background: #dddddd; font-family: sans-serif; font-size: 15px; line-height: 15px; color: #555555; margin: auto; display: block;" class="g-img">
                    </td>
                </tr>
                <!-- Hero Image, Flush : END -->

                <!-- 1 Column Text + Button : BEGIN -->
                <tr>
                    <td style="background-color: #ffffff;">
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                            <tr>
                                <td style="padding: 20px; font-family: sans-serif; font-size: 15px; line-height: 20px; color: #555555;">
                                    <h1 style="margin: 0 0 10px; font-size: 25px; line-height: 30px; color: #333333; font-weight: normal;">Praesent laoreet malesuada&nbsp;cursus.</h1>
                                    <p style="margin: 0 0 10px;">Maecenas sed ante pellentesque, posuere leo id, eleifend dolor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent laoreet malesuada cursus. Maecenas scelerisque congue eros eu posuere. Praesent in felis ut velit pretium lobortis rhoncus ut&nbsp;erat.</p>
                                    <ul style="padding: 0; margin: 0; list-style-type: disc;">
										<li style="margin:0 0 10px 30px;" class="list-item-first">A list item.</li>
										<li style="margin:0 0 10px 30px;">Another list item here.</li>
										<li style="margin: 0 0 0 30px;" class="list-item-last">Everyone gets a list item, list items for everyone!</li>
									</ul>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding: 0 20px 20px;">
                                    <!-- Button : BEGIN -->
                                    <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: auto;">
                                        <tr>
                                            <td class="button-td button-td-primary" style="border-radius: 4px; background: #222222;">
											     <a class="button-a button-a-primary" href="https://google.com/" style="background: #222222; border: 1px solid #000000; font-family: sans-serif; font-size: 15px; line-height: 15px; text-decoration: none; padding: 13px 17px; color: #ffffff; display: block; border-radius: 4px;">Centered Primary Button</a>
											</td>
                                        </tr>
                                    </table>
                                    <!-- Button : END -->
                                </td>
                            </tr>

                        </table>
                    </td>
                </tr>
                <!-- 1 Column Text + Button : END -->

                <!-- Background Image with Text : BEGIN -->
                <tr>
                    <!-- Bulletproof Background Images c/o https://backgrounds.cm -->
                    <td style="text-align: center; background-image: url('https://via.placeholder.com/680x180/222222/666666'); background-color: #222222; background-position: center center !important; background-size: cover !important;">
                        <!--[if gte mso 9]>
                        <v:image xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="border: 0; display: inline-block; width: 680px; height: 180px;" src="https://via.placeholder.com/680x180/222222/666666" />
                        <v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="border: 0; display: inline-block; position: absolute; width: 680px; height: 180px;">
                        <v:fill opacity="0%" color="#222222" />
                        <![endif]-->
                        <div>
                            <!--[if mso]>
                            <table align="center" role="presentation" border="0" cellspacing="0" cellpadding="0" width="500">
                            <tr>
                            <td width="500">
                            <![endif]-->
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:500px; margin: auto;">
                                <tr>
                                    <td style="text-align: center; padding: 40px 20px; font-family: sans-serif; font-size: 15px; line-height: 20px; color: #ffffff;">
                                        <p style="margin: 0;">Maecenas sed ante pellentesque, posuere leo id, eleifend dolor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent laoreet malesuada cursus. Maecenas scelerisque congue eros eu posuere. Praesent in felis ut velit pretium lobortis rhoncus ut&nbsp;erat.</p>
                                    </td>
                                </tr>
                            </table>
                            <!--[if mso]>
                            </td>
                            </tr>
                            </table>
                            <![endif]-->
                        </div>
                        <!--[if gte mso 9]>
                        </v:fill>
                        </v:rect>
                        </v:image>
                        <![endif]-->
                    </td>
                </tr>
                <!-- Background Image with Text : END -->

                <!-- 2 Even Columns : BEGIN -->
                <tr>
                    <td align="center" valign="top" style="font-size:0; padding: 10px; background-color: #ffffff;">
                        <!--[if mso]>
                        <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="660">
                        <tr>
                        <td valign="top" width="330">
                        <![endif]-->
                        <div style="display:inline-block; margin: 0 -1px; width:100%; min-width:200px; max-width:330px; vertical-align:top;" class="stack-column">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td style="padding: 10px;">
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="font-size: 14px; text-align: left;">
                                            <tr>
                                                <td>
                                                    <img src="https://via.placeholder.com/310" width="310" height="" border="0" alt="alt_text" style="width: 100%; max-width: 310px; height: auto; background: #dddddd; font-family: sans-serif; font-size: 15px; line-height: 20px; color: #555555;" class="center-on-narrow">
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="font-family: sans-serif; font-size: 15px; line-height: 20px; color: #555555; padding-top: 10px;" class="stack-column-center">
                                                    <p style="margin: 0;">Maecenas sed ante pellentesque, posuere leo id, eleifend dolor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <!--[if mso]>
                        </td>
                        <td valign="top" width="330">
                        <![endif]-->
                        <div style="display:inline-block; margin: 0 -1px; width:100%; min-width:200px; max-width:330px; vertical-align:top;" class="stack-column">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td style="padding: 10px;">
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="font-size: 14px;text-align: left;">
                                            <tr>
                                                <td>
                                                    <img src="https://via.placeholder.com/310" width="310" height="" border="0" alt="alt_text" style="width: 100%; max-width: 310px; height: auto; background: #dddddd; font-family: sans-serif; font-size: 15px; line-height: 20px; color: #555555;" class="center-on-narrow">
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="font-family: sans-serif; font-size: 15px; line-height: 20px; color: #555555; padding-top: 10px;" class="stack-column-center">
                                                    <p style="margin: 0;">Maecenas sed ante pellentesque, posuere leo id, eleifend dolor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <!--[if mso]>
                        </td>
                        </tr>
                        </table>
                        <![endif]-->
                    </td>
                </tr>
                <!-- 2 Even Columns : END -->

                <!-- 3 Even Columns : BEGIN -->
                <tr>
                    <td align="center" valign="top" style="font-size:0; padding: 10px; background-color: #ffffff;">
                        <!--[if mso]>
                        <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="660">
                        <tr>
                        <td valign="top" width="220">
                        <![endif]-->
                        <div style="display:inline-block; margin: 0 -1px; max-width: 220px; min-width:160px; vertical-align:top; width:100%;" class="stack-column">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td style="padding: 10px;">
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="font-size: 14px;text-align: left;">
                                            <tr>
                                                <td>
                                                    <img src="https://via.placeholder.com/200" width="200" height="" border="0" alt="alt_text" style="width: 100%; max-width: 200px; height: auto; background: #dddddd; font-family: sans-serif; font-size: 15px; line-height: 20px; color: #555555;" class="center-on-narrow">
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="font-family: sans-serif; font-size: 15px; line-height: 20px; color: #555555; padding-top: 10px;" class="stack-column-center">
                                                    <p style="margin: 0;">Maecenas sed ante pellentesque, posuere leo id, eleifend dolor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <!--[if mso]>
                        </td>
                        <td valign="top" width="220">
                        <![endif]-->
                        <div style="display:inline-block; margin: 0 -1px; max-width: 220px; min-width:160px; vertical-align:top; width:100%;" class="stack-column">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td style="padding: 10px;">
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="font-size: 14px;text-align: left;">
                                            <tr>
                                                <td>
                                                    <img src="https://via.placeholder.com/200" width="200" height="" border="0" alt="alt_text" style="width: 100%; max-width: 200px; height: auto; background: #dddddd; font-family: sans-serif; font-size: 15px; line-height: 20px; color: #555555;" class="center-on-narrow">
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="font-family: sans-serif; font-size: 15px; line-height: 20px; color: #555555; padding-top: 10px;" class="stack-column-center">
                                                    <p style="margin: 0;">Maecenas sed ante pellentesque, posuere leo id, eleifend dolor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <!--[if mso]>
                        </td>
                        <td valign="top" width="220">
                        <![endif]-->
                        <div style="display:inline-block; margin: 0 -1px; max-width: 220px; min-width:160px; vertical-align:top; width:100%;" class="stack-column">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td style="padding: 10px;">
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="font-size: 14px;text-align: left;">
                                            <tr>
                                                <td>
                                                    <img src="https://via.placeholder.com/200" width="200" height="" border="0" alt="alt_text" style="width: 100%; max-width: 200px; height: auto; background: #dddddd; font-family: sans-serif; font-size: 15px; line-height: 20px; color: #555555;" class="center-on-narrow">
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="font-family: sans-serif; font-size: 15px; line-height: 20px; color: #555555; padding-top: 10px;" class="stack-column-center">
                                                    <p style="margin: 0;">Maecenas sed ante pellentesque, posuere leo id, eleifend dolor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <!--[if mso]>
                        </td>
                        </tr>
                        </table>
                        <![endif]-->
                    </td>
                </tr>
                <!-- 3 Even Columns : END -->

                <!-- Thumbnail Left, Text Right : BEGIN -->
                <tr>
                    <!-- dir=ltr is where the magic happens. This can be changed to dir=rtl to swap the alignment on wide while maintaining stack order on narrow. -->
                    <td dir="ltr" height="100%" valign="top" width="100%" style="font-size:0; padding: 10px; background-color: #ffffff;">
                        <!--[if mso]>
                        <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="660" style="width: 660px;">
                        <tr>
                        <td valign="top" width="220" style="width: 220px;">
                        <![endif]-->
                        <div style="display:inline-block; margin: 0 -1px; max-width: 220px; min-width:160px; vertical-align:top; width:100%;" class="stack-column">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td dir="ltr" style="padding: 0 10px 10px 10px;">
                                        <img src="https://via.placeholder.com/200" width="200" height="" border="0" alt="alt_text" class="center-on-narrow" style="width: 100%; max-width: 200px; height: auto; background: #dddddd; font-family: sans-serif; font-size: 15px; line-height: 15px; color: #555555;">
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <!--[if mso]>
                        </td>
                        <td valign="top" width="440" style="width: 440px;">
                        <![endif]-->
                        <div style="display:inline-block; margin: 0 -1px; max-width: 440px; min-width:280px; vertical-align:top;" class="stack-column">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td dir="ltr" style="font-family: sans-serif; font-size: 15px; line-height: 20px; color: #555555; padding: 10px 10px 0; text-align: left;" class="center-on-narrow">
                                        <h2 style="margin: 0 0 10px 0; font-family: sans-serif; font-size: 18px; line-height: 22px; color: #333333; font-weight: bold;">Class aptent taciti sociosqu</h2>
                                        <p style="margin: 0 0 10px 0;">Maecenas sed ante pellentesque, posuere leo id, eleifend dolor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
                                        <!-- Button : BEGIN -->
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" class="center-on-narrow" style="float:left;">
                                            <tr>
                                                <td class="button-td button-td-primary" style="border-radius: 4px; background: #222222;">
                                                    <a class="button-a button-a-primary" href="https://google.com/" style="background: #222222; border: 1px solid #000000; font-family: sans-serif; font-size: 15px; line-height: 15px; text-decoration: none; padding: 13px 17px; color: #ffffff; display: block; border-radius: 4px;">Primary Button</a>
                                                </td>
                                            </tr>
                                        </table>
                                        <!-- Button : END -->
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <!--[if mso]>
                        </td>
                        </tr>
                        </table>
                        <![endif]-->
                    </td>
                </tr>
                <!-- Thumbnail Left, Text Right : END -->

                <!-- Thumbnail Right, Text Left : BEGIN -->
                <tr>
                    <!-- dir=rtl is where the magic happens. This can be changed to dir=ltr to swap the alignment on wide while maintaining stack order on narrow. -->
                    <td dir="rtl" height="100%" valign="top" width="100%" style="font-size:0; padding: 10px; text-align: left; background-color: #ffffff;">
                        <!--[if mso]>
                        <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="660" style="width: 660px;">
                        <tr>
                        <td valign="top" width="220" style="width: 220px;">
                        <![endif]-->
                        <div style="display:inline-block; margin: 0 -1px; max-width: 220px; min-width:160px; vertical-align:top; width:100%;" class="stack-column">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td dir="ltr" style="padding: 0 10px 10px 10px;">
                                        <img src="https://via.placeholder.com/200" width="200" height="" border="0" alt="alt_text" class="center-on-narrow" style="width: 100%; max-width: 200px; height: auto; background: #dddddd; font-family: sans-serif; font-size: 15px; line-height: 15px; color: #555555;">
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <!--[if mso]>
                        </td>
                        <td valign="top" width="440" style="width: 440px;">
                        <![endif]-->
                        <div style="display:inline-block; margin: 0 -1px; max-width: 440px; min-width:280px; vertical-align:top;" class="stack-column">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td dir="ltr" style="font-family: sans-serif; font-size: 15px; line-height: 20px; color: #555555; padding: 10px 10px 0; text-align: left;" class="center-on-narrow">
                                        <h2 style="margin: 0 0 10px 0; font-family: sans-serif; font-size: 18px; line-height: 22px; color: #333333; font-weight: bold;">Class aptent taciti sociosqu</h2>
                                        <p style="margin: 0 0 10px 0;">Maecenas sed ante pellentesque, posuere leo id, eleifend dolor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
                                        <!-- Button : BEGIN -->
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" class="center-on-narrow" style="float:left;">
                                            <tr>
                                                <td class="button-td button-td-primary" style="border-radius: 4px; background: #222222;">
                                                    <a class="button-a button-a-primary" href="https://google.com/" style="background: #222222; border: 1px solid #000000; font-family: sans-serif; font-size: 15px; line-height: 15px; text-decoration: none; padding: 13px 17px; color: #ffffff; display: block; border-radius: 4px;">Primary Button</a>
                                                </td>
                                            </tr>
                                        </table>
                                        <!-- Button : END -->
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <!--[if mso]>
                        </td>
                        </tr>
                        </table>
                        <![endif]-->
                    </td>
                </tr>
                <!-- Thumbnail Right, Text Left : END -->

                <!-- Clear Spacer : BEGIN -->
                <tr>
                    <td aria-hidden="true" height="40" style="font-size: 0px; line-height: 0px;">
                        &nbsp;
                    </td>
                </tr>
                <!-- Clear Spacer : END -->

                <!-- 1 Column Text : BEGIN -->
                <tr>
                    <td style="background-color: #ffffff;">
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                            <tr>
                                <td style="padding: 20px; font-family: sans-serif; font-size: 15px; line-height: 20px; color: #555555;">
                                    <p style="margin: 0 0 10px 0;">Maecenas sed ante pellentesque, posuere leo id, eleifend dolor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent laoreet malesuada cursus. Maecenas scelerisque congue eros eu posuere. Praesent in felis ut velit pretium lobortis rhoncus ut&nbsp;erat.</p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <!-- 1 Column Text : END -->

            </table>
            <!-- Email Body : END -->

            <!-- Email Footer : BEGIN -->
            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 680px;">
                <tr>
                    <td style="padding: 20px; font-family: sans-serif; font-size: 12px; line-height: 15px; text-align: center; color: #ffffff;">
                        <webversion style="color: #ffffff; text-decoration: underline; font-weight: bold;">View as a Web Page</webversion>
                        <br><br>
		                Company Name<br><span class="unstyle-auto-detected-links">123 Fake Street, SpringField, OR, 97477 US<br>(123) 456-7890</span>
                        <br><br>
                        <unsubscribe style="color: #ffffff; text-decoration: underline;">unsubscribe</unsubscribe>
                    </td>
                </tr>
            </table>
            <!-- Email Footer : END -->

            <!--[if mso]>
            </td>
            </tr>
            </table>
            <![endif]-->
        </div>

        <!-- Full Bleed Background Section : BEGIN -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #709f2b;">
            <tr>
                <td>
                    <div align="center" style="max-width: 680px; margin: auto;" class="email-container">
                        <!--[if mso]>
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="680" align="center">
                        <tr>
                        <td>
                        <![endif]-->
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                            <tr>
                                <td style="padding: 20px; text-align: left; font-family: sans-serif; font-size: 15px; line-height: 20px; color: #ffffff;">
                                    <p style="margin: 0;">Maecenas sed ante pellentesque, posuere leo id, eleifend dolor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent laoreet malesuada cursus. Maecenas scelerisque congue eros eu posuere. Praesent in felis ut velit pretium lobortis rhoncus ut&nbsp;erat.</p>
                                </td>
                            </tr>
                        </table>
                        <!--[if mso]>
                        </td>
                        </tr>
                        </table>
                        <![endif]-->
                    </div>
                </td>
            </tr>
        </table>
        <!-- Full Bleed Background Section : END -->

    <!--[if mso | IE]>
    </td>
    </tr>
    </table>
    <![endif]-->
    </center>
</body>
</html>
`,
        });

        editor.Blocks.add('Fluido', {
            label: 'Fluido',
            content: `
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
    <meta charset="utf-8"> <!-- utf-8 works for most cases -->
    <meta name="viewport" content="width=device-width"> <!-- Forcing initial-scale shouldn't be necessary -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge"> <!-- Use the latest (edge) version of IE rendering engine -->
    <meta name="x-apple-disable-message-reformatting">  <!-- Disable auto-scale in iOS 10 Mail entirely -->
    <meta name="format-detection" content="telephone=no,address=no,email=no,date=no,url=no"> <!-- Tell iOS not to automatically link certain text strings. -->
    <meta name="color-scheme" content="light">
    <meta name="supported-color-schemes" content="light">
    <title></title> <!--   The title tag shows in email notifications, like Android 4.4. -->

    <!-- What it does: Makes background images in 72ppi Outlook render at correct size. -->
    <!--[if gte mso 9]>
    <xml>
        <o:OfficeDocumentSettings>
            <o:AllowPNG/>
            <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
    </xml>
    <![endif]-->

    <!-- Web Font / @font-face : BEGIN -->
    <!-- NOTE: If web fonts are not required, lines 23 - 41 can be safely removed. -->

    <!-- Desktop Outlook chokes on web font references and defaults to Times New Roman, so we force a safe fallback font. -->
    <!--[if mso]>
        <style>
            * {
                font-family: sans-serif !important;
            }
        </style>
    <![endif]-->

    <!-- All other clients get the webfont reference; some will render the font and others will silently fail to the fallbacks. More on that here: http://stylecampaign.com/blog/2015/02/webfont-support-in-email/ -->
    <!--[if !mso]><!-->
    <!-- insert web font reference, eg: <link href='https://fonts.googleapis.com/css?family=Roboto:400,700' rel='stylesheet' type='text/css'> -->
    <!--<![endif]-->

    <!-- Web Font / @font-face : END -->

    <!-- CSS Reset : BEGIN -->
    <style>

        /* What it does: Tells the email client that only light styles are provided but the client can transform them to dark. A duplicate of meta color-scheme meta tag above. */
        :root {
          color-scheme: light;
          supported-color-schemes: light;
        }

        /* What it does: Remove spaces around the email design added by some email clients. */
        /* Beware: It can remove the padding / margin and add a background color to the compose a reply window. */
        html,
        body {
            margin: 0 auto !important;
            padding: 0 !important;
            height: 100% !important;
            width: 100% !important;
        }

        /* What it does: Stops email clients resizing small text. */
        * {
            -ms-text-size-adjust: 100%;
            -webkit-text-size-adjust: 100%;
        }

        /* What it does: Centers email on Android 4.4 */
        div[style*="margin: 16px 0"] {
            margin: 0 !important;
        }

        /* What it does: forces Samsung Android mail clients to use the entire viewport */
        #MessageViewBody, #MessageWebViewDiv{
            width: 100% !important;
        }

        /* What it does: Stops Outlook from adding extra spacing to tables. */
        table,
        td {
            mso-table-lspace: 0pt !important;
            mso-table-rspace: 0pt !important;
        }

        /* What it does: Fixes webkit padding issue. */
        table {
            border-spacing: 0 !important;
            border-collapse: collapse !important;
            table-layout: fixed !important;
            margin: 0 auto !important;
        }

        /* What it does: Uses a better rendering method when resizing images in IE. */
        img {
            -ms-interpolation-mode:bicubic;
        }

        /* What it does: Prevents Windows 10 Mail from underlining links despite inline CSS. Styles for underlined links should be inline. */
        a {
            text-decoration: none;
        }

        /* What it does: A work-around for email clients meddling in triggered links. */
        a[x-apple-data-detectors],  /* iOS */
        .unstyle-auto-detected-links a,
        .aBn {
            border-bottom: 0 !important;
            cursor: default !important;
            color: inherit !important;
            text-decoration: none !important;
            font-size: inherit !important;
            font-family: inherit !important;
            font-weight: inherit !important;
            line-height: inherit !important;
        }

        /* What it does: Prevents Gmail from displaying a download button on large, non-linked images. */
        .a6S {
            display: none !important;
            opacity: 0.01 !important;
        }

        /* What it does: Prevents Gmail from changing the text color in conversation threads. */
        .im {
            color: inherit !important;
        }

        /* If the above doesn't work, add a .g-img class to any image in question. */
        img.g-img + div {
            display: none !important;
        }

        /* What it does: Removes right gutter in Gmail iOS app: https://github.com/TedGoas/Cerberus/issues/89  */
        /* Create one of these media queries for each additional viewport size you'd like to fix */

        /* iPhone 4, 4S, 5, 5S, 5C, and 5SE */
        @media only screen and (min-device-width: 320px) and (max-device-width: 374px) {
            u ~ div .email-container {
                min-width: 320px !important;
            }
        }
        /* iPhone 6, 6S, 7, 8, and X */
        @media only screen and (min-device-width: 375px) and (max-device-width: 413px) {
            u ~ div .email-container {
                min-width: 375px !important;
            }
        }
        /* iPhone 6+, 7+, and 8+ */
        @media only screen and (min-device-width: 414px) {
            u ~ div .email-container {
                min-width: 414px !important;
            }
        }

    </style>
    <!-- CSS Reset : END -->

    <!-- Progressive Enhancements : BEGIN -->
    <style>

	    /* What it does: Hover styles for buttons */
	    .button-td,
	    .button-a {
	        transition: all 100ms ease-in;
	    }
	    .button-td-primary:hover,
	    .button-a-primary:hover {
	        background: #555555 !important;
	        border-color: #555555 !important;
	    }

	    /* Media Queries */
	    @media screen and (max-width: 600px) {

	        /* What it does: Adjust typography on small screens to improve readability */
	        .email-container p {
	            font-size: 17px !important;
	        }

	    }

    </style>
    <!-- Progressive Enhancements : END -->

</head>
<!--
	The email background color (#222222) is defined in three places:
	1. body tag: for most email clients
	2. center tag: for Gmail and Inbox mobile apps and web versions of Gmail, GSuite, Inbox, Yahoo, AOL, Libero, Comcast, freenet, Mail.ru, Orange.fr
	3. mso conditional: For Windows 10 Mail
-->
<body width="100%" style="margin: 0; padding: 0 !important; mso-line-height-rule: exactly; background-color: #222222;">
	<center role="article" aria-roledescription="email" lang="en" style="width: 100%; background-color: #222222;">
    <!--[if mso | IE]>
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #222222;">
    <tr>
    <td>
    <![endif]-->

        <!-- Visually Hidden Preheader Text : BEGIN -->
        <div style="max-height:0; overflow:hidden; mso-hide:all;" aria-hidden="true">
            (Optional) This text will appear in the inbox preview, but not the email body. It can be used to supplement the email subject line or even summarize the email's contents. Extended text preheaders (~490 characters) seems like a better UX for anyone using a screenreader or voice-command apps like Siri to dictate the contents of an email. If this text is not included, email clients will automatically populate it using the text (including image alt text) at the start of the email's body.
        </div>
        <!-- Visually Hidden Preheader Text : END -->

        <!-- Create white space after the desired preview text so email clients don’t pull other distracting text into the inbox preview. Extend as necessary. -->
        <!-- Preview Text Spacing Hack : BEGIN -->
        <div style="display: none; font-size: 1px; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all; font-family: sans-serif;">
	        &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
        </div>
        <!-- Preview Text Spacing Hack : END -->

        <!--
            Set the email width. Defined in two places:
            1. max-width for all clients except Desktop Windows Outlook, allowing the email to squish on narrow but never go wider than 600px.
            2. MSO tags for Desktop Windows Outlook enforce a 600px width.
        -->
        <div style="max-width: 600px; margin: 0 auto;" class="email-container">
            <!--[if mso]>
            <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="600">
            <tr>
            <td>
            <![endif]-->

	        <!-- Email Body : BEGIN -->
	        <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: auto;">
		        <!-- Email Header : BEGIN -->
	            <tr>
	                <td style="padding: 20px 0; text-align: center">
	                    <img src="https://via.placeholder.com/200x50" width="200" height="50" alt="alt_text" border="0" style="height: auto; background: #dddddd; font-family: sans-serif; font-size: 15px; line-height: 15px; color: #555555;">
	                </td>
	            </tr>
		        <!-- Email Header : END -->

                <!-- Hero Image, Flush : BEGIN -->
                <tr>
                    <td style="background-color: #ffffff;">
                        <img src="https://via.placeholder.com/1200x600" width="600" height="" alt="alt_text" border="0" style="width: 100%; max-width: 600px; height: auto; background: #dddddd; font-family: sans-serif; font-size: 15px; line-height: 15px; color: #555555; margin: auto; display: block;" class="g-img">
                    </td>
                </tr>
                <!-- Hero Image, Flush : END -->

                <!-- 1 Column Text + Button : BEGIN -->
                <tr>
                    <td style="background-color: #ffffff;">
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                            <tr>
                                <td style="padding: 20px; font-family: sans-serif; font-size: 15px; line-height: 20px; color: #555555;">
                                    <h1 style="margin: 0 0 10px 0; font-family: sans-serif; font-size: 25px; line-height: 30px; color: #333333; font-weight: normal;">Praesent laoreet malesuada&nbsp;cursus.</h1>
                                    <p style="margin: 0;">Maecenas sed ante pellentesque, posuere leo id, eleifend dolor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent laoreet malesuada cursus. Maecenas scelerisque congue eros eu posuere. Praesent in felis ut velit pretium lobortis rhoncus ut&nbsp;erat.</p>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding: 0 20px;">
                                    <!-- Button : BEGIN -->
                                    <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: auto;">
                                        <tr>
                                            <td class="button-td button-td-primary" style="border-radius: 4px; background: #222222;">
											     <a class="button-a button-a-primary" href="https://google.com/" style="background: #222222; border: 1px solid #000000; font-family: sans-serif; font-size: 15px; line-height: 15px; text-decoration: none; padding: 13px 17px; color: #ffffff; display: block; border-radius: 4px;">Primary Button</a>
											</td>
                                        </tr>
                                    </table>
                                    <!-- Button : END -->
                                </td>
                            </tr>
                            <tr>
                                <td style="padding: 20px; font-family: sans-serif; font-size: 15px; line-height: 20px; color: #555555;">
                                    <h2 style="margin: 0 0 10px 0; font-family: sans-serif; font-size: 18px; line-height: 22px; color: #333333; font-weight: bold;">Praesent in felis ut velit pretium lobortis rhoncus ut&nbsp;erat.</h2>
                                    <ul style="padding: 0; margin: 0 0 10px 0; list-style-type: disc;">
										<li style="margin:0 0 10px 30px;" class="list-item-first">A list item.</li>
										<li style="margin:0 0 10px 30px;">Another list item here.</li>
										<li style="margin: 0 0 0 30px;" class="list-item-last">Everyone gets a list item, list items for everyone!</li>
									</ul>
                                    <p style="margin: 0;">Maecenas sed ante pellentesque, posuere leo id, eleifend dolor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent laoreet malesuada cursus. Maecenas scelerisque congue eros eu posuere. Praesent in felis ut velit pretium lobortis rhoncus ut&nbsp;erat.</p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <!-- 1 Column Text + Button : END -->

                <!-- 2 Even Columns : BEGIN -->
                <tr>
                    <td style="padding: 0 10px 40px 10px; background-color: #ffffff;">
                        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                            <tr>
                                <td valign="top" width="50%">
                                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                        <tr>
                                            <td style="text-align: center; padding: 0 10px;">
                                                <img src="https://via.placeholder.com/200" width="200" height="" alt="alt_text" border="0" style="width: 100%; max-width: 200px; background: #dddddd; font-family: sans-serif; font-size: 15px; line-height: 15px; color: #555555;">
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="text-align: left; font-family: sans-serif; font-size: 15px; line-height: 20px; color: #555555; padding: 10px 10px 0;">
                                               <p style="margin: 0;">Maecenas sed ante pellentesque, posuere leo id, eleifend dolor.</p>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                                <td valign="top" width="50%">
                                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                        <tr>
                                            <td style="text-align: center; padding: 0 10px;">
                                                <img src="https://via.placeholder.com/200" width="200" height="" alt="alt_text" border="0" style="width: 100%; max-width: 200px; background: #dddddd; font-family: sans-serif; font-size: 15px; line-height: 15px; color: #555555;">
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="text-align: left; font-family: sans-serif; font-size: 15px; line-height: 20px; color: #555555; padding: 10px 10px 0;">
                                                <p style="margin: 0;">Maecenas sed ante pellentesque, posuere leo id, eleifend dolor.</p>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <!-- 2 Even Columns : END -->

                <!-- Clear Spacer : BEGIN -->
                <tr>
                    <td aria-hidden="true" height="40" style="font-size: 0px; line-height: 0px;">
                        &nbsp;
                    </td>
                </tr>
                <!-- Clear Spacer : END -->

                <!-- 1 Column Text : BEGIN -->
                <tr>
                    <td style="background-color: #ffffff;">
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                            <tr>
                                <td style="padding: 20px; font-family: sans-serif; font-size: 15px; line-height: 20px; color: #555555;">
                                    <p style="margin: 0;">Maecenas sed ante pellentesque, posuere leo id, eleifend dolor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent laoreet malesuada cursus. Maecenas scelerisque congue eros eu posuere. Praesent in felis ut velit pretium lobortis rhoncus ut&nbsp;erat.</p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <!-- 1 Column Text : END -->

            </table>
            <!-- Email Body : END -->

            <!-- Email Footer : BEGIN -->
	        <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: auto;">
                <tr>
                    <td style="padding: 20px; font-family: sans-serif; font-size: 12px; line-height: 15px; text-align: center; color: #ffffff;">
                        <webversion style="color: #ffffff; text-decoration: underline; font-weight: bold;">View as a Web Page</webversion>
                        <br><br>
						Company Name<br><span class="unstyle-auto-detected-links">123 Fake Street, SpringField, OR, 97477 US<br>(123) 456-7890</span>
                        <br><br>
                        <unsubscribe style="color: #ffffff; text-decoration: underline;">unsubscribe</unsubscribe>
                    </td>
                </tr>
            </table>
            <!-- Email Footer : END -->

            <!--[if mso]>
            </td>
            </tr>
            </table>
            <![endif]-->
        </div>

        <!-- Full Bleed Background Section : BEGIN -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #709f2b;">
            <tr>
                <td>
                    <div align="center" style="max-width: 600px; margin: auto;" class="email-container">
                        <!--[if mso]>
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" align="center">
                        <tr>
                        <td>
                        <![endif]-->
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                            <tr>
                                <td style="padding: 20px; text-align: left; font-family: sans-serif; font-size: 15px; line-height: 20px; color: #ffffff;">
                                    <p style="margin: 0;">Maecenas sed ante pellentesque, posuere leo id, eleifend dolor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent laoreet malesuada cursus. Maecenas scelerisque congue eros eu posuere. Praesent in felis ut velit pretium lobortis rhoncus ut&nbsp;erat.</p>
                                </td>
                            </tr>
                        </table>
                        <!--[if mso]>
                        </td>
                        </tr>
                        </table>
                        <![endif]-->
                    </div>
                </td>
            </tr>
        </table>
        <!-- Full Bleed Background Section : END -->

    <!--[if mso | IE]>
    </td>
    </tr>
    </table>
    <![endif]-->
    </center>
</body>
</html>
`,
        });
        editor.Blocks.add('Responsive', {
            label: 'Responsive',
            content: `
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
    <meta charset="utf-8"> <!-- utf-8 works for most cases -->
    <meta name="viewport" content="width=device-width"> <!-- Forcing initial-scale shouldn't be necessary -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge"> <!-- Use the latest (edge) version of IE rendering engine -->
    <meta name="x-apple-disable-message-reformatting">  <!-- Disable auto-scale in iOS 10 Mail entirely -->
    <meta name="format-detection" content="telephone=no,address=no,email=no,date=no,url=no"> <!-- Tell iOS not to automatically link certain text strings. -->
    <meta name="color-scheme" content="light">
    <meta name="supported-color-schemes" content="light">
    <title></title> <!-- The title tag shows in email notifications, like Android 4.4. -->

    <!-- What it does: Makes background images in 72ppi Outlook render at correct size. -->
    <!--[if gte mso 9]>
    <xml>
        <o:OfficeDocumentSettings>
            <o:AllowPNG/>
            <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
    </xml>
    <![endif]-->

    <!-- Web Font / @font-face : BEGIN -->
    <!-- NOTE: If web fonts are not required, lines 23 - 41 can be safely removed. -->

    <!-- Desktop Outlook chokes on web font references and defaults to Times New Roman, so we force a safe fallback font. -->
    <!--[if mso]>
        <style>
            * {
                font-family: sans-serif !important;
            }
        </style>
    <![endif]-->

    <!-- All other clients get the webfont reference; some will render the font and others will silently fail to the fallbacks. More on that here: http://stylecampaign.com/blog/2015/02/webfont-support-in-email/ -->
    <!--[if !mso]><!-->
    <!-- insert web font reference, eg: <link href='https://fonts.googleapis.com/css?family=Roboto:400,700' rel='stylesheet' type='text/css'> -->
    <!--<![endif]-->

    <!-- Web Font / @font-face : END -->

    <!-- CSS Reset : BEGIN -->
    <style>

        /* What it does: Tells the email client that only light styles are provided but the client can transform them to dark. A duplicate of meta color-scheme meta tag above. */
        :root {
          color-scheme: light;
          supported-color-schemes: light;
        }

        /* What it does: Remove spaces around the email design added by some email clients. */
        /* Beware: It can remove the padding / margin and add a background color to the compose a reply window. */
        html,
        body {
            margin: 0 auto !important;
            padding: 0 !important;
            height: 100% !important;
            width: 100% !important;
        }

        /* What it does: Stops email clients resizing small text. */
        * {
            -ms-text-size-adjust: 100%;
            -webkit-text-size-adjust: 100%;
        }

        /* What it does: Centers email on Android 4.4 */
        div[style*="margin: 16px 0"] {
            margin: 0 !important;
        }

        /* What it does: forces Samsung Android mail clients to use the entire viewport */
        #MessageViewBody, #MessageWebViewDiv{
            width: 100% !important;
        }

        /* What it does: Stops Outlook from adding extra spacing to tables. */
        table,
        td {
            mso-table-lspace: 0pt !important;
            mso-table-rspace: 0pt !important;
        }

        /* What it does: Replaces default bold style. */
        th {
        	font-weight: normal;
        }

        /* What it does: Fixes webkit padding issue. */
        table {
            border-spacing: 0 !important;
            border-collapse: collapse !important;
            table-layout: fixed !important;
            margin: 0 auto !important;
        }

        /* What it does: Prevents Windows 10 Mail from underlining links despite inline CSS. Styles for underlined links should be inline. */
        a {
            text-decoration: none;
        }

        /* What it does: Uses a better rendering method when resizing images in IE. */
        img {
            -ms-interpolation-mode:bicubic;
        }

        /* What it does: A work-around for email clients meddling in triggered links. */
        a[x-apple-data-detectors],  /* iOS */
        .unstyle-auto-detected-links a,
        .aBn {
            border-bottom: 0 !important;
            cursor: default !important;
            color: inherit !important;
            text-decoration: none !important;
            font-size: inherit !important;
            font-family: inherit !important;
            font-weight: inherit !important;
            line-height: inherit !important;
        }

        /* What it does: Prevents Gmail from changing the text color in conversation threads. */
        .im {
            color: inherit !important;
        }

        /* What it does: Prevents Gmail from displaying a download button on large, non-linked images. */
        .a6S {
           display: none !important;
           opacity: 0.01 !important;
		}
		/* If the above doesn't work, add a .g-img class to any image in question. */
		img.g-img + div {
		   display: none !important;
		}

        /* What it does: Removes right gutter in Gmail iOS app: https://github.com/TedGoas/Cerberus/issues/89  */
        /* Create one of these media queries for each additional viewport size you'd like to fix */

        /* iPhone 4, 4S, 5, 5S, 5C, and 5SE */
        @media only screen and (min-device-width: 320px) and (max-device-width: 374px) {
            u ~ div .email-container {
                min-width: 320px !important;
            }
        }
        /* iPhone 6, 6S, 7, 8, and X */
        @media only screen and (min-device-width: 375px) and (max-device-width: 413px) {
            u ~ div .email-container {
                min-width: 375px !important;
            }
        }
        /* iPhone 6+, 7+, and 8+ */
        @media only screen and (min-device-width: 414px) {
            u ~ div .email-container {
                min-width: 414px !important;
            }
        }

    </style>
    <!-- CSS Reset : END -->

    <!-- Progressive Enhancements : BEGIN -->
    <style>

        /* What it does: Hover styles for buttons */
        .button-td,
        .button-a {
            transition: all 100ms ease-in;
        }
	    .button-td-primary:hover,
	    .button-a-primary:hover {
	        background: #555555 !important;
	        border-color: #555555 !important;
	    }

        /* Media Queries */
        @media screen and (max-width: 600px) {

            .email-container {
                width: 100% !important;
                margin: auto !important;
            }

            /* What it does: Forces table cells into full-width rows. */
            .stack-column,
            .stack-column-center {
                display: block !important;
                width: 100% !important;
                max-width: 100% !important;
                direction: ltr !important;
            }
            /* And center justify these ones. */
            .stack-column-center {
                text-align: center !important;
            }

            /* What it does: Generic utility class for centering. Useful for images, buttons, and nested tables. */
            .center-on-narrow {
                text-align: center !important;
                display: block !important;
                margin-left: auto !important;
                margin-right: auto !important;
                float: none !important;
            }
            table.center-on-narrow {
                display: inline-block !important;
            }

            /* What it does: Adjust typography on small screens to improve readability */
            .email-container p {
                font-size: 17px !important;
            }
        }

    </style>
    <!-- Progressive Enhancements : END -->

</head>
<!--
	The email background color (#222222) is defined in three places:
	1. body tag: for most email clients
	2. center tag: for Gmail and Inbox mobile apps and web versions of Gmail, GSuite, Inbox, Yahoo, AOL, Libero, Comcast, freenet, Mail.ru, Orange.fr
	3. mso conditional: For Windows 10 Mail
-->
<body width="100%" style="margin: 0; padding: 0 !important; mso-line-height-rule: exactly; background-color: #222222;">
  <center role="article" aria-roledescription="email" lang="en" style="width: 100%; background-color: #222222;">
    <!--[if mso | IE]>
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #222222;">
    <tr>
    <td>
    <![endif]-->

        <!-- Visually Hidden Preheader Text : BEGIN -->
        <div style="max-height:0; overflow:hidden; mso-hide:all;" aria-hidden="true">
            (Optional) This text will appear in the inbox preview, but not the email body. It can be used to supplement the email subject line or even summarize the email's contents. Extended text preheaders (~490 characters) seems like a better UX for anyone using a screenreader or voice-command apps like Siri to dictate the contents of an email. If this text is not included, email clients will automatically populate it using the text (including image alt text) at the start of the email's body.
        </div>
        <!-- Visually Hidden Preheader Text : END -->

        <!-- Create white space after the desired preview text so email clients don’t pull other distracting text into the inbox preview. Extend as necessary. -->
        <!-- Preview Text Spacing Hack : BEGIN -->
        <div style="display: none; font-size: 1px; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all; font-family: sans-serif;">
            &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
        </div>
        <!-- Preview Text Spacing Hack : END -->

        <!-- Email Body : BEGIN -->
        <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="margin: auto;" class="email-container">
	        <!-- Email Header : BEGIN -->
            <tr>
                <td style="padding: 20px 0; text-align: center">
                    <img src="https://via.placeholder.com/200x50" width="200" height="50" alt="alt_text" border="0" style="height: auto; background: #dddddd; font-family: sans-serif; font-size: 15px; line-height: 15px; color: #555555;">
                </td>
            </tr>
	        <!-- Email Header : END -->

            <!-- Hero Image, Flush : BEGIN -->
            <tr>
                <td style="background-color: #ffffff;">
                    <img src="https://via.placeholder.com/1200x600" width="600" height="" alt="alt_text" border="0" style="width: 100%; max-width: 600px; height: auto; background: #dddddd; font-family: sans-serif; font-size: 15px; line-height: 15px; color: #555555; margin: auto; display: block;" class="g-img">
                </td>
            </tr>
            <!-- Hero Image, Flush : END -->

            <!-- 1 Column Text + Button : BEGIN -->
            <tr>
                <td style="background-color: #ffffff;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                        <tr>
                            <td style="padding: 20px; font-family: sans-serif; font-size: 15px; line-height: 20px; color: #555555;">
                                <h1 style="margin: 0 0 10px; font-size: 25px; line-height: 30px; color: #333333; font-weight: normal;">Praesent laoreet malesuada&nbsp;cursus.</h1>
                                <p style="margin: 0 0 10px;">Maecenas sed ante pellentesque, posuere leo id, eleifend dolor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent laoreet malesuada cursus. Maecenas scelerisque congue eros eu posuere. Praesent in felis ut velit pretium lobortis rhoncus ut&nbsp;erat.</p>
                                <ul style="padding: 0; margin: 0; list-style-type: disc;">
									<li style="margin:0 0 10px 20px;" class="list-item-first">A list item.</li>
									<li style="margin:0 0 10px 20px;">Another list item here.</li>
									<li style="margin: 0 0 0 20px;" class="list-item-last">Everyone gets a list item, list items for everyone!</li>
								</ul>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 0 20px 20px;">
                                <!-- Button : BEGIN -->
                                <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: auto;">
                                    <tr>
                                        <td class="button-td button-td-primary" style="border-radius: 4px; background: #222222;">
											<a class="button-a button-a-primary" href="https://google.com/" style="background: #222222; border: 1px solid #000000; font-family: sans-serif; font-size: 15px; line-height: 15px; text-decoration: none; padding: 13px 17px; color: #ffffff; display: block; border-radius: 4px;">Centered Primary Button</a>
										</td>
                                    </tr>
                                </table>
                                <!-- Button : END -->
                            </td>
                        </tr>

                    </table>
                </td>
            </tr>
            <!-- 1 Column Text + Button : END -->

            <!-- Background Image with Text : BEGIN -->
            <tr>
                <!-- Bulletproof Background Images c/o https://backgrounds.cm -->
                <td valign="middle" style="text-align: center; background-image: url('https://via.placeholder.com/600x230/222222/666666'); background-color: #222222; background-position: center center !important; background-size: cover !important;">
	                <!--[if gte mso 9]>
	                <v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width:600px;height:175px; background-position: center center !important;">
	                <v:fill type="tile" src="https://via.placeholder.com/600x230/222222/666666" color="#222222" />
	                <v:textbox inset="0,0,0,0">
	                <![endif]-->
	                <div>
	                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
	                        <tr>
	                            <td valign="middle" style="text-align: center; padding: 40px; font-family: sans-serif; font-size: 15px; line-height: 20px; color: #ffffff;">
	                                <p style="margin: 0;">Maecenas sed ante pellentesque, posuere leo id, eleifend dolor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent laoreet malesuada cursus. Maecenas scelerisque congue eros eu posuere. Praesent in felis ut velit pretium lobortis rhoncus ut&nbsp;erat.</p>
	                            </td>
	                        </tr>
	                    </table>
	                </div>
	                <!--[if gte mso 9]>
	                </v:textbox>
	                </v:rect>
	                <![endif]-->
	            </td>
	        </tr>
	        <!-- Background Image with Text : END -->

	        <!-- 2 Even Columns : BEGIN -->
	        <tr>
	            <td style="padding: 10px; background-color: #ffffff;">
	                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
	                    <tr>
	                        <!-- Column : BEGIN -->
	                        <th valign="top" width="50%" class="stack-column-center">
	                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
	                                <tr>
	                                    <td style="padding: 10px; text-align: center">
	                                        <img src="https://via.placeholder.com/270" width="270" height="" alt="alt_text" border="0" style="width: 100%; max-width: 270px; height: auto; background: #dddddd; font-family: sans-serif; font-size: 15px; line-height: 15px; color: #555555;">
	                                    </td>
	                                </tr>
	                                <tr>
	                                    <td style="font-family: sans-serif; font-size: 15px; line-height: 20px; color: #555555; padding: 0 10px 10px; text-align: left;" class="center-on-narrow">
	                                        <p style="margin: 0;">Maecenas sed ante pellentesque, posuere leo id, eleifend dolor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
	                                    </td>
	                                </tr>
	                            </table>
	                        </th>
	                        <!-- Column : END -->
	                        <!-- Column : BEGIN -->
	                        <th valign="top" width="50%" class="stack-column-center">
	                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
	                                <tr>
	                                    <td style="padding: 10px; text-align: center">
	                                        <img src="https://via.placeholder.com/270" width="270" height="" alt="alt_text" border="0" style="width: 100%; max-width: 270px; height: auto; background: #dddddd; font-family: sans-serif; font-size: 15px; line-height: 15px; color: #555555;">
	                                    </td>
	                                </tr>
	                                <tr>
	                                    <td style="font-family: sans-serif; font-size: 15px; line-height: 20px; color: #555555; padding: 0 10px 10px; text-align: left;" class="center-on-narrow">
	                                        <p style="margin: 0;">Maecenas sed ante pellentesque, posuere leo id, eleifend dolor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
	                                    </td>
	                                </tr>
	                            </table>
	                        </th>
	                        <!-- Column : END -->
	                    </tr>
	                </table>
	            </td>
	        </tr>
	        <!-- 2 Even Columns : END -->

	        <!-- 3 Even Columns : BEGIN -->
	        <tr>
	            <td style="padding: 10px; background-color: #ffffff;">
	                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
	                    <tr>
	                        <!-- Column : BEGIN -->
	                        <th valign="top" width="33.33%" class="stack-column-center">
	                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
	                                <tr>
	                                    <td style="padding: 10px; text-align: center">
	                                        <img src="https://via.placeholder.com/170" width="170" height="" alt="alt_text" border="0" style="width: 100%; max-width: 170px; height: auto; background: #dddddd; font-family: sans-serif; font-size: 15px; line-height: 15px; color: #555555;">
	                                    </td>
	                                </tr>
	                                <tr>
	                                    <td style="font-family: sans-serif; font-size: 15px; line-height: 20px; color: #555555; padding: 0 10px 10px; text-align: left;" class="center-on-narrow">
	                                        <p style="margin: 0;">Maecenas sed ante pellentesque, posuere leo id, eleifend dolor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
	                                    </td>
	                                </tr>
	                            </table>
	                        </th>
	                        <!-- Column : END -->
	                        <!-- Column : BEGIN -->
	                        <th valign="top" width="33.33%" class="stack-column-center">
	                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
	                                <tr>
	                                    <td style="padding: 10px; text-align: center">
	                                        <img src="https://via.placeholder.com/170" width="170" height="" alt="alt_text" border="0" style="width: 100%; max-width: 170px; height: auto; background: #dddddd; font-family: sans-serif; font-size: 15px; line-height: 15px; color: #555555;">
	                                    </td>
	                                </tr>
	                                <tr>
	                                    <td style="font-family: sans-serif; font-size: 15px; line-height: 20px; color: #555555; padding: 0 10px 10px; text-align: left;" class="center-on-narrow">
	                                        <p style="margin: 0;">Maecenas sed ante pellentesque, posuere leo id, eleifend dolor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
	                                    </td>
	                                </tr>
	                            </table>
	                        </th>
	                        <!-- Column : END -->
	                        <!-- Column : BEGIN -->
	                        <th valign="top" width="33.33%" class="stack-column-center">
	                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
	                                <tr>
	                                    <td style="padding: 10px; text-align: center">
	                                        <img src="https://via.placeholder.com/170" width="170" height="" alt="alt_text" border="0" style="width: 100%; max-width: 170px; height: auto; background: #dddddd; font-family: sans-serif; font-size: 15px; line-height: 15px; color: #555555;">
	                                    </td>
	                                </tr>
	                                <tr>
	                                    <td style="font-family: sans-serif; font-size: 15px; line-height: 20px; color: #555555; padding: 0 10px 10px; text-align: left;" class="center-on-narrow">
	                                        <p style="margin: 0;">Maecenas sed ante pellentesque, posuere leo id, eleifend dolor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
	                                    </td>
	                                </tr>
	                            </table>
	                        </th>
	                        <!-- Column : END -->
	                    </tr>
	                </table>
	            </td>
	        </tr>
	        <!-- 3 Even Columns : END -->

	        <!-- Thumbnail Left, Text Right : BEGIN -->
	        <tr>
	            <td dir="ltr" width="100%" style="padding: 10px; background-color: #ffffff;">
	                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
	                    <tr>
	                        <!-- Column : BEGIN -->
	                        <th width="33.33%" class="stack-column-center">
	                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
	                                <tr>
	                                    <td dir="ltr" valign="top" style="padding: 0 10px;">
	                                        <img src="https://via.placeholder.com/170" width="170" height="170" alt="alt_text" border="0" class="center-on-narrow" style="height: auto; background: #dddddd; font-family: sans-serif; font-size: 15px; line-height: 15px; color: #555555;">
	                                    </td>
	                                </tr>
	                            </table>
	                        </th>
	                        <!-- Column : END -->
	                        <!-- Column : BEGIN -->
	                        <th width="66.66%" class="stack-column-center">
	                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
	                                <tr>
	                                    <td dir="ltr" valign="top" style="font-family: sans-serif; font-size: 15px; line-height: 20px; color: #555555; padding: 10px; text-align: left;" class="center-on-narrow">
	                                        <h2 style="margin: 0 0 10px 0; font-family: sans-serif; font-size: 18px; line-height: 22px; color: #333333; font-weight: bold;">Class aptent taciti sociosqu</h2>
	                                        <p style="margin: 0 0 10px 0;">Maecenas sed ante pellentesque, posuere leo id, eleifend dolor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
	                                        <!-- Button : BEGIN -->
	                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" class="center-on-narrow" style="float:left;">
	                                            <tr>
		                                            <td class="button-td button-td-primary" style="border-radius: 4px; background: #222222;">
														<a class="button-a button-a-primary" href="https://google.com/" style="background: #222222; border: 1px solid #000000; font-family: sans-serif; font-size: 15px; line-height: 15px; text-decoration: none; padding: 13px 17px; color: #ffffff; display: block; border-radius: 4px;">Primary Button</a>
													</td>
	                                          </tr>
	                                      </table>
	                                      <!-- Button : END -->
	                                    </td>
	                                </tr>
	                            </table>
	                        </th>
	                        <!-- Column : END -->
	                    </tr>
	                </table>
	            </td>
	        </tr>
	        <!-- Thumbnail Left, Text Right : END -->

	        <!-- Thumbnail Right, Text Left : BEGIN -->
	        <tr>
	            <td dir="rtl" width="100%" style="padding: 10px; background-color: #ffffff;">
	                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
	                    <tr>
	                        <!-- Column : BEGIN -->
	                        <th width="33.33%" class="stack-column-center">
	                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
	                                <tr>
	                                    <td dir="ltr" valign="top" style="padding: 0 10px;">
	                                        <img src="https://via.placeholder.com/170" width="170" height="170" alt="alt_text" border="0" class="center-on-narrow" style="height: auto; background: #dddddd; font-family: sans-serif; font-size: 15px; line-height: 15px; color: #555555;">
	                                    </td>
	                                </tr>
	                            </table>
	                        </th>
	                        <!-- Column : END -->
	                        <!-- Column : BEGIN -->
	                        <th width="66.66%" class="stack-column-center">
	                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
	                                <tr>
	                                    <td dir="ltr" valign="top" style="font-family: sans-serif; font-size: 15px; line-height: 20px; color: #555555; padding: 10px; text-align: left;" class="center-on-narrow">
	                                        <h2 style="margin: 0 0 10px 0; font-family: sans-serif; font-size: 18px; line-height: 22px; color: #333333; font-weight: bold;">Class aptent taciti sociosqu</h2>
	                                        <p style="margin: 0 0 10px 0;">Maecenas sed ante pellentesque, posuere leo id, eleifend dolor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
	                                        <!-- Button : BEGIN -->
	                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" class="center-on-narrow" style="float:left;">
	                                            <tr>
		                                            <td class="button-td button-td-primary" style="border-radius: 4px; background: #222222;">
														<a class="button-a button-a-primary" href="https://google.com/" style="background: #222222; border: 1px solid #000000; font-family: sans-serif; font-size: 15px; line-height: 15px; text-decoration: none; padding: 13px 17px; color: #ffffff; display: block; border-radius: 4px;">Primary Button</a>
													</td>
	                                            </tr>
	                                        </table>
	                                        <!-- Button : END -->
	                                    </td>
	                                </tr>
	                            </table>
	                        </th>
	                        <!-- Column : END -->
	                    </tr>
	                </table>
	            </td>
	        </tr>
	        <!-- Thumbnail Right, Text Left : END -->

	        <!-- Clear Spacer : BEGIN -->
	        <tr>
	            <td aria-hidden="true" height="40" style="font-size: 0px; line-height: 0px;">
	                &nbsp;
	            </td>
	        </tr>
	        <!-- Clear Spacer : END -->

	        <!-- 1 Column Text : BEGIN -->
	        <tr>
	            <td style="background-color: #ffffff;">
	                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
	                    <tr>
	                        <td style="padding: 20px; font-family: sans-serif; font-size: 15px; line-height: 20px; color: #555555;">
	                            Maecenas sed ante pellentesque, posuere leo id, eleifend dolor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent laoreet malesuada cursus. Maecenas scelerisque congue eros eu posuere. Praesent in felis ut velit pretium lobortis rhoncus ut&nbsp;erat.
	                        </td>
	                    </tr>
	                </table>
	            </td>
	        </tr>
	        <!-- 1 Column Text : END -->

	    </table>
	    <!-- Email Body : END -->

	    <!-- Email Footer : BEGIN -->
        <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="margin: auto;" class="email-container">
	        <tr>
	            <td style="padding: 20px; font-family: sans-serif; font-size: 12px; line-height: 15px; text-align: center; color: #ffffff;">
	                <webversion style="color: #ffffff; text-decoration: underline; font-weight: bold;">View as a Web Page</webversion>
	                <br><br>
	                Company Name<br><span class="unstyle-auto-detected-links">123 Fake Street, SpringField, OR, 97477 US<br>(123) 456-7890</span>
	                <br><br>
	                <unsubscribe style="color: #ffffff; text-decoration: underline;">unsubscribe</unsubscribe>
	            </td>
	        </tr>
	    </table>
	    <!-- Email Footer : END -->

	    <!-- Full Bleed Background Section : BEGIN -->
	    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #709f2b;">
	        <tr>
	            <td>
	                <div align="center" style="max-width: 600px; margin: auto;" class="email-container">
	                    <!--[if mso]>
	                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" align="center">
	                    <tr>
	                    <td>
	                    <![endif]-->
	                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
	                        <tr>
	                            <td style="padding: 20px; text-align: left; font-family: sans-serif; font-size: 15px; line-height: 20px; color: #ffffff;">
	                                <p style="margin: 0;">Maecenas sed ante pellentesque, posuere leo id, eleifend dolor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent laoreet malesuada cursus. Maecenas scelerisque congue eros eu posuere. Praesent in felis ut velit pretium lobortis rhoncus ut&nbsp;erat.</p>
	                            </td>
	                        </tr>
	                    </table>
	                    <!--[if mso]>
	                    </td>
	                    </tr>
	                    </table>
	                    <![endif]-->
	                </div>
	            </td>
	        </tr>
	    </table>
	    <!-- Full Bleed Background Section : END -->

    <!--[if mso | IE]>
    </td>
    </tr>
    </table>
    <![endif]-->
    </center>
</body>
</html>
`,
        });
        editor.Blocks.add('Form Contact', {
            label: 'Form Contact',
            content: `
            <style>
                .form-heading{
                    color: #033bd4;
                    display: block;
                    margin: 0 0 3px;
                    font: 700 28px/30px "Ubuntu", "Helvetica Neue", Helvetica, Arial, sans-serif;
                    line-height: 1.5;
                }
                    .ia{
                    background-color:#033bd4;
                    color: white;
                    }

                .w-full{
                    width: 100%;
                } 
                    
                input{
                        height: 48px;
                        outline: none;
                        color: #999;
                        box-shadow: none;
                        padding: 6px 23px;
                        background: #f5f5f5;
                        border-color: #eee;
                        width: 100%;
                }

                .main-bg-color{
                    padding: 11px 28px;
                     background-color:#033bd4;
                    color: white;
                }

                .phone-group {
    display: flex; 
	height: 48px;
    outline: none;
    color: #999;
    box-shadow: none;
    background: #f5f5f5;
    border-color: #eee;
	border: none;
}

.phone-group.has-error .phone-group {
	color: #033bd4;
	border-color: #033bd4;
}
            </style>
            <div class="w-full">
							<!-- quote form start here -->
							<section class="quote-form" style="background-image: url(https://cdn.arcemunoz.tech/assets/img02.jpg);" data-scroll-index="1">
                            <h2 class="form-heading text-center text-uppercase">QUIERO MI ACCESO A LA <b class="ia">AUTOEVALUACIÓN</b></h2>
								<span class="form-title text-center"></span>
								<form id="contactForm" data-toggle="validator"  method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_self" novalidate="">
									<fieldset>
										<div class="form-group">
											<input type="text" id="mce-FNAME" name="FNAME" placeholder="Nombre" class="form-control text" required="" value="">
										</div>
										<div class="form-group">
											<input type="text" id="mce-LNAME" name="LNAME" placeholder="Apellidos" class="form-control text" required="" value="">
										</div>
										<div class="form-group">
											<input type="email" id="mce-EMAIL" name="EMAIL" placeholder="Correo Electrónico" class="form-control required email" required="" value="">
										</div>
										<div class="form-group phone-group">
											<select id="countryCode" name="COUNTRY_CODE" class="country-code form-control" required>
												<option value=""  selected disabled>Código</option>
												<option value="+54">Argentina (+54)</option>
												<option value="+591">Bolivia (+591)</option>
												<option value="+56">Chile (+56)</option>
												<option value="+57">Colombia (+57)</option>
												<option value="+506">Costa Rica (+506)</option>
												<option value="+53">Cuba (+53)</option>
												<option value="+593">Ecuador (+593)</option>
												<option value="+503">El Salvador (+503)</option>
												<option value="+502">Guatemala (+502)</option>
												<option value="+504">Honduras (+504)</option>
												<option value="+52">México (+52)</option>
												<option value="+505">Nicaragua (+505)</option>
												<option value="+507">Panamá (+507)</option>
												<option value="+595">Paraguay (+595)</option>
												<option value="+51">Perú (+51)</option>
												<option value="+1">Puerto Rico (+1)</option>
												<option value="+598">Uruguay (+598)</option>
												<option value="+58">Venezuela (+58)</option>
												<!-- Agrega más códigos de país según sea necesario -->
											</select>
											<input type="tel" id="mce-PHONE" name="PHONE" placeholder="Celular" class="phone-number form-control" required value="">
										</div>
										<div id="msgSubmit" class="form-message hidden"></div>
										<span class="info"><i class="fa fa-info-circle main-color" aria-hidden="true"></i>...</span>
										<button class="btn btn-default main-bg-color" type="submit" id="form-submit">REGISTRARME </button>
									</fieldset>
								</form>
								
							</section>
							<!-- quote form end here -->
						</div>`,
        });
        editor.Blocks.add('Social', {
            label: 'Social',
            content: `<html>
            <style>
                .wrapper {
  display: inline-flex;
  list-style: none;
  height: 120px;
  width: 100%;
  padding-top: 40px;
  font-family: "Poppins", sans-serif;
  justify-content: center;
}

.wrapper .icon {
  position: relative;
  background: #fff;
  border-radius: 50%;
  margin: 10px;
  width: 50px;
  height: 50px;
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.wrapper .tooltip {
  position: absolute;
  top: 0;
  font-size: 14px;
  background: #fff;
  color: #fff;
  padding: 5px 8px;
  border-radius: 5px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.wrapper .tooltip::before {
  position: absolute;
  content: "";
  height: 8px;
  width: 8px;
  background: #fff;
  bottom: -3px;
  left: 50%;
  transform: translate(-50%) rotate(45deg);
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.wrapper .icon:hover .tooltip {
  top: -45px;
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
}

.wrapper .icon:hover span,
.wrapper .icon:hover .tooltip {
  text-shadow: 0px -1px 0px rgba(0, 0, 0, 0.1);
}

.wrapper .facebook:hover,
.wrapper .facebook:hover .tooltip,
.wrapper .facebook:hover .tooltip::before {
  background: #1877f2;
  color: #fff;
}

.wrapper .twitter:hover,
.wrapper .twitter:hover .tooltip,
.wrapper .twitter:hover .tooltip::before {
  background: #1da1f2;
  color: #fff;
}

.wrapper .instagram:hover,
.wrapper .instagram:hover .tooltip,
.wrapper .instagram:hover .tooltip::before {
  background: #e4405f;
  color: #fff;
}

            </style>
            <ul class="wrapper">
  <li class="icon facebook">
    <span class="tooltip">Facebook</span>
    <svg
      viewBox="0 0 320 512"
      height="1.2em"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
      ></path>
    </svg>
  </li>
  <li class="icon twitter">
    <span class="tooltip">Twitter</span>
    <svg
      height="1.8em"
      fill="currentColor"
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
      class="twitter"
    >
      <path
        d="M42,12.429c-1.323,0.586-2.746,0.977-4.247,1.162c1.526-0.906,2.7-2.351,3.251-4.058c-1.428,0.837-3.01,1.452-4.693,1.776C34.967,9.884,33.05,9,30.926,9c-4.08,0-7.387,3.278-7.387,7.32c0,0.572,0.067,1.129,0.193,1.67c-6.138-0.308-11.582-3.226-15.224-7.654c-0.64,1.082-1,2.349-1,3.686c0,2.541,1.301,4.778,3.285,6.096c-1.211-0.037-2.351-0.374-3.349-0.914c0,0.022,0,0.055,0,0.086c0,3.551,2.547,6.508,5.923,7.181c-0.617,0.169-1.269,0.263-1.941,0.263c-0.477,0-0.942-0.054-1.392-0.135c0.94,2.902,3.667,5.023,6.898,5.086c-2.528,1.96-5.712,3.134-9.174,3.134c-0.598,0-1.183-0.034-1.761-0.104C9.268,36.786,13.152,38,17.321,38c13.585,0,21.017-11.156,21.017-20.834c0-0.317-0.01-0.633-0.025-0.945C39.763,15.197,41.013,13.905,42,12.429"
      ></path>
    </svg>
  </li>
  <li class="icon instagram">
    <span class="tooltip">Instagram</span>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="1.2em"
      fill="currentColor"
      class="bi bi-instagram"
      viewBox="0 0 16 16"
    >
      <path
        d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"
      ></path>
    </svg>
  </li>
</ul>

            </html>`,
        });
        editor.Blocks.add('newsletter', {
            label: 'newsletter',
            content: `<html>
            <style>
               .form-newsletter-1 {
  display: flex;
  flex-direction: column;
  background: #606c88;
  background: -webkit-linear-gradient(to right, #3f4c6b, #606c88);
  background: linear-gradient(to right, #3f4c6b, #606c88);
  padding: 20px;
  border-radius: 10px;
  max-width: 350px;
}

.title {
  font-size: 2rem;
  line-height: 2rem;
  font-weight: 700;
  letter-spacing: -0.025em;
  color: #fff;
}

.description {
  line-height: 1.5rem;
  font-size: 1rem;
  margin-top: 1rem;
  color: rgb(209 213 219);
}

.form-newsletter-1 div {
  display: flex;
  max-width: 28rem;
  margin-top: 1rem;
  column-gap: 0.5rem;
}

.form-newsletter-1 div input {
  outline: none;
  line-height: 1.5rem;
  font-size: 0.875rem;
  color: rgb(255 255 255 );
  padding: 0.5rem 0.875rem;
  background-color: rgb(255 255 255 / 0.05);
  border: 1px solid rgba(253, 253, 253, 0.363);
  border-radius: 0.375rem;
  flex: 1 1 auto;
}

.form-newsletter-1 div input::placeholder {
  color: rgb(216, 212, 212);
}

.form-newsletter-1 div input:focus {
  border: 1px solid rgb(99 102 241);
}

.form-newsletter-1 div button {
  color: #fff;
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.25rem;
  padding: 0.625rem 0.875rem;
  background-color: rgb(99 102 241);
  border-radius: 0.375rem;
  border: none;
  outline: none;
}
            </style>
                <form class="form-newsletter-1">
  <span class="title">Subscribe to our newsletter.</span>
  <p class="description">Nostrud amet eu ullamco nisi aute in ad minim nostrud adipisicing velit quis. Duis tempor incididunt dolore.</p>
  <div>
    <input placeholder="Enter your email" type="email" name="email" id="email-address">
    <button type="submit">Subscribe</button>
  </div>
</form>
            </html>`,
        });
        editor.Blocks.add('Empezar - es gratis', {
            label: 'Empezar - es gratis',
            content: `<html>
            <style>
                .button-start {
  padding: 15px 20px;
  border: none;
  outline: none;
  background-color: #151515;
  color: #eee;
  border-radius: 7px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s ease-out;
}

.button-start:hover {
  transform: translateY(-3px);
}

.button-start-span {
  color: #aaa;
}


            </style>
            
            <button class="button-start">
  Empezar
  <span class="button-start-span"> ─ es gratis</span>
</button>

            </html>`,
        });

        // editor.Panels.addButton('options', [{
        //   id: 'custom-button',
        //   className: 'fa fa-smile-o',
        //   command: 'custom-command',
        //   attributes: { title: 'Code view' }
        // }]);


        editor.Panels.removePanel('View code')

        editor.Commands.add('custom-command', {
            run(editor, sender) {
                // alert('Custom button clicked!');
                // console.log("CLCCCICIA")
                setModal(true)
                sender && sender.set('active', 0); // Turn off the button
            }
        });
    }

    return (
        <>
            <div className="gjsEditor-space">

                <Tabs>
                    <TabList>
                        <Tab>Visual</Tab>
                        <Tab>Codigo</Tab>
                        <Tab>Resultado</Tab>
                    </TabList>

                    <TabPanel>
                        <GjsEditor
                            // Pass the core GrapesJS library to the wrapper (required).
                            // You can also pass the CDN url (eg. "https://unpkg.com/grapesjs")
                            grapesjs={grapesjs}
                            // Load the GrapesJS CSS file asynchronously from URL.
                            // This is an optional prop, you can always import the CSS directly in your JS if you wish.
                            grapesjsCss="https://unpkg.com/grapesjs/dist/css/grapes.min.css"
                            // GrapesJS init options
                            options={{
                                height: "80vh",
                                storageManager: false,
                                setComponents: ``,
                                colorPicker: {
                                    containerClassName: "gjsEditor-color-picker",
                                },
                                assetManager: {
                                    upload: false, // Desactivamos la subida automática de assets
                                    assets: [], // Lista inicial de assets
                                    uploadFile: async function (e) {
                                        const files = e.dataTransfer ? e.dataTransfer.files : e.target.files;

                                        for (let i = 0; i < files.length; i++) {
                                            const file = files[i];

                                            if (file.type && file.type.indexOf('image') === -1) {
                                                continue;
                                            }

                                            // Convertimos el archivo en una cadena Base64 para verificar si es Base64
                                            const reader = new FileReader();
                                            reader.onloadend = async function () {
                                                const base64Data = reader.result;

                                                // Verificamos si el archivo está en formato Base64
                                                if (base64Data.startsWith('data:image/')) {
                                                    const formData = new FormData();
                                                    formData.append('file', file);

                                                    try {
                                                        // Envía la imagen al backend
                                                        const { token } = JSON.parse(localStorage.getItem("authUser"));
                                                        const response = await axios.post(`${process.env.REACT_APP_API}/company/upload-image`, formData, {
                                                            headers: {
                                                                'content-type': 'multipart/form-data',
                                                                'authorization': "Bearer " + token
                                                            }
                                                        })


                                                        console.log({ response })
                                                        if (response.url) {
                                                            // Reemplaza la imagen base64 en el contenido del editor con la URL devuelta

                                                            const newSrc = `src="${response.url}"`;

                                                            // Obtener el contenido HTML actual
                                                            let htmlContent = editorRef.getHtml();

                                                            // Reemplaza cualquier src que comience con data:image/svg+xml;base64, con la nueva URL
                                                            htmlContent = htmlContent.replace(/src="data:image\/svg\+xml;base64,[^"]+"/g, newSrc);
                                                            console.log("Imagen SVG Base64 reemplazada por URL:", response.url);

                                                            // Actualiza el contenido del editor con el nuevo HTML
                                                            editorRef.setComponents(htmlContent);

                                                            // Opcional: Agrega la imagen al Asset Manager
                                                            editorRef.AssetManager.add({
                                                                src: response.url,
                                                                name: response.name || file.name,
                                                            });

                                                            console.log("se sube metodo 1");

                                                        } else {
                                                            console.error('Error al subir la imagen:', response);
                                                        }
                                                    } catch (error) {
                                                        console.error('Error en la subida de la imagen:', error);
                                                    }
                                                } else {
                                                    console.log('La imagen no está en formato Base64, no se necesita hacer nada.');
                                                }
                                            };

                                            reader.readAsDataURL(file);
                                        }
                                    },
                                },

                            }}
                            onEditor={onEditor}
                            plugins={[plugin, newsLetterPlugin, myPlugin, grapeform]}
                            pluginsOpts={{
                                'grapesjs-preset-webpage': {

                                },
                                'grapesjs-plugin-forms': {}
                            }}
                        />


                    </TabPanel>
                    <TabPanel>
                        <CodeMirror
                            value={html}
                            height="600px"
                            theme={vscodeDark}
                            onChange={onChange}
                            basicSetup={{
                                foldGutter: false,
                                dropCursor: false,
                                allowMultipleSelections: false,
                                indentOnInput: true,
                                tabSize: 2
                            }}
                        />
                    </TabPanel>
                    <TabPanel>
                        <iframe srcDoc={html} width='100%' height="1000px">

                        </iframe>
                    </TabPanel>
                </Tabs>
            </div>
        </>
    );
};

export default Builder;
