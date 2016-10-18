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

test('creating a form to make a new reminder', function(assert) {
  visit('/');
  click('.spec-add-new-reminder');

  andThen(function() {
    assert.equal(currentURL(), '/new');
    assert.equal(Ember.$('.add-reminder-form').length,1);
  });
});

test('creating an new reminder', function(assert) {
  visit('/new');

  fillIn('.spec-input-title', 'Call Mike');
  fillIn('.spec-input-date', '2016-11-11');
  fillIn('.spec-input-notes', 'Birthday');


  andThen(function() {
    assert.equal(currentURL(), '/new');
    assert.equal(Ember.$('.spec-input-title').val(), 'Call Mike');
    assert.equal(Ember.$('.spec-input-date').val(), '2016-11-11');
    assert.equal(Ember.$('.spec-input-notes').val(), 'Birthday');
  });

  click('.submit-button');

  andThen(function() {
    assert.equal(Ember.$('.spec-reminder-item:last').text().trim(), 'Call Mike');
    assert.equal(Ember.$('.spec-reminder-date:last').text().trim(), 'Thu Nov 10 2016 17:00:00 GMT-0700 (MST)');
  });
});

test('editing a reminder', function(assert) {
  visit('/');
  click('.spec-reminder-item:first');
  click('.edit-button');
  fillIn('.edit-title', 'What up Mike?!');
  click('.save-button');

  andThen(function() {
    assert.equal(currentURL(), '/1');
    assert.equal(Ember.$('.spec-reminder-item:first').text().trim(), 'What up Mike?!');
  });
});

test('reverting a reminder', function(assert) {
  visit('/');
  click('.spec-reminder-item:first');
  click('.edit-button');
  fillIn('.edit-title', 'What up Mike?!');

  andThen(function() {
    assert.equal(currentURL(), '/1');
    assert.equal(Ember.$('.spec-reminder-item:first').text().trim(), 'What up Mike?!');
  });

  click('.save-button');
  click('.edit-button');
  fillIn('.edit-title', 'Are you there Ben?!');
  click('.revert-button');

  andThen(function() {
    assert.equal(currentURL(), '/1');
    assert.equal(Ember.$('.spec-reminder-item:first').text().trim(), 'What up Mike?!');
  });
});
