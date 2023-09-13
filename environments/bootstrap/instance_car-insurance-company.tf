data "vercel_project_directory" "instance_car-insurance-company" {
  path = "../.."
}

resource "vercel_project" "instance_car-insurance-company" {
  name           = var.instance_car-insurance-company
  framework      = "nextjs"
  root_directory = "apps/car-insurance-company"
}

resource "vercel_project_environment_variable" "web-id_instance_car-insurance-company" {
  project_id = vercel_project.instance_car-insurance-company.id
  key        = "NEXT_PUBLIC_CAR_INSURANCE_COMPANY_WEB_ID"
  value      = var.NEXT_PUBLIC_CAR_INSURANCE_COMPANY_WEB_ID
  target     = ["production", "preview", "development"]
}

resource "vercel_project_environment_variable" "client-id_instance_car-insurance-company" {
  project_id = vercel_project.instance_car-insurance-company.id
  key        = "CAR_INSURANCE_COMPANY_CLIENT_ID"
  value      = var.CAR_INSURANCE_COMPANY_CLIENT_ID
  target     = ["production", "preview", "development"]
}

resource "vercel_project_environment_variable" "client-secret_instance_car-insurance-company" {
  project_id = vercel_project.instance_car-insurance-company.id
  key        = "CAR_INSURANCE_COMPANY_CLIENT_SECRET"
  value      = var.CAR_INSURANCE_COMPANY_CLIENT_SECRET
  target     = ["production", "preview", "development"]
}