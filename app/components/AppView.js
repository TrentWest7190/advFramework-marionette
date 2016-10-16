import Marionette from 'backbone.marionette';
import template from 'templates/app';
import GameHeaderView from './GameHeaderView';
import GameTextView from './GameTextView';
import GameButtonsView from './GameButtonsView';
import TextModel from './TextModel';
import ButtonCollection from './ButtonCollection';

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

	itemSelected: function(textChange) {
		var textRegion = this.getChildView('textRegion');
		textRegion.updateText(textChange);
	},

	onRender: function() {
		var textModel = new TextModel(this.getOption("textObject"));
		var gameTextView = new GameTextView({model: textModel});

		var buttonCollection = new ButtonCollection(this.getOption("buttonObject"));
		var gameButtonsView = new GameButtonsView({collection: buttonCollection});
		this.showChildView('headerRegion', new GameHeaderView());
		this.showChildView('textRegion', gameTextView);
		this.showChildView('buttonRegion', gameButtonsView);
	}
	
});
