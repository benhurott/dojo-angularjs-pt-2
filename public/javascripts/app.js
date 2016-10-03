angular.module('dojo', [])

    .controller('HomeCtrl', ['$scope', function ($scope) {

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

        $scope.onSelectMovie = function (movie) {
            alert(movie.title);
        };


        $(document).ready(function(){
            $('.movie-collection').slick();
        });

    }])


    .directive('myStars', [function () {
        return {
            restrict: 'E',
            templateUrl: 'templates/directives/my-stars/my-stars.html',
            scope: {
                stars: '='
            },
            link: function (scope, element, attrs) {
                scope.getStars = function (number) {
                    return new Array(number);
                };
            }
        };
    }])

    .directive('movieCollection', [function () {
        return {
            restrict: 'E',
            templateUrl: 'templates/directives/movie-collection/movie-collection.html',
            scope: {
                movies: '=',
                onSelectMovie: '&'
            },
            link: function (scope, element, attrs) {
                scope.__onSelectMovie = function (movie) {
                    scope.onSelectMovie()(movie);
                };

                angular.element(document).ready(function () {
                    $('.movie-collection').slick({
                        dots: true,
                        autoplay: true,
                        autoplaySpeed: 3000,
                    });;
                });
            }
        };
    }])




