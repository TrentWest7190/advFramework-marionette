import Marionette from 'backbone.marionette';
import AppView from './AppView';


export default Marionette.Application.extend({
  region: '#app',

  initialize() {
    this.on('start', () => {
      this.showView(new AppView(
        {
          MetaData_Text: MetaData_Text, 
				  MetaData_Button: MetaData_Button, 
				  MetaData_Screen: MetaData_Screen,
          MetaData_Flag: MetaData_Flag,
          MetaData_Inventory: MetaData_Inventory
        }
      ));
    })
  }


});
