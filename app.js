$.ajax({
    url: "https://people.googleapis.com/v1/people/me?requestMask.includeField=person.names",
    //headers: {'Authorization':'Bearer '},
    data: {
        'apiKey': 'AIzaSyArBQrznPzgD5aU_NKPWkorEaklGkIBouM',
        'clientId': '248150601049-fbibbrvjeqojdj45csgilhmj2vk7240e.apps.googleusercontent.com',
        'scope': 'profile'
    },
    success: function(data){
        console.log(data)
    },
    error: function(error){
        console.error(error.responseText)
    }
});

/*function start() {
    // 2. Initialize the JavaScript client library.
    gapi.client.init({
      'apiKey': 'AIzaSyArBQrznPzgD5aU_NKPWkorEaklGkIBouM',
      // clientId and scope are optional if auth is not required.
      'clientId': '248150601049-fbibbrvjeqojdj45csgilhmj2vk7240e.apps.googleusercontent.com',
      'scope': 'profile',
    }).then(function() {
      // 3. Initialize and make the API request.
      return gapi.client.request({
        'path': 'https://people.googleapis.com/v1/people/me?requestMask.includeField=person.names',
      })
    }).then(function(response) {
      console.log(response.result);
    }, function(reason) {
      console.log('Error: ' + reason);
    });
  };
  // 1. Load the JavaScript client library.
  gapi.load('client', start);*/