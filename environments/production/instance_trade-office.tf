data "vercel_project_directory" "instance_trade-office" {
  path = "../.."
}

data "vercel_project" "instance_trade-office" {
  name = var.instance_trade-office
}

resource "vercel_deployment" "instance_trade-office" {
  project_id  = data.vercel_project.instance_trade-office.id
  files       = data.vercel_project_directory.instance_trade-office.files
  path_prefix = data.vercel_project_directory.instance_trade-office.path
  project_settings = {
    root_directory : "apps/trade-office"
  }
  delete_on_destroy = true
  production        = true
}
