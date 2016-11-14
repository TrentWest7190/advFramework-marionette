import Marionette from 'backbone.marionette';
import template from 'templates/singleInventory';

export default Marionette.View.extend({
	tagName: "span",
	className: "inventory-item",
	template: template,
});