var React = require('react');

var ReactTestUtils = require('react-dom/test-utils');
var FormUpdate = require('../../client/src/components/FormUpdate.jsx');


var expect = require('chai').expect;

describe('root', function () {
  it('renders without problems', function () {
    var root = ReactTestUtils.isCompositeComponent(FormUpdate, <FormUpdate />)
    expect(root).to.exist;
  });
});