/*
     A properly documented and not at all overcomplicated 
    script by https://ryncmrfrd.me. It's downhill from here.
*/
var humanTasks = {
    isInitialised: !1,
    init: function(callback) {
        if (!callback) {
            console.error('Callback function has not been provided');
            return
        }
        gapi.load('client:auth2', function() {
            gapi.client.init({
                apiKey: 'AIzaSyASt3Og3sWDH1M_FrktQBpEunDCrYBklis',
                clientId: '992470092590-vupnkaegj4buv46kmbgdsd2f2v2lhtc9.apps.googleusercontent.com',
                discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/tasks/v1/rest"],
                scope: 'https://www.googleapis.com/auth/tasks'
            }).then(function() {
                humanTasks.isInitialised = !0;
                humanTasks.callback(callback)
            })
        })
    },
    auth: {
        isLoggedIn: function() {
            if (!humanTasks.isInitialised) {
                console.error('Function "tasks.init()" must be called first');
                return
            }
            return gapi.auth2.getAuthInstance().isSignedIn.get()
        },
        login: function(callback) {
            if (!humanTasks.isInitialised) {
                console.error('Function "tasks.init()" must be called first');
                return
            }
            gapi.auth2.getAuthInstance().signIn().then(function() {
                if (callback) {
                    humanTasks.callback(callback)
                }
            })
        },
        logout: function(callback) {
            if (!humanTasks.isInitialised) {
                console.error('Function "tasks.init()" must be called first');
                return
            }
            gapi.auth2.getAuthInstance().signOut().then(function() {
                if (callback) {
                    humanTasks.callback(callback)
                }
            })
        }
    },
    taskLists: {
        get: function(callback) {
            if (!humanTasks.isInitialised) {
                console.error('Function "tasks.init()" must be called first');
                return
            } else if (arguments.length == 0) {
                console.error('Incorrect function parameters');
                return
            }
            gapi.client.tasks.tasklists.list().then(function(response) {
                if (callback) {
                    humanTasks.callback(callback, response.result.items)
                }
            })
        },
        add: function(title, callback) {
            if (!humanTasks.isInitialised) {
                console.error('Function "tasks.init()" must be called first');
                return
            } else if (arguments.length == 0) {
                console.error('Incorrect function parameters');
                return
            }
            gapi.client.tasks.tasklists.insert({
                title: title
            }).then(function() {
                if (callback) {
                    humanTasks.callback(callback)
                }
            })
        },
        remove: function(taskListId, callback) {
            if (!humanTasks.isInitialised) {
                console.error('Function "tasks.init()" must be called first');
                return
            } else if (arguments.length == 0) {
                console.error('Incorrect function parameters');
                return
            }
            gapi.client.tasks.tasklists.delete({
                tasklist: taskListId
            }).then(function() {
                if (callback) {
                    humanTasks.callback(callback)
                }
            })
        },
        edit: function(taskListId, title, callback) {
            if (!humanTasks.isInitialised) {
                console.error('Function "tasks.init()" must be called first');
                return
            } else if (arguments.length == 0) {
                console.error('Incorrect function parameters');
                return
            }
            gapi.client.tasks.tasklists.update({
                tasklist: taskListId,
                id: taskListId,
                title: title
            }).then(function() {
                if (callback) {
                    humanTasks.callback(callback)
                }
            })
        }
    },
    tasks: {
        get: function(taskListId, callback) {
            if (!humanTasks.isInitialised) {
                console.error('Function "tasks.init()" must be called first');
                return
            } else if (arguments.length == 0) {
                console.error('Incorrect function parameters');
                return
            }
            gapi.client.tasks.tasks.list({
                tasklist: taskListId
            }).then(function(response) {
                if (callback) {
                    humanTasks.callback(callback, response.result.items)
                }
            })
        },
        add: function(taskListId, params, callback) {
            if (!humanTasks.isInitialised) {
                console.error('Function "tasks.init()" must be called first');
                return
            } else if (arguments.length == 0) {
                console.error('Incorrect function parameters');
                return
            }
            gapi.client.tasks.tasks.insert({
                tasklist: taskListId,
                resource: params
            }).then(function(response) {
                if (callback) {
                    humanTasks.callback(callback, response)
                }
            })
        },
        remove: function(taskListId, callback) {
            if (!humanTasks.isInitialised) {
                console.error('Function "tasks.init()" must be called first');
                return
            } else if (arguments.length == 0) {
                console.error('Incorrect function parameters');
                return
            }
            gapi.client.tasks.tasks.delete({
                tasklist: taskListId,
                task: taskId,
                id: taskId
            }).then(function() {
                if (callback) {
                    humanTasks.callback(callback)
                }
            })
        },
        edit: function(taskListId, taskId, params, callback) {
            if (!humanTasks.isInitialised) {
                console.error('Function "tasks.init()" must be called first');
                return
            } else if (arguments.length == 0) {
                console.error('Incorrect function parameters');
                return
            }
            gapi.client.tasks.tasks.patch({
                tasklist: taskListId,
                task: taskId,
                resource: params
            }).then(function(response) {
                if (callback) {
                    humanTasks.callback(callback, response)
                }
            })
        },
        complete: function(taskListId, taskId, callback) {
            gapi.client.tasks.tasks.patch({
                tasklist: taskListId,
                task: taskId,
                resource: {
                    'status': 'completed'
                }
            }).then(function(response) {
                if (callback) {
                    humanTasks.callback(callback, response)
                }
            })
        }
    },
    callback: function(callback, params) {
        if (arguments.length == 0) {
            console.error('Incorrect function parameters');
            return
        }
        if (!params) {
            callback()
        } else {
            callback(params)
        }
    }
}

