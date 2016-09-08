'use strict';

angular.module('venus-docs')
.constant('routes', [
    {
        id   : 'components',
        title: 'Components',
        path : '/components/',
        items: [
            {
                id   : 'icons',
                title: 'Icons',
            },
            {
                id   : 'switch',
                title: 'Switch',
            },
            {
                id   : 'label',
                title: 'Label',
            },
            {
                id   : 'divider',
                title: 'Divider',
            },
            {
                id   : 'fieldset',
                title: 'Fieldset',
            },
            {
                id   : 'range',
                title: 'Range',
            },
            {
                id   : 'progress-bar',
                title: 'Progress Bar',
            },
            {
                id   : 'drag-and-drop',
                title: 'Drag & Drop',
            },
            {
                id   : 'alert',
                title: 'Alert',
            },
            {
                id        : 'overlay',
                title     : 'Overlay',
                controller: 'ComponentOverlayController'
            },
            {
                id        : 'selector',
                title     : 'Selector',
                controller: 'ComponentSelectorController'
            },
            {
                id        : 'custom-select',
                title     : 'Custom Select',
            }
        ]
    },
]);
