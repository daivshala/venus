'use strict';

angular.module('venus')
.directive('formValidation', function (scroll, $window) {
    return {
        restrict: 'A',
        require : '^form',
        scope   : {
            formValidationOffsetTop: '=?',
        },
        link    : function (scope, element) {
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
                var offsetEl = el.offsetTop;

                if (offsetEl < 0) {
                    offsetEl = el.parentElement.offsetTop;
                }

                return offsetEl;
            };

            var form      = element[0];
            var offsetTop = scope.formValidationOffsetTop || scope._getOffsetTop();

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
        },
    };
});
