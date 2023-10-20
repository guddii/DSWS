data "vercel_project_directory" "instance_environmental-office" {
  path = "../.."
}

data "vercel_project" "instance_environmental-office" {
  name = var.instance_environmental-office
}

resource "vercel_deployment" "instance_environmental-office" {
  project_id  = data.vercel_project.instance_environmental-office.id
  files       = data.vercel_project_directory.instance_environmental-office.files
  path_prefix = data.vercel_project_directory.instance_environmental-office.path
  delete_on_destroy = true
  production        = true
}
