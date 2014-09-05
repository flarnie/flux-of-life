var Dispatcher = require('flux').Dispatcher,
    merge = require('react/lib/merge');

var AppDispatcher = merge(Dispatcher.prototype, {
  /**
   * Helper methods to wrap the dispatching of events from the server and views.
   */

  /*
   * Handles data coming from the server
   * @param {object} action
   */
  handleServerAction: function(action) {
    this.dispatch({
      source: 'SERVER_ACTION',
      action: action
    });
  },

  /*
   * Handles data coming from the view
   * @param {object} action
   */
  handleViewAction: function(action) {
    this.dispatch({
      source: 'VIEW_ACTION',
      action: action
    });
  },
});

module.exports = AppDispatcher;
