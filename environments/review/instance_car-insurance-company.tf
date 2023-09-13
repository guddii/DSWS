data "vercel_project_directory" "instance_car-insurance-company" {
  path = "../.."
}

data "vercel_project" "instance_car-insurance-company" {
  name = var.instance_car-insurance-company
}

resource "vercel_deployment" "instance_car-insurance-company" {
  project_id  = data.vercel_project.instance_car-insurance-company.id
  files       = data.vercel_project_directory.instance_car-insurance-company.files
  path_prefix = data.vercel_project_directory.instance_car-insurance-company.path
  project_settings = {
    root_directory : "apps/car-insurance-company"
  }
  delete_on_destroy = true
}
