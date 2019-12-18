pipeline {
  agent {
        docker {
            image 'node:9-alpine' 
            args '-p 3000:3000' 
        }
    }
  stages {
     stage('获取代码') {
       steps {
         sh "pwd"
         sh "rm -rf ./*"
         sh " git clone -b dev "
         git credentialsId: '*****-****-****-****-*********', url: 'https://github.com/GuoGuang/ibole_admin_manage.git', branch: 'dev'
          }
     }
     stage('Install') {
       steps {
         sh "pwd"
        sh 'npm install'
        sh 'npm install node-sass'
          }
     }
     stage('Build') {
       steps {
        sh  'npm run build:prod'
          }
     }
     stage('Deploy'){
       steps {
         sh 'cp -rf /var/jenkins_home/workspace/ibole_admin_manage/dist/*  /nginx/html/'
          }
     }
  }
}
