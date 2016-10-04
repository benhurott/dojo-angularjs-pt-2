angular.module('dojo', [])

    .constant('API', {
        url: '/api'
    })

    .value('API_URL', '/api')

    .controller('HomeCtrl', ['$scope', '$http', 'MovieService', 'LoaderService', function ($scope, $http, MovieService, LoaderService) {

        $scope.movies = [];

        $scope.onSelectMovie = function (movie) {
            console.log(MovieService.up());
        };

        $scope.loadMovies = function() {
            //$scope.movies = MovieService.getMovies();
            LoaderService.show();

            MovieService.getMovies()
                .then(function (movies) {
                    $scope.movies = movies;
                    LoaderService.hide();
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

    .constant('LOADER_EVENTS', {
        SHOW: '$myAppLoaderEventsShow',
        HIDE: '$myAppLoaderEventsHide'
    })

    .directive('loader', ['LOADER_EVENTS', function(LOADER_EVENTS){

        return {
            restrict: 'E',
            templateUrl: 'templates/directives/loader/loader.html',
            link: function(scope, element, attrs) {
                scope.$on(LOADER_EVENTS.SHOW, function() {
                    scope.visible = true;
                });

                scope.$on(LOADER_EVENTS.HIDE, function() {
                    scope.visible = false;
                });
            }
        };
    }])

    .factory('LoaderService', ['$rootScope', 'LOADER_EVENTS', function($rootScope, LOADER_EVENTS){
        return {
            show: function() {
                $rootScope.$broadcast(LOADER_EVENTS.SHOW);
            },
            hide: function() {
                $rootScope.$broadcast(LOADER_EVENTS.HIDE);
            }
        }
    }])

    .factory('MovieService', ['$http', 'API', function ($http, API) {
        
        return {
            getMovies: function () {
                return $http.get(API.url + '/movies')
                    .then(function(response) {
                        return response.data;
                    });
            }
        };
    }])




