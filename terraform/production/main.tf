provider "aws" {
  shared_credentials_file = "./.aws"
  region                  = "ap-northeast-1"
}
terraform {
  backend "s3" {
    bucket                  = ""
    key                     = "party-booking-app-production/terraform.tfstate"
    region                  = "ap-northeast-1"
    shared_credentials_file = "./.aws"
  }
}

locals {
  # underscore is prefereble according to official terraform bestpractice, but alb only accepts hyphen based name.
  # Moreover, terraform AWS provider v3.12.0 (via Terraform 0.14) has issue #7987 related to "Provider produced inconsistent final plan".
  # It means that S3 bucket has to be created before referencing it as an argument inside access_logs = { bucket = "bucket-name" }, so this won't work: access_logs = { bucket = module.s3.s3_bucket_id }.
  hyphen_name               = replace("${var.name}", "_", "-")
}

module "route53" {
  source                    = "../modules/route53"
  zone_id                   = var.zone_id
  domain                    = var.domain
  alb_dns_name              = module.alb.dns_name
  alb_zone_id               = module.alb.zone_id
}
#Use this config if the VPC is already created buy RoR script, and want to re-use the exits VPC
/*
data "aws_vpc" "selected" {
  id = var.vpc_id
}
*/

module "vpc" {
  source              = "../modules/vpc"
  name                = local.hyphen_name
  cidr                = var.cidr
  azs                 = var.azs
  public_subnets      = var.public_subnets
  database_subnets    = var.database_subnets
  elasticache_subnets = var.elasticache_subnets
  aws_s3_bucket_arn   = module.s3.vpc_flow_log_arn
}


module "security_group" {
  source   = "../modules/security_group"
  name     = var.name
  vpc_id   = module.vpc.vpc_id
  vpc_cidr = var.cidr
}

module "s3" {
  source                    = "../modules/s3"
  name                      = local.hyphen_name
  aws_account_id            = var.aws_account_id
}

module "alb" {
  source               = "../modules/alb"
  name                 = local.hyphen_name
  vpc_id               = module.vpc.vpc_id
  security_groups      = [module.security_group.alb_sg_id]
  subnets              = module.vpc.public_subnets
  access_log_bucket_id = module.s3.access_log_bucket_name
  lb_healthcheck_path  = var.lb_healthcheck_path
  ssl_cert_arn         = module.route53.certificate_arn
  domain               = var.domain
}

module "waf" {
  source                       = "../modules/waf"
  name                         = var.name
  alb_arn                      = module.alb.web_arn
  aws_cloudwatch_log_group_arn = module.cloudwatch.log_group_waf_arn
  country_code                 = var.country_code
  s3_bucket                    = module.s3.waf_bucket_arn
}


module "ecs" {
  source                             = "../modules/ecs"
  name                               = var.name
  cloudwatch_log_group_name          = module.cloudwatch.log_group_ecs_name
  image_url                          = module.ecr.web_repository_url
  lb_blue_arn                        = module.alb.target_group_blue_arn
  subnets                            = module.vpc.public_subnets
  security_groups                    = [module.security_group.app_sg_id]
  iam_arn                            = module.iam.ecs_tasks_arn
  env                                = var.env
  git_token_arn                      = module.ssm.git_token_arn
  next_public_basic_auth_required_arn = module.ssm.next_public_basic_auth_required_arn
  basic_auth_username_arn             = module.ssm.basic_auth_username_arn
  basic_auth_password_arn             = module.ssm.basic_auth_password_arn
  rollbar_token_arn                   = module.ssm.rollbar_token_arn
  secret_cookie_password_arn          = module.ssm.secret_cookie_password_arn
  ecs_exec_kms_arn                   = module.kms.ecs_exec_kms_arn
  ecs_exec_s3_bucket_name            = module.s3.ecs_exec_bucket_name
  cloudwatch_log_group_ecs_exec_name = module.cloudwatch.log_group_ecs_exec_name
  cloudwatch_log_group_ecs_name      = module.cloudwatch.log_group_ecs_name
}

module "autoscaling_web" {
  source           = "../modules/autoscaling"
  name             = "${var.name}"
  resource_id      = "service/${var.name}/${var.name}"
  ecs_service_name = "${var.name}"
  cluster_name     = var.name
  action           = module.notify_slack.this_slack_topic_arn

}
#It could be skip if it's already deployed buy RoR script
module "notify_slack" {
  source            = "terraform-aws-modules/notify-slack/aws"
  version           = "~> 5.4"
  sns_topic_name    = "${var.name}_cloudwatch_metrics"
  slack_webhook_url = var.notify_slack_webhook_url
  slack_channel     = var.notify_slack_channel
  slack_username    = "AWS"
  lambda_function_name = var.name
}

