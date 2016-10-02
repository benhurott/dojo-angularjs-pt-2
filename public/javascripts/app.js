angular.module('dojo', [])

.controller('HomeCtrl', ['$scope', function($scope){

    $scope.movies = [
        {
            id: 1,
            title: 'The Walking Dead',
            ranking: 4,
            imageUrl: 'images/the-walking-dead.png'
        },
        {
            id: 2,
            title: 'Stranger Things',
            ranking: 5,
            imageUrl: 'images/stranger-things.jpg'
        },
        {
            id: 3,
            title: 'American Horror Story',
            ranking: 3,
            imageUrl: 'images/american-horror-story.jpg'
        }
    ];

    $scope.getStars = function(number) {
        return new Array(number);
    };

}]);