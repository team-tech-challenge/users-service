module "users-service" {
  source = "./modules/generic"

  project_name              = "users-service"
  create_aws_ecr_repository = true
}
