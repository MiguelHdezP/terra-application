import React from 'react';
import PropTypes from 'prop-types';

import SkipToButton from '../../application-container/private/skip-to/SkipToButton';

function deferAction(callback) {
  setTimeout(callback, 0);
}

const propTypes = {
  /**
   * A function to be called when a ref has been assigned for the created
   * `<main>` element.
   */
  refCallback: PropTypes.func,
};

/**
 * The MainContainer can be used to create a semantic `<main>` element for the application
 * within which the application's most important and dynamic content will reside. A SkipToButton
 * will be registered to ensure accessibility of this content is maximized.
 *
 * Only one `<main>` element should be present on the DOM at any given time. As a result, the
 * MainContainer should be used with utmost caution. Only use the MainContainer when _not_ using a
 * framework-provided Layout to render Pages. Layouts that feature a `renderPage` prop will render
 * a MainContainer automatically when the `renderPage` prop is used.
 */
const MainContainer = ({ refCallback, ...otherProps }) => {
  const mainElementRef = React.useRef();

  return (
    <>
      <SkipToButton
        isMain
        description="Main Content" // TODO INTL
        onSelect={() => {
          deferAction(() => mainElementRef.current?.focus());
        }}
      />
      <main
        tabIndex="-1"
        ref={(mainRef) => {
          mainElementRef.current = mainRef;

          if (refCallback) {
            refCallback(mainRef);
          }
        }}
        {...otherProps}
      />
    </>
  );
};

MainContainer.propTypes = propTypes;

export default MainContainer;