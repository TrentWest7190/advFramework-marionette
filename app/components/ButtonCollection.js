import Marionette from 'backbone.marionette';
import Backbone from 'backbone';

export default Backbone.Collection.extend({

	initialize: function() {
		console.log(this);
	}
});