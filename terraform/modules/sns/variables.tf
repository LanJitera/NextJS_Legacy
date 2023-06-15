variable "name" {
  description = "Name to be used on all the resources as identifier"
  default     = ""
}

variable "aws_codepipeline_arn" {
  description = "Name to be used on all the resources as identifier"
  default     = ""
}

variable "slack_channel_id" {
  description = "Slack Channel identifier"
  default     = ""
}

variable "slack_workspace_id" {
  description = "Slack Workspace identifier"
  default     = ""
}

#Input it manually if RoR is deployed 
#Only use this one when both FE & BE use the same slack channel
variable "sns_target_arn" {
  description = "Amazon SNS topic"
  default     = ""
}