module "metric_alarms" {
  source                              = "../modules/cloudwatch/metric_alarms"
  aws_lb_target_group_blue_arn_suffix = module.alb.target_group_blue_arn_suffix
  aws_lb_web_arn_suffix               = module.alb.web_arn_suffix
  name                                = var.name
  action                              = module.notify_slack.this_slack_topic_arn
  waf_web_acl                         = module.waf.web_acl_name
}


module "ssm" {
  source                  = "../modules/ssm"
  name                    = var.name
  web_container_name      = var.name
  docker_username         = var.docker_username
  docker_password         = var.docker_password
  subnet                  = module.vpc.public_subnets[0]
  security_group          = module.security_group.app_sg_id
  git_token               = var.github_token
  next_public_basic_auth_required = var.next_public_basic_auth_required
  basic_auth_username             = var.basic_auth_username
  basic_auth_password             = var.basic_auth_password
  rollbar_token                   = var.rollbar_token
  secret_cookie_password          = var.secret_cookie_password
}

module "cloudwatch" {
  source = "../modules/cloudwatch/log_group"
  name   = var.name
}

module "ecr" {
  source   = "../modules/ecr"
  name     = var.name
}

module "iam" {
  source                  = "../modules/iam"
  name                    = var.name
  codepipeline_bucket_arn = module.s3.pipeline_artifact_bucket_arn
  cloudwatch_arn          = module.cloudwatch.log_group_codebuild_arn
  ecr_arn                 = module.ecr.web_arn
  ecs_exec_bucket_name    = module.s3.ecs_exec_bucket_name
  ecs_exec_kms_key_arn    = module.kms.ecs_exec_kms_arn
}

module "codepipeline" {
  source             = "../modules/codepipeline"
  name               = var.name
  env                = var.env
  iam_arn            = module.iam.codepipeline_arn
  s3_id              = module.s3.pipeline_artifact_bucket_id
  github_account     = var.github_account
  github_repository  = var.github_repository
  github_branch      = var.github_branch
  github_token       = var.github_token
  codedeploy_name    = module.codedeploy.web_name
  codebuild_name     = module.codebuild.web_name
}

module "codebuild" {
  source                    = "../modules/codebuild"
  name                      = var.name
  env                       = var.env
  vpc_id                    = module.vpc.vpc_id
  security_groups           = [module.security_group.codebuild_sg_id]
  iam_arn                   = module.iam.codebuild_arn
  cloudwatch_log_group_name = module.cloudwatch.log_group_codebuild_name
}

module "codedeploy" {
  source                = "../modules/codedeploy"
  name                  = var.name
  iam_arn               = module.iam.codedeploy_arn
  ecs_web_service_name  = module.ecs.web_service_name
  alb_listner_arns      = module.alb.lb_listener_arns
  alb_target_blue_name  = module.alb.target_group_blue_name
  alb_target_green_name = module.alb.target_group_green_name
}


module "codepipeline_notification" {
  source = "../modules/sns"
  name = local.hyphen_name
  slack_channel_id = var.slack_channel_id
  slack_workspace_id = var.slack_workspace_id
  aws_codepipeline_arn = module.codepipeline.codepipeline_web_arn
#Due to can not create to SNS topic for 1 slack channle, then use this config incase want to re-use the exist SNS tocpic  
  # sns_target_arn      =  var.sns_target_arn #It could re-use from RoR script
}

module "kms" {
  source = "../modules/kms"
}

module "dashboard" {
  source                                = "../modules/cloudwatch/dashboard"
  name                                  = var.name
  aws_alb_target_group_blue_arn_suffix  = module.alb.target_group_blue_arn_suffix
  aws_alb_target_group_green_arn_suffix = module.alb.target_group_green_arn_suffix
  aws_alb_arn_suffix                    = module.alb.web_arn_suffix
}

module "cloudwatch-logs-exporter" {
  source    = "../modules/cloudwatch/exporter"
  name      = "${var.name}_cloudwatch_logs"
  log_group = module.cloudwatch.log_group_ecs_name
  s3_bucket = module.s3.cloudwatch_log_groups_id
  schedule  = "cron(0 19 ? * 3 *)"
}

module "codebuild-log" {
  source    = "../modules/cloudwatch/exporter"
  name      = "${var.name}_codebuild_log"
  log_group = module.cloudwatch.log_group_codebuild_name
  s3_bucket = module.s3.codebuild_bucket_name_id
  schedule  = "cron(0 10 * * ? *)"
}

module "athena" {
  source                    = "../modules/athena"
  name                      = var.name
  athena_output_bucket_name = module.s3.athena_output_bucket_id
  athena_output_bucket_id   = module.s3.athena_output_bucket_id
  cloudtrail_bucket_name    = module.s3.cloudtrail_bucket_id
  access_log_bucket_name    = module.s3.access_log_bucket_name
  aws_account_id            = var.aws_account_id
}

module "cloudtrail" {
  source               = "../modules/cloudtrail"
  name                 = var.name
  cloudtrail_bucket_id = module.s3.cloudtrail_bucket_id
}


