angular.module('beamng.apps')
.directive('<%= directive %>', ['$log', 'StreamsManager', function ($log, StreamsManager) {
  return {
    restrict: 'E',
    template: '<div style="width:100%; height:100%;">This is an app!</div>',
    replace: true,
    link: function (scope, element, attrs) {<% if (streams.length > 0) { %>
      var streamsList = ['<%- streams.join("', '") %>'];
      StreamsManager.add(streamsList);
      scope.$on('$destroy', function () {
        StreamsManager.remove(streamsList);
      });

      scope.$on('streamsUpdate', function (streams) {
        <% for (var s in streams) { %> // var <%= streams[s] %> = streams.<%= streams[s] %>;  
        <% } %>
      }); <% } %>
    }
  };
}]);
