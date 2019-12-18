node {
   stage('获取代码') {
       sh "rm -rf ./*"
       sh " git clone -b dev https://github.com/GuoGuang/ibole_admin_manage.git"
   }
   stage('Install') {
      sh 'npm install'
      sh 'npm install node-sass'
   }
   stage('Build') {
      sh  'npm run build:prod'
   }
   stage('Deploy'){
       sh 'cp -rf /var/jenkins_home/workspace/ibole_admin_manage/dist/*  /nginx/html/'
   }
  
}