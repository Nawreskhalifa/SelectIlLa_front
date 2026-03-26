pipeline {
    agent any

    stages {

        stage('Build') {
            steps {
                nodejs(nodeJSInstallationName: 'nodejs15.2.1') {
                    sh 'npm install'
                }
            }
        }

        stage('ExecuteSonarQubeReport') {
            steps {
                nodejs(nodeJSInstallationName: 'nodejs15.2.1') {
                    sh 'npm run sonar'
                }
            }
        }

    }
}