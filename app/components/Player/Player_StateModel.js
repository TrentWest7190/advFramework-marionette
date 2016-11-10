/**
 * This model contains 2 values:
 * 1) "flags" - a model consisting of key-value pairs that represent the game's current state
 * 2) "inventory" - a collection of inventoryObject models that represent the player's current inventory
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
	},

	constructor: function(flagData) {
		//Flatten flag array into a single object with defaulted values
		var defaultFlagObject = _.reduce(flagData, function(memo, value, index, list) {
			memo[value.flagName] = value.defaultValue
			return memo;
		}, {});
		Backbone.Model.apply(this, [defaultFlagObject]);
	}
});