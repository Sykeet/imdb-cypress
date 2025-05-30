describe("IMDB Funktionalitets- och UI-tester", () => {

  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit("https://www.imdb.com/");
    cy.wait(3000);
    cy.get('[data-testid="accept-button"]', { timeout: 5000 }).then(($button) => {
      if ($button.length) {
        cy.wrap($button).click();
      }
    });
  });

  it('Sökfunktion: Sök efter skådespelaren "Bryan Cranston" och verifiera att "Breaking Bad" finns i hans filmografi', () => {
    cy.get('input[name="q"]').type("bryan cranston{enter}");
    cy.contains("Bryan Cranston").click();
    cy.get('[data-testid="nm_kwn_for_0"]').contains("Breaking Bad").should("be.visible");
  });

  it("Sök efter Breaking Bad och verifiera att Bryan Cranston finns listad", () => {
    cy.get('input[name="q"]').type("breaking bad{enter}");
    cy.contains("Breaking Bad").click();
    cy.get('[data-testid="hero-parent"]').contains("Bryan Cranston").should("be.visible");
  });

  it("Serieinformation: Verifiera titel och skådespelare", () => {
    cy.get('input[name="q"]').type("breaking bad{enter}");
    cy.contains("Breaking Bad").click();
    cy.get("h1").should("contain.text", "Breaking Bad");
    cy.get('[data-testid="title-cast"]').contains("Bryan Cranston").should("be.visible");
    cy.get('[data-testid="title-cast"]').contains("Anna Gunn").should("be.visible");
    cy.get('[data-testid="title-cast"]').contains("Aaron Paul").should("be.visible");
  });

  it("Media: Testa att bilder visas och fungerar korrekt", () => {
    cy.get('input[name="q"]').type("breaking bad{enter}");
    cy.contains("Breaking Bad").click();
    cy.get('a[href*="mediaviewer"]').first().click();
    cy.get(".media-viewer img").should("be.visible");
  });

  it("Ska söka efter Breaking Bad, klicka på rätt resultat och spela upp trailern", () => {
    cy.get("input[name='q']").type("Breaking Bad{enter}");
    cy.get("a.ipc-metadata-list-summary-item__t", { timeout: 10000 })
      .should("be.visible")
      .first()
      .click();

    cy.url().should("include", "/title/tt0903747/");

    cy.get("a.ipc-lockup-overlay[aria-label*='Watch']")
      .first()
      .click({ force: true });
    cy.get("video", { timeout: 10000 })
      .should("be.visible")
  });
});