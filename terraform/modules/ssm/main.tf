resource "aws_ssm_parameter" "ecr_image_name" {
  name  = "/${var.name}/ecr_image_name"
  type  = "SecureString"
  value = var.web_container_name
}

resource "aws_ssm_parameter" "docker_username" {
  name  = "/${var.name}/docker_username"
  type  = "SecureString"
  value = var.docker_username
}

resource "aws_ssm_parameter" "docker_password" {
  name  = "/${var.name}/docker_password"
  type  = "SecureString"
  value = var.docker_password
}
resource "aws_ssm_parameter" "subnet" {
  name  = "/${var.name}/subnet"
  type  = "SecureString"
  value = var.subnet
}
resource "aws_ssm_parameter" "security_group" {
  name  = "/${var.name}/security_group"
  type  = "SecureString"
  value = var.security_group
}

resource "aws_ssm_parameter" "git_token" {
  name  = "/${var.name}/git_token"
  type  = "SecureString"
  value = var.git_token
}

resource "aws_ssm_parameter" "next_public_basic_auth_required" {
  name  = "/${var.name}/next_public_basic_auth_required"
  type  = "SecureString"
  value = var.next_public_basic_auth_required
}

resource "aws_ssm_parameter" "basic_auth_username" {
  name  = "/${var.name}/basic_auth_username"
  type  = "SecureString"
  value = var.basic_auth_username
}

resource "aws_ssm_parameter" "basic_auth_password" {
  name  = "/${var.name}/basic_auth_password"
  type  = "SecureString"
  value = var.basic_auth_password
}

resource "aws_ssm_parameter" "rollbar_token" {
  name  = "/${var.name}/rollbar_token"
  type  = "SecureString"
  value = var.rollbar_token
}

resource "aws_ssm_parameter" "secret_cookie_password" {
  name  = "/${var.name}/secret_cookie_password"
  type  = "SecureString"
  value = var.secret_cookie_password
}