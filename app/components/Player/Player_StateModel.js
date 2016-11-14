/**
 * This model contains 2 values:
 * 1) "flags" - a model consisting of key-value pairs that represent the game's current state
 * 2) "inventory" - a collection of inventoryObject models that represent the player's current inventory
 */
import Marionette from 'backbone.marionette';
import Backbone from 'backbone';
import _ from 'underscore';
import InventoryCollection from './Player_InventoryCollection';
import FlagModel from './Player_FlagModel';


export default Backbone.Model.extend({

	updateFlag: function(flagTarget) {
		this.get("flags").updateFlag(flagTarget.flagName, flagTarget.operation, flagTarget.value);
	},

	collect: function(itemTarget) {
		var itemToAdd = _.find(this.MetaData_Inventory, function(item) { return item.itemName == itemTarget.itemName });
		this.get("inventory").add(itemToAdd);
		console.log(this.get("inventory"));
	},

	constructor: function(flagData, inventoryData) {
		var defaultFlagObject = _.reduce(flagData, function(memo, value, index, list) {
			memo[value.flagName] = value.defaultValue
			return memo;
		}, {});

		var defaultFlagModel = new FlagModel(defaultFlagObject);

		this.MetaData_Inventory = inventoryData;
		
		Backbone.Model.apply(this, [{ "flags" : defaultFlagModel, "inventory" : new InventoryCollection()}]);
	},

	initialize: function() {
		console.log("Created player state model with attributes", this.attributes);
	}
});