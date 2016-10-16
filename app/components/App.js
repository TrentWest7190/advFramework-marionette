import Marionette from 'backbone.marionette';
import AppView from './AppView';
import TextModel from './TextModel';

export default Marionette.Application.extend({
  region: '#app',

  initialize() {
    this.on('start', () => {
      var TextData = {"text" : "this is a test saoefijasoifej"};
      var ButtonData = [{"id" : "1", "text": "button 1", "changeTo":"time to go to bed"},
      					{"id" : "2", "text": "good button", "changeTo":"fart fart fart fart asfjioefj"}];
      this.showView(new AppView({textObject:TextData, buttonObject:ButtonData}));
    })
  },


});
