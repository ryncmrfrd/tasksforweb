/*
      A properly documented and not at all overcomplicated 
    script by https://ryncmrfrd.me. It's downhill from here.
*/

//global variable for currently selected tasklist
var currentList;
$('#task-list-title').change(function (){
    currentList = $(this).val();
    $('section').hide();
    $('section#'+currentList).show();
});

//on gapi load script
function startApp(){
    //is user has previously logged in
    if(!humanTasks.auth.isLoggedIn()){humanTasks.auth.login(getTaskLists());}
    else{getTaskLists()}
    function getTaskLists(){
        humanTasks.taskLists.get(function(taskLists){
            for(var i=0; i < taskLists.length; i++){
                //append different task wrap <section>s to <main>
                $('#task-wrapper').append('<section id="'+taskLists[i].id+'"></section>');
                //append options to dropdown
                $('#task-list-title').append('<option value="'+taskLists[i].id+'">'+taskLists[i].title+'</option>');
                currentList = $('#task-list-title').val()
                //bodge for accessing "i" variable from nested for loops
                getTasksFromList(taskLists[i].id);
                function getTasksFromList(x){
                    humanTasks.tasks.get(x,function(tasks){
                        for(var i=0; i < tasks.length; i++){
                            if(tasks[i].status == 'needsAction'){
                                //add all the tasks to their respective tasklist section
                                $('#task-wrapper section#'+x).append(
                                    '<div class="task" id="'+tasks[i].id+'">'+
                                        '<button onclick="setElementAsCompleted(this)" id="task-button"><i class="fas fa-check"></i></button>'+
                                        '<div class="task-details">'+
                                            '<h2 contenteditable="true" class="task-title">'+tasks[i].title+'</h2>'+
                                        '</div>'+
                                    '</div>'
                                );
                            }
                        }
                        //allow task titles to be edited using the html contenteditable property
                        var taskTitleEdits;
                        $('.task-title').focusin(function(){
                            taskTitleEdits = this.innerText;
                        });
                        $('.task-title').focusout(function(){
                            if(taskTitleEdits != this.innerText){
                                var taskID = this.parentNode.parentNode.id;
                                var params = {'title':this.innerText}
                                humanTasks.tasks.edit(currentList, taskID, params, function(){
                                    console.log('success')
                                });
                            }

                        });
                    });
                }
            }
            //switch to first tasklist section
            $('section').hide();
            $('section#'+taskLists[0].id).show();
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
        var params = {'title': $('#formTaskTitle').val()}
        humanTasks.tasks.add(currentList,params,function(){
            //do something idk what yet
        })
        $('.addTaskForm').hide();
        $('.addTaskFormGrey').hide()
    })
}


function allowTaskEdits(){
    $('.task-title').focusout(function(){
        console.log('yeet')
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

/*$('#task-wrapper').append('<section id="'+taskLists[x].id+'"></section>');
$('#task-list-title').append('<option value="'+taskLists[x].id+'">'+taskLists[x].title+'</option>');

                            $('#task-wrapper section#'+taskLists[x].id).append(
                                '<div class="task" id="'+tasks[i].id+'">'+
                                    '<button onclick="setElementAsCompleted(this)" id="task-button"><i class="fas fa-check"></i></button>'+
                                    '<div class="task-details">'+
                                        '<h2 contenteditable="true" class="task-title">'+tasks[i].title+'</h2>'+
                                    '</div>'+
                                '</div>'
                            )*/