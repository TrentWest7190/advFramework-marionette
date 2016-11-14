import Marionette from 'backbone.marionette';
import template from 'templates/gameText';
import Backbone from 'backbone';
import TextModel from './TextModel';

export default Marionette.View.extend({
	template: template,

	updateText: function(updateValue) {
		this.model.set("text", updateValue);
	},

	modelEvents: {
        "change": "render"
    },

    initialize: function() {
    	if (this.model == undefined) {
    		this.model = new TextModel({ text : "" });
    	}
    }
});
