pipeline {


agent any

environment {
    AWS_REGION = 'us-east-1'
    ECR_REGISTRY = '289835834707.dkr.ecr.us-east-1.amazonaws.com'
    HELM_CHART_PATH = "infra/selectitla-chart"
    IMAGE_TAG = "${BUILD_NUMBER}"
    EMAIL_DEST = 'nawreskhalifa17@gmail.com'
}

stages {

    stage('Checkout') {
        steps {

            deleteDir()

            git branch: 'main',
                url: 'https://github.com/Nawreskhalifa/SelectIlLa_front.git'
        }
    }
    stage('Clone Infra') {
        steps {
            dir('infra') {
                git branch: 'main',
                    credentialsId: 'github-token1',
                    url: 'https://github.com/Nawreskhalifa/projetPFE.git'
            }
        }
    }

    
    stage('AWS Authentication') {
        steps {

            withCredentials([
                string(credentialsId: 'aws-access-key1', variable: 'AWS_ACCESS_KEY_ID'),
                string(credentialsId: 'aws-secret-key1', variable: 'AWS_SECRET_ACCESS_KEY')
            ]) {

                sh '''
                    set -e

                    export AWS_PAGER=""

                    aws configure set aws_access_key_id $AWS_ACCESS_KEY_ID

                    aws configure set aws_secret_access_key $AWS_SECRET_ACCESS_KEY

                    aws configure set region $AWS_REGION

                    echo "Testing AWS identity..."

                    aws sts get-caller-identity
                '''
            }
        }
    }

    stage('Login to AWS ECR') {
        steps {

            sh '''
                set -e

                echo "Logging into ECR..."

                aws ecr get-login-password --region $AWS_REGION | \
                docker login --username AWS \
                --password-stdin $ECR_REGISTRY
            '''
        }
    }

    stage('Build Frontend Image') {
        steps {

            sh '''
                docker build \
                --build-arg VUE_APP_API_BASE_URL=http://backend-service:1337/api \
                -t selectilla-front:${IMAGE_TAG} .

                docker tag \
                selectilla-front:${IMAGE_TAG} \
                ${FRONT_IMAGE}:${IMAGE_TAG}
            '''
        }
    }

    stage('Push Docker Image') {
        steps {

            retry(3) {

                sh '''
                    set -e

                    echo "Pushing image to ECR..."

                    docker push ${FRONT_IMAGE}:${IMAGE_TAG}
                '''
            }
        }
    }

    stage('Connect to EKS') {
        steps {

            withCredentials([
                string(credentialsId: 'aws-access-key1', variable: 'AWS_ACCESS_KEY_ID'),
                string(credentialsId: 'aws-secret-key1', variable: 'AWS_SECRET_ACCESS_KEY')
            ]) {

                sh '''
                    export AWS_PAGER=""

                    aws eks update-kubeconfig \
                    --region us-east-1 \
                    --name selectilla-cluster

                    kubectl get nodes
                '''
            }
        }
    }

    stage('Deploy Frontend to EKS') {
        steps {

            sh '''
                helm upgrade --install selectitla \
                ${HELM_CHART_PATH} \
                --namespace default \
                --create-namespace \
                --set frontend.image.repository=${FRONT_IMAGE} \
                --set frontend.image.tag=${IMAGE_TAG}

                kubectl rollout status deployment/frontend-deployment
            '''
        }
    }
}

post {

    success {

        emailext(
            subject: "OK: ${env.JOB_NAME} #${env.BUILD_NUMBER} deploye",

            body: """
```

============================================
FRONTEND CI/CD — SUCCES
=======================

Projet : ${env.JOB_NAME}

Build : #${env.BUILD_NUMBER}

Image :
${env.FRONT_IMAGE}:${env.BUILD_NUMBER}

Namespace : default

---

Console :
${env.BUILD_URL}console

============================================
""",


            to: "${env.EMAIL_DEST}",
            mimeType: 'text/plain'
        )
    }

    failure {

        emailext(
            subject: "FAILED: ${env.JOB_NAME} #${env.BUILD_NUMBER}",

            body: """


============================================
FRONTEND CI/CD — ECHEC
======================

Projet : ${env.JOB_NAME}

Build : #${env.BUILD_NUMBER}

Branche : main

Statut : ECHEC

---

Console :
${env.BUILD_URL}console

---

Verifier :

* Docker Build
* Push ECR
* Helm Deployment
* Kubernetes Pods

============================================
""",


            to: "${env.EMAIL_DEST}",
            mimeType: 'text/plain'
        )
    }

    always {

        deleteDir()
    }
}

}
