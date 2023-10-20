# Set the variable value in *.tfvars file
# or using the -var="vercel_api_token=..." CLI option
variable "vercel_api_token" {
  sensitive = true
}

# Vercel Variables
variable "instance_car-insurance-company" {
  default = "showcase-solid-car-insurance-company"
}
variable "instance_citizen" {
  default = "showcase-solid-citizen"
}
variable "instance_construction-office" {
  default = "showcase-solid-construction-office"
}
variable "instance_customs" {
  default = "showcase-solid-customs"
}
variable "instance_employment-agency" {
  default = "showcase-solid-employment-agency"
}
variable "instance_environmental-office" {
  default = "showcase-solid-environmental-office"
}
variable "instance_land-registry-office" {
  default = "showcase-solid-land-registry-office"
}
variable "instance_parental-benefits-office" {
  default = "showcase-solid-parental-benefits-office"
}
variable "instance_reconstruction-loan-corporation" {
  default = "showcase-solid-reconstruction-loan-corporation"
}
variable "instance_registration-office" {
  default = "showcase-solid-registration-office"
}
variable "instance_tax-office" {
  default = "showcase-solid-tax-office"
}
variable "instance_trade-office" {
  default = "showcase-solid-trade-office"
}
variable "instance_vehicle-registration-office" {
  default = "showcase-solid-vehicle-registration-office"
}
