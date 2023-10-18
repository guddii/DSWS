resource "vercel_project" "instance_employment-agency" {
  name           = var.instance_employment-agency
  framework      = "nextjs"
  root_directory = "apps/employment-agency"
  git_repository = {
    type = "github"
    repo = "guddii/showcase-solid-egovernance"
  }
}

resource "vercel_deployment" "instance_employment-agency" {
  project_id = vercel_project.instance_employment-agency.id
  ref        = "main"
  project_settings = {
    root_directory : "apps/employment-agency"
  }
  production = true
}

resource "vercel_project_environment_variable" "web-id_instance_employment-agency" {
  project_id = vercel_project.instance_employment-agency.id
  key        = "NEXT_PUBLIC_EMPLOYMENT_AGENCY_WEB_ID"
  value      = var.NEXT_PUBLIC_EMPLOYMENT_AGENCY_WEB_ID
  target     = ["production", "preview", "development"]
}

resource "vercel_project_environment_variable" "client-id_instance_employment-agency" {
  project_id = vercel_project.instance_employment-agency.id
  key        = "EMPLOYMENT_AGENCY_CLIENT_ID"
  value      = var.EMPLOYMENT_AGENCY_CLIENT_ID
  target     = ["production", "preview", "development"]
}

resource "vercel_project_environment_variable" "client-secret_instance_employment-agency" {
  project_id = vercel_project.instance_employment-agency.id
  key        = "EMPLOYMENT_AGENCY_CLIENT_SECRET"
  value      = var.EMPLOYMENT_AGENCY_CLIENT_SECRET
  target     = ["production", "preview", "development"]
}