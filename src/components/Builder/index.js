import React, { useState, useCallback } from "react";
import grapesjs, { Editor } from "grapesjs";
import GjsEditor from "@grapesjs/react";
import plugin from "grapesjs-preset-webpage";
import newsLetterPlugin from "grapesjs-preset-newsletter";
import grapeform from "grapesjs-plugin-forms"
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";

const Builder = ({ html, setHTML }) => {
  const [modal, setModal] = useState(false)
  const onEditor = (editor) => {
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
      console.log(editor.getHtml());
      console.log(editor.getCss());
      let t = "abc";
      console.log(typeof t);
      setHTML(code);
    });
  };

  const onChange = React.useCallback((val, viewUpdate) => {
    console.log('val:', val);
    setHTML(val);
  }, []);

  function myPlugin(editor) {
    // Use the API: https://grapesjs.com/docs/api/
    editor.Blocks.add('my-first-block', {
      label: 'Simple block',
      content: '<div class="my-block"> <form><input placeholder="nombre" /> <button>ENVIAR</button></form> </div>',
    });
    editor.Blocks.add('my-first-block2', {
      label: 'Nav',
      content: `<ul style="display: flex;">
      <li style="display: inline; "><a href="default.asp" style="display: block; padding: 8px; background-color: #04AA6D;">Home</a></li>
      <li style="display: inline; "><a href="news.asp" style="display: block; padding: 8px; background-color: #04AA6D;">News</a></li>
      <li style="display: inline; "><a href="contact.asp" style="display: block; padding: 8px; background-color: #04AA6D;">Contact</a></li>
      <li style="display: inline; "><a href="about.asp" style="display: block; padding: 8px; background-color: #04AA6D;">About</a></li>
    </ul>
    `,
    });
    editor.Blocks.add('templateOne', {
      label: 'TemplateOne',
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

    editor.Panels.addButton('options', [{
      id: 'custom-button',
      className: 'fa fa-smile-o',
      command: 'custom-command',
      attributes: { title: 'Code view' }
    }]);


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
              height="400px"
              theme={vscodeDark}
              onChange={onChange}
            />
          </TabPanel>
        </Tabs>
      </div>
    </>
  );
};

export default Builder;
