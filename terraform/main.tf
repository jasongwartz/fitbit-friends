provider "aws" {
  region = "eu-west-1"
}

terraform {
  backend "s3" {
    bucket  = "gwartz-fitbit-tf"
    key     = "tf.state"
    region  = "eu-west-1"
    encrypt = true
  }
}

