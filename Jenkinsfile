pipeline {
    agent any

    environment {
        REPO_URL='https://github.com/HernanGoat77/Curso_Software_Empresarial_ITM'
        BRANCH='main'
        DOCKER_IMAGE='apifestivos:latest'
    }

    stages{
        stage('Clonar el repositorio'){
            steps{
                git branch: "${BRANCH}", credentialsId: "100", url: "${REPO_URL}"
            }
        }

        stage('Construir la imagen de Docker'){
            steps{
                script {
                    bat 'docker build -t %DOCKER_IMAGE% .'
                }
            }
        }

        stage('Detener contenedor existente'){
            steps{
                script {
                   catchError(buildResult:'SUCCESS', stageResult: 'UNSTABLE'){
                    bat """
                    docker container inspect dockerapifestivos >nul 2>&1 && (
                        docker container stop dockerapifestivos
                        docker container rm dockerapifestivos
                    ) || echo "No existe el contenedor 'dockerapifestivos'"
                    """
                   }
                }
            }
        }

        stage('Crear contenedor'){
            steps{
                script {
                    bat 'docker container run --network redcalendario --name dockerapifestivos -p 9090:3030 -d %DOCKER_IMAGE%'
                }
            }
        }
    }
}