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

# Runtime Variables
variable "NEXT_PUBLIC_TRADE_OFFICE_WEB_ID" {
  sensitive = true
}

variable "TRADE_OFFICE_CLIENT_ID" {
  sensitive = true
}

variable "TRADE_OFFICE_CLIENT_SECRET" {
  sensitive = true
}

variable "NEXT_PUBLIC_REGISTRATION_OFFICE_WEB_ID" {
  sensitive = true
}

variable "REGISTRATION_OFFICE_CLIENT_ID" {
  sensitive = true
}

variable "REGISTRATION_OFFICE_CLIENT_SECRET" {
  sensitive = true
}

variable "NEXT_PUBLIC_TAX_OFFICE_WEB_ID" {
  sensitive = true
}

variable "TAX_OFFICE_CLIENT_ID" {
  sensitive = true
}

variable "TAX_OFFICE_CLIENT_SECRET" {
  sensitive = true
}

variable "NEXT_PUBLIC_VEHICLE_REGISTRATION_OFFICE_WEB_ID" {
  sensitive = true
}

variable "VEHICLE_REGISTRATION_OFFICE_CLIENT_ID" {
  sensitive = true
}

variable "VEHICLE_REGISTRATION_OFFICE_CLIENT_SECRET" {
  sensitive = true
}

variable "NEXT_PUBLIC_CUSTOMS_WEB_ID" {
  sensitive = true
}

variable "CUSTOMS_CLIENT_ID" {
  sensitive = true
}

variable "CUSTOMS_CLIENT_SECRET" {
  sensitive = true
}

variable "NEXT_PUBLIC_LAND_REGISTRY_OFFICE_WEB_ID" {
  sensitive = true
}

variable "LAND_REGISTRY_OFFICE_CLIENT_ID" {
  sensitive = true
}

variable "LAND_REGISTRY_OFFICE_CLIENT_SECRET" {
  sensitive = true
}

variable "NEXT_PUBLIC_CONSTRUCTION_OFFICE_WEB_ID" {
  sensitive = true
}

variable "CONSTRUCTION_OFFICE_CLIENT_ID" {
  sensitive = true
}

variable "CONSTRUCTION_OFFICE_CLIENT_SECRET" {
  sensitive = true
}

variable "NEXT_PUBLIC_EMPLOYMENT_AGENCY_WEB_ID" {
  sensitive = true
}

variable "EMPLOYMENT_AGENCY_CLIENT_ID" {
  sensitive = true
}

variable "EMPLOYMENT_AGENCY_CLIENT_SECRET" {
  sensitive = true
}

variable "NEXT_PUBLIC_ENVIRONMENTAL_OFFICE_WEB_ID" {
  sensitive = true
}

variable "ENVIRONMENTAL_OFFICE_CLIENT_ID" {
  sensitive = true
}

variable "ENVIRONMENTAL_OFFICE_CLIENT_SECRET" {
  sensitive = true
}

variable "NEXT_PUBLIC_CAR_INSURANCE_COMPANY_WEB_ID" {
  sensitive = true
}

variable "CAR_INSURANCE_COMPANY_CLIENT_ID" {
  sensitive = true
}

variable "CAR_INSURANCE_COMPANY_CLIENT_SECRET" {
  sensitive = true
}

variable "NEXT_PUBLIC_RECONSTRUCTION_LOAN_CORPORATION_WEB_ID" {
  sensitive = true
}

variable "RECONSTRUCTION_LOAN_CORPORATION_CLIENT_ID" {
  sensitive = true
}

variable "RECONSTRUCTION_LOAN_CORPORATION_CLIENT_SECRET" {
  sensitive = true
}

variable "NEXT_PUBLIC_PARENTAL_BENEFITS_OFFICE_WEB_ID" {
  sensitive = true
}

variable "PARENTAL_BENEFITS_OFFICE_CLIENT_ID" {
  sensitive = true
}

variable "PARENTAL_BENEFITS_OFFICE_CLIENT_SECRET" {
  sensitive = true
}
