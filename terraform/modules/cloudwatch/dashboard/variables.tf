variable "name" {
  description = "project name"
}

variable "region" {
  description = "short description of the dashboard name"
  default     = "ap-northeast-1"
}

variable "aws_alb_target_group_blue_arn_suffix" {
  description = "target group arn of web https"
}

variable "aws_alb_target_group_green_arn_suffix" {
  description = "target group arn of web https"
}

variable "aws_alb_arn_suffix" {
  description = "load balancer arn suffix"
}

variable "ecs_max_mem_web_service_warning" {
  default = 80
}

variable "ecs_max_cpu_web_service_warning" {
  default = 80
}
