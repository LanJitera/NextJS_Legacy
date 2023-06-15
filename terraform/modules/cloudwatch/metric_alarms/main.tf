
# alb
resource "aws_cloudwatch_metric_alarm" "elb_loadbalancer" {
  alarm_name                = "${var.name}_load_balancer"
  comparison_operator       = "GreaterThanOrEqualToThreshold"
  evaluation_periods        = "2"
  threshold                 = "10"
  alarm_description         = "Request error rate has exceeded 10%"
  alarm_actions             = [var.action]
  ok_actions                = [var.action]
  insufficient_data_actions = [var.action]
  treat_missing_data        = "notBreaching"

  metric_query {
    id          = "${var.name}_e1"
    expression  = "${var.name}_m2/${var.name}_m1*100"
    label       = "Error Rate"
    return_data = "true"
  }

  metric_query {
    id = "${var.name}_m1"

    metric {
      metric_name = "RequestCount"
      namespace   = "AWS/ApplicationELB"
      period      = "120"
      stat        = "Sum"
      unit        = "Count"

      dimensions = {
        AvailabilityZone = "ap-northeast-1"
        LoadBalancer     = var.aws_lb_web_arn_suffix
        TargetGroup      = var.aws_lb_target_group_blue_arn_suffix
      }
    }
  }

  metric_query {
    id = "${var.name}_m2"

    metric {
      metric_name = "HTTPCode_ELB_5XX_Count"
      namespace   = "AWS/ApplicationELB"
      period      = "120"
      stat        = "Sum"
      unit        = "Count"

      dimensions = {
        AvailabilityZone = "ap-northeast-1"
        LoadBalancer     = var.aws_lb_web_arn_suffix
        TargetGroup      = var.aws_lb_target_group_blue_arn_suffix
      }
    }
  }
}

# end of alb

# WAF
resource "aws_cloudwatch_metric_alarm" "waf_common" {
  alarm_name          = "${var.name}_waf_blocked_request_common"
  alarm_description   = "Request blocked of AWSManagedRulesCommonRuleSet"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = "1"
  metric_name         = "BlockedRequests"
  namespace           = "AWS/WAFV2"
  period              = "300"
  statistic           = "Average"
  threshold           = "10"

  dimensions = {
    WebACL = var.waf_web_acl
    Rule   = "AWSManagedRulesCommonRuleSet"
    Region = "ap-northeast-1"
  }

  alarm_actions = [var.action]
}

resource "aws_cloudwatch_metric_alarm" "waf_SQLi" {
  alarm_name          = "${var.name}_waf_blocked_request_sql"
  alarm_description   = "Request blocked of AWSManagedRulesSQLiRuleSet"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = "1"
  metric_name         = "BlockedRequests"
  namespace           = "AWS/WAFV2"
  period              = "300"
  statistic           = "Average"
  threshold           = "10"

  dimensions = {
    WebACL = var.waf_web_acl
    Rule   = "AWSManagedRulesSQLiRuleSet"
    Region = "ap-northeast-1"
  }

  alarm_actions = [var.action]
}

resource "aws_cloudwatch_metric_alarm" "waf_badInput" {
  alarm_name          = "${var.name}_waf_blocked_request_common_badInput"
  alarm_description   = "Request blocked of AWSManagedRulesKnownBadInputsRuleSet"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = "1"
  metric_name         = "BlockedRequests"
  namespace           = "AWS/WAFV2"
  period              = "300"
  statistic           = "Average"
  threshold           = "10"

  dimensions = {
    WebACL = var.waf_web_acl
    Rule   = "AWSManagedRulesKnownBadInputsRuleSet"
    Region = "ap-northeast-1"
  }

  alarm_actions = [var.action]
}

# end of WAF metrics

# Latency of ALB response time
resource "aws_cloudwatch_metric_alarm" "alb_response_latency" {
  alarm_name                = "${var.name}_alb_response_time_latency"
  comparison_operator       = "GreaterThanOrEqualToThreshold"
  evaluation_periods        = "3"
  metric_name               = "TargetResponseTime"
  namespace                 = "AWS/ApplicationELB"
  period                    = "300"
  extended_statistic        = "p99"
  threshold                 = "20" #second
  alarm_description         = "The Latency of response time is high"
  ok_actions                = [var.action]
  insufficient_data_actions = [var.action]
  alarm_actions             = [var.action]

  dimensions = {
    LoadBalancer = var.aws_lb_web_arn_suffix
  }
}

##ECS anomalous metric for CPU and Memory usage 
resource "aws_cloudwatch_metric_alarm" "ecs_cpu_anomalous" {
  alarm_name                = "${var.name}_ecs_cpu_anomalous"
  comparison_operator       = "GreaterThanUpperThreshold"
  evaluation_periods        = "2"
  threshold_metric_id       = "ecs_e1"
  alarm_description         = "Anomalous ECS CPU usage detected. Something unusual is happening."
  ok_actions                = [var.action]
  alarm_actions             = [var.action]
  treat_missing_data        = "notBreaching"

  metric_query {
    id          = "ecs_e1"
    expression  = "ANOMALY_DETECTION_BAND(ecs_m1,100)"
    label       = "CPUUtilization (Expected)"
    return_data = "true"
  }

  metric_query {
    id          = "ecs_m1"
    return_data = "true"
    metric {
      metric_name = "CPUUtilization"
      namespace   = "AWS/ECS"
      period      = "300"
      stat        = "Average"
      unit        = "Percent"

      dimensions = {
        ClusterName = var.name
        ServiceName = var.name
      }
    }
  }
}

###ECS anomalous metric for Memory usage 
resource "aws_cloudwatch_metric_alarm" "ecs_memory_anomalous" {
  alarm_name                = "${var.name}_ecs_memory_anomalous"
  comparison_operator       = "GreaterThanUpperThreshold"
  evaluation_periods        = "2"
  threshold_metric_id       = "ecs_e2"
  alarm_description         = "Anomalous ECS Memory usage detected. Something unusual is happening."
  ok_actions                = [var.action]
  alarm_actions             = [var.action]
  treat_missing_data        = "notBreaching"

  metric_query {
    id          = "ecs_e2"
    expression  = "ANOMALY_DETECTION_BAND(ecs_m2,100)"
    label       = "MemoryUtilization (Expected)"
    return_data = "true"
  }

  metric_query {
    id          = "ecs_m2"
    return_data = "true"
    metric {
      metric_name = "MemoryUtilization"
      namespace   = "AWS/ECS"
      period      = "300"
      stat        = "Average"
      unit        = "Percent"

      dimensions = {
        ClusterName = var.name
        ServiceName = var.name
      }
    }
  }
}
