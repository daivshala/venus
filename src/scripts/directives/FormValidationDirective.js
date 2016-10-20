'use strict';

angular.module('venus')
.directive('formValidation', function (scroll) {
    return {
        restrict: 'A',
        require : '^form',
        scope   : {
            formValidationOffsetTop: '=?',
        },
        link    : function (scope, element) {
            var form      = element[0];
            var offsetTop = scope.formValidationOffsetTop || 40;

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
                            scroll.toTop(
                                scope._calcOffsetTop(field) - offsetTop
                            );

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

            // Calc offset top position
            scope._calcOffsetTop = function (el) {
                var offsetEl = el.offsetTop;

                if (offsetEl < 0) {
                    offsetEl = el.parentElement.offsetTop;
                }

                return offsetEl;
            };

        },
    };
});
