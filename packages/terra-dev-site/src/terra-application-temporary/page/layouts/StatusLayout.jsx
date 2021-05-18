import React from 'react';
import PropTypes from 'prop-types';
import Button from 'terra-button';

import StatusIndicator from '../../shared/StatusLayout';

import CardLayout from './CardLayout';
import Card from './Card';

const StatusViewVariants = {
  NODATA: 'no-data',
  NOMATCHINGRESULTS: 'no-matching-results',
  NOTAUTHORIZED: 'not-authorized',
  ERROR: 'error',
};

/* eslint-disable react/forbid-foreign-prop-types */
const propTypes = {
  /**
   * An array of objects containing terra-button properties. A key attribute is required for each object.
   * This array is used to render buttons in the bottom section.
   * Example:`[{ text: 'Button 1', key: 1, variant: 'neutral', onClick: onClickFunction}]`
   */
  buttonAttrs: PropTypes.arrayOf(PropTypes.shape(Button.propTypes)),

  /**
   * Display a custom glyph. Overrides a variant's default glyph.
   * Set `focusable=false` for svg element used as `customGlyph`.
   */
  customGlyph: PropTypes.node,

  /**
   *  Aligns the component at the top of the container rather than "centered"
   */
  isAlignedTop: PropTypes.bool,

  /**
   * Determines if the glyph should be displayed.
   */
  isGlyphHidden: PropTypes.bool,

  /**
   * The descriptive text, displayed under the title.
   */
  message: PropTypes.string,

  /**
   * The title displayed under the glyph. Variants contain default titles that can be overriden by this prop.
   */
  title: PropTypes.string,

  /**
   * Sets the glyph and title using a pre-baked variant. One of the following: `no-data`,
   * `no-matching-results`, `not-authorized`, or `error`
   */
  variant: PropTypes.oneOf(['no-data', 'no-matching-results', 'not-authorized', 'error']),
};
/* eslint-enable react/forbid-foreign-prop-types */

const defaultProps = {
  buttonAttrs: [],
  customGlyph: undefined,
  isAlignedTop: false,
  isGlyphHidden: false,
  message: undefined,
  title: undefined,
  variant: undefined,
};

const StatusLayout = (props) => (
  <CardLayout>
    <Card>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ maxWidth: '500px' }}>
          <StatusIndicator {...props} />
        </div>
      </div>
    </Card>
  </CardLayout>
);

StatusLayout.propTypes = propTypes;
StatusLayout.defaultProps = defaultProps;
export default StatusLayout;
export { StatusViewVariants };
