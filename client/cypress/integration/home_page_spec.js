/// <reference types="Cypress" />

describe('the home page', () => {
  it('successfully redirect to home when logo is clicked', () => {
    cy.visit('/');
    cy.get('.logo')
      .click()
      .url()
      .should('equal', 'http://localhost:3000/');
  });
  it('processes login', () => {
    cy.contains('로그인').click();
    // 지금 login이 조금 이상한 것 같다.
    cy.go('back');
  });
  it('shows tooltip when hover over image', () => {
    cy.get('.nav-bar__user-detail').invoke('show');
    cy.contains('로그아웃').click();
  });
});
