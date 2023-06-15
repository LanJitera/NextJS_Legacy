resource "aws_cloudwatch_dashboard" "cloudwatch_dashboard" {
  dashboard_name = var.name

  dashboard_body = <<EOF
{
   "widgets":[
      {
        "type":"metric",
        "width":12,
        "height":4,
        "properties":{
          "view":"singleValue",
          "metrics":[
            [
              "ECS/ContainerInsights",
              "DesiredTaskCount",
              "ServiceName",
              "frontend",
              "ClusterName",
              "${var.name}",
              {
               "color":"#2ca02c",
               "period":60
              }
           ],
           [
              ".",
              "RunningTaskCount",
              ".",
              ".",
              ".",
              ".",
              {
                 "color":"#d62728",
                 "period":60
              }
           ]
          ],
          "region":"${var.region}",
          "period":300,
          "stacked":false,
          "title":"ECS frontend service status",
          "yAxis": {
            "left": {
              "min": 0,
              "showUnits": true
            }
          }
        }
      },
      {
         "type":"metric",
         "width":12,
         "height":4,
         "properties":{
            "view":"singleValue",
            "metrics":[
               [
                  "AWS/ApplicationELB",
                  "HealthyHostCount",
                  "TargetGroup",
                  "${var.aws_alb_target_group_blue_arn_suffix}",
                  "LoadBalancer",
                  "${var.aws_alb_arn_suffix}",
                  { "color": "#1f77b4", "label": "Blue" }
               ],
               [
                  ".",
                  ".",
                  ".",
                  "${var.aws_alb_target_group_green_arn_suffix}",
                  ".",
                  ".",
                  { "label": "Green", "color": "#2ca02c" }
               ]
            ],
            "region":"${var.region}",
            "period":60,
            "stacked":false,
            "title": "Healthy hosts count",
            "yAxis": {
              "left": {
                "min": 0,
                "showUnits": true
              }
            }
         }
      },
      {
         "type":"metric",
         "width":12,
         "height":4,
         "properties":{
            "view":"singleValue",
            "metrics":[
               [
                  "AWS/ApplicationELB",
                  "UnHealthyHostCount",
                  "TargetGroup",
                  "${var.aws_alb_target_group_blue_arn_suffix}",
                  "LoadBalancer",
                  "${var.aws_alb_arn_suffix}",
                  { "color": "#1f77b4", "label": "Blue" }
               ],
               [
                  "...",
                  "${var.aws_alb_target_group_green_arn_suffix}",
                  ".",
                  ".",
                  { "label": "Green", "color": "#2ca02c" }
               ]
            ],
            "region":"${var.region}",
            "period":60,
            "stacked":false,
            "title":"UnHealthy hosts count",
            "yAxis": {
              "left": {
                "min": 0,
                "showUnits": true
              }
            }
         }
      },
      {
         "type":"metric",
         "width":12,
         "height":6,
         "properties":{
            "view":"timeSeries",
            "stacked":false,
            "metrics":[
               [ "AWS/ECS", "MemoryUtilization", "ServiceName", "frontend", "ClusterName", "${var.name}", { "label": "Minimum", "stat": "Minimum", "color": "#2ca02c" } ],
               [ "...", { "stat": "Average", "label": "Average" } ],
               [ "...", { "color": "#1f77b4", "stat": "Maximum", "label": "Maximum" } ]
            ],
            "region":"${var.region}",
            "period":300,
            "title":"ECS memory utilization frontend service",
            "annotations": {
              "horizontal": [
                {
                  "label": "Max",
                  "value": ${var.ecs_max_mem_web_service_warning}
                }
              ]
            },
            "yAxis": {
              "left": {
                "min": 0,
                "showUnits": true
              }
            }
         }
      },
      {
         "type":"metric",
         "width":12,
         "height":6,
         "properties":{
            "view":"timeSeries",
            "stacked":false,
            "metrics":[
               [ "AWS/ECS", "CPUUtilization", "ServiceName", "frontend", "ClusterName", "${var.name}", { "label": "Maximum", "stat": "Maximum" } ],
               [ "...", { "stat": "Average", "label": "Average" } ],
               [ "...", { "stat": "Minimum", "label": "Minimum" } ]
            ],
            "region":"${var.region}",
            "period":300,
            "title":"ECS CPU utilization frontend service",
            "annotations": {
              "horizontal": [
                {
                  "label": "Max",
                  "value": ${var.ecs_max_cpu_web_service_warning}
                }
              ]
            },
            "yAxis": {
              "left": {
                "min": 0,
                "showUnits": true
              }
            }
         }
      },
      {
         "type":"metric",
         "width":12,
         "height":6,
         "properties":{
            "view":"timeSeries",
            "stacked":false,
            "metrics":[
              [ "AWS/ApplicationELB", "RequestCount", "LoadBalancer", "${var.aws_alb_arn_suffix}", "AvailabilityZone", "ap-northeast-1c" ],
              [ "...", "ap-northeast-1a" ]
            ],
            "region":"${var.region}",
            "title":"ELB request count per second, by AZ",
            "period":300,
            "stat": "Sum",
            "yAxis": {
              "left": {
                "min": 0,
                "showUnits": true
              }
            }
         }
      },
      {
         "type":"metric",
         "width":12,
         "height":6,
         "properties":{
            "view":"timeSeries",
            "stacked":false,
            "metrics":[
               [ "AWS/ApplicationELB", "HTTPCode_ELB_5XX_Count", "LoadBalancer", "${var.aws_alb_arn_suffix}", { "id": "m1", "label": "HTTPCode_ELB_5XX_Count" } ],
               [ ".", "HTTPCode_ELB_4XX_Count", ".", ".", { "id": "m2", "label": "HTTPCode_ELB_4XX_Count" } ],
               [ ".", "HTTPCode_ELB_3XX_Count", ".", ".", { "id": "m3", "label": "HTTPCode_ELB_3XX_Count" } ]
            ],
            "region":"${var.region}",
            "title":"ELB errors",
            "period":300,
            "stat": "Sum",
            "yAxis": {
              "left": {
                "min": 0,
                "showUnits": true
              }
            }
         }
      },
      {
         "type":"metric",
         "width":12,
         "height":6,
         "properties":{
            "view":"timeSeries",
            "stacked":false,
            "metrics":[
               [ "AWS/ApplicationELB", "HTTPCode_Target_2XX_Count", "LoadBalancer", "${var.aws_alb_arn_suffix}", { "id": "m4", "label": "HTTPCode_Target_2XX_Count" } ],
               [ ".", "HTTPCode_Target_3XX_Count", ".", ".", { "id": "m5", "label": "HTTPCode_Target_3XX_Count" } ],
               [ ".", "HTTPCode_Target_4XX_Count", ".", ".", { "id": "m7", "label": "HTTPCode_Target_4XX_Count" } ],
               [ ".", "HTTPCode_Target_5XX_Count", ".", ".", { "id": "m6", "label": "HTTPCode_Target_5XX_Count" } ]
            ],
            "region":"${var.region}",
            "title":"HTTPCode backend responses",
            "period":300,
            "stat": "Sum",
            "yAxis": {
              "left": {
                "min": 0,
                "showUnits": true
              }
            }
         }
      },
      {
         "type":"metric",
         "width":12,
         "height":6,
         "properties":{
            "view":"timeSeries",
            "stacked":false,
            "metrics":[
               [
                  "AWS/ApplicationELB",
                  "TargetResponseTime",
                  "LoadBalancer",
                  "${var.aws_alb_arn_suffix}",
                  {
                     "period":60,
                     "stat":"p50"
                  }
               ],
               [
                  "...",
                  {
                     "period":60,
                     "stat":"p90",
                     "color":"#c5b0d5"
                  }
               ],
               [
                  "...",
                  {
                     "period":60,
                     "stat":"p99",
                     "color":"#dbdb8d"
                  }
               ]
            ],
            "region":"${var.region}",
            "period":300,
            "title":"Latency response time",
            "yAxis": {
              "left": {
                "min": 0,
                "showUnits": true
              }
            }
         }
      }
  ]
}
EOF
}