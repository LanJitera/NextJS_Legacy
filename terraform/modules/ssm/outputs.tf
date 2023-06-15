output "git_token_arn" {
  description = "ARN of the git token"
  value       = aws_ssm_parameter.git_token.arn
}

output "next_public_basic_auth_required_arn" {
  description = "ARN of the next_public_basic_auth_required_arn"
  value       = aws_ssm_parameter.next_public_basic_auth_required.arn
}

output "basic_auth_username_arn" {
  description = "ARN of the basic_auth_username_arn"
  value       = aws_ssm_parameter.basic_auth_username.arn
}

output "basic_auth_password_arn" {
  description = "ARN of the basic_auth_password_arn"
  value       = aws_ssm_parameter.basic_auth_password.arn
}

output "rollbar_token_arn" {
  description = "ARN of the Rollbar Token"
  value       = aws_ssm_parameter.rollbar_token.arn
}

output "secret_cookie_password_arn" {
  description = "ARN of the Secret Cookie Password"
  value       = aws_ssm_parameter.secret_cookie_password.arn
}
