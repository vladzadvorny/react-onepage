'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactMotion = require('react-motion');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var wrapperStyle = {
  WebkitTransform: 'translate3d(0, 0, 0)',
  transform: 'translate3d(0, 0, 0)',
  height: '100%'
};

var Slider = function (_Component) {
  _inherits(Slider, _Component);

  function Slider() {
    _classCallCheck(this, Slider);

    return _possibleConstructorReturn(this, (Slider.__proto__ || Object.getPrototypeOf(Slider)).apply(this, arguments));
  }

  _createClass(Slider, [{
    key: 'updateStyle',
    value: function updateStyle(value) {
      // https://github.com/chenglou/react-motion/issues/322
      // onRest in react-motion doesn't trigger re-render
      // here we could determine whether the previous animation has ended
      // by checking out if currentStyle === lastStyle && nextStyle === initialStyle
      var _props = this.props,
          pageIndex = _props.pageIndex,
          style = _props.style,
          pageHeight = _props.pageHeight;
      var offset = value.offset;

      var newOffset = (Math.abs(offset) === pageHeight && style.offset === 0 ? -pageHeight * pageIndex : -pageHeight * pageIndex + offset) + 'px';
      return {
        WebkitTransform: 'translate3d(0, ' + newOffset + ', 0)',
        transform: 'translate3d(0, ' + newOffset + ', 0)'
      };
    }
  }, {
    key: 'handleMotionRest',
    value: function handleMotionRest() {
      this.props.onPage();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props2 = this.props,
          style = _props2.style,
          children = _props2.children;

      return _react2.default.createElement(
        'div',
        { style: { height: '100%' } },
        _react2.default.createElement(
          _reactMotion.Motion,
          { style: style, onRest: this.handleMotionRest.bind(this) },
          function (value) {
            return _react2.default.createElement(
              'div',
              {
                style: Object.assign({}, wrapperStyle, _this2.updateStyle(value)) },
              children
            );
          }
        )
      );
    }
  }]);

  return Slider;
}(_react.Component);

exports.default = Slider;


Slider.propTypes = {
  pageIndex: _propTypes2.default.number.isRequired,
  pageHeight: _propTypes2.default.number.isRequired,
  onPage: _propTypes2.default.func,
  children: _propTypes2.default.any,
  style: _propTypes2.default.object
};
Slider.defaultProps = {
  pageIndex: 0,
  pageHeight: window.innerHeight,
  style: {
    offset: 0
  },
  onPage: function onPage() {}
};