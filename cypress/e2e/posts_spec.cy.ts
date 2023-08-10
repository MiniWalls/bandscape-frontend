describe('Posts page', () => {
  beforeEach(() => {
    cy.visit('localhost:3000/');
  });
  it('Can open posts and close them', () => {
    cy.get('li').first().click();
    cy.get('.close-icon').first().click();
    cy.get('li').last().click();
    cy.get('.close-icon').last().click();
  });
});