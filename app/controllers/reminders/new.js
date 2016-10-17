import Ember from 'ember';

export default Ember.Controller.extend({
  store: Ember.inject.service(),

  tagName: 'section',
  classNames: ['whatever'],

  title: '',
  date: '',
  notes: '',

  actions: {
    addReminder() {
      const reminder = this.getProperties('title', 'date', 'notes');
      reminder.date = new Date(reminder.date);
      this.get('store').createRecord('reminder', reminder).save().then(() => {
        this.setProperties({ title: '', date: '', notes: '' });
      });
    }
  }
});
