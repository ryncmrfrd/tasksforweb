var currentList;
document.getElementById('task-list-title').addEventListener('change', function(){
    currentList = this.options[this.selectedIndex].value;
    console.log(currentList);
});
function startApp(){
    if(!humanTasks.auth.isLoggedIn()){
        humanTasks.auth.login(function(){
            taskLists()
        });
    }
    else{
        taskLists()
    }
    function taskLists(){
        humanTasks.taskLists.get(function(taskLists){
            for(i = 0; i < taskLists.length; i++){
                document.getElementById('task-list-title').innerHTML += 
                '<option value="'+taskLists[i].id+'">'+taskLists[i].title+'</option>';
            }
            var e = document.getElementById('task-list-title');
            currentList = e.options[e.selectedIndex].value;
            humanTasks.tasks.get(currentList, function(tasks){
                for(i = 0; i < tasks.length; i++){
                    console.log()
                    if(tasks[i].status == 'needsAction'){
                        document.getElementById('task-wrapper').innerHTML += 
                        '<div class="task">'+
                            '<button class="task-button"><i class="fas fa-check"></i></button>'+
                            '<div class="task-details">'+
                                '<h2 class="task-title">'+tasks[i].title+'</h2>'+
                            '</div>'+
                        '</div>';
                    }
                }
            })
        });
    }
}