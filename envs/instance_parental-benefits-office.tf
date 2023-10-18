resource "vercel_project" "instance_parental-benefits-office" {
  name           = var.instance_parental-benefits-office
  framework      = "nextjs"
  root_directory = "apps/parental-benefits-office"
  git_repository = {
    type = "github"
    repo = "guddii/showcase-solid-egovernance"
  }
}

resource "vercel_deployment" "instance_parental-benefits-office" {
  project_id = vercel_project.instance_parental-benefits-office.id
  ref        = "main"
  project_settings = {
    root_directory : "apps/parental-benefits-office"
  }
  production = true
}

resource "vercel_project_environment_variable" "web-id_instance_parental-benefits-office" {
  project_id = vercel_project.instance_parental-benefits-office.id
  key        = "NEXT_PUBLIC_PARENTAL_BENEFITS_OFFICE_WEB_ID"
  value      = var.NEXT_PUBLIC_PARENTAL_BENEFITS_OFFICE_WEB_ID
  target     = ["production", "preview", "development"]
}

resource "vercel_project_environment_variable" "client-id_instance_parental-benefits-office" {
  project_id = vercel_project.instance_parental-benefits-office.id
  key        = "PARENTAL_BENEFITS_OFFICE_CLIENT_ID"
  value      = var.PARENTAL_BENEFITS_OFFICE_CLIENT_ID
  target     = ["production", "preview", "development"]
}

resource "vercel_project_environment_variable" "client-secret_instance_parental-benefits-office" {
  project_id = vercel_project.instance_parental-benefits-office.id
  key        = "PARENTAL_BENEFITS_OFFICE_CLIENT_SECRET"
  value      = var.PARENTAL_BENEFITS_OFFICE_CLIENT_SECRET
  target     = ["production", "preview", "development"]
}