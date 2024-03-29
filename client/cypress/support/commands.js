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
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })


Cypress.Commands.add('login',({ username,password }) => {
  cy.request('POST','http://localhost:3001/api/login',{
    username : username,
    password : password
  }).then(({ body }) => {
    localStorage.setItem('loggedUser', JSON.stringify(body))
    cy.visit('http://localhost:3001')
  })
})

Cypress.Commands.add('createBlog', ({ title,author,url,likes }) => {
  const isLoggedIn = window.localStorage.getItem('loggedUser')
  if(isLoggedIn){
    const parsed = JSON.parse(isLoggedIn)
    cy.request({
      method: 'POST',
      url: 'http://localhost:3001/api/blogs',
      headers: {
        'content-type': 'application/json',
        'Authorization' : `bearer ${parsed.token}`
      },
      body: { 'title':title,'author':author,'url':url,'likes':likes }
    }
    )
  }
  cy.visit('http://localhost:3001')
})