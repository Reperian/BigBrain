context('happy path', () => {

  it('performs the happy path', () => {
    //  registers an account
    cy.visit('localhost:3000/register');
    cy.wait(1000);
    const name = 'test';
    const email = 'test@email.com';
    const password = 'test';

    cy.get('input[name=email]')
      .focus()
      .type(email);
    
    cy.get('input[name=password]')
      .focus()
      .type(password);
    
    cy.get('input[name=name]')
    .focus()
    .type(name);

    cy.get('button[name=register]')
      .click();

    //  logs in
    cy.visit('localhost:3000/login');
    cy.wait(1000);
  
    cy.get('input[name=email]')
      .focus()
      .type(email);
  
    cy.get('input[name=password]')
    .focus()
    .type(password);
  
    cy.get('button[name=login]')
      .click();

    //  creates a new quiz
    cy.wait(1000);
    cy.get('button[name=createQuiz]')
      .click();
    
      cy.get('.MuiAlert-action > .MuiButtonBase-root')
      .click();
    
    //  opens and edits a game name
    cy.wait(1000);
    cy.get('button[name=edit0]')
      .click();
  
    cy.wait(1000);
    cy.get('button[name=editNameButton')
      .click();
    
    cy.wait(1000);
    cy.get('input[name=editName]') 
      .focus()
      .clear()
      .type('Cypress');
    
    cy.get('button[name=editNameButton')
    .click();

    //  starts a game and ends it
    cy.visit('localhost:3000/dashboard');
    cy.wait(1000);
    cy.get('div[name=quiz0]')
      .click();
    
    cy.wait(1000);
    cy.get('button[name=endButton]')
      .click();
    
    cy.wait(1000);
    cy.get('button[name=yes]')
      .click();
    
    cy.wait(1000);
    cy.visit('localhost:3000/dashboard');

    //  signs out successfully
    cy.wait(1000);
    cy.get('button[name=signout')
      .click();
    
    cy.wait(1000);
    //  logs back in
    cy.get('input[name=email]')
      .focus()
      .type(email);
  
    cy.get('input[name=password]')
    .focus()
    .type(password);
  
    cy.get('button[name=login]')
      .click();
  });
})