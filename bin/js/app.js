var key = 'AIzaSyArBQrznPzgD5aU_NKPWkorEaklGkIBouM',
    client = '248150601049-fbibbrvjeqojdj45csgilhmj2vk7240e.apps.googleusercontent.com';
function runApp(){
    tasks.initialize(key, client);
    if(!tasks.isSignedIn()){
        tasks.signIn();
    }
    else{
        var taskLists = tasks.getTaskLists();
        for(i = 0; i <= taskLists.length; i++){
            var tasksInList = tasks.getTasks(i.id)
            for(i = 0; i <= tasksInList.length; i++){
                document.getElementById('tasks').innerHTML += 
                '<div class="task">'+
                    '<button class="task-check"></button>'+
                    '<h2 class="tasks-title' + tasksInList[i].status + '">' + tasksInList[i].title + '</h2>'+
                '</div>';
            }
        }

    }
}