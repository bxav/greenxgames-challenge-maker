Feature: Manage Challenges
  @createSchema
  Scenario: Retrieve the challenge list
    Given the following challenges:
      | id                                   | attributes            |
      | a349e23f-ae57-487c-88ee-2efa49684fd7 | attr1=val1,attr2=val2 |
      | d54f18be-fca1-4b8d-b389-12eb288935f4 | attr1=val1            |
    When I add "Content-Type" header equal to "application/json"
    And I add "Accept" header equal to "application/json"
    And I send a "GET" request to "/challenges"
    Then the response status code should be 200
    And the response should be in JSON
    And the header "Content-Type" should be equal to "application/json; charset=utf-8"
    And print last response
    And the response should match:
    """
    [
      {
        "id": "a349e23f-ae57-487c-88ee-2efa49684fd7",
        "attributes": "@array@.count(2)",
        "name": "@string@",
        "thing": null,
        "value": 0
      },
      {
        "id": "d54f18be-fca1-4b8d-b389-12eb288935f4",
        "attributes": "@array@.count(1)",
        "name": "@string@",
        "value": 0
      }
    ]
    """

  @createSchema
  Scenario: Get a Challenge
    Given the following challenges:
      | id                                   | attributes            |
      | a349e23f-ae57-487c-88ee-2efa49684fd7 | attr1=val1,attr2=val2 |
    When I add "Content-Type" header equal to "application/ld+json"
    And I add "Accept" header equal to "application/ld+json"
    And I send a "GET" request to "/challenges/a349e23f-ae57-487c-88ee-2efa49684fd7"
    Then the response status code should be 200
    And the response should be in JSON
    And the header "Content-Type" should be equal to "application/ld+json; charset=utf-8"
    And the response should match:
    """
    {
      "@context": "/contexts/Challenge",
      "@id": "@string@.startsWith('/challenges/')",
      "@type": "Challenge",
      "id": @uuid@,
      "attributes": "@array@.count(2)",
      "name": "@string@",
      "value": 0
    }
    """

  @createSchema
  Scenario: Get challenges by thing
    Given the following things:
      | id |
      | d54f18be-fca1-4b8d-b389-12eb288935f4 |
      | d54f18be-fca1-4b8d-b389-12eb288935f5 |
    Given the following challenges:
      | thing                                |
      | d54f18be-fca1-4b8d-b389-12eb288935f4 |
      | d54f18be-fca1-4b8d-b389-12eb288935f4 |
      | d54f18be-fca1-4b8d-b389-12eb288935f5 |
    When I add "Accept" header equal to "application/ld+json"
    And I send a "GET" request to "/challenges?thing=d54f18be-fca1-4b8d-b389-12eb288935f4"
    Then the response status code should be 200
    And the response should be in JSON
    And the header "Content-Type" should be equal to "application/ld+json; charset=utf-8"
    And the response should match:
    """
    {
        "@context": "/contexts/Challenge",
        "@id": "/challenges",
        "@type": "hydra:Collection",
        "hydra:totalItems": 2,
        "hydra:member": [
            {
                "@id": "@string@",
                "@type": "Challenge",
                "id": @uuid@,
                "attributes":[],
                "name":"unnamed",
                "thing": "/things/d54f18be-fca1-4b8d-b389-12eb288935f4",
                "value": 0
            },
            {
                "@id": "@string@",
                "@type": "Challenge",
                "id": @uuid@,
                "attributes":[],
                "name":"unnamed",
                "thing": "/things/d54f18be-fca1-4b8d-b389-12eb288935f4",
                "value": 0
            }
        ],
        "hydra:view": @array@,
        "hydra:search": @array@
    }
    """