var currentList;
$('#task-list-title').change(function() {
    currentList = $(this).val();
    $('section').hide();
    $('section#' + currentList).show()
});

function startApp() {
    if (!humanTasks.auth.isLoggedIn()) {
        window.location.href = 'login'
    } else {
        getTaskLists()
    }

    function getTaskLists() {
        humanTasks.taskLists.get(function(taskLists) {
            for (var i = 0; i < taskLists.length; i++) {
                $('#task-wrapper').append('<section id="' + taskLists[i].id + '"></section>');
                $('#task-list-title').append('<option value="' + taskLists[i].id + '">' + taskLists[i].title + '</option>');
                currentList = $('#task-list-title').val()
                getTasksFromList(taskLists[i].id);

                function getTasksFromList(x) {
                    humanTasks.tasks.get(x, function(tasks) {
                        for (var i = 0; i < tasks.length; i++) {
                            if (tasks[i].status == 'needsAction') {
                                $('#task-wrapper section#' + x).append('<div class="task" id="' + tasks[i].id + '">' + '<button onclick="setElementAsCompleted(this)" id="task-button"><i class="fas fa-check"></i></button>' + '<div class="task-details">' + '<h2 contenteditable="true" class="task-title">' + tasks[i].title + '</h2>' + '</div>' + '<button onclick="deleteElement(this)" id="delete-task-button"><i class="fas fa-times"></i></button>' + '</div>')
                            }
                        }
                        $('.user-icon').css('background', 'url(' + gapi.auth2.getAuthInstance().currentUser.Ab.w3.Paa + ') center/cover');
                        var taskTitleEdits;
                        $('.task-title').focusin(function() {
                            taskTitleEdits = this.innerText
                        });
                        $('.task-title').focusout(function() {
                            if (taskTitleEdits != this.innerText) {
                                var taskID = this.parentNode.parentNode.id;
                                var params = {
                                    'title': this.innerText
                                }
                                humanTasks.tasks.edit(currentList, taskID, params)
                            }
                        })
                    })
                }
            }
            $('section').hide();
            $('section#' + taskLists[0].id).show();
            addTasksButton();
            $('.taskListSelector').fadeIn('slow');
            $('#task-wrapper').fadeIn('slow');
            $('header').fadeIn('slow')
        })
    }
}

function addTasksButton() {
    $('.addTask').click(function() {
        $('.addTaskForm').css('display', 'flex');
        $('.addTaskFormGrey').show()
    })
    $('.addTaskFormGrey').click(function() {
        $('.addTaskForm').hide();
        $('.addTaskFormGrey').hide()
    });
    $('.addTaskButton').click(function() {
        var params = {
            'title': $('#formTaskTitle').val()
        }
        humanTasks.tasks.add(currentList, params, function(task) {
            $('#task-wrapper section#' + currentList).prepend('<div class="task" id="' + task.result.id + '">' + '<button onclick="setElementAsCompleted(this)" id="task-button"><i class="fas fa-check"></i></button>' + '<div class="task-details">' + '<h2 contenteditable="true" class="task-title">' + task.result.title + '</h2>' + '</div>' + '<button onclick="deleteElement(this)" id="delete-task-button"><i class="fas fa-times"></i></button>' + '</div>')
        })
        $('.addTaskForm').hide();
        $('.addTaskFormGrey').hide()
    })
}

function setElementAsCompleted(x) {
    humanTasks.tasks.complete(currentList, x.parentNode.id)
    $('#' + x.parentNode.id).remove()
}

function deleteElement(x) {
    humanTasks.tasks.edit(currentList, x.parentNode.id, {
        'deleted': 'true'
    });
    $('#' + x.parentNode.id).remove()
}