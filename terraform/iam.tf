resource "aws_iam_user" "github_actions_ci" {
  name = "github_actions_ci"
  path = "/system/"
}

data "aws_iam_policy" "dynamodb_full_access" {
  arn = "arn:aws:iam::aws:policy/AmazonDynamoDBFullAccess"
}

data "aws_iam_policy" "s3_full_access" {
  arn = "arn:aws:iam::aws:policy/AmazonS3FullAccess"
}

data "aws_iam_policy" "iam_read_only" {
  arn = "arn:aws:iam::aws:policy/IAMReadOnlyAccess"
}


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
