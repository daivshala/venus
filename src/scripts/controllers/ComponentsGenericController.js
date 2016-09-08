'use strict';

angular.module('venus-docs')
.controller('ComponentsGenericController', function ($scope, Overlay) {

    /*
     * Overlay Component
     */
    var test;

    $scope.createOverlay = function () {
        test = new Overlay.create({
            title: 'Overlay Dialog Test #1',
            text : 'Venus, Ingresse, Backstage, Brazil, Amazonas, São Paulo.',

            cancelText: 'Oh, wait. I won\'t do this',
            cancel    : function () {
                console.log('Cancelled by user.');
            },

            continueText: 'Yep! Go ahead',
            continue    : function () {
                console.log('Authorized by user.');
            }
        });
    };

    $scope.createOtherOverlay = function () {
        test = new Overlay.create({
            title: 'Lorem Ipsum is simply dummy',
            text : 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
        });
    };


    /*
     * Selector Component
     */

    // Basic
    $scope.newsletter       = true;

    // Custom Values
    $scope.status           = 'off';

    // Array
    $scope.selectedSessions = [ '83116', '90216' ];

    // Array options
    $scope.sessions = [
        {
            id     : '83116',
            weekDay: 'Wednesday',
            date   : '8/31/16',
            time   : '18:35',
        },
        {
            id     : '90116',
            weekDay: 'Thursday',
            date   : '9/1/16',
            time   : '9:00',
        },
        {
            id     : '90216',
            weekDay: 'Friday',
            date   : '9/2/16',
            time   : '9:00',
        },
        {
            id     : '90316',
            weekDay: 'Saturday',
            date   : '9/3/16',
            time   : '9:00',
        }
    ];


    /*
     * Custom Select Component
     */

    $scope.selectedTicket = '';

    // Array options
    $scope.tickets = [
        {
            id   : 1,
            title: 'Ticket One',
            price: 15
        },
        {
            id   : 2,
            title: 'Ticket Two',
            price: 20
        },
        {
            id   : 3,
            title: 'Ticket Three',
            price: 25
        },
        {
            id   : 4,
            title: 'Ticket Four',
            price: 30
        },
        {
            id   : 5,
            title: 'Ticket Five',
            price: 35
        }
    ];

});
