import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { KEY_SPACE, KEY_RETURN } from 'keycode-js';
import { handleArrows } from './_TabUtils';

import styles from './HiddenTab.module.scss';

const cx = classNames.bind(styles);

const propTypes = {
  /**
   * The id of the tab to be used in mapping.
   */
  id: PropTypes.string.isRequired,
  /**
   * The id of the tab pane element associated to this tab.
   */
  associatedPanelId: PropTypes.string.isRequired,
  /**
   * Icon to be displayed on the tab.
   */
  icon: PropTypes.element,
  /**
   * Text to be displayed on the tab.
   */
  label: PropTypes.string.isRequired,
  /**
   * Index value to use for navigation.
   */
  index: PropTypes.number.isRequired,
  /**
   * Indicates if the pane label should only display the icon. When tab collapses into menu the label text will be used.
   */
  isIconOnly: PropTypes.bool,
  /**
   * Indicates if the tab is currently selected.
   */
  isSelected: PropTypes.bool,
  /**
   * Callback function triggering on selection.
   */
  onSelect: PropTypes.func.isRequired,
  /**
   * Object to be returned in the onSelect.
   */
  metaData: PropTypes.object,
  /**
   * Array of id strings,
   */
  tabIds: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const defaultProps = {
  isIconOnly: false,
  isSelected: false,
};

const Tab = ({
  id,
  associatedPanelId,
  icon,
  label,
  index,
  isIconOnly,
  isSelected,
  onSelect,
  metaData,
  onBlur,
  onFocus,
  tabIds,
  ...customProps
}) => {
  const attributes = {};
  const paneClassNames = cx([
    'hidden',
    { 'is-icon-only': isIconOnly },
    { 'is-text-only': !icon },
    { 'is-active': isSelected },
    attributes.className,
  ]);

  function onKeyDown(event) {
    if (event.nativeEvent.keyCode === KEY_RETURN || event.nativeEvent.keyCode === KEY_SPACE) {
      event.preventDefault();
      event.stopPropagation();
      onSelect(event, metaData);
    } else {
      handleArrows(event, index, tabIds);
    }
  }

  function onClick(event) {
    onSelect(event, metaData);
  }

  if (isIconOnly) {
    attributes['aria-label'] = label;
  }

  if (onSelect) {
    attributes.tabIndex = isSelected ? 0 : -1;
    attributes.onClick = onClick;
    attributes.onKeyDown = onKeyDown;
    attributes.onBlur = onBlur;
    attributes.onFocus = onFocus;
  }
  attributes['aria-selected'] = isSelected;

  return (
    <div
      {...customProps}
      {...attributes}
      id={id}
      aria-controls={associatedPanelId}
      role="tab"
      className={paneClassNames}
      title={label}
    >
      {!isSelected ? null : <span className={cx('check')}>{derp}</span>}
      {icon}
      {isIconOnly ? null : <span className={cx('label')}>{label}</span>}
    </div>
  );
};

Tab.propTypes = propTypes;
Tab.defaultProps = defaultProps;

export default Tab;