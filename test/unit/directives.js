'use strict';


describe('uikit.directives.uikitTooltip', function() {
    var element,
        $scope,
        $compile,
        template = '<a href="#" uikit-tooltip title="Some title">Link text</a>';

    function createDirective(template) {
        return $compile(angular.element(template))($scope);
    }

    beforeEach(function() {
        module('uikit.directives');

        inject(function($injector) {
            $scope = $injector.get('$rootScope').$new();
            $compile = $injector.get('$compile');
        });

        spyOn($.fn, 'tooltip').andCallThrough();
    });

    it('should call element.tooltip() when it is created/compiled/linked', function() {
        element = createDirective(template);
        expect($.fn.tooltip).toHaveBeenCalled();
    });
});

describe('uikit.directives.uikitSelect', function() {
    var element,
        $scope,
        $compile,
        template_single = '<select uikit-select ng-model="data" ng-options="opt.id as opt.text for opt in options"></select>',
        template_multi = '<select uikit-select ng-model="data" ng-options="opt.id as opt.text for opt in options" multiple></select>';

    function createDirective(template) {
        return $compile(angular.element(template))($scope);
    }

    beforeEach(function() {
        module('uikit.directives');

        inject(function($injector) {
            $scope = $injector.get('$rootScope').$new();
            $compile = $injector.get('$compile');
        });

        $scope.options = [{ id: "val1", text: "Val 1" }, { id: "val2", text: "Val 2" }];

        spyOn($.fn, 'select').andCallThrough();
    });

    describe('single choice', function() {
        beforeEach(function() {
            $scope.data = "val1";
        });

        it('should call element.select() when it is created/compiled/linked', function() {
            element = createDirective(template_single);
            expect($.fn.select).toHaveBeenCalled();
        });

        it('should trigger "change.select2" set when its bound model changes', function() {
            element = createDirective(template_single);
            var changed = 0;
            element.on("change.select2", function() {
                ++changed;
            });
            $scope.data = "val2";
            $scope.$apply();
            expect(changed).toEqual(1);
        });

        it('should have the correct value set in the api', function() {
            element = createDirective(template_single);
            $scope.$apply();
            expect(element.select2("val")).toEqual("0");
        });

        it('should have the correct value set in the api when the model changes', function() {
            element = createDirective(template_single);
            $scope.$apply();
            $scope.data = "val2";
            $scope.$apply();
            expect(element.select2("val")).toEqual("1");
        });

        it('should update the model correctly when a new option is selected', function() {
            element = createDirective(template_single);
            $scope.$apply();
            element.select2("val", "1", true);
            $scope.$apply();
            expect($scope.data).toEqual("val2");
        });
    });

    describe('multi choice', function() {
        beforeEach(function() {
            $scope.data = [];
        });

        it('should call element.select() when it is created/compiled/linked', function() {
            element = createDirective(template_multi);
            expect($.fn.select).toHaveBeenCalled();
        });

        it('should trigger "change.select2" set when its bound model changes', function() {
            element = createDirective(template_multi);
            var changed = 0;
            element.on("change.select2", function() {
                ++changed;
            });
            $scope.data = "val2";
            $scope.$apply();
            expect(changed).toEqual(1);
        });

        it('should have the correct value set in the api', function() {
            element = createDirective(template_multi);
            $scope.$apply();
            expect(element.select2("val")).toEqual([]);
        });

        it('should have the correct value set in the api when the model changes', function() {
            element = createDirective(template_multi);
            $scope.$apply();
            $scope.data = ["val2"];
            $scope.$apply();
            expect(element.select2("val")).toEqual(["1"]);
        });

        it('should update the model correctly when a new option is selected', function() {
            element = createDirective(template_multi);
            $scope.$apply();
            element.select2("val", ["1"], true);
            $scope.$apply();
            expect($scope.data).toEqual(["val2"]);
        });
    });
});

describe('uikit.directives.uikitNavbar', function() {
    var element,
        $scope,
        $compile,
        template = '<nav class="navbar">\
                        <ul class="nav navbar-nav" uikit-navbar>\
                            <li><a href="#/link1">Link 1</a></li>\
                            <li><a href="#/link2">Link 2</a></li>\
                            <li><a href="#/link3">Link 3</a></li>\
                        </ul>\
                    </nav>';

    function createDirective(template) {
        return $compile(angular.element(template))($scope);
    }

    beforeEach(function() {
        module('uikit.directives');

        inject(function($injector) {
            $scope = $injector.get('$rootScope').$new();
            $compile = $injector.get('$compile');
        });

        spyOn($.fn, 'select').andCallThrough();
    });

    it('it should add class "active" on a link when it is clicked', function() {
        element = createDirective(template);
        element.find("a:eq(0)").trigger("click");
        expect(element.find("a:eq(0)").hasClass("active")).toBe(true);
    });

    it('should remove class "active" from all other links when a link is clicked', function() {
        element = createDirective(template);
        element.find("a:eq(0), a:eq(2)").addClass("active");
        element.find("a:eq(1)").trigger("click");
        expect(element.find("a:eq(0)").hasClass("active")).toBe(false);
        expect(element.find("a:eq(2)").hasClass("active")).toBe(false);
    });
});

describe('uikit.directives.uikitCheckbox', function() {
    var element,
        $scope,
        $compile,
        template = '<input type="checkbox" uikit-checkbox ng-model="data">';

    function createDirective(template) {
        return $compile(angular.element(template))($scope);
    }

    beforeEach(function() {
        module('uikit.directives');

        inject(function($injector) {
            $scope = $injector.get('$rootScope').$new();
            $compile = $injector.get('$compile');
        });

        spyOn($.fn, 'check').andCallThrough();
    });

    it('should call element.check() when it is created/compiled/linked', function() {
        element = createDirective(template);
        expect($.fn.check).toHaveBeenCalled();
    });

    it('should call element.check("update") when its associated model is changed', function() {
        element = createDirective(template);
        $scope.data = true;
        $scope.$apply();
        expect($.fn.check.callCount).toBe(3);
    });

    it('should update the model when checked', function() {
        element = createDirective(template);
        $scope.data = false;
        $scope.$apply();
        element.check('check');
        $scope.$apply();
        expect($scope.data).toBe(true);
    });
});
