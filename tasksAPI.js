var tasks = {
    //init
    initialize: function(key, client){
        if(!key || !client){return false}
        gapi.load('client:auth2', function(){
            gapi.client.init({
              apiKey: key,
              clientId: client,
              discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/tasks/v1/rest"],
              scope: "https://www.googleapis.com/auth/tasks"
            }).then(function(){
                //other init stuff
                if (gapi.auth2.getAuthInstance().isSignedIn.get()){
                    authorizeButton.style.display = 'none';
                    signoutButton.style.display = 'block';
                } else {
                    authorizeButton.style.display = 'block';
                    signoutButton.style.display = 'none';
                }
            });
        });
    },
    //oauth
    signIn: function(){
      gapi.auth2.getAuthInstance().signIn();
    },
    signOut: function(){
      gapi.auth2.getAuthInstance().signOut();
    },
    isSignedIn: function(){
      return gapi.auth2.isSignedIn.get();
    },
    //task lists
    getTaskLists: function(){
      gapi.client.tasks.tasklists.list().then(function(response) {
        return response.result.items;
      });
    },
    addTaskList: function(listTitle){
      gapi.client.tasks.tasklists.insert({
        title: listTitle
      });
    },
    removeTaskList: function(listID){
      gapi.client.tasks.tasklists.delete({
        tasklist: listID
      });
    },
    //tasks
    getTasks: function(taskListId){
      return gapi.client.tasks.tasks.list({
        tasklist: taskList
      }).items;
    },
    addTask: function(taskListID, title, due){
      var params;
      if(title){
        params =
      }
      else{
        return false
      }
      if(notes){

      }
      gapi.client.tasks.tasks.insert(_extends({
        tasklist: taskListID
      }, params));
    },
    removeTask: function(taskListID, taskID){
      gapi.client.tasks.tasks.delete({
        tasklist: taskListId,
        task: taskId
      });
    }
}