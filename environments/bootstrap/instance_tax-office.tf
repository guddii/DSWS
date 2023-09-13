data "vercel_project_directory" "instance_tax-office" {
  path = "../.."
}

resource "vercel_project" "instance_tax-office" {
  name           = var.instance_tax-office
  framework      = "nextjs"
  root_directory = "apps/tax-office"
}

resource "vercel_project_environment_variable" "web-id_tax-office" {
  project_id = vercel_project.instance_tax-office.id
  key        = "NEXT_PUBLIC_TAX_OFFICE_WEB_ID"
  value      = var.NEXT_PUBLIC_TAX_OFFICE_WEB_ID
  target     = ["production", "preview", "development"]
}

resource "vercel_project_environment_variable" "client-id_tax-office" {
  project_id = vercel_project.instance_tax-office.id
  key        = "TAX_OFFICE_CLIENT_ID"
  value      = var.TAX_OFFICE_CLIENT_ID
  target     = ["production", "preview", "development"]
}

resource "vercel_project_environment_variable" "client-secret_tax-office" {
  project_id = vercel_project.instance_tax-office.id
  key        = "TAX_OFFICE_CLIENT_SECRET"
  value      = var.TAX_OFFICE_CLIENT_SECRET
  target     = ["production", "preview", "development"]
}
