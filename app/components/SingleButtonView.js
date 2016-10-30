import Marionette from 'backbone.marionette';
import template from 'templates/singleButton';

export default Marionette.View.extend({
	template:template,

	events: {
		'click': 'onButtonClick'
	},

	onButtonClick: function() {
		this.trigger('button:clicked', this.model);
	}
});