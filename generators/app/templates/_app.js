angular.module('beamng.apps')
.directive('<%= directive %>', ['$log', 'StreamsManager', function ($log, StreamsManager) {
  return {
    restrict: 'E',
    template: '<div style="width:100%; height:100%;">This is an app!</div>',
    replace: true,
    <% if (hasSettings) { %>require: '^bngApp', <% } %>
    link: function (scope, element, attrs<% if (hasSettings) { %>, ctrl<% } %>) {<% if (streams.length > 0) { %>

      var streamsList = ['<%- streams.join("', '") %>'];
      StreamsManager.add(streamsList);

      scope.$on('streamsUpdate', function (streams) {
        <% for (var s in streams) { %> // var <%= streams[s] %> = streams.<%= streams[s] %>;  
        <% } %>
      }); <% } %>

      <% if (hasSettings) { %>var appSettings = null;

      // Request saved settings when DOM is ready and controllers set up.
      element.ready(function () {
        ctrl.getSettings().then(function (settings) {
          appSettings = settings;
        });
      });<% } %>
    
      // Do stuff when the app closes.
      scope.$on('$destroy', function () {
        <% if (hasSettings) { %>// Save settings
        ctrl.saveSettings(appSettings); <% } %>
        <% if (streams.length > 0)  { %>// Remove unnecessary streams
        StreamsManager.remove(streamsList); <% } %>
      });
    }
  };
}]);
