var Dispatcher = require('flux').Dispatcher,
    merge = require('react/lib/merge');

var myDispatcher = new Dispatcher();

var AppDispatcher = {
  /**
   * Helper methods to wrap the dispatching of events from the server and views.
   */

  /*
   * Handles data coming from the server
   * @param {object} action
   */
  handleServerAction: function(action) {
    myDispatcher.dispatch({
      source: 'SERVER_ACTION',
      action: action
    });
  },

  /*
   * Handles data coming from the view
   * @param {object} action
   */
  handleViewAction: function(action) {
    myDispatcher.dispatch({
      source: 'VIEW_ACTION',
      action: action
    });
  },

  register: function(callback) {
    myDispatcher.register(callback);
  }
};

module.exports = AppDispatcher;
