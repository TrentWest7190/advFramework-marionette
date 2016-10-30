/**
 * Collection that holds all buttons in the game.
 * 
 * The button only holds information about the text and it's action.
 * The logic for the button to appear is defined on the screen 
 * where the button is used.
 */
import Marionette from 'backbone.marionette';
import Backbone from 'backbone';

export default Backbone.Collection.extend({

	initialize: function() {
		console.log("Loaded game button collection", this);
	}
});