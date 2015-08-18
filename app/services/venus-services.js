angular.module('venusUI').service('VenusActivityIndicatorService', function () {
    return {
        activities: [],
        errors: [],
        startActivity: function add_activity(activity) {
            for (var i = this.activities.length - 1; i >= 0; i--) {
                if (this.activities[i] == activity) {
                    return false;
                }
            }
            ;
            this.activities.push(activity);
            return true;
        },
        stopActivity: function stop_activity(activity) {
            for (var i = this.activities.length - 1; i >= 0; i--) {
                if (this.activities[i] == activity) {
                    this.activities.splice(i, 1);
                }
            }
            ;
        },
        error: function add_error(error, errorObj) {
            this.errors.push(error);
            if (errorObj) {
                console.error(errorObj);
            }
        },
        clearError: function clear_error(error) {
            for (var i = this.errors.length - 1; i >= 0; i--) {
                if (this.errors[i] == error) {
                    this.errors.splice(i, 1);
                }
            }
            ;
        }
    };
});
