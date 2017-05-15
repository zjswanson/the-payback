import { PaybackPage } from './app.po';

describe('payback App', () => {
  let page: PaybackPage;

  beforeEach(() => {
    page = new PaybackPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
