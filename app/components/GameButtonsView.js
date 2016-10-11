import Marionette from 'backbone.marionette';
import template from 'templates/gameButtons';

export default Marionette.View.extend({

	buttonEvent : function(event) {
		alert("test success");
	},

	triggers : {
		'click .gameButton': 'button:pressed'
	},

	template: template
});
