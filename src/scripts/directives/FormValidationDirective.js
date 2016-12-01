'use strict';

angular.module('venus')
.directive('formValidation', function ($window, scroll) {
    return {
        restrict: 'A',
        require : '^form',
        scope   : {
            formValidationOffsetTop: '=?',
            formValidationNoScroll : '=?',
        },
        link    : function (scope, element, attrs, formController) {
            var excludedInputs   = [
                'submit',
                'reset',
                'button'
            ];
            var includedElements = [
                'TEXTAREA',
                'SELECT'
            ];

            // Set form as changed
            function setFormChanged () {
                formController.changed = true;
            }

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
                return el.parentElement.offsetTop + el.offsetTop;
            };

            // Insert event listener in elements to mark form as changed
            scope._childsListen = function (form) {
                for (var k = 0; k < form.length; k++) {
                    var field = form[k];

                    if (k === form.length) {
                        return;
                    }

                    if (angular.isObject(field) && !angular.isArray(field)) {
                        var fieldElement = angular.element(field);

                        if (fieldElement.type && excludedInputs.indexOf(fieldElement.type) === -1 ||
                            includedElements.indexOf(fieldElement.tagName) > -1) {

                            fieldElement.on('keypress', setFormChanged());
                            fieldElement.on('change', setFormChanged());
                        }

                    }
                }
            };

            // Verify fields
            scope._validateFields = function (form, offsetTop, evt) {
                for (var j = 0; j < form.length; j++) {
                    var field = form[j]; // uses native 'focus'

                    if (angular.isObject(field) && !angular.isArray(field)) {
                        var fieldElement = angular.element(field); // uses angular resources

                        // In case of an invalid/required field
                        if (fieldElement.hasClass('ng-invalid-required')) {
                            // Scroll page to the field position
                            if (!scope.formValidationNoScroll) {
                                var scrollPosition =
                                    scope._getElementOffsetTop(field) + form.offsetTop - offsetTop;

                                scroll.toTop(scrollPosition);
                            }

                            // Apply focus in field
                            field.focus();

                            // prevent submit
                            return evt.preventDefault();
                        }
                    }
                }
            };

            // Initialize variables
            scope._init = function () {
                var form      = element[0];
                var offsetTop = parseInt(scope.formValidationOffsetTop) || scope._getOffsetTop();

                formController.changed = false;

                // Initialize listener in childs
                scope._childsListen(form);

                // Wait for submit
                element.on('submit', function (e) {

                    // Verify fields
                    scope._validateFields(form, offsetTop, e);

                });

                // Add css class to form
                element.addClass('form--validation');
            };

            // Initialize directive
            scope._init();
        },
    };
});
