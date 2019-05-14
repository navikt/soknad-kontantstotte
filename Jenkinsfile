node() {
    def tagName=''
    stage('Checkout Tags') { // checkout only tags.
        checkout scm
        gitCommitHash = sh(script: "git log -n 1 --pretty=format:'%h'", returnStdout: true)
        tagName = new Date().format("YYYYMMddHHmmss") + "_" + gitCommitHash
    }
    stage('Build and Push'){
      sh 'PATH=$PATH:/usr/local/lib/node/nodejs/bin:/opt/yarn-v1.12.3/bin; yarn install --ignore-scripts'
      sh 'PATH=$PATH:/usr/local/lib/node/nodejs/bin:/opt/yarn-v1.12.3/bin; yarn build'
      sh "docker build -t repo.adeo.no:5443/soknad-kontantstotte:$tagName -f ./docker/Dockerfile ./ --build-arg HTTPS_PROXY='' --build-arg HTTP_PROXY=''"
      sh "docker tag repo.adeo.no:5443/soknad-kontantstotte:$tagName repo.adeo.no:5443/soknad-kontantstotte:latest"
      sh "docker push repo.adeo.no:5443/soknad-kontantstotte:$tagName"
      sh "docker push repo.adeo.no:5443/soknad-kontantstotte:latest"
    }
}
