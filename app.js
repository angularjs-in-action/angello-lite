var myModule = angular.module('Angello', []);

myModule.factory('AngelloHelper', function() {
    var buildIndex = function (source, property) {
        var tempArray = [];

        for (var i = 0, len = source.length; i < len; ++i) {
            tempArray[source[i][property]] = source[i];
        }

        return tempArray;
    };

    return {
        buildIndex: buildIndex
    };
});

myModule.service('AngelloModel', function() {
    var service = this,
        statuses = [
            {name: 'Back Log'},
            {name: 'To Do'},
            {name: 'In Progress'},
            {name: 'Code Review'},
            {name: 'QA Review'},
            {name: 'Verified'},
            {name: 'Done'}
        ],
        types = [
            {name: 'Feature'},
            {name: 'Enhancement'},
            {name: 'Bug'},
            {name: 'Spike'}
        ],
        stories = [
            {
                title: 'First story',
                description: 'Our first story.',
                criteria: 'Criteria pending.',
                status: 'To Do',
                type: 'Feature',
                reporter: 'Lukas Ruebbelke',
                assignee: 'Brian Ford'
            },
            {
                title: 'Second story',
                description: 'Do something.',
                criteria: 'Criteria pending.',
                status: 'Back Log',
                type: 'Feature',
                reporter: 'Lukas Ruebbelke',
                assignee: 'Brian Ford'
            },
            {
                title: 'Another story',
                description: 'Just one more.',
                criteria: 'Criteria pending.',
                status: 'Code Review',
                type: 'Enhancement',
                reporter: 'Lukas Ruebbelke',
                assignee: 'Brian Ford'
            }
        ];

    service.getStatuses = function () {
        return statuses;
    };

    service.getTypes = function () {
        return types;
    };

    service.getStories = function () {
        return stories;
    };
});

myModule.controller('MainCtrl', function(AngelloModel, AngelloHelper) {
    var main = this;

    main.types = AngelloModel.getTypes();
    main.statuses = AngelloModel.getStatuses();
    main.stories = AngelloModel.getStories();
    main.typesIndex = AngelloHelper.buildIndex(main.types, 'name');
    main.statusesIndex = AngelloHelper.buildIndex(main.statuses, 'name');

    main.setCurrentStory = function (story) {
        main.currentStory = story;
        main.currentStatus = main.statusesIndex[story.status];
        main.currentType = main.typesIndex[story.type];
    };

    main.createStory = function() {
        main.stories.push({
            title: 'New Story',
            description: 'Description pending.',
            criteria: 'Criteria pending.',
            status: 'Back Log',
            type: 'Feature',
            reporter: 'Pending',
            assignee: 'Pending'
        });
    };

    main.setCurrentStatus = function (status) {
        if (typeof main.currentStory !== 'undefined') {
            main.currentStory.status = status.name;
        }
    };

    main.setCurrentType = function (type) {
        if (typeof main.currentStory !== 'undefined') {
            main.currentStory.type = type.name;
        }
    };
});

myModule.directive('story', function() {
    return {
        scope: true,
        replace: true,
        template: '<div><h4>{{story.title}}</h4><p>{{story.description}}</p></div>'
    }
});