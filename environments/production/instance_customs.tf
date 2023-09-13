data "vercel_project_directory" "instance_customs" {
  path = "../.."
}

data "vercel_project" "instance_customs" {
  name = var.instance_customs
}

resource "vercel_deployment" "instance_customs" {
  project_id  = data.vercel_project.instance_customs.id
  files       = data.vercel_project_directory.instance_customs.files
  path_prefix = data.vercel_project_directory.instance_customs.path
  project_settings = {
    root_directory : "apps/customs"
  }
  delete_on_destroy = true
  production        = true
}
