'use strict';


angular.module('uikit.directives', []).
    directive('uikitTooltip', [function() {
        return {
            restrict: 'A',
            link: function(scope, elem, attrs) {
                elem.tooltip();
            }
        };
    }]).
    directive('uikitSelect', [function() {
        return {
            restrict: 'A',
            link: function(scope, elem, attrs) {
                elem.select();
                if (attrs.ngModel) {
                    scope.$watch(attrs.ngModel, function(newVal, oldVal) {
                        /* Trigger namespaced change event on the select,
                         * so select2 gets updated without messing up
                         * angular's digest cycle.
                         */
                        elem.trigger("change.select2");
                    });
                }
            }
        };
    }]).
    directive('uikitNavbar', [function() {
        return {
            restrict: 'A',
            link: function(scope, elem, attrs) {
                elem.on("click", "a", function(e) {
                    elem.find(".active").removeClass("active");
                    $(this).addClass("active");
                });
            }
        };
    }]).
    directive('uikitCheckbox', ['$parse', function($parse) {
        return {
            restrict: 'A',
            link: function(scope, elem, attrs) {
                elem.check();
                if (attrs.ngModel) {
                    var model = $parse(attrs.ngModel);
                    elem.on('ifChanged', function(e) {
                        if (model(scope) != e.target.checked) {
                            scope.$apply(function() {
                                return model.assign(scope, e.target.checked);
                            });
                        }
                    });
                    elem.check("update");
                    scope.$watch(attrs.ngModel, function(newVal, oldVal) {
                        elem.check("update");
                    });
                }
            }
        };
    }]);
