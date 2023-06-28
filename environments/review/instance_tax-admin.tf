data "vercel_project_directory" "instance_tax-admin" {
  path = "../.."
}

data "vercel_project" "instance_tax-admin" {
  name = var.instance_tax-admin
}

resource "vercel_deployment" "instance_tax-admin" {
  project_id  = data.vercel_project.instance_tax-admin.id
  files       = data.vercel_project_directory.instance_tax-admin.files
  path_prefix = data.vercel_project_directory.instance_tax-admin.path
  project_settings = {
    root_directory: "apps/tax-admin"
  }
  delete_on_destroy = true
}
