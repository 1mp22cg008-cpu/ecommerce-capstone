pipeline {
    agent any

    environment {
        PROJECT_ID   = 'rising-reserve-495404-v9'
        REGION       = 'us-central1'
        SERVICE_NAME = 'ecommerce-app'
        IMAGE_NAME   = "gcr.io/rising-reserve-495404-v9/ecommerce-app"
        IMAGE_TAG    = "gcr.io/rising-reserve-495404-v9/ecommerce-app:${BUILD_NUMBER}"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
                sh 'echo "Commit: ${GIT_COMMIT}"'
                sh 'echo "Branch: ${GIT_BRANCH}"'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh '''
                    echo "=== Building Docker Image ==="
                    docker build -t ${IMAGE_TAG} .
                    echo "✅ Built: ${IMAGE_TAG}"
                '''
            }
        }

        stage('Push to GCR') {
            steps {
                sh '''
                    echo "=== Configuring Docker for GCR ==="
                    gcloud auth configure-docker gcr.io --quiet

                    echo "=== Pushing to GCR ==="
                    docker push ${IMAGE_TAG}
                    echo "✅ Pushed: ${IMAGE_TAG}"
                '''
            }
        }

        stage('Deploy to Cloud Run') {
            steps {
                sh '''
                    echo "=== Deploying to Cloud Run ==="
                    gcloud run deploy ${SERVICE_NAME} \
                        --image ${IMAGE_TAG} \
                        --platform managed \
                        --region ${REGION} \
                        --allow-unauthenticated \
                        --port 8080 \
                        --memory 512Mi \
                        --quiet

                    echo "=== ✅ Deployment Complete! ==="
                    echo "Live URL:"
                    gcloud run services describe ${SERVICE_NAME} \
                        --platform managed \
                        --region ${REGION} \
                        --format "value(status.url)"
                '''
            }
        }

    }

    post {
        success {
            echo '✅ Successfully deployed to Cloud Run!'
        }
        failure {
            echo '❌ Pipeline failed — check red stage above'
        }
        always {
            sh 'docker rmi ${IMAGE_TAG} || true'
            cleanWs()
        }
    }
}
