import Marionette from 'backbone.marionette';
import AppView from './AppView';

export default Marionette.Application.extend({
  region: '#app',

  initialize() {
    this.on('start', () => {
      this.showView(new AppView());
    })
  }
});
