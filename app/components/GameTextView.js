import Marionette from 'backbone.marionette';
import template from 'templates/gameText';

export default Marionette.View.extend({
	template: template,

	updateText: function(updateValue) {
		this.model.set("text", updateValue);
	},

	modelEvents: {
        "change": "render"
    },

	onRender: function() {
		console.log(this.model);
	}
});
