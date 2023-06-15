locals {
  secrets = [
      {
        "name": "NEXT_PUBLIC_CLIENT_ROLLBAR_TOKEN",
        "valueFrom": "${var.rollbar_token_arn}"
      },
      {
        "name": "BASIC_AUTH_USER",
        "valueFrom": "${var.basic_auth_username_arn}"
      },
      {
        "name": "BASIC_AUTH_PASSWORD",
        "valueFrom": "${var.basic_auth_password_arn}"
      },
      {
        "name":  "SECRET_COOKIE_PASSWORD",
        "valueFrom": "${var.secret_cookie_password_arn}"

      }
  ]
  environment     = [
      { "name": "NEXT_PUBLIC_APP_ENV", "value": "development" },
      { "name": "NEXT_PUBLIC_SITE_URL", "value": "http://localhost:3000" },
      { "name": "NEXT_PUBLIC_GRAPHQL_ENDPOINT", "value" : "" }
]
}