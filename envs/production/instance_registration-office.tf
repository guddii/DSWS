data "vercel_project_directory" "instance_registration-office" {
  path = "../.."
}

data "vercel_project" "instance_registration-office" {
  name = var.instance_registration-office
}

resource "vercel_deployment" "instance_registration-office" {
  project_id  = data.vercel_project.instance_registration-office.id
  files       = data.vercel_project_directory.instance_registration-office.files
  path_prefix = data.vercel_project_directory.instance_registration-office.path
  delete_on_destroy = true
  production        = true
}
