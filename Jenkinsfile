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
                    
                    def dockerCmd = 'docker run -p 3000:3000 -d  manulangat/nest-docker-practise:1.0'
                    sshagent(['ec2-server-key']) {
                        sh "ssh -o strictHostKeyChecking=no ec2-user@52.23.240.150 ${dockerCmd} "
                        }
                    deployDone 'manulangat' 
                }
            }
        }
    }

}