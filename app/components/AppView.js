import Marionette from 'backbone.marionette';
import template from 'templates/app';
import GameHeaderView from './GameHeaderView';
import GameTextView from './GameTextView';
import GameButtonsView from './GameButtonsView';
import TextModel from './TextModel';
import ButtonCollection from './ButtonCollection';
import PlayerModel from './PlayerModel';

export default Marionette.View.extend({
	template: template,

	regions: {
		headerRegion: '#gameHeader',
		textRegion: '#gameText',
		buttonRegion: '#gameButtons'
	},

	childViewEvents: {
		'child:button:clicked': 'itemSelected'
	},

	itemSelected: function(buttonPressed) {
		console.log("Pressed Button", buttonPressed);

		
		var action = buttonPressed.get("action");

		if (action == "loadScreen") {
			var screenLocal = this.game_ScreenCollection.find(this.findBy("id", buttonPressed.get("target")));
			this.loadScreen(screenLocal);
		} else if (action == "setFlag") {
			var flagToSet = this.game_FlagCollection.find(this.findBy("flagName", buttonPressed.get("target")));
			this.setFlag(flagToSet);
		}
	},

	loadScreen: function(screenObj) {
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
			if (typeof wrkButton.conditional == "undefined" || this.checkButtonLogic(wrkButton.conditional)) {
				var singleButton = this.game_ButtonCollection.find(this.findBy("id", buttonId));
				activatedButtons.push(singleButton);
			}
			
			
		}


		if (!this.getRegion('buttonRegion').hasView()) {
			var buttonCollection = new ButtonCollection(activatedButtons);
			var newGameButtonsView = new GameButtonsView({collection: buttonCollection});
			this.getRegion('buttonRegion').show(newGameButtonsView);
		} else {
			this.getChildView('buttonRegion').loadButtons(activatedButtons);
		}

	},

	checkButtonLogic: function(buttonLogic) {
		console.log("Checking button logic", buttonLogic);
		var flag = this.game_PlayerInfo.get(buttonLogic.flag);
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

	setFlag: function(flagObject) {
		var flagType = flagObject.get("type");
		var flagName = flagObject.get("flagName");

		if (!this.game_PlayerInfo.has(flagName)) {
			var flagDefault = flagObject.get("default");
			this.game_PlayerInfo.set(flagName, flagDefault);
		}

		if (flagType == "boolean") {
			this.game_PlayerInfo.set(flagName, !this.game_PlayerInfo.get(flagName));
		}

	},

	defaultFlag: function(flag) {
		
		var flagName = flag.get("flagName");
		var defaultValue = flag.get("defaultValue");

		console.log("Defaulting flag", flagName, "to", defaultValue);
		this.game_PlayerInfo.set(flagName, defaultValue);
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

		this.game_PlayerInfo = new PlayerModel();

		this.game_FlagCollection.each(this.defaultFlag, this);

		this.getRegion('headerRegion').show(new GameHeaderView());


		var firstScreen = this.game_ScreenCollection.find(this.findBy("id", 1));
		this.loadScreen(firstScreen);


		
	}
	
});
