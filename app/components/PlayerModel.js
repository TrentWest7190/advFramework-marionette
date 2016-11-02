/**
 * This model will hold all of the player's current relevant information
 */
import Marionette from 'backbone.marionette';
import Backbone from 'backbone';

export default Backbone.Model.extend({

	updateFlag: function(target, operation, value) {
		var oldValue = this.get(target);
		var that = this;

		var operations = {
			'setValue': function() {
				that.set(target, value);
			},
			'toggle': function() {
				if (typeof oldValue === "boolean")
					that.set(target, !oldValue)
				else
					throw "Attempted to toggle flag " + target + ", but that flag is not a Boolean.";
			},
			'add' : function() {
				that.set(target, oldValue + value);
			},
			'minus' : function() {
				that.set(target, oldValue - value);
			}
		}
		operations[operation]();

		console.log("Updated flag", target, "to value", this.get(target));
	},

	defaultFlag: function(flag) {
		var flagName = flag.get("flagName");
		var defaultValue = flag.get("defaultValue");

		console.log("Defaulting flag", flagName, "to", defaultValue);
		this.set(flagName, defaultValue);
	},

	initialize: function(attributes, object) {
		this.flagCollection = object.flagObject;

		this.flagCollection.each(this.defaultFlag, this);
	}
});