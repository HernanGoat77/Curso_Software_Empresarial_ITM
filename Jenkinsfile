pipeline {
    agent any

    environment {
        REPO_URL     = 'https://github.com/HernanGoat77/Curso_Software_Empresarial_ITM'
        BRANCH       = 'main'
        DOCKER_IMAGE = 'apifestivos:latest'
    }

    stages {

        stage('Clonar Repositorio') {
            steps {
                git branch: "${BRANCH}", credentialsId: '100', url: "${REPO_URL}"
            }
        }

        stage('Construir Imagen Docker') {
            steps {
                script {
                    bat 'docker build -t %DOCKER_IMAGE% .'
                }
            }
        }

        stage('Detener Contenedor Anterior') {
            steps {
                script {
                    catchError(build:'SUCESS', stageResult: 'UNSTABLE'){
                    bat '''
                        docker ps -q --filter "name=dockerapifestivos" | findstr . && docker stop dockerapifestivos || echo No hay contenedor en ejecución
                        docker ps -a -q --filter "name=dockerapifestivos" | findstr . && docker rm dockerapifestivos || echo No hay contenedor detenido
                    '''
                    }
                }
            }
        }

        stage('Desplegar Contenedor Docker') {
            steps {
                script {
                    bat 'docker container run --network redcalendario --name dockerapifestivos -p 9090:3030 -d %DOCKER_IMAGE%'
                }
            }
        }
    }

    post {
        success {
            echo 'Despliegue exitoso.'
        }
        failure {
            echo 'Despliegue fallido.'
        }
    }
}