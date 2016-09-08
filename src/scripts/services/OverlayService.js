'use strict';

angular.module('venus')
.factory('Overlay', function ($rootScope, $document, $compile) {

    /*
     * Create a new instance of Overlay Alert Dialog
     */
    var create = function (properties) {
        var scope = $rootScope.$new();
        var body  = $document.find('body');
        var element;

        this.defaultProperties = {
            visibility: true,

            title: 'Cautela nesta operação',
            text : 'Esta alteração pode ser de extrema importância.',

            cancel    : angular.noop,
            cancelText: 'Desfazer',

            continue    : angular.noop,
            continueText: 'Entendi, continuar mesmo assim'
        };

        scope.properties = angular.extend(this.defaultProperties, properties);

        element = angular.element('<overlay data-overlay="properties"></overlay>');
        element = $compile(element)(scope);

        body.append(element);

        return this;
    };

    return {
        create: create
    };
});
