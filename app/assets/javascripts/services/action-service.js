// ----------------------------------------
// ActionService
// ----------------------------------------

Crudangles.factory('ActionService', ['_', function(_) {

  var ActionService = {};

  var _state;

  ActionService.init = function(state) {
    _state = state;
    return this;
  };


  ActionService.create = function(action) {
    var keys = _state.current.name.split('.');
    _.each(keys, function(key) {
      action = action[key];
    });
    action(_state.params);
  };


  return ActionService;

}]);

