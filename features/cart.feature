# Название
Feature: Shopping Cart Management
  As a user
  I want to manage items in my cart

  # Перед каждым шагом
  Background:
    Given I am logged in as "standard_user"

  # Сценарий
  Scenario: Add item to cart
    When I add the "Sauce Labs Backpack" to cart
    Then the cart badge should show "1"

  Scenario: Remove item from cart
    When I add the "Sauce Labs Backpack" to cart
    And I remove the "Sauce Labs Backpack" from cart
    Then the cart badge should be empty

  Scenario: Complete purchase
    When I add the "Sauce Labs Bike Light" to cart
    And I proceed to checkout with:
      | First Name | John   |
      | Last Name  | Doe    |
      | ZIP Code   | 12345  |
    Then I should see order confirmation


