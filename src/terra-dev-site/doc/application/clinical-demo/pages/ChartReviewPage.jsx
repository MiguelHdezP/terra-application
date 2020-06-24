import React from 'react';
import classNames from 'classnames/bind';
import List, { Item } from 'terra-list';
import Button from 'terra-button';
import ApplicationPage from 'terra-application/lib/application-page/ApplicationPage';

import IconPrinter from 'terra-icon/lib/icon/IconPrinter';
import IconTag from 'terra-icon/lib/icon/IconTag';
import IconRight from 'terra-icon/lib/icon/IconRight';

import useDeferredInitializer from '../useDeferredInitializer';
import AllergyProfilePage from './AllergyProfilePage';
import OrderProfilePage from './OrderProfilePage';
import PrintModal from '../modals/PrintModal';

import ApplicationLoadingOverlay from '../../../../../application-loading-overlay';
import PagePresentingModal from '../modals/PagePresentingModal';
import PendingActionToggle from '../../demo/PendingActionToggle';

import styles from './ChartReviewPage.module.scss';

const cx = classNames.bind(styles);

const ChartSummaryPage = ({ onRequestClose }) => {
  const isInitialized = useDeferredInitializer();

  const [showAllergiesProfile, setShowAllergiesProfile] = React.useState(false);
  const [showOrderProfile, setShowOrderProfile] = React.useState(false);
  const [showPrintModal, setShowPrintModal] = React.useState(false);
  const [showPageModal, setShowPageModal] = React.useState(false);

  const pageActions = [{
    key: 'action-print',
    text: 'Print',
    icon: <IconPrinter />,
    onSelect: () => { setShowPrintModal(true); },
    isDisabled: !isInitialized,
  }, {
    key: 'action-tag',
    text: 'Tag',
    icon: <IconTag />,
    onSelect: () => { setShowPageModal(true); },
    isDisabled: !isInitialized,
  }];

  return (
    <ApplicationPage
      title="Chart Review"
      actions={pageActions}
      onRequestClose={onRequestClose}
    >
      {!isInitialized && <ApplicationLoadingOverlay isOpen backgroundStyle="light" />}
      <div style={{ padding: '1rem' }}>
        <div className={cx('card')}>
          <div className={cx('card-header')}>
            <div className={cx('title-container')}>
              Allergies
            </div>
            <div className={cx('action-container')}>
              <Button variant="de-emphasis" isReversed text="Allergy Profile" icon={<IconRight />} onClick={() => { setShowAllergiesProfile(true); }} />
            </div>
          </div>
          <List dividerStyle="standard">
            <Item className={cx('list-item')}>Latex</Item>
            <Item className={cx('list-item')}>Peanut</Item>
            <Item className={cx('list-item')}>Shellfish</Item>
            <Item className={cx('list-item')}>Penicillin</Item>
          </List>
        </div>
        <div className={cx('card')}>
          <div className={cx('card-header')}>
            <div className={cx('title-container')}>
              Orders
            </div>
            <div className={cx('action-container')}>
              <Button variant="de-emphasis" isReversed text="Order Profile" icon={<IconRight />} onClick={() => { setShowOrderProfile(true); }} />
            </div>
          </div>
          <List dividerStyle="standard">
            <Item className={cx('list-item')}>Acetaminophen</Item>
            <Item className={cx('list-item')}>Morphine</Item>
            <Item className={cx('list-item')}>Lisinopril</Item>
            <Item className={cx('list-item')}>Alegra</Item>
          </List>
        </div>
        <div className={cx('card')}>
          <div className={cx('card-header')}>
            <div className={cx('title-container')}>
              Problems
            </div>
          </div>
          <List dividerStyle="standard">
            <Item className={cx('list-item')}>Pain</Item>
            <Item className={cx('list-item')}>Brain Pain</Item>
            <Item className={cx('list-item')}>Back Pain</Item>
            <Item className={cx('list-item')}>Leg Pain</Item>
            <Item className={cx('list-item')}>Arm Pain</Item>
            <Item className={cx('list-item')}>Chest Pain</Item>
            <Item className={cx('list-item')}>Shoulder Pain</Item>
            <Item className={cx('list-item')}>Neck Pain</Item>
          </List>
        </div>
        <div className={cx('card')}>
          <div className={cx('card-header')}>
            <div className={cx('title-container')}>
              Pending Actions
            </div>
          </div>
          <div style={{ padding: '1rem' }}>
            <PendingActionToggle />
          </div>
        </div>
      </div>
      {/* */}
      {showAllergiesProfile && <AllergyProfilePage onRequestClose={() => { setShowAllergiesProfile(false); }} />}
      {showOrderProfile && <OrderProfilePage onRequestClose={() => { setShowOrderProfile(false); }} />}
      {showPrintModal && <PrintModal onRequestClose={() => { setShowPrintModal(false); }} />}
      {showPageModal && <PagePresentingModal onRequestClose={() => { setShowPageModal(false); }} />}
    </ApplicationPage>
  );
};

export default ChartSummaryPage;
