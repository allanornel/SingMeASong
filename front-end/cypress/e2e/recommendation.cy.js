/// <reference types="cypress" />

import { faker } from "@faker-js/faker";

const URL = "http://localhost:3000";

// beforeEach(() => {
//   cy.resetRecommendation();
// });

describe("Create Recommendantion Test", () => {
  const recommendation = {
    name: faker.music.songName(),
    youtubeLink: "https://www.youtube.com/watch?v=6t_dYhXyYjI",
  };
  it("should create recommendation", () => {
    cy.visit(`${URL}/`);
    cy.get('[placeholder*="Name"]').type(recommendation.name);
    cy.get('[placeholder*="https://youtu.be/..."]').type(recommendation.youtubeLink);

    cy.intercept("POST", "/recommendations").as("recommendation");
    cy.get("#createButtom").click();
    cy.wait("@recommendation");

    cy.contains(`${recommendation.name}`).should("exist");
  });
});
