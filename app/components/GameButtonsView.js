import Marionette from 'backbone.marionette';
import template from 'templates/gameButtons';
import SingleButtonView from './SingleButtonView';

export default Marionette.CollectionView.extend({

	childView: SingleButtonView,

	childViewTriggers: {
		'button:clicked': 'child:button:clicked'
	},

	loadButtons: function(buttonsToLoad) {
		console.log("Loading buttons", buttonsToLoad);
		this.collection.reset(buttonsToLoad);
	},

	addButton: function(button) {
		console.log(button);
		this.collection.add(button);
	},

	template: template
});
