// eslint-disable-next-line import/no-extraneous-dependencies
const defaultWdioConfig = require('terra-toolkit/config/wdio/wdio.conf');

const wdioConfig = defaultWdioConfig.config;

const travis = process.env.TRAVIS;

if (travis) {
  wdioConfig.host = 'localhost';
}

const defaultBefore = wdioConfig.before;
wdioConfig.before = () => {
  if (defaultBefore) {
    defaultBefore();
  }

  global.browser.addCommand('disableCSSAnimations', () => {
    global.browser.execute(`
      var animationOverride = document.createElement('style');
      animationOverride.appendChild(document.createTextNode('body * { animation: none !important; }'));
      document.head.appendChild(animationOverride);
    `);
  });
};

exports.config = wdioConfig;
