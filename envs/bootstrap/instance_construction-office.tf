data "vercel_project_directory" "instance_construction-office" {
  path = "../.."
}

resource "vercel_project" "instance_construction-office" {
  name           = var.instance_construction-office
  framework      = "nextjs"
  root_directory = "apps/construction-office"
}

resource "vercel_project_environment_variable" "web-id_instance_construction-office" {
  project_id = vercel_project.instance_construction-office.id
  key        = "NEXT_PUBLIC_CONSTRUCTION_OFFICE_WEB_ID"
  value      = var.NEXT_PUBLIC_CONSTRUCTION_OFFICE_WEB_ID
  target     = ["production", "preview", "development"]
}

resource "vercel_project_environment_variable" "client-id_instance_construction-office" {
  project_id = vercel_project.instance_construction-office.id
  key        = "CONSTRUCTION_OFFICE_CLIENT_ID"
  value      = var.CONSTRUCTION_OFFICE_CLIENT_ID
  target     = ["production", "preview", "development"]
}

resource "vercel_project_environment_variable" "client-secret_instance_construction-office" {
  project_id = vercel_project.instance_construction-office.id
  key        = "CONSTRUCTION_OFFICE_CLIENT_SECRET"
  value      = var.CONSTRUCTION_OFFICE_CLIENT_SECRET
  target     = ["production", "preview", "development"]
}