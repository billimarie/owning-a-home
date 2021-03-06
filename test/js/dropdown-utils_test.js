var expect = require('chai').expect;
var jsdom = require('mocha-jsdom');

describe('Dropdown utils', function() {

  var $, dd;

  jsdom();

  before(function () {
    $ = require('jquery');
    dd = require('../../src/static/js/modules/dropdown-utils.js');
  });

  beforeEach(function(){
    $('body').html( $('<div class="foo"><select id="foo"><option value="baz"></option></select></div>') );
  });

  it('should complain if you don\'t specify a target', function() {
    expect( dd ).to.throw();
  });

  it('should disable dropdowns', function() {
    dd('foo').disable();
    expect($('#foo').attr('disabled')).to.be.ok();
  });

  it('should enable dropdowns', function() {
    dd('foo').disable();
    dd('foo').enable();
    expect($('#foo').attr('disabled')).to.not.be.ok();
  });

  it('should add options to dropdowns', function() {
    dd('foo').addOption({label: 'foo', value: 'bar'});
    dd('foo').addOption({label: 'foo1', value: 'bar1'});
    dd('foo').addOption({label: 'foo2', value: 'bar2'});
    expect($('option')).to.have.length(4);
  });

  it('should let methods be chainable', function() {
    dd('foo').addOption({label: 'foo', value: 'bar'}).addOption({label: 'foo1', value: 'bar1'}).addOption({label: 'foo2', value: 'bar2'});
    expect($('option')).to.have.length(4);
  });

  it('should remove options from dropdowns', function() {
    dd('foo').addOption({label: 'foo', value: 'bar'});
    dd('foo').addOption({label: 'foo1', value: 'bar1'});
    dd('foo').removeOption('bar1');
    expect($('option')).to.have.length(2);
  });

  it('should complain if you try to remove an option without specifying a value', function() {
    expect( dd('foo').removeOption ).to.throw();
  });

  it('should complain if you try to check an option without specifying a value', function() {
    expect( dd('foo').hasOption ).to.throw();
  });

  it('should report if a dropdown has an option', function() {
    dd('foo').addOption({label: 'foo', value: 'bar'});
    expect( dd('foo').hasOption('bar') ).to.be.ok();
  });

  it('should reset a dropdown', function() {
    dd('foo').addOption({label: 'foo', value: 'bar'});
    $('#foo')[0].selectedIndex = 1;
    dd('foo').reset();
    expect( $('#foo')[0].selectedIndex ).to.not.be.ok();
  });

  it('should hide a dropdown', function() {
    dd('foo').hide();
    expect( $('.foo').hasClass('hidden') ).to.be.ok();
  });

  it('should show a dropdown', function() {
    dd('foo').hide();
    dd('foo').show();
    expect( $('.foo').hasClass('hidden') ).to.not.be.ok();
  });

  it('should show loading', function() {
    dd('foo').showLoadingAnimation();
    expect( $('.foo').hasClass('loading') ).to.be.ok();
  });

  it('should hide loading', function() {
    dd('foo').showLoadingAnimation();
    dd('foo').hideLoadingAnimation();
    expect( $('.foo').hasClass('loading') ).to.not.be.ok();
  });

  it('should highlight the dropdown', function() {
    dd('foo').showHighlight();
    expect( $('.foo').hasClass('highlight-dropdown') ).to.be.ok();
  });

  it('should unhighlight the dropdown', function() {
    dd('foo').showHighlight();
    dd('foo').hideHighlight();
    expect( $('.foo').hasClass('highlight-dropdown') ).to.not.be.ok();
  });

});
