data "vercel_project_directory" "instance_land-registry-office" {
  path = "../.."
}

resource "vercel_project" "instance_land-registry-office" {
  name           = var.instance_land-registry-office
  framework      = "nextjs"
  root_directory = "apps/land-registry-office"
}

resource "vercel_project_environment_variable" "web-id_land-registry-office" {
  project_id = vercel_project.instance_land-registry-office.id
  key        = "NEXT_PUBLIC_LAND_REGISTRY_OFFICE_WEB_ID"
  value      = var.NEXT_PUBLIC_LAND_REGISTRY_OFFICE_WEB_ID
  target     = ["production", "preview", "development"]
}

resource "vercel_project_environment_variable" "client-id_land-registry-office" {
  project_id = vercel_project.instance_land-registry-office.id
  key        = "LAND_REGISTRY_OFFICE_CLIENT_ID"
  value      = var.LAND_REGISTRY_OFFICE_CLIENT_ID
  target     = ["production", "preview", "development"]
}

resource "vercel_project_environment_variable" "client-secret_land-registry-office" {
  project_id = vercel_project.instance_land-registry-office.id
  key        = "LAND_REGISTRY_OFFICE_CLIENT_SECRET"
  value      = var.LAND_REGISTRY_OFFICE_CLIENT_SECRET
  target     = ["production", "preview", "development"]
}
