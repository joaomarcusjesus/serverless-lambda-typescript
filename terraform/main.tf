provider "aws" {
  region = "us-east-1"
}

resource "aws_iam_group" "lambda_dynamodb_group" {
  name = "lambda-group"
}

resource "aws_iam_policy" "lambda_policy" {
  name = "lambda-policy"

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Action   = ["lambda:*"],
        Effect   = "Allow",
        Resource = "*"
      }
    ]
  })
}

resource "aws_iam_policy" "dynamodb_policy" {
  name = "dynamodb-policy"

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Action   = ["dynamodb:*"],
        Effect   = "Allow",
        Resource = "*"
      }
    ]
  })
}

resource "aws_iam_group_policy_attachment" "lambda_attachment" {
  group      = aws_iam_group.lambda_dynamodb_group.name
  policy_arn = aws_iam_policy.lambda_policy.arn
}

resource "aws_iam_group_policy_attachment" "dynamodb_attachment" {
  group      = aws_iam_group.lambda_dynamodb_group.name
  policy_arn = aws_iam_policy.dynamodb_policy.arn
}
