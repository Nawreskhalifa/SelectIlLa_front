pipeline {
    agent any

    environment {
        AWS_REGION = 'us-east-1'
        ECR_REGISTRY = '289835834707.dkr.ecr.us-east-1.amazonaws.com'
        FRONT_IMAGE = "${ECR_REGISTRY}/selectilla-front"
    }

    stages {

        stage('Checkout') {
            steps {
                deleteDir()
                git branch: 'main',
                    url: 'https://github.com/Nawreskhalifa/SelectIlLa_front.git'
            }
        }

        stage('Check Network') {
            steps {
                sh '''
                echo "Checking network..."
                curl -I https://google.com || true
                curl -I https://$ECR_REGISTRY || true
                '''
            }
        }

        stage('AWS Auth ') {
            steps {
                withCredentials([
                    string(credentialsId: 'aws-access-key1', variable: 'AWS_ACCESS_KEY_ID'),
                    string(credentialsId: 'aws-secret-key1', variable: 'AWS_SECRET_ACCESS_KEY')
                ]) {
                    sh '''
                    set -e

                    aws configure set aws_access_key_id $AWS_ACCESS_KEY_ID
                    aws configure set aws_secret_access_key $AWS_SECRET_ACCESS_KEY
                    aws configure set region $AWS_REGION

                    echo "Testing AWS identity..."
                    aws sts get-caller-identity
                    '''
                }
            }
        }

        stage('ECR Login ') {
            steps {
                sh '''
                set -e

                echo "Logging into ECR..."

                aws ecr get-login-password --region $AWS_REGION | \
                docker login --username AWS --password-stdin $ECR_REGISTRY
                '''
            }
        }

        stage('Build Frontend Image') {
    steps {
        sh """
        docker build \
          --build-arg VUE_APP_API_BASE_URL=http://backend-service:1337/api \
          -t selectilla-front:latest .

        docker tag selectilla-front:latest $FRONT_IMAGE:latest
        """
    }
}

        stage('Push Image ') {
            steps {
                retry(3) {
                    sh '''
                    set -e

                    echo "Pushing to ECR..."
                    docker push $FRONT_IMAGE:latest
                    '''
                }
            }
        }

      stage('Deploy Kubernetes') {
        steps {
            withCredentials([file(credentialsId: 'kubeconfig', variable: 'KUBECONFIG_FILE')]) {
                sh '''
                export KUBECONFIG=$KUBECONFIG_FILE
                
                kubectl config view
                kubectl get nodes
                
                kubectl apply -f k8s/frontend-deployment.yml
                kubectl apply -f k8s/frontend-service.yml
                kubectl rollout restart deployment frontend-deployment
                '''
            }
        }
    }
    }

    post {
        success {
            echo "CI/CD SUCCESS"
        }
        failure {
            echo "CI/CD FAILED"
        }
    }
}