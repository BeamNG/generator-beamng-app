angular.module('beamng.apps')
.directive('<%= directive %>', ['$log', 'StreamsManager', function ($log, StreamsManager) {
  return {
    restrict: 'E',
    template: 
      '<object style="width:100%; height:100%; box-sizing:border-box; pointer-events: none" type="image/svg+xml" data="modules/apps/<%= dirName %>/app.svg?t="' + Date.now() + '"/>',
    replace: true,
    <% if (hasSettings) { %>require: '^bngApp', <% } %>
    link: function (scope, element, attrs<% if (hasSettings) { %>, ctrl<% } %>) {<% if (streams.length > 0) { %>

      var streamsList = ['<%- streams.join("', '") %>'];
      StreamsManager.add(streamsList);<% } %>

      <% if (hasSettings) { %>var appSettings = null;

      // Request saved settings when DOM is ready and controllers set up.
      element.ready(function () {
        ctrl.getSettings().then(function (settings) {
          appSettings = settings;
        });
      });<% } %>

      element.on('load', function () {
        var svg = angular.element(element[0].contentDocument);

        <%if (streams.length > 0) {%>scope.$on('streamsUpdate', function (event, streams) {
          <% for (var s in streams) { %>// var <%= streams[s] %> = streams.<%= streams[s] %>;
          <% } %>
        });<% } %>
      });

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
