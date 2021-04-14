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
            // icon: (
            //   <img
            //     src="https://gw.alipayobjects.com/zos/rmsportal/nBVXkrFdWHxbZlmMbsaH.svg"
            //     alt="more products"
            //   />
            // ),
            title: "More Products",
            items: [
              {
                // icon: (
                //   <img
                //     src="https://gw.alipayobjects.com/zos/rmsportal/XuVpGqBFxXplzvLjJBZB.svg"
                //     alt="yuque"
                //   />
                // ),
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
