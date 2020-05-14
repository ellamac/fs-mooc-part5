describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    const user1 = {
      name: 'Peltsi Peltsinen',
      username: 'peltsi',
      password: 'salainen',
    };
    const user2 = {
      name: 'Meitsi Meikäläinen',
      username: 'meitsi',
      password: 'salainen',
    };
    cy.request('POST', 'http://localhost:3001/api/users/', user1);
    cy.request('POST', 'http://localhost:3001/api/users/', user2);
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function () {
    cy.contains('Login');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('peltsi');
      cy.get('#password').type('salainen');
      cy.get('#loginForm-button').click();
      cy.contains('Peltsi Peltsinen logged in');
      cy.get('#log-out-button').click();
    });

    it('fails with wrong credentials', function () {
      cy.get('#loginForm-button').click();
      cy.get('#username').type('peltsi');
      cy.get('#password').type('vääräsalasana');
      cy.get('#loginForm-button').click();
      cy.get('#notification')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255,0,0)');
      cy.contains('');
    });
  });

  describe.only('When logged in', function () {
    beforeEach(function () {
      cy.request('POST', 'http://localhost:3001/api/login', {
        username: 'peltsi',
        password: 'salainen',
      }).then((response) => {
        localStorage.setItem(
          'loggedBlogappUser',
          JSON.stringify(response.body)
        );
        cy.visit('http://localhost:3000');
      });
    });

    it('A blog can be created', function () {
      cy.get('#blogFormToggle-show').click();
      cy.get('input#title').type('Blogin nimi');
      cy.get('input#author').type('Blogin kirjoittaja');
      cy.get('input#url').type('https://www.netflix.com/browse');
      cy.get('#blogForm-button').click();
      cy.contains('');
      cy.contains('Blogin nimi');
      cy.contains('Blogin kirjoittaja');
    });

    describe.only('When blogs exist', function () {
      beforeEach(function () {
        cy.get('#blogFormToggle-show').click();
        cy.get('input#title').type('Testaukseen');
        cy.get('input#author').type('Testaaja');
        cy.get('input#url').type('https://www.netflix.com/browse');
        cy.get('#blogForm-button').click();
      });
      it('A blog can be liked', function () {
        cy.get('#Testaukseen-toggle-show').click();
        cy.get('#Testaukseen-like').click();
        cy.get('#Testaukseen-blog').contains('1');
        cy.get('#Testaukseen-like').click();
        cy.get('#Testaukseen-blog')
          .should('contain', '2')
          .and('not.contain', '1');
      });
      it('creator can delete blog', function () {
        cy.get('#Testaukseen-toggle-show').click();
        cy.get('#Testaukseen-delete').click();
      });

      it('non-creator cannot delete blog', function () {
        cy.get('#log-out-button').click();

        cy.get('#username').type('meitsi');
        cy.get('#password').type('salainen');
        cy.get('#loginForm-button').click();
        cy.contains('Meitsi Meikäläinen logged in');

        cy.get('#Testaukseen-toggle-show').click();
        cy.get('#Testaukseen-blog').should(
          'not.contain',
          '#Testaukseen-delete'
        );
      });

      it('blogs are ordered by likes', function () {
        cy.get('#blogFormToggle-show').click();
        cy.get('input#title').type('1');
        cy.get('input#author').type('1');
        cy.get('input#url').type('https://www.netflix.com/browse');
        cy.get('#blogForm-button').click();
        cy.get('#Testaukseen1-toggle-show').click();
        cy.get('#Testaukseen1-like').click();

        cy.get('#Testaukseen1-like').click();

        cy.get('#log-out-button').click();
        cy.get('#username').type('meitsi');
        cy.get('#password').type('salainen');
        cy.get('#loginForm-button').click();
        cy.contains('Meitsi Meikäläinen logged in');

        cy.get('#Testaukseen-toggle-show').click();
        cy.get('#Testaukseen1-toggle-show').click();

        cy.get('.likes:first').then(($likes1) => {
          const likes1 = parseInt($likes1.text());

          cy.get('.likes:last').then(($likes2) => {
            const likes2 = parseInt($likes2.text());

            expect(likes1).to.be.greaterThan(likes2);
          });
        });
      });
    });
  });
});
