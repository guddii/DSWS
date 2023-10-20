data "vercel_project_directory" "instance_vehicle-registration-office" {
  path = "../.."
}

data "vercel_project" "instance_vehicle-registration-office" {
  name = var.instance_vehicle-registration-office
}

resource "vercel_deployment" "instance_vehicle-registration-office" {
  project_id  = data.vercel_project.instance_vehicle-registration-office.id
  files       = data.vercel_project_directory.instance_vehicle-registration-office.files
  path_prefix = data.vercel_project_directory.instance_vehicle-registration-office.path
  delete_on_destroy = true
  production        = true
}
