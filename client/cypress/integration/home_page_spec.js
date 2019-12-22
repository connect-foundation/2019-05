/// <reference types="Cypress" />

describe('the home page', () => {
  it('successfully redirects to home when logo is clicked', () => {
    cy.visit('/');
    cy.get('.header__left a')
      .click()
      .url()
      .should('equal', 'http://localhost:3000/');
    cy.clearCookies();
  });

  it('should navigate to the match page', () => {
    cy.contains('Quick Match!')
      .click()
      .url()
      .should('include', '/match');
    cy.get('.header__left a')
      .click()
      .url()
      .should('equal', 'http://localhost:3000/');
    cy.get('.side-bar').should('be.hidden');
  });

  it('should hide the side-bar by default', () => {
    cy.get('.side-bar').should('be.hidden');
  });

  it('should open the hamburger menu', () => {
    cy.get('.hamburger-box').click();
    cy.get('.side-bar').should('be.visible');
  });

  it('user can login with social ID', () => {
    cy.clearCookies();
    cy.get('.new-auth-button--kakao').click();
    cy.get('#loginEmailField > .item_inp > .lab_g')
      .click()
      .type(Cypress.env('kakao_id'));
    cy.get(':nth-child(8) > .lab_g')
      .click()
      .type(Cypress.env('kakao_pw'));
    cy.get('.fld_login > .wrap_btn > .btn_g').click();
  });

  it('routes to team page', () => {
    cy.get('.hamburger-box').click();
    cy.get('.btn__gototeam > .side-bar__content-button')
      .click()
      .url()
      .should('include', '/myteam');
  });

  it('routes to match page', () => {
    cy.get('.hamburger-box').click();
    cy.contains('매치 & 알림')
      .click()
      .url()
      .should('include', '/match');
  });
  it('should successfully log out', () => {
    cy.get('.hamburger-box').click();
    cy.contains('로그아웃').click();
    cy.cookie;
  });
});
