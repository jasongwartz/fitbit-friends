# Users

resource "aws_iam_user" "github_actions_ci" {
  name = "github_actions_ci"
  path = "/system/"
}

resource "aws_iam_user" "zeit_preview" {
  name = "zeit_preview"
  path = "/system/"
}

resource "aws_iam_user" "zeit_production" {
  name = "zeit_production"
  path = "/system/"
}


# Imported Policies

data "aws_iam_policy" "dynamodb_full_access" {
  arn = "arn:aws:iam::aws:policy/AmazonDynamoDBFullAccess"
}

data "aws_iam_policy" "s3_full_access" {
  arn = "arn:aws:iam::aws:policy/AmazonS3FullAccess"
}

data "aws_iam_policy" "iam_read_only" {
  arn = "arn:aws:iam::aws:policy/IAMReadOnlyAccess"
}


# Policy Attachments

resource "aws_iam_user_policy_attachment" "github_ci_dynamodb" {
  user       = aws_iam_user.github_actions_ci.name
  policy_arn = data.aws_iam_policy.dynamodb_full_access.arn
}

resource "aws_iam_user_policy_attachment" "github_ci_s3" {
  user       = aws_iam_user.github_actions_ci.name
  policy_arn = data.aws_iam_policy.s3_full_access.arn
}

resource "aws_iam_user_policy_attachment" "github_ci_iam" {
  user       = aws_iam_user.github_actions_ci.name
  policy_arn = data.aws_iam_policy.iam_read_only.arn
}

resource "aws_iam_user_policy_attachment" "zeit_prod_dynamodb" {
  user       = aws_iam_user.zeit_production.name
  policy_arn = data.aws_iam_policy.dynamodb_full_access.arn
}

resource "aws_iam_user_policy_attachment" "zeit_preview_dynamodb" {
  user       = aws_iam_user.zeit_preview.name
  policy_arn = data.aws_iam_policy.dynamodb_full_access.arn
}
