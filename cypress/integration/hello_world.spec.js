describe('Hello World Test', () => {
    it('should display the correct title', () => {
        cy.visit('http://pincelepoesia.com');
        cy.title().should('include', 'Your App Title');
    });
});