var React = require('react');

var ReactTestUtils = require('react-dom/test-utils');
var CrudComponent = require('../../client/src/components/CrudComponent.jsx');


var expect = require('chai').expect;

describe('root', function () {
  it('renders without problems', function () {
    var root = ReactTestUtils.isCompositeComponent(CrudComponent, <CrudComponent />)
    expect(root).to.exist;
  });
});
