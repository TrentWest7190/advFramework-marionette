/**
 * Collection that holds metadata for flags in the game.
 */
import Marionette from 'backbone.marionette';
import Backbone from 'backbone';

export default Backbone.Collection.extend({

	initialize: function() {
		console.log("Loaded game flags collection", this);
	}
});