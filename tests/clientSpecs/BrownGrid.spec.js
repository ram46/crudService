var React = require('react');

var ReactTestUtils = require('react-dom/test-utils');
var BrownGrid = require('../../client/src/components/BrownGrid.jsx');


var expect = require('chai').expect;

describe('root', function () {
  it('renders without problems', function () {
    var root = ReactTestUtils.isCompositeComponent(BrownGrid, <BrownGrid />)
    expect(root).to.exist;
  });
});


