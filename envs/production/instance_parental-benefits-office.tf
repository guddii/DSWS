data "vercel_project_directory" "instance_parental-benefits-office" {
  path = "../.."
}

data "vercel_project" "instance_parental-benefits-office" {
  name = var.instance_parental-benefits-office
}

resource "vercel_deployment" "instance_parental-benefits-office" {
  project_id        = data.vercel_project.instance_parental-benefits-office.id
  files             = data.vercel_project_directory.instance_parental-benefits-office.files
  path_prefix       = data.vercel_project_directory.instance_parental-benefits-office.path
  delete_on_destroy = true
  production        = true
}
