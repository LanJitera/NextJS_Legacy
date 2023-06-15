
resource "aws_ecs_cluster" "this" {
  name               = var.name
  capacity_providers = ["FARGATE", "FARGATE_SPOT"]
  default_capacity_provider_strategy {
    capacity_provider = "FARGATE"
    weight            = 1
    base              = 1
  }
    configuration {
    execute_command_configuration {
      kms_key_id = var.ecs_exec_kms_arn
      logging    = "OVERRIDE"

      log_configuration {
        cloud_watch_log_group_name = var.cloudwatch_log_group_ecs_exec_name
        s3_bucket_name             = var.ecs_exec_s3_bucket_name
        s3_key_prefix              = "exec-output"
      }
    }
  }
  setting {
    name  = "containerInsights"
    value = var.env == "production" ? "enabled" : "disabled"
  }
  tags = {
    Terraform = "true"
  }
}

resource "aws_ecs_task_definition" "web" {
  task_role_arn            = var.iam_arn
  family                   = "nextjs"
  network_mode             = "awsvpc"
  execution_role_arn       = var.iam_arn
  requires_compatibilities = ["FARGATE"]
  cpu                      = 1024
  memory                   = 2048

  container_definitions = <<EOF
[
  {
    "name": "nextjs",
    "image": "${var.image_url}:latest",
    "essential": true,
    "command": ["yarn", "start", "-p", "80"],
    "portMappings": [
      {
        "protocol": "tcp",
        "containerPort": 80,
        "hostPort": 80
      }
    ],
    "environment": ${jsonencode(local.environment)},
    "secrets": ${jsonencode(local.secrets)},
    "logConfiguration": {
      "logDriver": "awslogs",
      "options": {
        "awslogs-region": "ap-northeast-1",
        "awslogs-group": "${var.cloudwatch_log_group_ecs_name}",
        "awslogs-stream-prefix": "${var.name}_fe"
      }
    }
  }
]
EOF
}

resource "aws_ecs_service" "web" {
  name                               = "${var.name}"
  task_definition                    = aws_ecs_task_definition.web.arn
  cluster                            = aws_ecs_cluster.this.id
  desired_count                      = 1
  health_check_grace_period_seconds  = 120
  enable_ecs_managed_tags            = true
  enable_execute_command             = true
  deployment_minimum_healthy_percent = 100
  deployment_maximum_percent         = 200
  scheduling_strategy                = "REPLICA"

  network_configuration {
    subnets          = var.subnets
    security_groups  = var.security_groups
    assign_public_ip = true
  }

  deployment_controller {
    type = "CODE_DEPLOY"
  }

  capacity_provider_strategy {
    capacity_provider = "FARGATE"
    weight            = 1
    base              = 1
  }

  capacity_provider_strategy {
    capacity_provider = "FARGATE_SPOT"
    weight            = 1
    base              = 0
  }

  load_balancer {
    target_group_arn = var.lb_blue_arn
    container_name   = "nextjs"
    container_port   = 80
  }

  lifecycle {
    ignore_changes = [
      desired_count,
      task_definition,
      load_balancer,
      capacity_provider_strategy
    ]
  }
}
