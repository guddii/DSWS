data "vercel_project_directory" "instance_citizen" {
  path = "../.."
}

resource "vercel_project" "instance_citizen" {
  name           = var.instance_citizen
  framework      = "nextjs"
  root_directory = "apps/citizen"
}
