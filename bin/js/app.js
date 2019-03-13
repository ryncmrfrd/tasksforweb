var currentList;
$('#task-list-title').change(function (){
    $('#task-wrapper section').hide();
    $('#task-wrapper section.'+currentList).show();
    currentList = $(this).val();
});

function startApp(){
    if(!humanTasks.auth.isLoggedIn()){humanTasks.auth.login(getTaskLists());}
    else{getTaskLists()}
    function getTaskLists(){
        humanTasks.taskLists.get(function(taskLists){
            for(i = 0; i < taskLists.length; i++){
                $('#task-list-title').append('<option value="'+taskLists[i].id+'">'+taskLists[i].title+'</option>');
                $('#task-wrapper').append('<section class="'+taskLists[i].id+'"></section>');
            }
            currentList = $('#task-list-title').val();
            console.log($('#task-list-title option').length)
            for(var i = 0; i < $('#task-list-title option').length; i++){
                console.log('skrrt')
                console.log(taskListID)
                var taskListID = $('#task-list-title option').children().prevObject[i].value;
                humanTasks.tasks.get(taskListID, function(tasks){
                    $('#task-wrapper section').empty();
                    for(i = 0; i < tasks.length; i++){
                        if(tasks[i].status == 'needsAction'){
                            $('#task-wrapper section.'+taskListID).append(
                                '<div class="task" id="'+tasks[i].id+'">'+
                                    '<button onclick="setElementAsCompleted(this)" id="task-button"><i class="fas fa-check"></i></button>'+
                                    '<div class="task-details">'+
                                        '<h2 contenteditable="true" class="task-title">'+tasks[i].title+'</h2>'+
                                    '</div>'+
                                '</div>'
                            );
                        }
                    }
                    allowTaskEdits();
                })
            }
            addTasks();
        });
    }
}

function addTasks(){
    $('.addTask').click(function(){
        $('.addTaskForm').css('display','flex');
        $('.addTaskFormGrey').show()
    })
    $('.addTaskFormGrey').click(function(){
        $('.addTaskForm').hide();
        $('.addTaskFormGrey').hide()
    })
    $('.addTaskButton').click(function(){
        var taskTitle = $('#formTaskTitle').val();
        var params = {
            'title':taskTitle
        }
        humanTasks.tasks.add(currentList,params,function(){
            updateTaskLists()
        })
        $('.addTaskForm').hide();
        $('.addTaskFormGrey').hide()
    })
}

function updateTaskLists(){
    humanTasks.tasks.get(currentList, function(tasks){
            if(tasks==undefined){return;}
            $('#task-wrapper section').empty();
            for(i = 0; i < tasks.length; i++){
                if(tasks[i].status == 'needsAction'){
                    $('#task-wrapper section.'+currentList).append(
                        '<div class="task" id="'+tasks[i].id+'">'+
                            '<button onclick="setElementAsCompleted(this)" id="task-button"><i class="fas fa-check"></i></button>'+
                            '<div class="task-details">'+
                                '<h2 contenteditable="true" class="task-title">'+tasks[i].title+'</h2>'+
                            '</div>'+
                        '</div>'
                    );
                }
            }
        })
    }

function allowTaskEdits(){
    $('.task-title').focusout(function(){
        var taskID = this.parentNode.parentNode.id;
        var params = {'title' : this.innerText}
        humanTasks.tasks.edit(currentList, taskID, params)
    });
}

function setElementAsCompleted(x){
    var thisID = x.parentNode.id;
    humanTasks.tasks.complete(currentList, thisID,function(){
        $('#'+thisID).remove();
    })
}