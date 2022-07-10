#!usr/bin/env groovy 

@Library('jenkins-shared-library')
def gv
// @Library('jenkins-shared-library')_ tells it about the separation


pipeline{ 
    agent any 
    // tools { 
    //     yarn 
    // }
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
                    buildDone()
                }
            }
        }
    }

}