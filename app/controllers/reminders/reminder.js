import Ember from 'ember';

export default Ember.Controller.extend({
  store: Ember.inject.service(),

  isEditing: false,

  actions: {
    editReminder() {
      this.set('isEditing', true);
    },
    saveReminder() {
      this.set('isEditing', false);
    }
  }
});
