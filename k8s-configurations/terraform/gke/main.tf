provider "google" {
  credentials = "${file("${var.credential_file}")}"
  project     = "${var.google_project_id}"
  region      = "${var.region}"
  zone        = "${var.zone}"
}
