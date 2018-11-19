/// <reference types="Cypress" />

context('Registration', () => {
    it('should visit to directory website', () => {
        cy.visit('https://dos.codeyourfuture.io/')
    })
    it('should navigate to Register page', () => {
        cy.get('.sign-title > :nth-child(2)').click()
        cy.get('#name').type('Won Maung Thein').should('have.value', 'Won Maung Thein')
        cy.get('#Organisation').type('Code Your Future').should('have.value', 'Code Your Future')
        cy.get('#email').type('wonmaungthein@gmail.com').should('have.value', 'wonmaungthein@gmail.com')
        cy.get(':nth-child(4) > .jss93 > .jss102').type('Wonmaung1').should('have.value', 'Wonmaung1')
        cy.get(':nth-child(5) > .jss93 > .jss102').type('Wonmaung1').should('have.value', 'Wonmaung1')
        cy.get('.form-group > .jss19 > .jss5').click()
    })
})

context('Log in', () => {
    it('should navigate to log in page', () => {
        cy.get('.sign-title > :nth-child(1)').click()
        cy.get('#email').type('wonmaungthein@gmail.com').should('have.value', 'wonmaungthein@gmail.com')
        cy.get('#password').type('Wonmaung1').should('have.value', 'Wonmaung1')
        cy.get('.login-form > .jss19').click()
    })
})