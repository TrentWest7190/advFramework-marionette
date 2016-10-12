import Marionette from 'backbone.marionette';
import AppView from './AppView';
import TextModel from './TextModel';

export default Marionette.Application.extend({
  region: '#app',

  initialize() {
    this.on('start', () => {
      var TextData = new TextModel({"text" : "this is a test string"});
      this.showView(new AppView({model:TextData}));
    })
  },


});
