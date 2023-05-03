data "vercel_project_directory" "instance_government" {
  path = "../.."
}

data "vercel_project" "instance_government" {
  name = var.instance_government
}

resource "vercel_deployment" "instance_government" {
  project_id  = data.vercel_project.instance_government.id
  files       = data.vercel_project_directory.instance_government.files
  path_prefix = data.vercel_project_directory.instance_government.path
  project_settings = {
    root_directory: "apps/government"
  }
  delete_on_destroy = true
  production = true
}
