/// <reference types="Cypress" />

describe('match page', () => {
  it('moves to the match page', () => {
    cy.visit('/');
    cy.contains('매치 검색')
      .click()
      .url()
      .should('match', /\/match$/g);
  });

  it('pops up a modal', () => {
    cy.contains('매치 등록').click();
    cy.get('.match-regist-modal').should('be.visible');
  });

  it('fills all the information needed', () => {
    cy.get("input[type='date']").type('2019-09-12');
    cy.get("input[type='time']").type('07:00:00');
    cy.get('.address-section input').type('서울특별시 용산구 이태원동 123');
    cy.get('.etc-section input')
      .type('쉿! 테스트중')
      .clear()
      .type('다시 테스트중');
  });

  it('clicks the submit button and closes the modal', () => {
    cy.get('.submit-btn').click();
    cy.get('.match-regist-modal').should('not.be.visible');
  });

  it('pops up a modal and exit when clicked `x` button', () => {
    cy.contains('매치 등록').click();
    cy.get('.match-regist-modal').should('be.visible');
    cy.get('.close-btn').click();
    cy.get('.match-regist-modal').should('not.be.visible');
  });
});
