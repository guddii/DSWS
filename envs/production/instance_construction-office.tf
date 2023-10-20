data "vercel_project_directory" "instance_construction-office" {
  path = "../.."
}

data "vercel_project" "instance_construction-office" {
  name = var.instance_construction-office
}

resource "vercel_deployment" "instance_construction-office" {
  project_id        = data.vercel_project.instance_construction-office.id
  files             = data.vercel_project_directory.instance_construction-office.files
  path_prefix       = data.vercel_project_directory.instance_construction-office.path
  delete_on_destroy = true
  production        = true
}
