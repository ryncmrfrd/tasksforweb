var humanTasks = {
    auth: function(){
        gapi.load('client:auth2', function(){
            gapi.client.init({
                apiKey: 'AIzaSyArBQrznPzgD5aU_NKPWkorEaklGkIBouM',
                clientId: '248150601049-fbibbrvjeqojdj45csgilhmj2vk7240e.apps.googleusercontent.com',
                discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/tasks/v1/rest"],
                scope: "https://www.googleapis.com/auth/tasks.readonly"
            }).then(function () {
                // Listen for sign-in state changes.
                gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
                // Handle the initial sign-in state.
                updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
                authorizeButton.onclick = handleAuthClick;
                signoutButton.onclick = handleSignoutClick;
            }, function(error) {
                appendPre(JSON.stringify(error, null, 2));
            });
        });
    },
    getTaskLists: function(){
        gapi.client.tasks.tasklists.list()
        .then(function(response) {
            var taskLists = response.result.items;
            if (taskLists && taskLists.length > 0) {
                for (var i = 0; i < taskLists.length; i++) {
                    console.log(
                        taskLists[i].title+' '+
                        taskLists[i].id
                    )
                }
            } else {
                console.log('no lists found')
            }
        });
    },
    removeTaskList: function(){

    },
    addTaskList: function(){

    },
    getTasks: function(){

    },
    addTask: function(){

    },
    removeTask: function(){

    },
}

function listTaskLists() {
    gapi.client.tasks.tasklists.list({
        'maxResults': 10
    })
    .then(function(response) {
      var taskLists = response.result.items;
      if (taskLists && taskLists.length > 0) {
        for (var i = 0; i < taskLists.length; i++) {
          //if lists found
          //taskLists[i].title
          //taskLists[i].id
        }
      } else {
        //if no lists found
      }
    });
  }