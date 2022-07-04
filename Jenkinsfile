def gv
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
            steps{
                script { 
                    gv.buildApp()
                }
            }
        }
        
        stage("deploy"){
            steps{
                script { 
                    gv.deployApp()
                }
            }
        }
    }

}