/// <reference types="Cypress" />

describe('match page', () => {
  it('moves to the match page', () => {
    cy.visit('/');

    cy.contains('Quick Match')
      .click()
      .url()
      .should('match', /\/match$/g);
  });

  it('should block the unauthorized users', () => {
    cy.contains('매치 등록').click();
    cy.get('.match-regist-modal').should('be.hidden');
    cy.on('window:alert', (str) => {
      expect(str).to.include('회원만');
    });
  });

  it('should login successfully', () => {
    cy.get('.hamburger-box').click();
    cy.get('.new-auth-button--kakao').click();
  });

  it('should allow the authorized user', () => {
    cy.contains('Quick Match!').click();
    cy.contains('매치 등록').click();
    cy.get('.match-regist-modal').should('be.visible');
  });

  it('fills all the information needed', () => {
    cy.get('#matchRegistDistrict').select('영등포구');
    cy.get('#matchRegistDate').click();
    cy.get('#matchStadium').type('아무 운동장 아무 운동장 아무 운동장');
    cy.get('#matchAddress').type('아무 주소 아무 주소 아무 주소');
    cy.get('#matchEtc').type('아무 내용 아무 내용 아무 내용');
  });

  it('clicks the submit button and closes the modal', () => {
    cy.get('.submit-btn')
      .first()
      .click();
    cy.get('.match-regist-modal').should('be.visible');
    cy.get('.close-btn')
      .last()
      .click();
    cy.get('.match-regist-modal').should('not.be.visible');
  });

  it('pops up a modal and exit when clicked `x` button', () => {
    cy.contains('매치 등록')
      .first()
      .click();
    cy.get('.match-regist-modal').should('be.visible');
    cy.get('.close-btn')
      .last()
      .click();

    cy.get('.match-regist-modal').should('not.be.visible');
  });
});
