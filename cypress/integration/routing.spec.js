describe('Page load', () => {

  it('open the page', () => {
    cy.visit('http://localhost:3000/')
    cy.contains('Welcome')
  })

  it('close welcome info', () => {
    cy.get('#hide-welcome-button').contains('OK').click()
  })
})

describe('Set origin & destination', () => {

  it('set origin', () => {
    cy.wait(200)
    cy.get('.mapboxgl-canvas')
      .wait(300)
      .click(465, 520)
    cy.contains('Route from here').click()
    cy.get('.mapboxgl-canvas')
      .click(565, 160)
    cy.contains('Route here').click()
  })
})

describe('Query and show quiet paths', () => {

  it('find quiet paths (walk)', () => {
    cy.contains('Find quiet paths').click()
    cy.contains('high noise')
    cy.contains('2.5 km')
    cy.contains('26 min')
  })

  it('show dB legend', () => {
    cy.contains('dB')
    cy.contains('40')
    cy.contains('50')
  })
})

describe('Toggle paths to fresh air and biking', () => {

  it('show find fresh air paths button', () => {
    cy.contains('Show')
    cy.contains('paths')
  })

  it('find biking routes', () => {
    cy.get('#toggle-to-bike-button').click()
    cy.contains('4/4')
    cy.contains('8 min')
  })

  it('toggle walking routes', () => {
    cy.get('#toggle-to-walk-button').click()
    cy.contains('4/4')
    cy.contains('26 min')
  })

  it('toggle biking routes', () => {
    cy.get('#toggle-to-bike-button').click()
    cy.contains('4/4')
    cy.contains('8 min')
  })

  it('toggle back to walking routes', () => {
    cy.get('#toggle-to-walk-button').click()
    cy.wait(200)
  })
})

describe('Filter paths by length', () => {

  it('filter paths', () => {
    cy.get('#filter-by-length-button').click()
    cy.contains('2.2 km').click()
    cy.get('#close-filter-panel').children().click()
    cy.contains('2/4')
  })

  it('disable filter paths', () => {
    cy.get('#filter-by-length-button').click()
    cy.contains('2.5 km').click()
    cy.get('#close-filter-panel').children().click()
    cy.contains('4/4')
  })

  it('toggle back to biking routes resets filtering', () => {
    cy.get('#toggle-to-bike-button').click()
    cy.contains('4/4')
    cy.get('#toggle-to-walk-button').click()
    cy.contains('4/4')
  })
})

describe('Reset paths', () => {

  it('reset paths with reset paths button', () => {
    cy.get('#reset-paths-container').children().click()
    cy.contains('Find quiet paths').click()
  })

  it('reset paths by selecting new destination from map', () => {
    cy.get('.mapboxgl-canvas')
      .wait(300)
      .click(565, 160)
    cy.contains('Route here').click()
    cy.contains('Find quiet paths').click()
  })

  it('reset paths by selecting new origin from map', () => {
    cy.get('.mapboxgl-canvas')
      .wait(100)
      .click(520, 550)
    cy.contains('Route from here').click()
    cy.contains('Find quiet paths')
  })
})

describe('Find more paths', () => {

  it('open the page (again)', () => {
    cy.visit('http://localhost:3000/')
    cy.get('#hide-welcome-button').contains('OK').click()
  })

  it('find quiet paths (walk)', () => {
    cy.get('.mapboxgl-canvas')
      .wait(300)
      .click(465, 160)
    cy.contains('Route from here').click()
    cy.get('.mapboxgl-canvas')
      .wait(100)
      .click(565, 520)
    cy.contains('Route here').click()
    cy.contains('Find quiet paths').click()
  })

  it('show shortest path stats (walk)', () => {
    cy.contains('30 min')
    cy.contains('2.4 km')
    cy.contains('moderate noise')
  })

  it('show quiet path stats (walk)', () => {
    cy.contains('34 min')
    cy.contains('2.8 km')
    cy.contains('-38 % noise')
  })
})


describe('Open path exposure stats', () => {

  it('show opened path stats', () => {
    cy.contains('-38 % noise').parent().parent().parent().within(() => cy.get('.open-path-button').click())
    cy.contains('Exposure to different traffic noise levels')
    cy.contains('40dB')
    cy.contains('50dB')
    cy.contains('6 min')
    cy.contains('4 min')
  })

  it('close opened paths stats', () => {
    cy.get('.close-path-button').click()
    cy.contains('moderate noise')
  })
})