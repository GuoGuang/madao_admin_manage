pipeline {
  agent any
  tools {nodejs "nodejs"}
  stages {
     stage('获取代码') {
       steps {
         sh "rm -rf ./*"
         git credentialsId: '*****-****-****-****-*********', url: 'https://github.com/GuoGuang/ibole_admin_manage.git', branch: 'dev'
         //sh "git clone -b dev https://github.com/GuoGuang/ibole_admin_manage.git"
          }
     }
     stage('Install') {
       steps {
         sh "which git"
         sh 'npm install'
         sh 'npm install node-sass'
          }
     }
     stage('Build') {
       steps {
        sh  'npm run build:prod'
        sh  'pwd'
          }
     }
     stage('Deploy'){
       steps {
         sh  'pwd'
         sh 'cp -rf /var/jenkins_home/workspace/ibole_admin_manage_dev/dist/*  /data/nginx/html'
          }
     }
  }
}
