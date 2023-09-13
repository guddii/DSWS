data "vercel_project_directory" "instance_tax-office" {
  path = "../.."
}

data "vercel_project" "instance_tax-office" {
  name = var.instance_tax-office
}

resource "vercel_deployment" "instance_tax-office" {
  project_id  = data.vercel_project.instance_tax-office.id
  files       = data.vercel_project_directory.instance_tax-office.files
  path_prefix = data.vercel_project_directory.instance_tax-office.path
  project_settings = {
    root_directory : "apps/tax-office"
  }
  delete_on_destroy = true
}
