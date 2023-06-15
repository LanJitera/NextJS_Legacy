variable "aws_lb_web_arn_suffix" {
  description = "Suffix of Web ELB"
}
variable "aws_lb_target_group_blue_arn_suffix" {
  description = "Suffix of Target Group pointing to Web"
}

variable "name" {
  description = "Name of entity"
}

variable "action" {
  description = "Action to be performed"
}

variable "waf_web_acl" {
  description = "Waf web acl"
  default     = ""
}
