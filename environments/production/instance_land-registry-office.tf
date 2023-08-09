data "vercel_project_directory" "instance_land-registry-office" {
  path = "../.."
}

data "vercel_project" "instance_land-registry-office" {
  name = var.instance_land-registry-office
}

resource "vercel_deployment" "instance_land-registry-office" {
  project_id  = data.vercel_project.instance_land-registry-office.id
  files       = data.vercel_project_directory.instance_land-registry-office.files
  path_prefix = data.vercel_project_directory.instance_land-registry-office.path
  project_settings = {
    root_directory: "apps/land-registry-office"
  }
  delete_on_destroy = true
  production = true
}
