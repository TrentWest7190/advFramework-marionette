import Marionette from 'backbone.marionette';
import template from 'templates/app';
import GameHeaderView from './GameHeaderView';
import GameTextView from './GameTextView';
import GameButtonsView from './GameButtonsView';
import GameInventoryView from './GameInventoryView';
import TextModel from './TextModel';
import ButtonCollection from './ButtonCollection';
import PlayerModel from './PlayerModel';
import PlayerInventoryCollection from './PlayerInventoryCollection';

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
		this.game_PlayerInfo.collect(itemTarget);
	},

	setFlag: function(flagTarget) {
		this.game_PlayerInfo.updateFlag(flagTarget.flagName, flagTarget.operation, flagTarget.value);
		this.getChildView('buttonRegion').render();
	},

	loadScreen: function(screenId) {
		var screenObj = this.game_ScreenCollection.find(this.findBy("id", screenId));

		console.log("Loading screen with id", screenObj.get("id"));

		//Load text into view
		var textId = screenObj.get("text");
		var textObject = this.game_TextCollection.find(this.findBy("id", textId));
		var changeToText = textObject.get("text");

		if (!this.getRegion('textRegion').hasView()) {
			var newGameTextModel = new TextModel({text: changeToText});
			var newGameTextView = new GameTextView({model: newGameTextModel});
			this.getRegion('textRegion').show(newGameTextView);
		} else {
			this.getChildView('textRegion').updateText(changeToText);	
		}

		//Load buttons into view
		var buttonArray = screenObj.get("buttons");
		var activatedButtons = [];
		for (var buttonIndex in buttonArray) {
			var wrkButton = buttonArray[buttonIndex];
			var buttonId = wrkButton.id;
			var singleButton = this.game_ButtonCollection.find(this.findBy("id", buttonId));
			singleButton.set("conditional", wrkButton.conditional);
			activatedButtons.push(singleButton);
			
			
		}


		if (!this.getRegion('buttonRegion').hasView()) {
			var buttonCollection = new ButtonCollection(activatedButtons);
			var newGameButtonsView = new GameButtonsView({collection: new ButtonCollection()});
			newGameButtonsView.loadButtons(activatedButtons, this.game_PlayerInfo);
			this.getRegion('buttonRegion').show(newGameButtonsView);
		} else {
			this.getChildView('buttonRegion').loadButtons(activatedButtons, this.game_PlayerInfo);
		}

		if (!this.getRegion('inventoryRegion').hasView()) {
			var newGameInventoryView = new GameInventoryView({collection: new PlayerInventoryCollection(this.game_PlayerInfo.get("playerInventory"))});
			this.getRegion('inventoryRegion').show(newGameInventoryView);
		}


	},

	findBy: function(searchValue, matcher) {
		return function(find) {
			return find.get(searchValue) == matcher;
		}
	},

	onRender: function() {
		this.game_TextCollection = this.getOption("textCollection");
		this.game_ButtonCollection = this.getOption("buttonCollection");
		this.game_ScreenCollection = this.getOption("screenCollection");
		this.game_FlagCollection = this.getOption("flagCollection");
		this.game_InventoryCollection = this.getOption("inventoryCollection");

		this.game_PlayerInfo = new PlayerModel({}, {flagObject: this.game_FlagCollection});

		this.getRegion('headerRegion').show(new GameHeaderView());

		this.loadScreen(4);
	}
	
});
