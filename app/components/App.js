import Marionette from 'backbone.marionette';
import AppView from './AppView';
import TextModel from './TextModel';
import GameTextCollection from 'components/GameTextCollection';
import GameButtonCollection from 'components/GameButtonCollection';
import GameScreenCollection from 'components/GameScreenCollection';
import GameFlagCollection from 'components/GameFlagCollection';


export default Marionette.Application.extend({
  region: '#app',

  initialize() {
    this.on('start', () => {
	  var gameTextCollection = new GameTextCollection(RawData_Text);
	  var gameButtonCollection = new GameButtonCollection(RawData_Button);
	  var gameScreenCollection = new GameScreenCollection(RawData_Screen);
    var gameFlagCollection = new GameFlagCollection(RawData_Flag);

      this.showView(new AppView({textCollection:gameTextCollection, 
      							 buttonCollection:gameButtonCollection, 
      							 screenCollection:gameScreenCollection,
                     flagCollection: gameFlagCollection}));
    })
  }


});
