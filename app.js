      // Client ID and API key from the Developer Console
      var CLIENT_ID = '248150601049-fbibbrvjeqojdj45csgilhmj2vk7240e.apps.googleusercontent.com';
      var API_KEY = 'AIzaSyArBQrznPzgD5aU_NKPWkorEaklGkIBouM';

      // Array of API discovery doc URLs for APIs used by the quickstart
      var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/tasks/v1/rest"];

      // Authorization scopes required by the API; multiple scopes can be
      // included, separated by spaces.
      var SCOPES = "https://www.googleapis.com/auth/tasks";

      var authorizeButton = document.getElementById('authorize_button');
      var signoutButton = document.getElementById('signout_button');

      /**
       *  On load, called to load the auth2 library and API client library.
       */
      function clientLoad() {
        gapi.load('client:auth2', function(){
          gapi.client.init({
            apiKey: API_KEY,
            clientId: CLIENT_ID,
            discoveryDocs: DISCOVERY_DOCS,
            scope: SCOPES
          }).then(function(){
            // Listen for sign-in state changes.
            gapi.auth2.getAuthInstance().isSignedIn.listen(function(){
              if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
                authorizeButton.style.display = 'none';
                signoutButton.style.display = 'block';
                listTaskLists();
              } else {
                authorizeButton.style.display = 'block';
                signoutButton.style.display = 'none';
              }
            });

            authorizeButton.onclick = handleAuthClick;
            signoutButton.onclick = handleSignoutClick;
          });
        });
      }

      /**
       * Print task lists.
       */
      function listTaskLists(){
        gapi.client.tasks.tasklists.list().then(function(response) {
          var taskLists = response.result.items;
          $('pre').append('Task Lists:');
          if (taskLists && taskLists.length > 0) {
            for (var i = 0; i < taskLists.length; i++) {
              var taskList = taskLists[i];
              $('pre').append(taskList.title + ' (' + taskList.id + ')');
            }
          } else {
            $('pre').append('No task lists found.');
          }
        });
      }