pipeline {
    agent any

    environment {
        PROJECT_ID   = 'rising-reserve-495404-v9'
        REGION       = 'us-central1'
        SERVICE_NAME = 'ecommerce-app'
        IMAGE_TAG    = "gcr.io/rising-reserve-495404-v9/ecommerce-app:${BUILD_NUMBER}"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
                sh 'echo "✅ Code checked out"'
                sh 'echo "Branch : ${GIT_BRANCH}"'
                sh 'echo "Commit : ${GIT_COMMIT}"'
                sh 'ls -la'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh '''
                    echo "=== Building Docker Image ==="
                    docker build -t ${IMAGE_TAG} .
                    echo "✅ Image built: ${IMAGE_TAG}"
                    docker images | grep ecommerce-app
                '''
            }
        }

        stage('Push to GCR') {
            steps {
                sh '''
                    echo "=== Authenticating Docker with GCR ==="
                    gcloud auth configure-docker gcr.io --quiet

                    echo "=== Pushing image to GCR ==="
                    docker push ${IMAGE_TAG}
                    echo "✅ Image pushed successfully!"
                '''
            }
        }

        stage('Deploy to Cloud Run') {
            steps {
                sh '''
                    echo "=== Deploying to Cloud Run ==="
                    gcloud config set project ${PROJECT_ID}

                    gcloud run deploy ${SERVICE_NAME} \
                        --image ${IMAGE_TAG} \
                        --platform managed \
                        --region ${REGION} \
                        --allow-unauthenticated \
                        --port 8080 \
                        --memory 512Mi \
                        --quiet

                    echo ""
                    echo "=== ✅ Deployment Complete! ==="
                    echo "🌐 Live URL:"
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
            echo '🎉 Pipeline complete — app is live on Cloud Run!'
        }
        failure {
            echo '❌ Pipeline failed — check the red stage above'
        }
        always {
            sh 'docker rmi ${IMAGE_TAG} || true'
            cleanWs()
        }
    }
}
