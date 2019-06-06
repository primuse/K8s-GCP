resource "google_container_cluster" "sendit_cluster" {
  name                    = "sendit-${var.environment}"
  location                = "${var.zone}"
  network                 = "default"
  initial_node_count      = 1
}