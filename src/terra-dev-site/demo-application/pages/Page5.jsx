import React from 'react';
import PropTypes from 'prop-types';
import Button from 'terra-button';
import Page from '../../../page/Page';

import DemoPageContent from './content/DemoPageContent';
import Card from './content/Card';
import PendingActionsCard from './content/PendingActionsCard';
import NotificationBannersCard from './content/NotificationBannersCard';
import ErrorHandlingCard from './content/ErrorHandlingCard';
import InteractionBlockingOverlayCard from './content/InteractionBlockingOverlayCard';
import LoadingOverlayCard from './content/LoadingOverlayCard';
import StatusOverlayCard from './content/StatusOverlayCard';
import NotificationDialogCard from './content/NotificationDialogCard';
import ModalManagerIntegrationCard from './content/ModalManagerIntegrationCard';
import NavigationItemCard from './content/NavigationItemCard';
import ApplicationInfoCard from './content/ApplicationInfoCard';

import Page6 from './Page6';

const propTypes = {
  onRequestClose: PropTypes.func,
};

const page5MetaData = { data: 'page-5' };

const Page5 = ({ onRequestClose }) => {
  const [showPage6, setShowPage6] = React.useState(false);

  return (
    <Page
      pageKey="page-5"
      label="Page 5"
      metaData={page5MetaData}
      onRequestClose={onRequestClose}
      preferHeaderIsHidden
    >
      <DemoPageContent>
        <h2>Page 5</h2>
        <Card title="Page 5 Details">
          <p>Page 5 demonstrates the following features:</p>
          <ul>
            <li>Hiding of the Page header</li>
            <li>Content that triggers Page APIs</li>
          </ul>
        </Card>
        <Card title="Page Header">
          <p>This Page implementation hides the Page header.</p>
          <p>The Page header can be hidden in scenarios where the framework controls are unnecessary and/or intrusive to the Page design.</p>
          <p>The presence of Layout-specific actions or Page-level actions will force the header to be presented.</p>
        </Card>
        <Card title="Additional Page Disclosure">
          <p>Page 5 presents Page 6 due changes to its local state.</p>
          <Button text="Show Page 6" onClick={() => { setShowPage6(true); }} />
        </Card>
        <NotificationBannersCard />
        <NotificationDialogCard />
        <LoadingOverlayCard />
        <StatusOverlayCard />
        <ErrorHandlingCard pageTitle="Page 5" />
        <InteractionBlockingOverlayCard />
        <PendingActionsCard />
        <ModalManagerIntegrationCard />
        <NavigationItemCard />
        <ApplicationInfoCard />
      </DemoPageContent>
      {showPage6 && <Page6 onRequestClose={() => { setShowPage6(false); }} />}
    </Page>
  );
};

Page5.propTypes = propTypes;

export default Page5;
