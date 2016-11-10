/**
 * Collection that holds metadata for inventory items in the game.
 */
import Marionette from 'backbone.marionette';
import Backbone from 'backbone';

export default Backbone.Collection.extend({

	initialize: function() {
		console.log("Loaded game inventory collection", this);
	}
});