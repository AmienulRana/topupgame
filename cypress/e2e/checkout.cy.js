describe('checkout', () => {
    it('user can buy voucher game', () => {
        // user open index page;
        cy.visit('/');
        
        // click voucher want to buy
        cy.get('[data-cy="Free Fire"]').click();

        // use redirect to detail voucher and check the name voucher is true
        cy.get('h2').contains('Free Fire');
    })
});