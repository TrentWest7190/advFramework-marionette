import Marionette from 'backbone.marionette';
import template from 'templates/singleButton';

export default Marionette.View.extend({
	tagName: "button",
	className: "gameButton",
	template: template,

	events: {
		'click': 'onButtonClick'
	},

	onButtonClick: function() {
		this.trigger('button:clicked', this.model);
	}
});