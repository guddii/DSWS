data "vercel_project_directory" "instance_employment-agency" {
  path = "../.."
}

data "vercel_project" "instance_employment-agency" {
  name = var.instance_employment-agency
}

resource "vercel_deployment" "instance_employment-agency" {
  project_id  = data.vercel_project.instance_employment-agency.id
  files       = data.vercel_project_directory.instance_employment-agency.files
  path_prefix = data.vercel_project_directory.instance_employment-agency.path
  delete_on_destroy = true
  production        = true
}
