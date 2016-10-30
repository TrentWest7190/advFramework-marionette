/**
 * Collection that holds all text in the game.
 */
import Marionette from 'backbone.marionette';
import Backbone from 'backbone';

export default Backbone.Collection.extend({

	initialize: function() {
		console.log("Loaded game text collection", this);
	}
});