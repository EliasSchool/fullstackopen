describe('Blog app', function() {
  beforeEach(function() {
    
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'timo',
      username: 'timppaa',
      password: 'simppa'
    }
    const anotheruser = {
      name: 'fake',
      username: 'faker',
      password: 'paris'
    }

    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user) 
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, anotheruser) 

    cy.visit('')
  }) 

  it('Login form is shown', function() {
    cy.contains('login').click()
  })

  describe('Login', function() {
    it('succeds with correct credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('timppaa')
      cy.get('#password').type('simppa')
      cy.get('#login-button').click()
      
      cy.contains('Logged in as timo')
    })
      it('fails with wrong credentials', function() {
        cy.contains('login').click()
        cy.get('#username').type('timppaa')
        cy.get('#password').type('yes')
        cy.get('#login-button').click()
        
        cy.contains('wrong username or password')
    })
    
    describe('When logged in', function() {
      beforeEach(function () {
        cy.login({ username: 'timppaa', password: 'simppa' })
      })
      
      it('A blog can be created', function() {
        cy.contains("New Blog").click()
        cy.get("#title").type("testing the title")
        cy.get("#author").type("timppa")
        cy.get("#url").type("http://localhost:3000")
        cy.contains("create").click()
        cy.contains("testing the title by timppa")
    })
    
    describe('A blog exists', function() {
      beforeEach(function () {
        cy.createBlog({
          title: 'title testing', 
          author: 'häyhä', 
          url: 'http://localhost:3000',
          likes: 0
        })
      }) 
      
      it('A blog can be viewed', function() {
        cy.contains("View").click()
        cy.contains("title testing")
        cy.contains("häyhä")
        cy.contains("http://localhost:3000")
      }) 

      it('A blog can be liked', function() {
        cy.contains("View").click()
        cy.contains("Like").click()
        cy.contains("1")
      }) 

      it('A blog can be deleted', function() {
        cy.contains("View").click()
        cy.contains("Remove").click()
        cy.contains("title testing").should('not.exist')
      })

      it('Only blog creator can see the remove button', function() {
      
        cy.login({username: 'faker', password: 'paris'})
        cy.contains("View").click()
        cy.contains("Remove").should('not.exist')

        cy.logout()
        cy.login({username: 'timppaa', password: 'simppa'})
        cy.contains("View").click()
        cy.contains("Remove").should('exist')
      }) 
    })
    describe('Multiple blogs exist', function() {
      it('Blogs are ordered by likes', function() {
        cy.createBlog({
          title: 'The Art of Persistence: A Journey',
          author: 'John Doe',
          url: 'http://localhost:3000',
          likes: 0
        })
      
        cy.createBlog({
          title: 'Discovering the Magic of Writing',
          author: 'Jane Doe',
          url: 'http://localhost:3000',
          likes: 1
        })
      
        cy.createBlog({
          title: 'The Power of Connection',
          author: 'Bob Smith',
          url: 'http://localhost:3000',
          likes: 2
        })
  
        cy.get('.blog').eq(0).should('contain', 'The Power of Connection')
        cy.get('.blog').eq(1).should('contain', 'Discovering the Magic of Writing')
        cy.get('.blog').eq(2).should('contain', 'The Art of Persistence: A Journey')
        
        cy.contains('Discovering the Magic of Writing')
        .parent()
        .find('button')
        .contains('View')
        .click()
  
      cy.contains('Discovering the Magic of Writing')
        .parent()
        .find('button')
        .contains('Like')
        .click()
        .click()

        cy.contains('The Art of Persistence: A Journey')
        .parent()
        .find('button')
        .contains('View')
        .click()
  
      cy.contains('The Art of Persistence: A Journey')
        .parent()
        .find('button')
        .contains('Like')
        .click()
        .click()
        .click()
        .click()

        cy.get('.blog').eq(0).should('contain', 'The Art of Persistence: A Journey')
        cy.get('.blog').eq(1).should('contain', 'Discovering the Magic of Writing')
        cy.get('.blog').eq(2).should('contain', 'The Power of Connection')

      })

    })
  })
})
})

