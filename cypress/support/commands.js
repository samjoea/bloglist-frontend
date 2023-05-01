// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('createUser', ({ username, name, password }) => {
		const user = {
			username,
			name,
			password
		};
		cy.request('POST', `${Cypress.env('BACKEND_URL')}/users`, user);
		cy.visit('');
});

Cypress.Commands.add('login', ({ username, password }) => {
   cy.request('POST', 'http://localhost:3003/api/login', {
      username, password
   }).then(({ body }) => {
      localStorage.setItem('user', JSON.stringify(body));
      cy.visit('http://localhost:3000');
   });
});

Cypress.Commands.add('createBlog', ({ title, author, url }) => {
   cy.contains('new blog').click();
	cy.get('[data-cy=blog-title]').type(title);
	cy.get('[data-cy=blog-author]').type(author);
	cy.get('[data-cy=blog-url]').type(url);
   cy.get('[data-cy=blog-submit]').click();
   cy.wait(500);
   cy.contains('view').click();
});

Cypress.Commands.add('addLikes', (title, num) => {
   for (let i = 0; i < num; i++) {
      cy.contains(title).parent().find('[data-cy=add-likes]').click();
      cy.wait(500);
   }
});