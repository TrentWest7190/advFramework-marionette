import Marionette from 'backbone.marionette';
import template from 'templates/gameButtons';
import SingleButtonView from './SingleButtonView';

export default Marionette.CollectionView.extend({

	childView: SingleButtonView,

	childViewTriggers: {
		'button:clicked': 'child:button:clicked'
	},

	onChildButtonClicked: function(textToChange) {
		console.log(textToChange);
	},

	template: template,

	onRender: function() {
		console.log(this.collection);
	}
});
