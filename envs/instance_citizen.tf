resource "vercel_project" "instance_citizen" {
  name           = var.instance_citizen
  framework      = "nextjs"
  root_directory = "apps/citizen"
  git_repository = {
    type = "github"
    repo = "guddii/showcase-solid-egovernance"
  }
}

resource "vercel_deployment" "instance_citizen" {
  project_id = vercel_project.instance_citizen.id
  ref        = "main"
  project_settings = {
    root_directory : "apps/citizen"
  }
  production = true
}