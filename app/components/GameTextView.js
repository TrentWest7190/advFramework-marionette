import Marionette from 'backbone.marionette';
import template from 'templates/gameText';
import Backbone from 'backbone';

export default Marionette.View.extend({
	template: template,

	updateText: function(updateValue) {
		this.model.set("text", updateValue);
	},

	modelEvents: {
        "change": "render"
    }
});
