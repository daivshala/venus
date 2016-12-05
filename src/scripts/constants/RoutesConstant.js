'use strict';

angular.module('venus-docs')
.constant('routes', [
    {
        id   : 'css',
        title: 'CSS',
        path : '/css/',
        items: [
            {
                id   : 'grid',
                title: 'Flexbox Grid',
            },
            {
                id   : 'form',
                title: 'Form',
            },
            {
                id   : 'button',
                title: 'Button',
            },
            {
                id   : 'icons',
                title: 'Icons',
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
                id   : 'drag-and-drop',
                title: 'Drag & Drop',
            },
        ]
    },
    {
        id   : 'components',
        title: 'Components',
        path : '/components/',
        items: [
            {
                id   : 'switch',
                title: 'Switch',
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
            },
            {
                id        : 'toggle',
                title     : 'Toggle',
            },
        ]
    }
]);
