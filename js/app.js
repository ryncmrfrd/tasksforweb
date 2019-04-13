/*
      A properly documented and not at all overcomplicated 
    script by https://ryncmrfrd.me. It's downhill from here.
*/

//global variable for currently selected tasklist
var currentList;
$('#task-list-title').change(function (){
    currentList = $(this).val();
    $('div.container').hide();
    $('div.container#'+currentList).show();
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
                $('#task-wrapper').append('<div class="container" id="'+taskLists[i].id+'"></div>');
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
                                $('#task-wrapper div#'+x).append(
                                    '<article class="message" id="'+tasks[i].id+'">'+
                                    '<div class="message-body level">'+
                                        '<div class="level-item level-left">'+
                                            '<button onclick="setElementAsCompleted(this)" class="button is-rounded is-success" style="margin-right: 20px;border-radius: 50%; width: 36px;"><i class="fas fa-check"></i></button>'+
                                            '<h1 id="task-title" class="subtitle is-4" contenteditable="true">'+tasks[i].title+'</h1>'+
                                        '</div>'+
                                        '<div class="level-item level-right">'+
                                            '<button onclick="deleteElement(this)" class="delete is-medium"></button>'+
                                        '</div>'+
                                    '</div>'+
                                '</article>'
                                );
                            }
                        }
                        //allow task titles to be edited using the html contenteditable property
                        var taskTitleEdits;
                        $('#task-title').focusin(function(){
                            taskTitleEdits = this.innerText;
                        });
                        $('#task-title').focusout(function(){
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
            $('div.container').hide();
            $('div.container#'+taskLists[0].id).show();
            //when the add tasks button is clicked 
            $('#addTaskButton').click(function(){
                $('form').show()
                $('#mainWrapper').css('filter','blur(5px)')
            })
            //when close (X) button is pressed
            $('#closeNewTaskForm').click(function(event){
                event.preventDefault()
                $('form').hide()
                $('#mainWrapper').css('filter','blur(0px)')
            })
            //when the form submit button is clicked
            $('#createTaskButton').click(function(event){
                event.preventDefault()
                //add task to current list
                var params = {'title': $('#formTaskTitle').val()}
                humanTasks.tasks.add(currentList,params,function(task){
                    $('#task-wrapper div#'+currentList).prepend(
                    '<article class="message" id="'+task.result.id+'">'+
                    '<div class="message-body level">'+
                        '<div class="level-item level-left">'+
                            '<button onclick="setElementAsCompleted(this)" class="button is-rounded is-success" style="margin-right: 20px;border-radius: 50%; width: 36px;"><i class="fas fa-check"></i></button>'+
                            '<h1 id="task-title" class="subtitle is-4" contenteditable="true">'+task.result.title+'</h1>'+
                        '</div>'+
                        '<div class="level-item level-right">'+
                            '<button onclick="deleteElement(this)" class="delete is-medium"></button>'+
                        '</div>'+
                    '</div>'+
                '</article>'
                    );  
                })
                //close the add tasks page
                $('form').hide()
                $('#mainWrapper').css('filter','blur(0px)')
            })
        });
        //finish loading screen
        $('#loader').fadeOut();
        $('main').fadeIn();
    }
}
//set selected task to "completed"
function setElementAsCompleted(x){
    humanTasks.tasks.complete(currentList, x.parentNode.parentNode.parentNode.id);
    $('#'+x.parentNode.parentNode.parentNode.id).remove();
}
//set selected task to "deleted"
function deleteElement(x){
    humanTasks.tasks.edit(currentList, x.parentNode.parentNode.parentNode.id, {'deleted':'true'})
    $('#'+x.parentNode.parentNode.parentNode.id).remove();
}