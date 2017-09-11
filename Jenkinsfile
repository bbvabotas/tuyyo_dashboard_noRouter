#!groovy
import groovy.json.JsonOutput
import java.util.Optional

/********** Global variables **********/

repoUrl = "ssh://git@globaldevtools.bbva.com:7999/bbvagpan/tuyyo-dashboard.git"
repoBranch = env.BRANCH_NAME

devActiveProfile = "cloud-dev-alpha"
qaActiveProfile = "cloud-qa"

dockerDevProject = "tuyo-dev"
dockerReleaseProject = "tuyo-release"
dockerRepo = "tuyyo-dashboard"
dockerImageTag = "v_${BUILD_NUMBER}"

devAwsRegion = "us-west-2"
devECSCluster = "pan-dev-alpha-web-cluster"
devECSService = "deploy-tuyyodashboard-service"
devECSTask= "deploy-tuyyodashboard-task"
devAWSLogGroup ="pan-dev-alpha-tuyyodashboard-cluster-log-group"

//qaAwsRegion = "us-east-2"
//qaECSCluster = "qa2-tuyo-api-business-cluster"
//qaECSService = "qa2-tuyo-business-stack-TuyoGeolocationService-1RED81YU0IWLO"
//qaECSTask = "qa2-tuyo-api-deploy-geolocation-td"
//qaAWSLogGroup = "qa2-tuyo-api-business-cluster-logs-group"

taskTemplateFileName = "tuyyo_dashboard_task"
localImage = "bts-global-payment/tuyyo-dashboard:latest";

/********** Properties **********/
/* Only keep the 10 most recent builds. */
properties([
        [$class  : 'BuildDiscarderProperty',
         strategy: [$class               : 'LogRotator',
                    artifactDaysToKeepStr: '',
                    artifactNumToKeepStr : '',
                    daysToKeepStr        : '5',
                    numToKeepStr         : '5']],
        [$class: 'RebuildSettings', autoRebuild: true, rebuildDisabled: true],
        [$class              : 'ParametersDefinitionProperty',
         parameterDefinitions: [[$class      : 'BooleanParameterDefinition',
                                 defaultValue: false,
                                 description : 'Deploy to AWS?',
                                 name        : 'deploy']]]
        //[$class: 'jenkins.branch.RateLimitBranchProperty$JobPropertyImpl', throttle: [count: 5, durationName: 'hour']]
])

/*********** Build workflow ***********/
node('global') {
    try {

        sh 'pwd | xargs echo -n > pwd.current'
        env.WORKSPACE = readFile('pwd.current')
        sh 'rm pwd.current'

        /*------------------------------------------------------------------------------*/
        stage name: 'Clean workspace'
        /*------------------------------------------------------------------------------*/
        cleanWorkspace()

        /*------------------------------------------------------------------------------*/
        stage name: 'Checkout SCM'
        /*------------------------------------------------------------------------------*/
        checkout scm
        dir('src') {
            cloneProject(repoUrl, repoBranch)
        }

        def deploy = new Boolean(deploy)

        if (deploy) {

            if (env.BRANCH_NAME == 'develop' || env.BRANCH_NAME == 'master') {

                def image = "${dockerDevProject}/${dockerRepo}:${dockerImageTag}"

                /*------------------------------------------------------------------------------*/
                stage name: 'Docker Build'
                /*------------------------------------------------------------------------------*/
                sh "docker images"

                sh "docker build -t ${localImage} ."

                /*------------------------------------------------------------------------------*/
                stage name: 'Docker Push'
                /*------------------------------------------------------------------------------*/
                pushImageToDocker(image)

                /*------------------------------------------------------------------------------*/
                stage name: 'Deploy to ECS'
                /*------------------------------------------------------------------------------*/
                deployToECS(devActiveProfile, devAwsRegion, devECSCluster, devECSService, devECSTask, devAWSLogGroup, image)

                notifyDeploySuccess()
            }

        }


    } catch (e) {
        stopWhenFailures()
        notifyBuildFailure()
        throw e

    } finally {
        echo "We have been through the entire pipeline"
    }
}

/********** Helper functions **********/

def cleanWorkspace() {
    sh "rm -rf *"
    sh "ls -lah"
}

def cloneProject(repo, branch) {
    git url: "${repo}", branch: "${branch}"
}


def versionFromPom() {
    def matcher = readFile('pom.xml') =~ '<version>(.+)</version>'
    matcher ? matcher[0][1] : null
}

