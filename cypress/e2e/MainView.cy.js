// As a user when I first come to the page I should see any orders that already exist
// As a user I should be able to make a new order by adding my name and any ingredients I want on my order
// As a user I should be told if my order is not put through for some reason

describe('Main page', () => {
  beforeEach(() => {
    cy.intercept("GET", "http://localhost:3001/api/v1/orders", {
      statusCode: 200,
      fixture: "allorders.json"
    })
    cy.visit("http://localhost:3000/")
  })

  it('Should display a form, existing orders and a Header', () => {
    cy.get('form')
    cy.get(':nth-child(1) > h3').contains('Pat')
    cy.get(':nth-child(1) > .ingredient-list > :nth-child(1)').contains('beans')
    cy.get(':nth-child(1) > .ingredient-list > :nth-child(5)').contains('jalapeno')
    cy.get(':nth-child(3) > h3').contains('Alex')
    cy.get(':nth-child(3) > .ingredient-list > :nth-child(1)').contains('steak')
    cy.get(':nth-child(3) > .ingredient-list > :nth-child(6)').contains('jalapeno')
    cy.get('h1').contains('Burrito Builder')
  })

  it('Should allow a user to make a new order with their name and selected toppings and submit it then see it displayed with the other orders', () => {
    cy.intercept('POST', 'http://localhost:3001/api/v1/orders', {
      fixture: "newOrder.json"
    })
    cy.get('input').type('Tammy')
    cy.get('[name="steak"]').click()
    cy.get('[name="pico de gallo"]').click()
    cy.get('[name="lettuce"]').click()
    cy.get('[name="cilantro"]').click()
    cy.get('[name="sour cream"]').click()
    cy.get(':nth-child(15)').click()
    cy.get('section > :nth-child(4)').contains('Tammy')
    cy.get(':nth-child(4) > .ingredient-list > :nth-child(1)').contains('steak')
    cy.get(':nth-child(4) > .ingredient-list > :nth-child(2)').contains('pico de gallo')
    cy.get(':nth-child(4) > .ingredient-list > :nth-child(3)').contains('lettuce')
    cy.get(':nth-child(4) > .ingredient-list > :nth-child(4)').contains('cilantro')
    cy.get(':nth-child(4) > .ingredient-list > :nth-child(5)').contains('sour cream')
  })

  it('Should show a error message when user tries to submit the new order with missing feilds', () => {
    cy.get('.submit-btn').click()
    cy.get('.error-msg').contains('Please add your name and select ingredients')
    cy.get('input').type('sara')
    cy.get('.submit-btn').click()
    cy.get('.error-msg').contains('Please select ingredients for your burrito!')
    cy.get('input').clear()
    cy.get('[name="queso fresco"]').click()
    cy.get('.submit-btn').click()
    cy.get('.error-msg').contains('Please add your name!')
  })

})