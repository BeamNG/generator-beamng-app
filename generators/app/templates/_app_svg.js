angular.module('beamng.apps')
.directive('<%= directive %>', ['$log', 'StreamsManager', function ($log, StreamsManager) {
  return {
    restrict: 'E',
    template: 
      '<object style="width:100%; height:100%; box-sizing:border-box; pointer-events: none" type="image/svg+xml" data="modules/apps/<%= dirName %>/app.svg?t="' + Date.now() + '"/>',
    replace: true,
    link: function (scope, element, attrs) {<% if (streams.length > 0) { %>
      var streamsList = ['<%- streams.join("', '") %>'];
      StreamsManager.add(streamsList);
      scope.$on('$destroy', function () {
        StreamsManager.remove(streamsList);
      }); <% } %>

      element.on('load', function () {
        var svg = angular.element(element[0].contentDocument);

        <%if (streams.length > 0) {%>scope.on('streamsUpdate', function (event, streams) {
          <% for (var s in streams) { %>// var <%= streams[s] %> = streams.<%= streams[s] %>;
          <% } %>
        });<% } %>
      });
    }
  };
}]);
