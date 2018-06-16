resource "azurerm_resource_group" "frontend" {
  name     = "greengame-${var.locationShort}-frontend-${random_integer.rg.result}rg"
  location = "${var.location}"

  tags {
    org = "greengame"
    service = "frontend"
    location = "${var.locationShort}"
  }
}

resource "azurerm_app_service_plan" "frontend" {
  name                = "${var.env}-${var.locationShort}-frontend-${random_integer.rg.result}-sp"
  location            = "${azurerm_resource_group.frontend.location}"
  resource_group_name = "${azurerm_resource_group.frontend.name}"

  sku {
    tier = "Basic"
    size = "B1"
  }
}

resource "azurerm_app_service" "thing-scanner" {
  name                = "${var.env}-${var.locationShort}-thing-scanner-${random_integer.rg.result}-app"
  location            = "${azurerm_resource_group.frontend.location}"
  resource_group_name = "${azurerm_resource_group.frontend.name}"
  app_service_plan_id = "${azurerm_app_service_plan.frontend.id}"

  # app_settings {
  #   "SOME_KEY" = "some-value"
  # }
}