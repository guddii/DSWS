data "vercel_project_directory" "instance_vehicle-registration-office" {
  path = "../.."
}

resource "vercel_project" "instance_vehicle-registration-office" {
  name           = var.instance_vehicle-registration-office
  framework      = "nextjs"
  root_directory = "apps/vehicle-registration-office"
}

resource "vercel_project_environment_variable" "web-id_instance_vehicle-registration-office" {
  project_id = vercel_project.instance_vehicle-registration-office.id
  key        = "NEXT_PUBLIC_VEHICLE_REGISTRATION_OFFICE_WEB_ID"
  value      = var.NEXT_PUBLIC_VEHICLE_REGISTRATION_OFFICE_WEB_ID
  target     = ["production", "preview", "development"]
}

resource "vercel_project_environment_variable" "client-id_instance_vehicle-registration-office" {
  project_id = vercel_project.instance_vehicle-registration-office.id
  key        = "VEHICLE_REGISTRATION_OFFICE_CLIENT_ID"
  value      = var.VEHICLE_REGISTRATION_OFFICE_CLIENT_ID
  target     = ["production", "preview", "development"]
}

resource "vercel_project_environment_variable" "client-secret_instance_vehicle-registration-office" {
  project_id = vercel_project.instance_vehicle-registration-office.id
  key        = "VEHICLE_REGISTRATION_OFFICE_CLIENT_SECRET"
  value      = var.VEHICLE_REGISTRATION_OFFICE_CLIENT_SECRET
  target     = ["production", "preview", "development"]
}