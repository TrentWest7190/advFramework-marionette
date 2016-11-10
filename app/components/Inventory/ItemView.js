import Marionette from 'backbone.marionette';
import template from 'templates/singleInventory';

export default Marionette.View.extend({
	tagName: "button",
	className: "gameButton",
	template: template,
});