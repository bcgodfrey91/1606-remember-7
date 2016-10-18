import Ember from "ember";

export default Ember.Controller.extend({
  store: Ember.inject.service(),

  isEditing: false,

  actions: {
    editReminder() {
      this.set("isEditing", true);
    },
    saveReminder() {
      this.get('model').save().then( () => {
        this.set("isEditing", false);        
      });
    },
    revertReminder() {
      this.get('model').rollbackAttributes();
    }
  }
});
