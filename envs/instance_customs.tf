resource "vercel_project" "instance_customs" {
  name           = var.instance_customs
  framework      = "nextjs"
  root_directory = "apps/customs"
  git_repository = {
    type = "github"
    repo = "guddii/showcase-solid-egovernance"
  }
}

resource "vercel_deployment" "instance_customs" {
  project_id = vercel_project.instance_customs.id
  ref        = "main"
  project_settings = {
    root_directory : "apps/customs"
  }
  production = true
}

resource "vercel_project_environment_variable" "web-id_instance_customs" {
  project_id = vercel_project.instance_customs.id
  key        = "NEXT_PUBLIC_CUSTOMS_WEB_ID"
  value      = var.NEXT_PUBLIC_CUSTOMS_WEB_ID
  target     = ["production", "preview", "development"]
}

resource "vercel_project_environment_variable" "client-id_instance_customs" {
  project_id = vercel_project.instance_customs.id
  key        = "CUSTOMS_CLIENT_ID"
  value      = var.CUSTOMS_CLIENT_ID
  target     = ["production", "preview", "development"]
}

resource "vercel_project_environment_variable" "client-secret_instance_customs" {
  project_id = vercel_project.instance_customs.id
  key        = "CUSTOMS_CLIENT_SECRET"
  value      = var.CUSTOMS_CLIENT_SECRET
  target     = ["production", "preview", "development"]
}