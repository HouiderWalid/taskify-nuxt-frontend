pipeline{
	agent any
	environment {
		ENV_FILE = credentials('taskify-nuxt-frontend-env-file')
        AWS_ACCESS_DATA = credentials('taskify-nuxt-frontend-aws-secret')
        AWS_REGION = credentials('taskify-nuxt-frontend-aws-region')
        ECR_REPOSITORY = credentials('taskify-nuxt-frontend-aws-ecr-repository-name')
        AWS_ACCOUNT_ID = credentials('taskify-nuxt-frontend-aws-account-id')
        EKS_CLUSTER_NAME = credentials('taskify-nuxt-frontend-aws-eks-cluster-name')
    }
    stages{
		stage('Test'){
			steps {
				sh 'docker build -t taskify-nuxt-frontend-test -f docker/prod/app/Dockerfile.test .'
				sh 'docker run -d --name taskify-nuxt-frontend-test-1 taskify-nuxt-frontend-test:latest'
				sh 'docker cp "$ENV_FILE" taskify-nuxt-frontend-test-1:/var/www/html/.env'
				sh 'docker exec -i taskify-nuxt-frontend-test-1 npm run build'
				sh 'docker exec -i taskify-nuxt-frontend-test-1 chown -R www-data:www-data /var/www/html'
				sh 'docker exec -i taskify-nuxt-frontend-test-1 npm run test'
			}
			post {
				always {
					sh 'docker stop taskify-nuxt-frontend-test-1'
                    sh 'docker rm taskify-nuxt-frontend-test-1'
                    sh 'docker rmi taskify-nuxt-frontend-test:latest'
                }
            }
		}
		stage('Deploy') {
			steps {
				sh 'aws configure set aws_access_key_id "$AWS_ACCESS_DATA_USR"'
                sh 'aws configure set aws_secret_access_key "$AWS_ACCESS_DATA_PSW"'
                sh 'docker build -t taskify-nuxt-frontend -f docker/prod/app/Dockerfile .'
                sh 'aws ecr get-login-password --region "$AWS_REGION" | docker login --username AWS --password-stdin "$AWS_ACCOUNT_ID".dkr.ecr."$AWS_REGION".amazonaws.com'
                sh 'docker tag taskify-nuxt-frontend:latest "$AWS_ACCOUNT_ID".dkr.ecr."$AWS_REGION".amazonaws.com/"$ECR_REPOSITORY":latest'
                sh 'aws ecr batch-delete-image --repository-name "$ECR_REPOSITORY" --image-ids imageTag=latest || true'
                sh 'docker push "$AWS_ACCOUNT_ID".dkr.ecr."$AWS_REGION".amazonaws.com/"$ECR_REPOSITORY":latest'
                sh 'aws eks --region "$AWS_REGION" update-kubeconfig --name "$EKS_CLUSTER_NAME"'
                sh 'kubectl create secret generic taskify-laravel-back-env --from-env-file="$ENV_FILE" --dry-run=client -o yaml | kubectl apply -f -'
                sh 'kubectl apply -f k8s/deployment.yaml'
                sh 'kubectl apply -f k8s/service.yaml'
            }
        }
    }
}