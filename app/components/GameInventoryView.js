import Marionette from 'backbone.marionette';
import template from 'templates/gameButtons';
import SingleInventoryView from './SingleInventoryView';

export default Marionette.CollectionView.extend({

	id: "gameInventoryInner",

	childView: SingleInventoryView,

	//template: template

	initialize: function() {
		console.log("gameinventory", this);
	}
});
