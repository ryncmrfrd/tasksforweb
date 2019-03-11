var currentList;
$('#task-list-title').change(function (){
    currentList = $(this).val();
});

function startApp(){
    if(!humanTasks.auth.isLoggedIn()){humanTasks.auth.login(taskLists());}
    else{taskLists()}
    function taskLists(){
        humanTasks.taskLists.get(function(taskLists){
            for(i = 0; i < taskLists.length; i++){
                $('#task-list-title').append(
                    '<option value="'+taskLists[i].id+'">'+taskLists[i].title+'</option>'
                );
            }
            currentList = $('#task-list-title').val();
            humanTasks.tasks.get(currentList, function(tasks){
                for(i = 0; i < tasks.length; i++){
                    if(tasks[i].status == 'needsAction'){
                        $('#task-wrapper').append(
                            '<div class="task" id="'+tasks[i].id+'">'+
                                '<button onclick="setElementAsCompleted(this)" id="task-button"><i class="fas fa-check"></i></button>'+
                                '<div class="task-details">'+
                                    '<h2 class="task-title">'+tasks[i].title+'</h2>'+
                                '</div>'+
                            '</div>'
                        );
                    }
                }
            })
        });
        
    }
}

function setElementAsCompleted(x){
    var params = {
        "status": "completed"
    }
    humanTasks.tasks.edit(currentList, x.parentElement.id, params, function(response){
        console.log(
                   //   x.parentElement.parentElement.removeChild()
        )

    });
}