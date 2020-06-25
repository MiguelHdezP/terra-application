import React, { useState, useRef } from 'react';

import ApplicationNavigation from '../../../../../application-navigation';

import ReviewPageContainer from '../page-containers/ReviewPageContainer';
import OrderPageContainer from '../page-containers/OrderPageContainer';
import DocumentPageContainer from '../page-containers/DocumentPageContainer';
import PatientConceptProvider from '../PatientConceptProvider';

const userConfig = {
  name: 'Demo User',
  initials: 'DU',
};

const ClinicalDemoNavigation = () => {
  const [activeNavItem, setActiveNavItem] = useState('page_0');
  const [loggedOut, setLoggedOut] = useState(false);

  const navigationItemsRef = useRef([{
    key: 'page_0',
    text: 'Review',
  }, {
    key: 'page_1',
    text: 'Order',
  }, {
    key: 'page_2',
    text: 'Document',
  }]);

  if (loggedOut) {
    return (
      <div>
        <p>Logged Out</p>
        <button type="button" onClick={() => { setLoggedOut(false); }}>Reset</button>
      </div>
    );
  }

  return (
    <PatientConceptProvider>
      <ApplicationNavigation
        titleConfig={{
          title: 'Powerchart Touch',
          subline: '(Not Really)',
        }}
        userConfig={userConfig}
        navigationItems={navigationItemsRef.current}
        activeNavigationItemKey={activeNavItem}
        onSelectNavigationItem={(key) => { setActiveNavItem(key); }}
        onSelectLogout={() => {
          setLoggedOut(true);
        }}
      >
        {(() => {
          let pageContent;
          switch (activeNavItem) {
            case 'page_0':
              pageContent = <ReviewPageContainer />;
              break;
            case 'page_1':
              pageContent = <OrderPageContainer />;
              break;
            default:
              pageContent = <DocumentPageContainer />;
              break;
          }
          return pageContent;
        })()}
      </ApplicationNavigation>
    </PatientConceptProvider>
  );
};

export default ClinicalDemoNavigation;
