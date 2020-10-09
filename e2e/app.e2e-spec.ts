import { HRMSTemplatePage } from './app.po';

describe('HRMS App', function() {
  let page: HRMSTemplatePage;

  beforeEach(() => {
    page = new HRMSTemplatePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
