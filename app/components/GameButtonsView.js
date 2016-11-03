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
		return typeof logic == "undefined" ? true : this.checkButtonLogic(logic);
	},

	checkButtonLogic: function(buttonLogic) {
		console.log("Checking button logic", buttonLogic);
		var flag = this.game_PlayerState.get(buttonLogic.flag);
		var condition = buttonLogic.condition;
		var value = buttonLogic.value;

		console.log("flag is ", flag);

		switch(condition) {
			case "is":
				if (flag == value) {
					return true;
				}
				break;
			case "greaterThan":
				if (flag > value) {
					return true;
				}
				break;
			case "lessThan":
				if (flag < value) {
					return true;
				}
				break;
		}
		return false;

	},

	template: template
});
