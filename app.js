var myModule = angular.module('Angello', []);

myModule.factory('angelloHelper', function() {
    var buildIndex = function(source, property) {
        var tempArray = [];

        for(var i = 0, len = source.length; i < len; ++i) {
            tempArray[source[i][property]] = source[i];
        }

        return tempArray;
    };

    return {
        buildIndex: buildIndex
    };
});

myModule.factory('angelloModel', function() {
    var getStatuses = function() {
        var tempArray = [
            {name:'Back Log'},
            {name:'To Do'},
            {name:'In Progress'},
            {name:'Code Review'},
            {name:'QA Review'},
            {name:'Verified'},
            {name:'Done'}
        ];    
        return tempArray;
    };

    var getTypes = function() {
        var tempArray = [
            {name:'Feature'},
            {name:'Enhancement'},
            {name:'Bug'},
            {name:'Spike'}
        ];    
        return tempArray;
    };

    var getStories = function() {
        var tempArray = [
            {title:'Story 00', description:'Description pending.', criteria:'Criteria pending.', status:'To Do', type:'Feature', reporter:'Lukas Ruebbelke', assignee:'Brian Ford'},
            {title:'Story 01', description:'Description pending.', criteria:'Criteria pending.', status:'Back Log', type:'Feature', reporter:'Lukas Ruebbelke', assignee:'Brian Ford'},
            {title:'Story 02', description:'Description pending.', criteria:'Criteria pending.', status:'Code Review', type:'Enhancement', reporter:'Lukas Ruebbelke', assignee:'Brian Ford'},
            {title:'Story 03', description:'Description pending.', criteria:'Criteria pending.', status:'Done', type:'Enhancement', reporter:'Lukas Ruebbelke', assignee:'Brian Ford'},
            {title:'Story 04', description:'Description pending.', criteria:'Criteria pending.', status:'Verified', type:'Bug', reporter:'Lukas Ruebbelke', assignee:'Brian Ford'},
            {title:'Story 05', description:'Description pending.', criteria:'Criteria pending.', status:'To Do', type:'Spike', reporter:'Lukas Ruebbelke', assignee:'Brian Ford'}
        ];    

        return tempArray;
    };    

    return {
        getStatuses: getStatuses,
        getTypes: getTypes,
        getStories: getStories
    };
});

myModule.controller('MainCtrl', function(angelloModel, angelloHelper) {
    var main = this;

    main.types = angelloModel.getTypes();
    main.statuses = angelloModel.getStatuses();
    main.stories = angelloModel.getStories();
    main.typesIndex = angelloHelper.buildIndex(main.types, 'name');
    main.statusesIndex = angelloHelper.buildIndex(main.statuses, 'name');

    main.setCurrentStory = function(story) {
        main.currentStory = story;

        main.currentStatus = main.statusesIndex[story.status];
        main.currentType = main.typesIndex[story.type];
    };

    main.createStory = function() {
        main.stories.push({title:'New Story', description:'Description pending.', criteria:'Criteria pending.', status:'Back Log', type:'Feature', reporter:'Pending', assignee:'Pending'});
    };

    main.setCurrentStatus = function(status) {
        if(typeof main.currentStory !== 'undefined') {
            main.currentStory.status = status.name;
        }
    };

    main.setCurrentType = function(type) {
        if(typeof main.currentStory !== 'undefined') {
            main.currentStory.type = type.name;
        }
    };
});