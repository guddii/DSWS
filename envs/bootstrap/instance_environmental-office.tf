data "vercel_project_directory" "instance_environmental-office" {
  path = "../.."
}

resource "vercel_project" "instance_environmental-office" {
  name           = var.instance_environmental-office
  framework      = "nextjs"
  root_directory = "apps/environmental-office"
}

resource "vercel_project_environment_variable" "web-id_instance_environmental-office" {
  project_id = vercel_project.instance_environmental-office.id
  key        = "NEXT_PUBLIC_ENVIRONMENTAL_OFFICE_WEB_ID"
  value      = var.NEXT_PUBLIC_ENVIRONMENTAL_OFFICE_WEB_ID
  target     = ["production", "preview", "development"]
}

resource "vercel_project_environment_variable" "client-id_instance_environmental-office" {
  project_id = vercel_project.instance_environmental-office.id
  key        = "ENVIRONMENTAL_OFFICE_CLIENT_ID"
  value      = var.ENVIRONMENTAL_OFFICE_CLIENT_ID
  target     = ["production", "preview", "development"]
}

resource "vercel_project_environment_variable" "client-secret_instance_environmental-office" {
  project_id = vercel_project.instance_environmental-office.id
  key        = "ENVIRONMENTAL_OFFICE_CLIENT_SECRET"
  value      = var.ENVIRONMENTAL_OFFICE_CLIENT_SECRET
  target     = ["production", "preview", "development"]
}