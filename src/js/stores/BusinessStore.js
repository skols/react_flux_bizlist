var AppDispatcher   = require("../dispatcher/AppDispatcher"),
    AppConstants    = require("../constants/AppConstants"),
    EventEmitter    = require("events").EventEmitter,
    assign          = require("object-assign"),
    AppAPI          = require("../utils/appAPI.js");

var CHANGE_EVENT = 'change';

// Define Store
var _businesses = {
    list: [],
    mainState: 'list',
    showExtended: false,
    selectedId: false,
    selected: {
        id: '',
        name: '',
        category: '',
        address: {
            street: '',
            city: '',
            state: '',
            zipcode: '',
        },
        phone: '',
        email: '',
        description: ''
    }
};

var BusinessStore = assign({}, EventEmitter.prototype, {
    getBusinesses: function() {
        return _businesses;
    },
    getBusiness: function(id) {
        AppAPI.getItem(id);
    },
    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },
    addChangeListener: function(callback) {
        this.on('change', callback);
    },
    removeChangeListener: function(callback) {
        this.removeListener('change', callback);
    },
    generateId: function(){
        var id = '';
        var possible = '0123456789';
        
        for(var i=0; i<5; i++) {
            id += possible.charAt(Math.floor(Math.random()*possible.length));
        }
        return id;
    }
});

AppDispatcher.register(function(payload) {
    var action = payload.action;
    
    switch(action.actionType) {
        case AppConstants.RECEIVE_ITEMS:
            console.log('Receiving Items....');
            _businesses.list = action.items;
            BusinessStore.emit(CHANGE_EVENT);
            break;
        case AppConstants.NEW_ITEM:
            _businesses.mainState = 'new';
            BusinessStore.emit(CHANGE_EVENT);
            break;
        case AppConstants.CANCEL_ITEM:
            _businesses.mainState = 'list';
            BusinessStore.emit(CHANGE_EVENT);
            break;
        case AppConstants.EXTEND_ITEM:
            _businesses.showExtended = true;
            _businesses.selectedId = action.itemId;
            BusinessStore.emit(CHANGE_EVENT);
            break;
        case AppConstants.SAVE_ITEM:
            console.log('Saving Items....');
            action.item.id = BusinessStore.generateId();
            // Add through API; only see after refreshing
            AppAPI.saveItem(action.item);
            // So it shows up immediately after adding
            _businesses.list.push(action.item);
            _businesses.mainState = 'list';
            BusinessStore.emit(CHANGE_EVENT);
            break;
        case AppConstants.REMOVE_ITEM:
            console.log('Removing Items....');
            var index = _businesses.list.findIndex(x => x.id === action.itemId);
            // Deletes, but returns when refreshed; because haven't deleted it through API
            _businesses.list.splice(index, 1);
            // Deleting through API
            AppAPI.removeItem(action.itemId);
            BusinessStore.emit(CHANGE_EVENT);
            break;
        case AppConstants.EDIT_ITEM:
            _businesses.mainState = 'edit';
            _businesses.selectedId = action.itemId;
            BusinessStore.emit(CHANGE_EVENT);
            break;
        case AppConstants.RECEIVE_ITEM:
            _businesses.selected = action.item;
            BusinessStore.emit(CHANGE_EVENT);
            break;
        case AppConstants.UPDATE_ITEM:
            console.log('Updating Item...')
            var index = _businesses.list.findIndex(x => x.id === action.itemId);
            _businesses.list.splice(index, 1);
            // Update API
            AppAPI.updateItem(action.item);
            _businesses.list.push(action.item);
            _businesses.mainState = 'list';
            BusinessStore.emit(CHANGE_EVENT);
            break;
    }
    
    return true;
});

module.exports = BusinessStore;