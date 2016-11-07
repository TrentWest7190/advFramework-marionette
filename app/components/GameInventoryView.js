import Marionette from 'backbone.marionette';
import template from 'templates/gameButtons';
import SingleButtonView from './SingleButtonView';

export default Marionette.CollectionView.extend({

	id: "gameButtonsInner",

	childView: SingleButtonView,

	childViewTriggers: {
		'button:clicked': 'child:button:clicked'
	},

	loadButtons: function(buttonsToLoad, playerState) {
		this.game_PlayerState = playerState;
		this.collection.reset(buttonsToLoad);
		console.log("Loading buttons", this.collection);
	},

	addButton: function(button) {
		console.log(button);
		this.collection.add(button);
	},

	filter: function(button, index, collection) {
		var logic = button.get("conditional");

		return typeof logic == "undefined" ? true : logic.every(this.checkButtonLogic, this);
	},

	checkButtonLogic: function(buttonLogic) {
		var flag = this.game_PlayerState.get(buttonLogic.flag);
		var condition = buttonLogic.condition;
		var value = buttonLogic.value;

		console.log("Checking logic", flag, condition, value);

		var logicalOperators = {
			'is': function(flag, value) {
				return flag == value;
			},
			'greaterThan': function(flag, value) {
				return flag > value;
			},
			'lessThan' : function(flag, value) {
				return flag < value;
			}
		}

		return logicalOperators[condition](flag, value);

	},

	template: template
});
