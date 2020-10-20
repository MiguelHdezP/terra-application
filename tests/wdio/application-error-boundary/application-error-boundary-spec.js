Terra.describeViewports('ApplicationErrorBoundary', ['large'], () => {
  describe('Status view management', () => {
    before(() => {
      browser.url('/raw/tests/cerner-terra-application/application-error-boundary/error-boundary-test');
      browser.moveToObject('#root', 0, 0);
    });

    Terra.it.validatesElement('initial', { selector: '#root' });

    it('shows the status view when error occurs', () => {
      browser.click('button');
    });

    Terra.it.validatesElement('with error', { selector: '#root' });
  });
});
