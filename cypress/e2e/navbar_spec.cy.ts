describe('Using navbar', () => {
  beforeEach(() => {
    cy.visit('localhost:3000/');
  });
  it('Goes to new post and displays "please log in"', () => {
    cy.get('#post').click();
    cy.contains('Please log in').should('exist');
  });
  it('Goes to new post and goes back home from home button', () => {
    cy.get('#post').click();
    cy.get('#home').click();
  });
  it('Goes to new post and goes back home from logo', () => {
    cy.get('#post').click();
    cy.contains('Bandscape').click();
  });
});