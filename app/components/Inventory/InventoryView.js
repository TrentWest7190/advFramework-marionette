import Marionette from 'backbone.marionette';
import template from 'templates/gameButtons';
import ItemView from './ItemView';

export default Marionette.CollectionView.extend({

	id: "gameInventoryInner",

	childView: ItemView,

	template: "<div id='biggoodtest'></div>"
});