def dockerFullImageNameFromPom() {
    def prefix = dockerImagePrefixFromPom();
    def image = dockerImageNameFromPom();

    return prefix + "/" + image + ":" + "latest"
}

def dockerImagePrefixFromPom() {
    def matcher = readFile('pom.xml') =~ '<docker.image.prefix>(.+)</docker.image.prefix>'
    matcher ? matcher[0][1] : null
}

def dockerImageNameFromPom() {
    def matcher = readFile('pom.xml') =~ '<docker.image.name>(.+)</docker.image.name>'
    matcher ? matcher[0][1] : null
}

def stopWhenFailures() {
    if (currentBuild.result != null && !currentBuild.result.equalsIgnoreCase("STABLE")) {
        error "There are failures in the current stage. The current build will be stopped."
    }
}

def pushImageToDocker(image) {
    sh "docker tag ${localImage} pro-globaldevops-docker-registry.pro.globaldevops.local:5000/${image}"
    sh "docker push pro-globaldevops-docker-registry.pro.globaldevops.local:5000/${image}"
}

def deployToECS(activeProfile, awsRegion, cluster, service, taskFamily, logGroup, image) {

    withCredentials([[$class          : 'UsernamePasswordMultiBinding',
                      credentialsId   : 'tuyo-dallas-aws-id',
                      usernameVariable: 'AWS_ACCESS_KEY_ID',
                      passwordVariable: 'AWS_SECRET_ACCESS_KEY']])
            {

                println "Creating a new task definition for this build"
                sh "sed -e 's;%TASK_FAMILY%;${taskFamily};g' -e 's;%IMAGE_NAME%;${image};g' -e 's;%AWS_REGION%;${awsRegion};g' -e 's;%ACTIVE_PROFILE%;${activeProfile};g' -e 's;%AWS_LOG_GROUP%;${logGroup};g' ${taskTemplateFileName}.json > ${taskTemplateFileName}_v_${BUILD_NUMBER}.json"
                sh "aws ecs register-task-definition --region ${awsRegion} --family ${taskFamily} --cli-input-json file://${taskTemplateFileName}_v_${BUILD_NUMBER}.json"
                sh "aws ecs describe-task-definition --region ${awsRegion} --task-definition ${taskFamily} | egrep 'revision' | cut -d':' -f2 | tr -d ' ' > revision"

                def taskRevision = readFile 'revision'
                println "Updating the service with the new task definition"
                sh "aws ecs update-service --region ${awsRegion} --cluster ${cluster} --service ${service} --task-definition ${taskFamily}:${taskRevision}"

                println "Stop the already running tasks"
                sh "aws ecs list-tasks --region ${awsRegion} --query taskArns --output text --cluster ${cluster} --service-name ${service} > tasks"
                def runningTasks = readFile 'tasks'
                if (runningTasks) {
                  for(String task : runningTasks.tokenize()){
                    sh "aws ecs stop-task --region ${awsRegion} --cluster ${cluster} --task ${task}"
                  }
                }
            }
}

def notifyDeploySuccess() {

    notifySlack("Build deployed", "#tuyo_backend",
            [[
                     title: "${env.JOB_NAME} build ${env.BUILD_NUMBER}",
                     color: "good",
                     text : """:tada: Build deployed. |${env.BUILD_URL}|branch: ${env.BRANCH_NAME}""".stripMargin()
             ]])
}

def notifyBuildFailure() {

    notifySlack("Build failed", "#tuyo_backend",
            [[
                     title: "${env.JOB_NAME} build ${env.BUILD_NUMBER}",
                     color: "danger",
                     text : """:skull_and_crossbones: Build finished with error.
      |${env.BUILD_URL}
      |branch: ${env.BRANCH_NAME}""".stripMargin()
             ]])
}

def notifySlack(text, channel, attachments) {
    //your  slack integration url
    def slackURL = 'https://hooks.slack.com/services/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'
    //from the jenkins wiki, you can updload an avatar and
    //use that one
    def jenkinsIcon = 'https://wiki.jenkins-ci.org/download/attachments/327683/JENKINS?version=1&modificationDate=1302750804000'

    def payload = JsonOutput.toJson([text       : text,
                                     channel    : channel,
                                     username   : "jenkins",
                                     icon_url   : jenkinsIcon,
                                     attachments: attachments])

    sh "curl -X POST --data-urlencode \'payload=${payload}\' ${slackURL}"
}
