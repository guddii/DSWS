data "vercel_project_directory" "instance_citizen" {
  path = "../.."
}

data "vercel_project" "instance_citizen" {
  name = var.instance_citizen
}

resource "vercel_deployment" "instance_citizen" {
  project_id  = data.vercel_project.instance_citizen.id
  files       = data.vercel_project_directory.instance_citizen.files
  path_prefix = data.vercel_project_directory.instance_citizen.path
  project_settings = {
    root_directory : "apps/citizen"
  }
  delete_on_destroy = true
  production        = true
}
