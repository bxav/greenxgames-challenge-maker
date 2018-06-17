Feature: Manage Things
  @createSchema
  Scenario: Get a Thing
    Given the following things:
      | id                                   |
      | a349e23f-ae57-487c-88ee-2efa49684fd3 |
    When I add "Content-Type" header equal to "application/ld+json"
    And I add "Accept" header equal to "application/ld+json"
    And I send a "GET" request to "/things/a349e23f-ae57-487c-88ee-2efa49684fd3"
    Then the response status code should be 200
    And the response should be in JSON
    And the header "Content-Type" should be equal to "application/ld+json; charset=utf-8"
    And the response should match:
    """
    {
      "@context": "/contexts/Thing",
      "@id": "@string@.startsWith('/things/')",
      "@type": "Thing",
      "id": @uuid@,
      "name": "@string@"
    }
    """