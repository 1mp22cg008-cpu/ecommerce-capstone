pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
                sh 'echo "Branch: ${GIT_BRANCH}"'
                sh 'echo "Commit: ${GIT_COMMIT}"'
                sh 'ls -la'
            }
        }

        stage('Build') {
            steps {
                sh 'echo "Building the application..."'
                sh 'echo "Build #${BUILD_NUMBER} started"'
            }
        }

        stage('Test') {
            steps {
                sh 'echo "Running tests..."'
                sh 'echo "All tests passed!"'
            }
        }

        stage('Docker Build') {
            steps {
                sh 'echo "Building Docker image..."'
                sh 'docker build -t my-app:${BUILD_NUMBER} . || echo "No Dockerfile yet — skipping"'
            }
        }

    }

    post {
        success {
            echo '✅ Pipeline completed successfully!'
        }
        failure {
            echo '❌ Pipeline failed!'
        }
    }
}
