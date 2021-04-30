/*	
	What: This is used to add style to the <FooterComponent> and defiine the functionality of it
	Who: Tso Ka Wing 1155125488
	Where: React components for the footer of all the pages 
	Why: We style the footer using this file, and add style to the footer
	How: import css style for the FooterComponent using rc-footer
*/

import React from "react";
import Footer from "rc-footer";
import "rc-footer/assets/index.css"; // import 'rc-footer/asssets/index.less';
function FooterComponent() {
  return (
    <div>
      <Footer
        columns={[
          {
            title: "Related Resources",
            items: [
              {
                title: "Google Map",
                url: "",
                openExternal: false,
              },
              {
                title: "Wikipedia",
                url: "",
                openExternal: false,
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                title: "Facebook",
                url: "",
                openExternal: false,
              },
              {
                title: "Instagram",
                url: "",
                openExternal: false,
              },
            ],
          },
          {
            title: "Help",
            items: [
              {
                title: "Email Us",
                url: "",
                openExternal: false,
              },
              {
                title: "FAQ",
                url: "",
                openExternal: false,
              },
            ],
          },
          {
            title: "More Products",
            items: [
              {
                title: "Comming Soon",
                url: "",
                description: "Hikeasy iOS/Android",
                openExternal: false,
              },
            ],
          },
        ]}
        bottom="Made with ❤️ by CSCI3100 Group C2"
      />
    </div>
  );
}
//export FooterComponent.js
export default FooterComponent;
