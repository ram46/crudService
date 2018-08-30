var React = require('react');

var ReactTestUtils = require('react-dom/test-utils');
var FormRead = require('../../client/src/components/FormRead.jsx');


var expect = require('chai').expect;

describe('root', function () {
  it('renders without problems', function () {
    var root = ReactTestUtils.isCompositeComponent(FormRead, <FormRead />)
    expect(root).to.exist;
  });
});