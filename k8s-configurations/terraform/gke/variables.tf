variable "credential_file" {
  type    = "string"
  default = "../account.json"
}

variable "google_project_id" {
  type = "string"
}

variable "region" {
  type    = "string"
  default = "europe-west1"
}

variable "zone" {
  type    = "string"
  default = "europe-west1"
}

variable "environment" {
  type    = "string"
  default = "production"
}
