import React from 'react';
import PropTypes from 'prop-types';
import Workspace from '../Workspace';
import WorkspaceItem from '../WorkspaceItem';

const propTypes = {
  onSizeChange: PropTypes.func,
  onPresentationStateChange: PropTypes.func,
  onActiveItemChange: PropTypes.func,
  initialActiveItemKey: PropTypes.string,
  children: PropTypes.node,

  /**
   * @private
   * Id string to apply to the workspace
   */
  id: PropTypes.string.isRequired,
  /**
   * @private
   * Whether or not the workspace is open
   */
  isOpen: PropTypes.bool,
  /**
   * @private
   * Function callback i.e. `onRequest(event)`
   */
  onRequestClose: PropTypes.func,
  /**
   * @private
   * Whether or not the workspace is present as an overlay
   */
  isPresentedAsOverlay: PropTypes.bool,
  /**
   * @private
   * Numeric scale value ranging from `0.0 - 1.0` as the minimum to maximum size for the workspace
   */
  sizeScalar: PropTypes.number,
  /**
   * @private
   * The string representation of the workspace size
   */
  activeSize: PropTypes.string,
  /**
   * @private
   * Array of objects containing key/text pairs for the available size options
   */
  sizeOptions: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  })),
  /**
   * @private
   * Function callback i.e. `onRequestSizeChange(size)`
   */
  onRequestSizeChange: PropTypes.func,
};

const WorkspaceWrapper = ({
  // consumer props
  onSizeChange,
  onPresentationStateChange,
  onActiveItemChange,
  initialActiveItemKey,
  children,

  // private injected props
  id,
  isOpen,
  onRequestClose,
  isPresentedAsOverlay,
  sizeScalar,
  activeSize,
  sizeOptions,
  onRequestSizeChange,
}) => {
  const [activeItemKey, setActiveItemKey] = React.useState(initialActiveItemKey); // TODO do we need to externalize this for manipulation

  React.useEffect(() => {
    if (onSizeChange && sizeScalar !== undefined) {
      onSizeChange(sizeScalar);
    }
  }, [sizeScalar, onSizeChange]);

  React.useEffect(() => {
    if (onPresentationStateChange) {
      onPresentationStateChange(isOpen);
    }
  }, [isOpen, onPresentationStateChange]);

  React.useEffect(() => {
    if (onActiveItemChange) {
      onActiveItemChange(activeItemKey);
    }
  }, [activeItemKey, onActiveItemChange]);

  return (
    <Workspace
      id={id || 'test-id'}
      activeItemKey={activeItemKey}
      onRequestActivate={(itemKey, metaData) => {
        setActiveItemKey(itemKey);
      }}
      activeSize={activeSize}
      sizeOptions={sizeOptions}
      onRequestSizeChange={onRequestSizeChange}
      onRequestDismiss={onRequestClose}
      dismissButtonIsVisible={isPresentedAsOverlay}
    >
      {React.Children.map(children, (child) => (
        <WorkspaceItem
          itemKey={child.props.itemKey}
          label={child.props.label}
          metaData={child.props.metaData}
          render={child.props.render}
        />
      ))}
    </Workspace>
  );
};

WorkspaceWrapper.propTypes = propTypes;

export default WorkspaceWrapper;
