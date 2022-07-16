#!usr/bin/env groovy 

@Library('jenkins-shared-library')
def gv
// @Library('jenkins-shared-library')_ tells it about the separation


pipeline{ 
    agent any 
    stages { 
        stage ("init") { 
            steps{ 
                script{
                    gv = load "script.groovy"
                }
            }
        }
        stage("test"){
            
            steps{
                script { 
                    gv.testApp()
                }
            }
        }
        stage("build") { 
            when { 
                expression{
                 BRANCH_NAME == 'master'   
                }
            }
            steps{
                script { 
                    gv.buildApp()
                }
            }
        }
        
        stage("deploy"){
            // when { 
            //     expression{
            //      BRANCH_NAME == 'master'   
            //     }
            // }
            steps{
                script { 
                    // gv.deployApp()
                    
                    def dockerComposeCmd = 'docker-compose -f docker-compose.prod.yml up --detach'
                    sshagent(['ec2-server-key']) {
                        sh "scp docker-compose.prod.yml ec2-user@52.23.240.150:/home/ec2-user"
                        sh "scp Dockerfile ec2-user@52.23.240.150:/home/ec2-user"
                        sh "ssh -o strictHostKeyChecking=no ec2-user@52.23.240.150 ${dockerComposeCmd} "
                        }
                    deployDone 'manulangat' 
                }
            }
        }
    }

}