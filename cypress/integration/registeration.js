/// <reference types="Cypress" />

context('Actions', () => {
    // beforeEach(() => {
    //     cy.visit('https://example.cypress.io/commands/actions')
    // })

    it('should visit to website',()=>{
        cy.visit('https://dos.codeyourfuture.io/')
    })

    it('should navigate to Register page',()=>{
        cy.get('.sign-title > :nth-child(2)').click()
        cy.get('#name').type('Won Maung Thein').should('have.value', 'Won Maung Thein')
        cy.get('#Organisation').type('Code Your Future').should('have.value', 'Code Your Future')
        cy.get('#email').type('wonmaungthein@gmail.com').should('have.value','wonmaungthein@gmail.com')
        cy.get(':nth-child(4) > .jss93 > .jss102').type('Wonmaung1').should('have.value','Wonmaung1')
        cy.get(':nth-child(5) > .jss93 > .jss102').type('Wonmaung1').should('have.value','Wonmaung1')
        cy.get('.form-group > .jss19 > .jss5').click()
    })
})