/**
 * Collection that holds all screen information in the game
 */
import Marionette from 'backbone.marionette';
import Backbone from 'backbone';

export default Backbone.Collection.extend({

	initialize: function() {
		console.log("Loaded game screen collection", this);
	}
});