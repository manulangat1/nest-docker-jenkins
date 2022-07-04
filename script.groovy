def buildApp () { 
    echo "building application"
    withCredentials([usernamePassword(credentialsId: 'docker-hub-repo',passwordVariable:'pass',usernameVariable:'USER')]){
        sh 'docker build -t manulangat/nest-docker-practise:1.0 .'
        sh  "echo $PASS | docker login -u $USER --password-stdin "
        sh "docker push manulangat/nest-docker-practise:1.0"
    }
}
def testApp () {
    echo "testing application"
}
def deployApp () {
    echo "deploying application"
}
return this