var human = {
    init: function(key, client){
        if(!key || !client){return false}
        gapi.load('client:auth2', function(){
            gapi.client.init({
              apiKey: key,
              clientId: client,
              discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/tasks/v1/rest"],
              scope: "https://www.googleapis.com/auth/tasks"
            }).then(function(){
                if (gapi.auth2.getAuthInstance().isSignedIn.get()){
                    authorizeButton.style.display = 'none';
                    signoutButton.style.display = 'block';
                    listTaskLists();
                } else {
                    authorizeButton.style.display = 'block';
                    signoutButton.style.display = 'none';
                }
            });
        });
    },
    getTaskLists: function(){
        gapi.client.tasks.tasklists.list().then(function(response) {
            var taskLists = response.result.items;
            $('pre').append('Task Lists:');
            if (taskLists && taskLists.length > 0) {
              for (var i = 0; i < taskLists.length; i++) {
                var taskList = taskLists[i];
                $('pre').append(taskList.title + ' (' + taskList.id + ')');
              }
            } else {
              $('pre').append('No task lists found.');
            }
        });
    },
}