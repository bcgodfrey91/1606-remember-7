/* globals server */

import { test } from 'qunit';
import moduleForAcceptance from 'remember/tests/helpers/module-for-acceptance';

import Ember from 'ember';

moduleForAcceptance('Acceptance | reminders list', {
  beforeEach() {
    server.createList('reminder', 5);
  },
  afterEach() {
    server.shutdown();
  }
});

test('viewing the homepage', function(assert) {

  visit('/');

  andThen(function() {
    assert.equal(currentURL(), '/');
    assert.equal(Ember.$('.spec-reminder-item').length, 5);
  });
});

test('clicking on an individual item', function(assert) {

  visit('/');
  click('.spec-reminder-item:first');

  andThen(function() {
    assert.equal(currentURL(), '/1');
    assert.equal(Ember.$('.spec-reminder-item:first').text().trim(), Ember.$('.spec-reminder-title').text().trim());
  });
});

test('creating an area to make a new reminder', function(assert) {
  visit('/');
  click('.spec-add-new-reminder');

  andThen(function() {
    assert.equal(currentURL(), '/new');
    assert.equal(Ember.$('.add-reminder-form').length,1)
  });
});

test('creating an new reminder', function(assert) {
  visit('/new');

  fillIn('.spec-input-title.ember-view.ember-text-field', 'Call Mike')
  fillIn('.spec-input-date', '11/11/2016')
  fillIn('.spec-input-notes', 'Party')


  andThen(function() {
    assert.equal(currentURL(), '/new');
    assert.equal(Ember.$('.spec-input-title').value, 'Call Mike');
  });
});
