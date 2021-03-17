import React from 'react';
import Footer from 'rc-footer';
import 'rc-footer/assets/index.css'; // import 'rc-footer/asssets/index.less';
function FooterPage() {
  return (
    <div>
      <Footer
        columns={[
          {
            title: 'Related Resources',
            items: [
              {
                title: 'Ant Design Pro',
                url: 'https://pro.ant.design/',
                openExternal: true,
              },
              {
                title: 'Ant Design Mobile',
                url: 'https://mobile.ant.design/',
                openExternal: true,
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                title: 'Ant Design Pro',
                url: 'https://pro.ant.design/',
                openExternal: true,
              },
              {
                title: 'Ant Design Mobile',
                url: 'https://mobile.ant.design/',
                openExternal: true,
              },
            ],
          },
          {
            title: 'Help',
            items: [
              {
                title: 'Ant Design Pro',
                url: 'https://pro.ant.design/',
                openExternal: true,
              },
              {
                title: 'Ant Design Mobile',
                url: 'https://mobile.ant.design/',
                openExternal: true,
              },

            ],
          },
          {
            icon: (
              <img
                src="https://gw.alipayobjects.com/zos/rmsportal/nBVXkrFdWHxbZlmMbsaH.svg"
                alt="more products"
              />
            ),
            title: 'More Products',
            items: [
              {
                icon: (
                  <img
                    src="https://gw.alipayobjects.com/zos/rmsportal/XuVpGqBFxXplzvLjJBZB.svg"
                    alt="yuque"
                  />
                ),
                title: 'Comming Soon',
                url: 'https://yuque.com',
                description: '知识创作与分享工具',
                openExternal: true,
              },

            ],
          },
        ]}
        bottom="Made with ❤️ by CSCI3100 Group 17"
      />
    </div>
  );
}
export default FooterPage;
