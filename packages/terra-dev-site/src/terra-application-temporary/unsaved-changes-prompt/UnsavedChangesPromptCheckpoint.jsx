import React from 'react';
import PropTypes from 'prop-types';

import { ApplicationIntlContext } from '@cerner/terra-application/lib/application-intl';
import NotificationDialog from '../notification-dialog/NotificationDialog';
import PromptRegistrationContext, { promptRegistrationContextValueShape } from './PromptRegistrationContext';
import withPromptRegistration from './_withPromptRegistration';
import getUnsavedChangesPromptOptions from './getUnsavedChangesPromptOptions';

const propTypes = {
  /**
   * Components to render within the context of the UnsavedChangesPromptCheckpoint. Any UnsavedChangesPrompts rendered within
   * these child components will be registered to this UnsavedChangesPromptCheckpoint instance.
   */
  children: PropTypes.node,
  /**
   * A function that will be executed when UnsavedChangesPrompts are registered to or unregistered from the UnsavedChangesPromptCheckpoint instance.
   * This can be used to track registered prompts outside of a UnsavedChangesPromptCheckpoint and handle prompt resolution directly, if necessary.
   * The function will be provided with an array of data objects representing the registered UnsavedChangesPrompts as the sole argument. An empty
   * Array will be provided when no prompts are registered.
   *
   * Function Example:
   *
   * ```
   * (arrayOfPrompts) => {
   *   arrayOfPrompts.forEach((prompt) => {
   *     console.log(prompt.description);
   *     console.log(prompt.metaData);
   *   })
   *   this.myLocalPromptRegistry = arrayOfPrompts;
   * }
   * ```
   */
  onPromptChange: PropTypes.func,
  /**
   * @private
   * An object containing prompt registration APIs provided through the PromptRegistrationContext.
   */
  promptRegistration: promptRegistrationContextValueShape.isRequired,
};

class UnsavedChangesPromptCheckpoint extends React.Component {
  static getPromptArray(prompts) {
    return Object.keys(prompts).map(id => prompts[id]);
  }

  constructor(props) {
    super(props);

    this.registerPrompt = this.registerPrompt.bind(this);
    this.unregisterPrompt = this.unregisterPrompt.bind(this);
    this.resolvePrompts = this.resolvePrompts.bind(this);
    this.renderNotificationDialog = this.renderNotificationDialog.bind(this);

    this.registeredPrompts = {};
    this.promptProviderValue = {
      registerPrompt: this.registerPrompt,
      unregisterPrompt: this.unregisterPrompt,
    };

    this.state = {
      notificationDialogProps: undefined,
    };
  }

  componentWillUnmount() {
    const { onPromptChange } = this.props;

    if (onPromptChange) {
      /**
       * The consumer is notified on unmount with an empty set of prompt data to clean up any previously mounted prompts.
       */
      onPromptChange([]);
    }
  }

  registerPrompt(promptId, description, metaData) {
    const { onPromptChange, promptRegistration } = this.props;

    if (!promptId && process.env.NODE_ENV !== 'production') {
      /* eslint-disable no-console */
      console.warn('A UnsavedChangesPrompt cannot be registered without an identifier.');
      /* eslint-enable no-console */
      return;
    }

    this.registeredPrompts[promptId] = { description, metaData };

    if (onPromptChange) {
      onPromptChange(UnsavedChangesPromptCheckpoint.getPromptArray(this.registeredPrompts));
    }

    promptRegistration.registerPrompt(promptId, description, metaData);
  }

  unregisterPrompt(promptId) {
    const { onPromptChange, promptRegistration } = this.props;

    if (!this.registeredPrompts[promptId]) {
      return;
    }

    delete this.registeredPrompts[promptId];

    if (onPromptChange) {
      onPromptChange(UnsavedChangesPromptCheckpoint.getPromptArray(this.registeredPrompts));
    }

    promptRegistration.unregisterPrompt(promptId);
  }

  /**
   * `resolvePrompts` returns a Promise that will be resolved or rejected based upon the presence of child prompts and
   * the the actions taken by a user from the checkpoint's NotificationDialog.
   *
   * This function is part of the UnsavedChangesPromptCheckpoint's public API. Changes to this function name or overall functionality
   * will impact the package's version.
   */
  resolvePrompts(options) {
    /**
      * If no prompts are registered, then no prompts must be rendered.
      */
    if (!Object.keys(this.registeredPrompts).length) {
      return Promise.resolve();
    }

    let showDialogOptions = options || getUnsavedChangesPromptOptions(this.context);
    if (typeof showDialogOptions === 'function') {
      showDialogOptions = showDialogOptions(UnsavedChangesPromptCheckpoint.getPromptArray(this.registeredPrompts));
    }

    /**
     * Otherwise, the NotificationDialog is shown.
     */
    return new Promise((resolve, reject) => {
      this.setState({
        notificationDialogProps: {
          dialogTitle: showDialogOptions.dialogTitle,
          title: showDialogOptions.title,
          message: showDialogOptions.message,
          startMessage: showDialogOptions.startMessage,
          content: showDialogOptions.content,
          endMessage: showDialogOptions.endMessage,
          acceptButtonText: showDialogOptions.acceptButtonText,
          rejectButtonText: showDialogOptions.rejectButtonText,
          emphasizedAction: showDialogOptions.emphasizedAction,
          buttonOrder: showDialogOptions.buttonOrder,
          onAccept: resolve,
          onReject: reject,
        },
      });
    });
  }

  renderNotificationDialog() {
    const {
      dialogTitle,
      title,
      message,
      startMessage,
      endMessage,
      content,
      acceptButtonText,
      rejectButtonText,
      emphasizedAction,
      buttonOrder,
      onAccept,
      onReject,
    } = this.state.notificationDialogProps;

    const acceptButton = {
      text: acceptButtonText,
      onClick: () => {
        this.setState({ notificationDialogProps: undefined }, onAccept);
      },
    };

    const rejectButton = {
      text: rejectButtonText,
      onClick: () => {
        this.setState({ notificationDialogProps: undefined }, onReject);
      },
    };

    return (
      <NotificationDialog
        dialogTitle={dialogTitle || title}
        startMessage={(startMessage || message)}
        endMessage={endMessage}
        content={content}
        acceptAction={acceptButton}
        rejectAction={rejectButton}
        buttonOrder={buttonOrder}
        emphasizedAction={emphasizedAction}
        variant="hazard-medium"
      />
    );
  }

  render() {
    const { children } = this.props;
    const { notificationDialogProps } = this.state;

    return (
      <PromptRegistrationContext.Provider value={this.promptProviderValue}>
        {children}
        {notificationDialogProps ? this.renderNotificationDialog() : undefined}
      </PromptRegistrationContext.Provider>
    );
  }
}

UnsavedChangesPromptCheckpoint.propTypes = propTypes;

/**
 * contextType must be used to access intl through context.
 * Usage of injectIntl prevents the exposure of the UnsavedChangesPromptCheckpoint ref
 * necessary to call the resolvePrompts function.
 */
UnsavedChangesPromptCheckpoint.contextType = ApplicationIntlContext;

export default withPromptRegistration(UnsavedChangesPromptCheckpoint);