resource "vercel_project" "instance_trade-office" {
  name           = var.instance_trade-office
  framework      = "nextjs"
  root_directory = "apps/trade-office"
  git_repository = {
    type = "github"
    repo = "guddii/showcase-solid-egovernance"
  }
}

resource "vercel_deployment" "instance_trade-office" {
  project_id = vercel_project.instance_trade-office.id
  ref        = "main"
  project_settings = {
    root_directory : "apps/trade-office"
  }
  production = true
}

resource "vercel_project_environment_variable" "web-id_instance_trade-office" {
  project_id = vercel_project.instance_trade-office.id
  key        = "NEXT_PUBLIC_TRADE_OFFICE_WEB_ID"
  value      = var.NEXT_PUBLIC_TRADE_OFFICE_WEB_ID
  target     = ["production", "preview", "development"]
}

resource "vercel_project_environment_variable" "client-id_instance_trade-office" {
  project_id = vercel_project.instance_trade-office.id
  key        = "TRADE_OFFICE_CLIENT_ID"
  value      = var.TRADE_OFFICE_CLIENT_ID
  target     = ["production", "preview", "development"]
}

resource "vercel_project_environment_variable" "client-secret_instance_trade-office" {
  project_id = vercel_project.instance_trade-office.id
  key        = "TRADE_OFFICE_CLIENT_SECRET"
  value      = var.TRADE_OFFICE_CLIENT_SECRET
  target     = ["production", "preview", "development"]
}