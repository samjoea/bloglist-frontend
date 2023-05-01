describe('Blog app', function () {
	beforeEach(function () {
		cy.request('POST', `${Cypress.env('BACKEND_URL')}/testing/reset`);
		cy.createUser({ username: 'root', password: 'root', name: 'root' });
	});

	it('Login form is shown', function () {
		cy.contains('login');
		cy.contains('username');
		cy.contains('password');
	});

	describe('Login', function () {
		it('succeeds with correct credentials', function () {
			cy.get('input:first').type('root');
			cy.get('input:last').type('root');
			cy.get('[data-cy=login-submit]').click();

			cy.contains('Superuser logged in');
		});

		it('fails with wrong credentials', function () {
			cy.get('input:first').type('root');
			cy.get('input:last').type('wrong');
			cy.get('[data-cy=login-submit]').click();

			cy.get('[data-cy=notification-box]')
				.should('have.css', 'color', 'rgb(255, 0, 0)')
				.and('contain', 'wrong username or password');
		});
	});

	describe('When logged in', function () {
		beforeEach(function () {
			cy.login({ username: 'root', password: 'root' });
		});

		it('A blog can be created', function () {
			cy.createBlog({ title: 'a blog created by cypress', author: 'cypress', url: 'cypress.io' });

			cy.contains('a blog created by cypress');
		});

		it('A blog can be liked', function () {
			cy.createBlog({ title: 'a blog created by cypress', author: 'cypress', url: 'cypress.io' });
			cy.contains('a blog created by cypress');
			cy.get('[data-cy=number-of-likes]').contains('0');
			cy.get('[data-cy=add-likes]').click();
			cy.get('[data-cy=number-of-likes]').contains('1');
		});

		it('A blog can be deleted', function () {
			cy.createBlog({ title: 'a blog created by cypress', author: 'cypress', url: 'cypress.io' });
			cy.contains('a blog created by cypress');
			cy.get('[data-cy=blog-delete]').click();
			cy.contains('Blog Deleted');
			cy.contains('a blog created by cypress').should('not.exist');
		});

		it('Only the creator can delete a blog', function () {
			cy.createBlog({ title: 'a blog created by cypress', author: 'cypress', url: 'cypress.io' });
			cy.contains('a blog created by cypress');
			cy.get('[data-cy=log-out]').click();
			cy.createUser({ username: 'newUser', password: 'newUser', name: 'newUser' });
			cy.login({ username: 'newUser', password: 'newUser' });
			cy.contains('newUser logged in');
			cy.contains('view').click();
			cy.contains('a blog created by cypress')

			cy.contains('delete').should('not.exist');
		});

		it.only('Blogs are ordered according to likes', function () {
			cy.createBlog({ title: 'a blog created by cypress', author: 'cypress', url: 'cypress.io' });
			cy.createBlog({ title: 'a second blog created by cypress', author: 'cypress', url: 'cypress.io' });
			cy.createBlog({ title: 'a third blog created by cypress', author: 'cypress', url: 'cypress.io' });
			cy.contains('a blog created by cypress');
			cy.contains('a second blog created by cypress');
			cy.contains('a third blog created by cypress');

			cy.addLikes('a third blog created by cypress', 3);
			cy.addLikes('a second blog created by cypress', 2);
			cy.addLikes('a blog created by cypress', 1);

			cy.get('[data-cy=blog-posts]').then((blogs) => {
				cy.wrap(blogs[0]).contains('a third blog created by cypress');
				cy.wrap(blogs[1]).contains('a second blog created by cypress');
				cy.wrap(blogs[2]).contains('a blog created by cypress');
			});
		});
	});
});
