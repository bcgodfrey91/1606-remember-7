import Ember from "ember";

export default Ember.Controller.extend({
  store: Ember.inject.service(),

  isEditing: false,
  dirtyAttributesPresent: false,

  actions: {
    editReminder() {
      this.set("isEditing", true);
    },
    saveReminder() {
      this.set("isEditing", false);
    },
    revertReminder() {
      this.get('model').rollbackAttributes();
      this.set("dirtyAttributesPresent", false);
    },
    checkDirtyAttributes() {
      const record = this.get('model');
      record.get('hasDirtyAttributes');
      this.set("dirtyAttributesPresent", true);
    }
  }
});
