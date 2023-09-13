data "vercel_project_directory" "instance_reconstruction-loan-corporation" {
  path = "../.."
}

data "vercel_project" "instance_reconstruction-loan-corporation" {
  name = var.instance_reconstruction-loan-corporation
}

resource "vercel_deployment" "instance_reconstruction-loan-corporation" {
  project_id  = data.vercel_project.instance_reconstruction-loan-corporation.id
  files       = data.vercel_project_directory.instance_reconstruction-loan-corporation.files
  path_prefix = data.vercel_project_directory.instance_reconstruction-loan-corporation.path
  project_settings = {
    root_directory : "apps/reconstruction-loan-corporation"
  }
  delete_on_destroy = true
  production        = true
}
