resource "vercel_project" "instance_registration-office" {
  name           = var.instance_registration-office
  framework      = "nextjs"
  root_directory = "apps/registration-office"
  git_repository = {
    type = "github"
    repo = "guddii/showcase-solid-egovernance"
  }
}

resource "vercel_deployment" "instance_registration-office" {
  project_id = vercel_project.instance_registration-office.id
  ref        = "main"
  project_settings = {
    root_directory : "apps/registration-office"
  }
  production = true
}

resource "vercel_project_environment_variable" "web-id_instance_registration-office" {
  project_id = vercel_project.instance_registration-office.id
  key        = "NEXT_PUBLIC_REGISTRATION_OFFICE_WEB_ID"
  value      = var.NEXT_PUBLIC_REGISTRATION_OFFICE_WEB_ID
  target     = ["production", "preview", "development"]
}

resource "vercel_project_environment_variable" "client-id_instance_registration-office" {
  project_id = vercel_project.instance_registration-office.id
  key        = "REGISTRATION_OFFICE_CLIENT_ID"
  value      = var.REGISTRATION_OFFICE_CLIENT_ID
  target     = ["production", "preview", "development"]
}

resource "vercel_project_environment_variable" "client-secret_instance_registration-office" {
  project_id = vercel_project.instance_registration-office.id
  key        = "REGISTRATION_OFFICE_CLIENT_SECRET"
  value      = var.REGISTRATION_OFFICE_CLIENT_SECRET
  target     = ["production", "preview", "development"]
}