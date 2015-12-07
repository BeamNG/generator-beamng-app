angular.module('beamng.apps')
.directive('<%= directive %>', ['$log', 'StreamsManager', function ($log, StreamsManager) {
  return {
    restrict: 'E',
    template: '<canvas></canvas>',
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

      var canvas = element[0]
        , ctx = canvas.getContext('2d')
        , imageObj = new Image()
      ;

      imageObj.src = '../../ui/modules/apps/<%= dirName %>/app.png';
      console.log(imageObj.src);
      imageObj.onload = function () {
        ctx.drawImage(imageObj, 0, 0, canvas.width, canvas.height)
      };

      // We will probably want to resize the canvas when the app changes..
      scope.$on('app:resized', function (event, data) {
        canvas.width = data.width;
        canvas.height = data.height;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(imageObj, 0, 0, canvas.width, canvas.height)
      });
    }
  };
}]);
