# Set the variable value in *.tfvars file
# or using the -var="vercel_api_token=..." CLI option
variable "vercel_api_token" {
  sensitive = true
}

# Vercel Variables
variable "instance_car-insurance-company" {
  default = "solid-showcase-car-insurance-company"
}
variable "instance_citizen" {
  default = "solid-showcase-citizen"
}
variable "instance_construction-office" {
  default = "solid-showcase-construction-office"
}
variable "instance_customs" {
  default = "solid-showcase-customs"
}
variable "instance_employment-agency" {
  default = "solid-showcase-employment-agency"
}
variable "instance_environmental-office" {
  default = "solid-showcase-environmental-office"
}
variable "instance_land-registry-office" {
  default = "solid-showcase-land-registry-office"
}
variable "instance_parental-benefits-office" {
  default = "solid-showcase-parental-benefits-office"
}
variable "instance_reconstruction-loan-corporation" {
  default = "solid-showcase-reconstruction-loan-corporation"
}
variable "instance_registration-office" {
  default = "solid-showcase-registration-office"
}
variable "instance_tax-office" {
  default = "solid-showcase-tax-office"
}
variable "instance_trade-office" {
  default = "solid-showcase-trade-office"
}
variable "instance_vehicle-registration-office" {
  default = "solid-showcase-vehicle-registration-office"
}