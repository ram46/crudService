var React = require('react');

var ReactTestUtils = require('react-dom/test-utils');
var Monitor = require('../../client/src/components/Monitor.jsx');


var expect = require('chai').expect;

describe('root', function () {
  it('renders without problems', function () {
    var root = ReactTestUtils.isCompositeComponent(Monitor, <Monitor />)
    expect(root).to.exist;
  });
});