var humanTasks = {
  isInitialised: false,
  init: function(callback){
    if(!callback){console.error('Callback function has not been provided');return}
    gapi.load('client:auth2', function() {
      gapi.client.init({
        apiKey: 'AIzaSyCOxTZNOhqV2DI5YgLtQa6pJPv2ScGPnDg',
        clientId: '494992094972-2sl8mieedk91uocjiakfms9d3uco3m70.apps.googleusercontent.com',
        discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/tasks/v1/rest"],
        scope: 'https://www.googleapis.com/auth/tasks'
      }).then(function() {
        humanTasks.isInitialised = true;
        humanTasks.callback(callback)
      })
    });
  },
  auth: {
    isLoggedIn: function(){
      if(!humanTasks.isInitialised){console.error('Function "tasks.init()" must be called first'); return}
      return gapi.auth2.getAuthInstance().isSignedIn.get();
    },
    login: function(callback){
      if(!humanTasks.isInitialised){console.error('Function "tasks.init()" must be called first'); return}
      gapi.auth2.getAuthInstance().signIn().then(function(){
        if(callback){
          humanTasks.callback(callback)
        }
      });
    },
    logout: function(callback){
      if(!humanTasks.isInitialised){console.error('Function "tasks.init()" must be called first'); return}
      gapi.auth2.getAuthInstance().signOut().then(function(){
        if(callback){
          humanTasks.callback(callback)
        }
      });
    }
  },
  taskLists: {
    get: function(callback){
      if(!humanTasks.isInitialised){console.error('Function "tasks.init()" must be called first'); return}
      else if(arguments.length==0){console.error('Incorrect function parameters');return;}    
      gapi.client.tasks.tasklists.list().then(function(response){
        if(callback){
          humanTasks.callback(callback, response.result.items)
        }
      });
    },
    add: function(title, callback){
      if(!humanTasks.isInitialised){console.error('Function "tasks.init()" must be called first'); return}
      else if(arguments.length==0){console.error('Incorrect function parameters');return;}    
      gapi.client.tasks.tasklists.insert({
        title: title
      }).then(function(){
        if(callback){
          humanTasks.callback(callback)
        }
      });
    },
    remove: function(taskListId, callback){
      if(!humanTasks.isInitialised){console.error('Function "tasks.init()" must be called first'); return}
      else if(arguments.length==0){console.error('Incorrect function parameters');return;}    
      gapi.client.tasks.tasklists.delete({
        tasklist: taskListId
      }).then(function(){
        if(callback){
          humanTasks.callback(callback)
        }
      });
    },
    edit: function(taskListId, title, callback){
      if(!humanTasks.isInitialised){console.error('Function "tasks.init()" must be called first'); return}
      else if(arguments.length==0){console.error('Incorrect function parameters');return;}    
      gapi.client.tasks.tasklists.update({
        tasklist: taskListId,
        id: taskListId,
        title: title
      }).then(function(){
        if(callback){
          humanTasks.callback(callback)
        }
      });
    }
  },
  tasks: {
    get: function(taskListId, callback){
      if(!humanTasks.isInitialised){console.error('Function "tasks.init()" must be called first'); return}
      else if(arguments.length==0){console.error('Incorrect function parameters');return;}     
      gapi.client.tasks.tasks.list({
        tasklist: taskListId
      }).then(function(response){
        if(callback){
          humanTasks.callback(callback, response.result.items)
        }
      });
    },
    add: function(taskListId, params, callback){
      if(!humanTasks.isInitialised){console.error('Function "tasks.init()" must be called first'); return}
      else if(arguments.length==0){console.error('Incorrect function parameters');return;}    
      gapi.client.tasks.tasks.insert({
        tasklist: taskListId,
        resource: params
      }).then(function(response){
        if(callback){
          humanTasks.callback(callback, response)
        }
      });
    },
    remove: function(taskListId, callback){
      if(!humanTasks.isInitialised){console.error('Function "tasks.init()" must be called first'); return}
      else if(arguments.length==0){console.error('Incorrect function parameters');return;}       
      gapi.client.tasks.tasks.delete({
        tasklist: taskListId,
        task: taskId,
        id: taskId
      }).then(function(){
        if(callback){
          humanTasks.callback(callback)
        }
      });
    },
    edit: function(taskListId, taskId, params, callback){
      if(!humanTasks.isInitialised){console.error('Function "tasks.init()" must be called first'); return}
      else if(arguments.length==0){console.error('Incorrect function parameters');return;}    
      gapi.client.tasks.tasks.patch({
        tasklist: taskListId,
        task: taskId,
        resource: params
      }).then(function(response){
        if(callback){
          humanTasks.callback(callback, response)
        }
      });
    },
    complete: function(taskListId, taskId, callback){
      gapi.client.tasks.tasks.patch({
        tasklist: taskListId,
        task: taskId,
        resource: {'status':'completed'}
      }).then(function(response){
        if(callback){
          humanTasks.callback(callback, response)
        }
      });
    }
  },
  callback: function(callback, params){
    if(arguments.length==0){console.error('Incorrect function parameters');return;}
    if(!params){callback()}
    else{callback(params);}
  }
}