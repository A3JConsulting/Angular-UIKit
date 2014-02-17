'use strict';


angular.module('uikit.services', []).

    factory('TT', ['$window', '$q', function($window, $q) {
        var deferred = $q.defer();

        $window.TT.native.init().done(function() {
            $window.TT.native.loaded();
            if ($window.TT.native.accessToken) {
                deferred.resolve({
                    accessToken: $window.TT.native.accessToken
                });
            } else {
                $window.TT.native.showStatus("Unauthorized");
                deferred.reject({
                    accessToken: undefined,
                    error: 'Unauthorized'
                });
            }
        });

        return deferred.promise;
    }]);
