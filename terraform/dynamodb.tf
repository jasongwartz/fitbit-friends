resource "aws_dynamodb_table" "users" {
  name           = "users"
  read_capacity  = 10
  write_capacity = 5
  hash_key       = "user_id"

  attribute {
    name = "user_id"
    type = "S"
  }
}

resource "aws_dynamodb_table" "friends" {
  name           = "friends"
  read_capacity  = 10
  write_capacity = 5
  hash_key       = "user_id"
  sort_key       = "friend_user_id"

  attribute {
    name = "user_id"
    type = "S"
  }

  attribute {
    name = "friend_user_id"
    type = "S"
  }
}
