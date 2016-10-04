angular.module('dojo', [])

    .constant('API', {
        url: '/api'
    })

    .value('API_URL', '/api')

    .controller('HomeCtrl', ['$scope', '$http', 'MovieService', function ($scope, $http, MovieService) {

        $scope.movies = [];

        $scope.onSelectMovie = function (movie) {
            console.log(MovieService.up());
        };

        $scope.loadMovies = function() {
            //$scope.movies = MovieService.getMovies();

            MovieService.getMovies()
                .then(function (movies) {
                    $scope.movies = movies;
                });
        };
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

                function applySlick() {
                    if(scope.movies && scope.movies.length) {
                        angular.element(document).ready(function () {
                            $('.movie-collection').slick({
                                dots: true,
                                autoplay: true,
                                autoplaySpeed: 3000,
                            });
                        });
                    }
                }

                scope.__onSelectMovie = function (movie) {
                    scope.onSelectMovie()(movie);
                };

                scope.$watch('movies', function() {
                    applySlick();
                });
            }
        };
    }])

    .factory('MovieService', ['$http', 'API', function ($http, API_URL) {
        
        return {
            getMovies: function () {
                return $http.get(API_URL + '/movies')
                    .then(function(response) {
                        return response.data;
                    });
            }
        };
    }])




