(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.googleTasksApi = factory());
  }(this, (function () { 'use strict';
  
    var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
  
    function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
  
    var googleTasksApi = {
      auth: undefined,
  
      load: function load() {
        if (this.isLoaded()) return Promise.resolve();
  
        return new Promise(function (resolve) {
          window.handleGoogleApi = function () {
            return resolve();
          };
          var script = document.createElement('script');
          script.src = 'https://apis.google.com/js/client.js?onload=handleGoogleApi';
          document.body.appendChild(script);
        });
      },
      isLoaded: function isLoaded() {
        return window.gapi && gapi.auth && typeof gapi.auth.getToken === 'function';
      },
      isSignedIn: function isSignedIn() {
        if (!this.auth) throw new Error('You must call authorize() first');
        return this.auth.isSignedIn.get();
      },
      signIn: function signIn() {
        return this.auth.signIn();
      },
      loadClient: function loadClient() {
        return new Promise(function (resolve) {
          return gapi.client.load('tasks', 'v1', function () {
            return gapi.client.load('plus', 'v1', function () {
              return resolve();
            });
          });
        });
      },
      authorize: async function authorize(clientId) {
        var uxMode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'redirect';
        var redirectUri = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
  
        await this.load();
  
        if (!redirectUri) redirectUri = window.location.href;
  
        this.auth = await gapi.auth2.init({
          client_id: clientId,
          ux_mode: uxMode,
          redirect_uri: redirectUri,
          scope: 'https://www.googleapis.com/auth/tasks'
        });
      },
      googleTasksApi: async function logout() {
        await this.load();
  
        return new Promise(function (resolve, reject) {
          var token = gapi.auth.getToken();
  
          if (token) {
            var accessToken = gapi.auth.getToken().access_token;
  
            fetch('https://accounts.google.com/o/oauth2/revoke?token=' + accessToken, {
              mode: 'no-cors'
            })
            .then(function () {
              gapi.auth.signOut();
              resolve();
            })
          }
        });
      },
      listTaskLists: async function listTaskLists() {
        await this.load();
  
        return (await this.makeRequest(gapi.client.tasks.tasklists.list())).items;
      },
      insertTaskList: async function insertTaskList(_ref) {
        var title = _ref.title;
  
        await this.load();
  
        return this.makeRequest(gapi.client.tasks.tasklists.insert({
          title: title
        }));
      },
      updateTaskList: async function updateTaskList(_ref2) {
        var taskListId = _ref2.taskListId,
            title = _ref2.title;
  
        await this.load();
  
        return this.makeRequest(gapi.client.tasks.tasklists.update({
          tasklist: taskListId,
          id: taskListId,
          title: title
        }));
      },
      deleteTaskList: async function deleteTaskList(_ref3) {
        var taskListId = _ref3.taskListId;
  
        await this.load();
  
        return this.makeRequest(gapi.client.tasks.tasklists.delete({
          tasklist: taskListId
        }));
      },
      listTasks: async function listTasks(taskListId) {
        await this.load();
  
        return (await this.makeRequest(gapi.client.tasks.tasks.list({
          tasklist: taskListId
        }))).items;
      },
      insertTask: async function insertTask(_ref4) {
        var taskListId = _ref4.taskListId,
            params = _objectWithoutProperties(_ref4, ['taskListId']);
  
        await this.load();
  
        return this.makeRequest(gapi.client.tasks.tasks.insert(_extends({
          tasklist: taskListId
        }, params)));
      },
      updateTask: async function updateTask(_ref5) {
        var taskListId = _ref5.taskListId,
            taskId = _ref5.taskId,
            params = _objectWithoutProperties(_ref5, ['taskListId', 'taskId']);
  
        await this.load();
  
        return this.makeRequest(gapi.client.tasks.tasks.update(_extends({
          tasklist: taskListId,
          task: taskId,
          id: taskId
        }, params)));
      },
      deleteTask: async function deleteTask(_ref6) {
        var taskListId = _ref6.taskListId,
            taskId = _ref6.taskId;
  
        await this.load();
  
        return this.makeRequest(gapi.client.tasks.tasks.delete({
          tasklist: taskListId,
          task: taskId,
          id: taskId
        }));
      },
      makeRequest: async function makeRequest(requestObj) {
        await this.load();
  
        return new Promise(function (resolve, reject) {
          requestObj.execute(function (resp) {
            return resp.error ? reject(resp.error) : resolve(resp.result);
          });
        });
      }
    };
  
    return googleTasksApi;
  
  })));