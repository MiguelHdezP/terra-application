import React, {
  useContext, useState, useEffect,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { ActiveBreakpointContext } from '@cerner/terra-application/lib/breakpoints';
import ApplicationLoadingOverlay from '@cerner/terra-application/lib/application-loading-overlay';
import { useIntl } from 'react-intl';
import { ThemeContext } from '@cerner/terra-application/lib/theme';

import LoadingOverlayPresenter from './LoadingOverlayPresenter';
import ModalPresenter from './ModalPresenter';
import PendingActionToggle from './PendingActionToggle';
import StatusOverlayPresenter from './StatusOverlayPresenter';
import EventEmitter from './EventEmitter';

import styles from './AppPage.module.scss';

const cx = classNames.bind(styles);

const AppPage = ({ pageName }) => {
  const [isInitialized, setIsInitialized] = useState(false);

  const activeBreakpoint = useContext(ActiveBreakpointContext);
  const applicationIntl = useIntl();
  const theme = React.useContext(ThemeContext);

  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (isInitialized) {
      return undefined;
    }

    const timeout = setTimeout(() => {
      setIsInitialized(true);
    }, window.TEST_APP_TIMEOUT);

    return () => {
      clearTimeout(timeout);
    };
  }, [isInitialized]);

  if (!isInitialized) {
    return <ApplicationLoadingOverlay isOpen backgroundStyle="clear" />;
  }

  if (hasError) {
    throw new Error(`${pageName} threw an error to test the application's error handling`);
  }

  return (
    <div className={cx('page-content', theme.className)}>
      <h1>{pageName}</h1>
      <h3>Configuration Properties</h3>
      <p>
        Active Breakpoint:
        {' '}
        <span>{activeBreakpoint}</span>
      </p>
      <p>
        Intl Locale:
        {' '}
        <span>{applicationIntl.locale}</span>
      </p>
      <h3>Error Handling</h3>
      <p>Press the button below to throw an exception that will be caught and handled by the framework</p>
      <button type="button" onClick={() => { setHasError(true); }}>Throw Error</button>
      <LoadingOverlayPresenter />
      <StatusOverlayPresenter />
      <ModalPresenter />
      <PendingActionToggle />
      <h3>Theming</h3>
      <p>{`The div below uses the theme context to apply styling for theme: ${theme.name}.`}</p>
      <div className={cx('themed-block')} />
      <EventEmitter />
    </div>
  );
};

AppPage.propTypes = {
  pageName: PropTypes.string,
};

export default AppPage;
