resource "aws_iam_user" "github_actions_ci" {
  name = "github_actions_ci"
  path = "/system/"
}

data "aws_iam_policy" "dynamodb_full_access" {
  arn = "arn:aws:iam::aws:policy/AmazonDynamoDBFullAccess"
}


resource "aws_iam_user_policy_attachment" "github_ci_dynamodb" {
  user       = aws_iam_user.github_actions_ci.name
  policy_arn = data.aws_iam_policy.dynamodb_full_access.arn
}

