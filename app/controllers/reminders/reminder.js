import Ember from "ember";

export default Ember.Controller.extend({
  store: Ember.inject.service(),

  isEditing: false,

  actions: {
    editReminder() {
      this.toggleProperty("isEditing");
    },
    saveReminder() {
      this.get('model').save().then( () => {
        this.toggleProperty("isEditing");        
      });
    },
    revertReminder() {
      this.get('model').rollbackAttributes();
    }
  }
});
