'use strict';

angular.module('venus')
.directive('formValidation', function (scroll, $window) {
    return {
        restrict: 'A',
        require : '^form',
        scope   : {
            formValidationOffsetTop: '=?',
        },
        link    : function (scope, element, attrs, formController) {
            // Get body offset top based on device width
            scope._getOffsetTop = function () {
                // Large Devices
                if ($window.innerWidth > 1024) {
                    return 40;

                } else {
                    return 80;
                }
            };

            // Get element offset top
            scope._getElementOffsetTop = function (el) {
                return el.parentElement.offsetTop;
            };

            var form      = element[0];
            var offsetTop = parseInt(scope.formValidationOffsetTop) || scope._getOffsetTop();

            formController.changed = false;

            // Wait for submit
            element.bind('submit', function (e) {

                // Verify fields
                for (var j in form) {
                    var field = form[j]; // uses native 'focus'

                    if (angular.isObject(field) && !angular.isArray(field)) {
                        var fieldElement = angular.element(field); // uses angular resources

                        // In case of an invalid/required field
                        if (fieldElement.hasClass('ng-invalid-required')) {
                            // Scroll page to the field position
                            var scrollPosition = scope._getElementOffsetTop(field);
                            scroll.toTop(scrollPosition - offsetTop);

                            // Apply focus in field
                            field.focus();

                            // prevent submit
                            return e.preventDefault();
                        }
                    }
                }

            });

            // Add css class to form
            element.addClass('form--validation');

            // Insert event listener in elements to mark form as changed
            for (var k = 0; k < form.length; k++) {
                var field = form[k];

                if (k === form.length) {
                    return;
                }

                if (angular.isObject(field) && !angular.isArray(field)) {
                    var fieldElement = angular.element(field);

                    fieldElement.bind('keypress', function () {
                        formController.changed = true;
                    });

                    fieldElement.bind('change', function () {
                        formController.changed = true;
                    });
                }
            }
        },
    };
});
