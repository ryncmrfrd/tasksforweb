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
                alert('not logged in');
            }
            showTaskLists();
        });
    })
}

function showTaskLists(){
    gapi.client.tasks.tasklists.list().then(function(response) {
        var taskslists = response.result.items;
        if(taskslists.length = 1){
            document.getElementById('task-list-title').innerText = taskslists[0].title
            showTasks(taskslists[0].id);
        }
    });
}

function showTasks(listID){
    gapi.client.tasks.tasks.list({tasklist: listID}).then(function(response) {
        var tasksInList = response.result.items;
        for(var i = 0; i < tasksInList.length; i++){
            if(tasksInList[i].status == 'needsAction'){
                document.getElementById('task-wrapper').innerHTML += 
                '<div class="task">' +
                    '<button class="task-button"><i class="fas fa-check"></i></button>' +
                    '<div class="task-details">' +
                        '<h2 class="task-title">' + tasksInList[i].title + '</h2>'
                        '<p>test description</p>' +
                    '</div>' +
                '</div>';
            }
        }
    });
}