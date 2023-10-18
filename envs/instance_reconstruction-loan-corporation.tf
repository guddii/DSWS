resource "vercel_project" "instance_reconstruction-loan-corporation" {
  name           = var.instance_reconstruction-loan-corporation
  framework      = "nextjs"
  root_directory = "apps/reconstruction-loan-corporation"
  git_repository = {
    type = "github"
    repo = "guddii/showcase-solid-egovernance"
  }
}

resource "vercel_deployment" "instance_reconstruction-loan-corporation" {
  project_id = vercel_project.instance_reconstruction-loan-corporation.id
  ref        = "main"
  project_settings = {
    root_directory : "apps/reconstruction-loan-corporation"
  }
  production = true
}

resource "vercel_project_environment_variable" "web-id_instance_reconstruction-loan-corporation" {
  project_id = vercel_project.instance_reconstruction-loan-corporation.id
  key        = "NEXT_PUBLIC_RECONSTRUCTION_LOAN_CORPORATION_WEB_ID"
  value      = var.NEXT_PUBLIC_RECONSTRUCTION_LOAN_CORPORATION_WEB_ID
  target     = ["production", "preview", "development"]
}

resource "vercel_project_environment_variable" "client-id_instance_reconstruction-loan-corporation" {
  project_id = vercel_project.instance_reconstruction-loan-corporation.id
  key        = "RECONSTRUCTION_LOAN_CORPORATION_CLIENT_ID"
  value      = var.RECONSTRUCTION_LOAN_CORPORATION_CLIENT_ID
  target     = ["production", "preview", "development"]
}

resource "vercel_project_environment_variable" "client-secret_instance_reconstruction-loan-corporation" {
  project_id = vercel_project.instance_reconstruction-loan-corporation.id
  key        = "RECONSTRUCTION_LOAN_CORPORATION_CLIENT_SECRET"
  value      = var.RECONSTRUCTION_LOAN_CORPORATION_CLIENT_SECRET
  target     = ["production", "preview", "development"]
}