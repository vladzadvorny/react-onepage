'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = supportMouseAndKeyboard;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _wheel = require('wheel');

var _reactMotion = require('react-motion');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function supportMouseAndKeyboard(Slider) {
  var WrappedSlider = function (_Component) {
    _inherits(WrappedSlider, _Component);

    function WrappedSlider(props) {
      _classCallCheck(this, WrappedSlider);

      var _this = _possibleConstructorReturn(this, (WrappedSlider.__proto__ || Object.getPrototypeOf(WrappedSlider)).call(this, props));

      _this.state = {
        direction: 0
      };
      return _this;
    }

    _createClass(WrappedSlider, [{
      key: 'handlePrev',
      value: function handlePrev() {
        var direction = this.state.direction;
        var pageIndex = this.props.pageIndex;

        if (direction) {
          return;
        }
        if (pageIndex > 0) {
          this.setState({
            direction: -1
          });
        }
      }
    }, {
      key: 'handleNext',
      value: function handleNext() {
        var direction = this.state.direction;

        if (direction) {
          return;
        }
        var _props = this.props,
            pageIndex = _props.pageIndex,
            children = _props.children;

        var pageCount = _react.Children.count(children);
        if (pageIndex < pageCount - 1) {
          this.setState({
            direction: 1
          });
        }
      }
    }, {
      key: 'componentDidMount',
      value: function componentDidMount() {
        var _this2 = this;

        this.onWheel = function (e) {
          var deltaY = e.deltaY;

          if (deltaY < 0) {
            _this2.handlePrev();
          } else if (deltaY > 0) {
            _this2.handleNext();
          }
          if (e.preventDefault) {
            e.preventDefault();
          }
        };
        this.onKeydown = function (e) {
          if (e.key === 'ArrowUp') {
            _this2.handlePrev();
          } else if (e.key === 'ArrowDown') {
            _this2.handleNext();
          }
        };
        (0, _wheel.addWheelListener)(document, this.onWheel);
        document.addEventListener('keydown', this.onKeydown);
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        (0, _wheel.removeWheelListener)(document, this.onWheel);
        document.removeEventListener('keydown', this.onKeydown);
      }
    }, {
      key: 'handlePage',
      value: function handlePage() {
        var _props2 = this.props,
            pageIndex = _props2.pageIndex,
            onPage = _props2.onPage;
        var direction = this.state.direction;

        if (arguments.length) {
          onPage.apply(this, Array.prototype.slice.call(arguments, 0));
          return;
        }
        if (direction) {
          onPage(pageIndex + direction);
          this.setState({
            direction: 0
          });
        }
      }
    }, {
      key: 'render',
      value: function render() {
        var direction = this.state.direction;
        var _props3 = this.props,
            pageHeight = _props3.pageHeight,
            style = _props3.style;

        if (style) {
          return _react2.default.createElement(Slider, this.props);
        }
        if (direction) {
          style = {
            offset: (0, _reactMotion.spring)(-direction * pageHeight)
          };
        }
        return _react2.default.createElement(Slider, _extends({}, this.props, {
          style: style,
          onPage: this.handlePage.bind(this)
        }));
      }
    }]);

    return WrappedSlider;
  }(_react.Component);

  WrappedSlider.propTypes = Slider.propTypes;
  WrappedSlider.defaultProps = {
    pageHeight: window.innerHeight
  };
  return WrappedSlider;
}