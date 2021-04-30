/**
 * Footer Component
 * Default footer for the website.
 */

import React from "react";
import Footer from "rc-footer";
import "rc-footer/assets/index.css";

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
export default FooterComponent;
