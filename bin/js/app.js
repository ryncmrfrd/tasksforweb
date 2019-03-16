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
    if(!humanTasks.auth.isLoggedIn()){window.location.href='login'}
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
                                        '<button onclick="deleteElement(this)" id="delete-task-button"><i class="fas fa-times"></i></button>'+
                                    '</div>'
                                );
                            }
                        }
                        //get user icon and make the circle it. words are fun
                        $('.user-icon').css('background', 'url(' + gapi.auth2.getAuthInstance().currentUser.Ab.w3.Paa + ') center/cover')

                        //allow task titles to be edited using the html contenteditable property
                        var taskTitleEdits;
                        $('.task-title').focusin(function(){
                            taskTitleEdits = this.innerText;
                        });
                        $('.task-title').focusout(function(){
                            if(taskTitleEdits != this.innerText){
                                var taskID = this.parentNode.parentNode.id;
                                var params = {'title':this.innerText}
                                humanTasks.tasks.edit(currentList, taskID, params);
                            }
                        });
                    });
                }
            }
            //switch to first tasklist section
            $('section').hide();
            $('section#'+taskLists[0].id).show();
            //allow user to add tasks
            addTasksButton();
            //FINISH "LOADING SCREEN"
            $('.taskListSelector').fadeIn('slow');
            $('#task-wrapper').fadeIn('slow');
            $('header').fadeIn('slow');
        });
    }
}

function addTasksButton(){
    //when the add tasks button is clicked 
    $('.addTask').click(function(){
        $('.addTaskForm').css('display','flex');
        $('.addTaskFormGrey').show()
    })
    //when the add tasks form is active and its clicked outside of
    $('.addTaskFormGrey').click(function(){
        $('.addTaskForm').hide();
        $('.addTaskFormGrey').hide()
    })
    //when the form submit button is clicked
    $('.addTaskButton').click(function(){
        //add task to current list
        var params = {'title': $('#formTaskTitle').val()}
        humanTasks.tasks.add(currentList,params,function(task){
            $('#task-wrapper section#'+currentList).prepend(
                '<div class="task" id="'+task.result.id+'">'+
                    '<button onclick="setElementAsCompleted(this)" id="task-button"><i class="fas fa-check"></i></button>'+
                    '<div class="task-details">'+
                        '<h2 contenteditable="true" class="task-title">'+task.result.title+'</h2>'+
                    '</div>'+
                    '<button onclick="deleteElement(this)" id="delete-task-button"><i class="fas fa-times"></i></button>'+
                '</div>'
            );  
        })
        //close the add tasks page
        $('.addTaskForm').hide();
        $('.addTaskFormGrey').hide()
    })
}

//set selected task to "completed"
function setElementAsCompleted(x){
    humanTasks.tasks.complete(currentList, x.parentNode.id)
    $('#'+x.parentNode.id).remove();
}

//set selected task to "deleted"
function deleteElement(x){
    humanTasks.tasks.edit(currentList, x.parentNode.id, {'deleted':'true'})
    $('#'+x.parentNode.id).remove();
}