'use strict';

describe('uikit.services.TT', function() {
    var TT,
        $q,
        $rootScope,
        tt_deferred,
        window_mock;

    beforeEach(module('uikit.services'));

    beforeEach(function() {
        window_mock = {
            TT: {
                native: {
                    init: function() {
                        return {
                            done: function(callback) {
                                tt_deferred = $q.defer();
                                return tt_deferred.promise.then(callback);
                            }
                        };
                    },
                    loaded: jasmine.createSpy(),
                    showStatus: jasmine.createSpy(),
                    accessToken: undefined
                }
            }
        };
        tt_deferred = undefined;

        module(function($provide) {
            $provide.value('$window', window_mock);
        });

        inject(function($injector) {
            $q = $injector.get('$q');
            $rootScope = $injector.get('$rootScope');
            TT = $injector.get('TT');
        });
    });

    describe('in general', function() {
        it('should exist', function() {
            expect(TT).toBeDefined();
        });

        it('should be a promise', function() {
            // Is it possible to check that it's actually a promise?
            expect(TT.then).toBeDefined();
        });

        it('should (only) call TT.native.loaded() when done', function() {
            expect(window_mock.TT.native.loaded).not.toHaveBeenCalled();
            tt_deferred.resolve();
            $rootScope.$apply();
            expect(window_mock.TT.native.loaded).toHaveBeenCalled();
        });
    });

    describe('when unauthorized', function() {
        beforeEach(function() {
            window_mock.TT.native.accessToken = undefined;
        });

        it('should not expose an accessToken', function() {
            var accessToken = undefined;

            TT.then(function(resp) { accessToken = resp.accessToken; });
            tt_deferred.resolve();
            $rootScope.$apply();

            expect(accessToken).not.toBeDefined();
        });

        it('should call TT.native.showStatus', function() {
            expect(window_mock.TT.native.showStatus).not.toHaveBeenCalled();

            tt_deferred.resolve();
            $rootScope.$apply();

            expect(window_mock.TT.native.showStatus).toHaveBeenCalled();
        });

        it('should return Unauthorized error message', function() {
            var error;

            TT.then(undefined, function(resp) { error = resp.error; });
            tt_deferred.resolve();
            $rootScope.$apply();

            expect(error).toEqual('Unauthorized');
        });
    });

    describe('when authorized', function() {
        beforeEach(function() {
            window_mock.TT.native.accessToken = 'ACCESS_TOKEN';
        });

        it('should expose a valid accessToken', function() {
            var accessToken;
            TT.then(function(resp) { accessToken = resp.accessToken; });
            tt_deferred.resolve();
            $rootScope.$apply();

            expect(accessToken).toEqual(window_mock.TT.native.accessToken);
        });
    });
});
