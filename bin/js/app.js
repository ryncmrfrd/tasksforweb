function runApp(){
    if(!tasks.isSignedIn()){
        tasks.signIn();
    }
    else{
        var taskLists = tasks.getTaskLists();
        for(i = 0; i <= tasks.getTaskLists(); i++){
            var tasksInList = tasks.getTasks(i.id)
            for(i = 0; i <= tasks.getTasks(i.id); i++){
                document.getElementById('tasks').innerHTML += 
                '<div class="task">'+
                    '<button class="task-check"></button>'+
                    '<h2 class="tasks-title-' + tasksInList[i].status + '">' + tasksInList[i].title + '</h2>'+
                '</div>';
            }
        }

    }
}