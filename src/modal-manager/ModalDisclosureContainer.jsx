import React, {
  useEffect, useContext, useRef, useMemo,
} from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import DisclosureManagerContext from 'terra-disclosure-manager/lib/DisclosureManagerContext';
import DisclosureManagerDelegate from 'terra-disclosure-manager/lib/DisclosureManagerDelegate';

import { NavigationPromptCheckpoint, navigationPromptResolutionOptionsShape, getUnsavedChangesPromptOptions } from '../navigation-prompt';
import { addCallback, removeCallback } from '../disclosure-manager/_disclosureCallbacks';

const propTypes = {
  /**
   * The components to render within the context of the DisclosureContainer.
   */
  children: PropTypes.node,
  /**
   * The Object (or function that returns an Object) that specifies the messages
   * used to prompt the user when disclosure dismissal occurs when pending state
   * is present.
   */
  navigationPromptResolutionOptions: navigationPromptResolutionOptionsShape,
};

/**
 * injectIntl (rather that the ApplicationIntlContext) is used here to keep the DisclosureContainer's context dependencies
 * passive with previous v1.x versions. ApplicationIntlContext cannot be used here without a version bump.
 */

const DisclosureContainer = injectIntl(({ intl, children, navigationPromptResolutionOptions }) => {
  const disclosureManager = useContext(DisclosureManagerContext);
  const promptCheckpointRef = useRef();
  const customRegisterDismissCheckRef = useRef();

  const overrideDisclosureManagerContext = useMemo(() => DisclosureManagerDelegate.clone(disclosureManager, {
    registerDismissCheck: (check) => {
      customRegisterDismissCheckRef.current = check;

      /**
       * Return Promise to align with DisclosureManager's default implementation.
       */
      return Promise.resolve();
    },
  }), [disclosureManager]);

  const defaultPromptOptions = useMemo(() => getUnsavedChangesPromptOptions(intl), [intl]);

  useEffect(() => {
    const callback = disclosureManager.goBack || disclosureManager.closeDisclosure;
    addCallback(callback);

    return () => {
      removeCallback(callback);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    disclosureManager.registerDismissCheck(() => {
      if (customRegisterDismissCheckRef.current) {
        return customRegisterDismissCheckRef.current();
      }

      return new Promise((resolve, reject) => {
        if (!promptCheckpointRef.current) {
          resolve();
          return;
        }

        promptCheckpointRef.current.resolvePrompts(navigationPromptResolutionOptions || defaultPromptOptions).then(resolve, reject);
      });
    });
  }, [defaultPromptOptions, disclosureManager, navigationPromptResolutionOptions]);

  return (
    <DisclosureManagerContext.Provider value={overrideDisclosureManagerContext}>
      <NavigationPromptCheckpoint
        ref={promptCheckpointRef}
      >
        {children}
      </NavigationPromptCheckpoint>
    </DisclosureManagerContext.Provider>
  );
});

DisclosureContainer.propTypes = propTypes;

export default DisclosureContainer;
