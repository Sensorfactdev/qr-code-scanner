pipeline {
  agent any

  environment {
    NODE_ENV = "development"
  }

  stages {
    stage('Setup') {
      steps {
        script {
          sh 'npm i yarn -g'
          sh 'yarn'
        }
      }
    }

    stage('Test') {
      steps {
        script {
          withEnv(['NODE_ENV=test']) {
            sh 'mkdir -p reports'
            sh 'yarn test'
            junit 'reports/*.xml'
          }
        }
      }
    }

    post {
      always {
        sh 'npm prune'
        sh 'rm -rf node_modules'
      }

      success {
        slackSend color: 'good', message: "Success: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL}) succeeded"
      }

      unstable {
        slackSend color: 'warning', message: "Unstable: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL}) is unstable"
      }

      failure {
        slackSend color: 'danger', message: "Failure: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL}) failed"
      }
    }
  }
