//INITIALISING
function init(){
    gapi.load('client:auth2', function(){
        gapi.client.init({
          apiKey: 'AIzaSyArBQrznPzgD5aU_NKPWkorEaklGkIBouM',
          clientId: '248150601049-fbibbrvjeqojdj45csgilhmj2vk7240e.apps.googleusercontent.com',
          discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/tasks/v1/rest"],
          scope: "https://www.googleapis.com/auth/tasks"
        }).then(function(){
            if(!gapi.auth2.getAuthInstance().isSignedIn.get()){
                alert('not logged in')
            }
            showTasks()
        });
    })
}

function showTasks(){
    gapi.client.tasks.tasklists.list().then(function(response) {
        var taskslists = response.result.items;
        for(var i = 0;i <= taskslists.length; i++){
            console.log(i);
        }
    });
}