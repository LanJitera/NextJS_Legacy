
variable "name" {
  description = "Name to be used on all the resources as identifier"
  default     = ""
}

variable "web_container_name" {
  description = "Name of the docker image"
  default     = ""
}
variable "docker_username" {
  description = "Docker username"
}
variable "docker_password" {
  description = "Docker password"
}
variable "subnet" {
  description = "Subnet for standalone task"
}
variable "security_group" {
  description = "Security Group"
}
variable "git_token" {
  description = "Github Token"
}
variable "next_public_basic_auth_required" {
  description = "Public basic auth required"
}

variable "basic_auth_username" {
  description = "Basic auth username"
}

variable "basic_auth_password" {
  description = "Basic auth password"
}
variable "rollbar_token" {
  description = "Basic auth username"
}

variable "secret_cookie_password" {
  description = "Basic auth password"
}