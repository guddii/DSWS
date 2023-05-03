# Set the variable value in *.tfvars file
# or using the -var="vercel_api_token=..." CLI option
variable "vercel_api_token" {
  sensitive = true
}

variable "instance_citizen" {
  default = "solid-showcase-citizen"
}


variable "instance_government" {
  default = "solid-showcase-government"
}