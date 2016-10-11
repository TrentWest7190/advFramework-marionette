import Marionette from 'backbone.marionette';
import template from 'templates/app';
import GameHeaderView from './GameHeaderView';
import GameTextView from './GameTextView';
import GameButtonsView from './GameButtonsView'

export default Marionette.View.extend({
	template: template,

	regions: {
		headerRegion: '#gameHeader',
		textRegion: '#gameText',
		buttonRegion: '#gameButtons'
	},

	childViewEvents: {
		'button:pressed': 'itemSelected'
	},

	itemSelected: function(childView) {
		console.log(childView);
	},

	onRender: function() {
		this.showChildView('headerRegion', new GameHeaderView());
		this.showChildView('textRegion', new GameTextView());
		this.showChildView('buttonRegion', new GameButtonsView());
	}
	
});
