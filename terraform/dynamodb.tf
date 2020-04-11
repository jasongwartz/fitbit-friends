locals {
  environments = toset([
    "prod",
    "preview",
  ])
}

resource "aws_dynamodb_table" "users_table" {
  for_each = local.environments

  name           = "${each.value}_users"
  read_capacity  = 10
  write_capacity = 5
  hash_key       = "user_id"

  attribute {
    name = "user_id"
    type = "S"
  }
}

resource "aws_dynamodb_table" "friends_table" {
  for_each = local.environments

  name           = "${each.value}_friends"
  read_capacity  = 10
  write_capacity = 5
  hash_key       = "user_id"
  range_key      = "friend_user_id"

  attribute {
    name = "user_id"
    type = "S"
  }

  attribute {
    name = "friend_user_id"
    type = "S"
  }
}
