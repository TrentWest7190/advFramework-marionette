/**
 * This model contains all the data for the player's current flags and their state.
 */
import Marionette from 'backbone.marionette';
import Backbone from 'backbone';
import _ from 'underscore';
import PlayerInventoryCollection from './Player_InventoryCollection';


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
	}
});