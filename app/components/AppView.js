import Marionette from 'backbone.marionette';
import template from 'templates/app';
import Player_StateModel from './Player/Player_StateModel';
import GameHeaderView from './GameHeaderView';
import GameTextView from './TextPanel/GameTextView';
import GameButtonsView from './Buttons/GameButtonsView';
import _ from 'lodash';

export default Marionette.View.extend({
	id: "appInner",

	template: template,

	regions: {
		headerRegion: '#gameHeaderOuter',
		textRegion: '#gameTextOuter',
		buttonRegion: '#gameButtonsOuter',
		inventoryRegion: '#gameInventoryOuter'
	},

	childViewEvents: {
		'child:button:clicked': 'itemSelected'
	},

	itemSelected: function(buttonPressed) {
		console.log("Pressed Button", buttonPressed.get("id"), buttonPressed);

		var action = buttonPressed.get("action");
		action.forEach(this.performAction, this);
	},

	performAction: function(subAction) {
		var subActionName = subAction.type;
		this[subActionName](subAction.target)
	},

	getItem: function(itemTarget) {
		this.game_PlayerState.collect(itemTarget);
	},

	setFlag: function(flagTarget) {
		this.game_PlayerState.get("flags").updateFlag(flagTarget.flagName, flagTarget.operation, flagTarget.value);
		this.getChildView('buttonRegion').render();
	},

	loadScreen: function(screenId) {
		var screenObj = _.find(this.MetaData_Screen, this.findById(screenId));

		console.log("Loading screen with id", screenObj.id);

		//Load text into view
		var textObject = _.find(this.MetaData_Text, this.findById(screenObj.text));
		var changeToText = textObject.text;

		this.getChildView('textRegion').updateText(changeToText);	

		//Load buttons into view
		var buttonArray = screenObj.buttons;
		for (var button in buttonArray) {
			buttonArray[button] = _.merge(buttonArray[button], _.find(this.MetaData_Button, this.findById(buttonArray[button].id)));
		}
		console.log(buttonArray);

		this.getChildView('buttonRegion').loadButtons(buttonArray, this.game_PlayerState);

		/*if (!this.getRegion('inventoryRegion').hasView()) {
			var newGameInventoryView = new GameInventoryView({collection: new PlayerInventoryCollection(this.game_PlayerState.get("playerInventory"))});
			this.getRegion('inventoryRegion').show(newGameInventoryView);
		}*/


	},

	findById: function(matcher) {
		return function(find) {
			return find.id == matcher;
		}
	},

	onRender: function() {
		this.MetaData_Text = this.getOption("MetaData_Text");
		this.MetaData_Button = this.getOption("MetaData_Button");
		this.MetaData_Screen = this.getOption("MetaData_Screen");
		this.MetaData_Flag = this.getOption("MetaData_Flag");
		this.MetaData_Inventory = this.getOption("MetaData_Inventory");

		this.game_PlayerState = new Player_StateModel(this.MetaData_Flag);

		this.getRegion('headerRegion').show(new GameHeaderView());
		this.getRegion('textRegion').show(new GameTextView());
		this.getRegion('buttonRegion').show(new GameButtonsView());

		this.loadScreen(1);
	}
	
});
