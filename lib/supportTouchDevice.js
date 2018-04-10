'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = supportTouchDevice;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactMotion = require('react-motion');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function supportTouchDevice(Slider) {
  var TouchSlider = function (_Component) {
    _inherits(TouchSlider, _Component);

    function TouchSlider(props) {
      _classCallCheck(this, TouchSlider);

      var _this = _possibleConstructorReturn(this, (TouchSlider.__proto__ || Object.getPrototypeOf(TouchSlider)).call(this, props));

      _this.state = {
        isPressed: false,
        pressed: [0, 0],
        delta: [0, 0]
      };
      return _this;
    }

    _createClass(TouchSlider, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        document.addEventListener('touchstart', this.start.bind(this));
        document.addEventListener('touchmove', this.move.bind(this));
        document.addEventListener('touchend', this.end.bind(this));
      }
    }, {
      key: 'start',
      value: function start(e) {
        var source = e.touches ? e.touches[0] : e;
        var pageX = source.pageX,
            pageY = source.pageY;

        if (this.state.delta[0] !== 0) {
          return;
        }
        this.setState({
          isPressed: true,
          pressed: [pageX, pageY]
        });
      }
    }, {
      key: 'move',
      value: function move(e) {
        var source = e.touches ? e.touches[0] : e;
        var pageX = source.pageX,
            pageY = source.pageY;

        if (e.preventDefault) {
          e.preventDefault();
        }
        var _state = this.state,
            isPressed = _state.isPressed,
            pressed = _state.pressed;

        var _pressed = _slicedToArray(pressed, 2),
            x = _pressed[0],
            y = _pressed[1];

        if (isPressed) {
          this.setState({
            delta: [pageX - x, pageY - y]
          });
        }
      }
    }, {
      key: 'end',
      value: function end() {
        var _props = this.props,
            pageIndex = _props.pageIndex,
            pageHeight = _props.pageHeight,
            children = _props.children;

        var pageCount = _react.Children.count(children);
        var delta = this.state.delta;

        var _delta = _slicedToArray(delta, 2),
            x = _delta[0],
            y = _delta[1];

        var newDelta = [0, 0];
        if (y > 0 && 0 < pageIndex || y < 0 && pageIndex < pageCount - 1) {
          if (Math.abs(y) > pageHeight * 0.2) {
            newDelta = [x, y > 0 ? pageHeight : -pageHeight];
          } else {
            newDelta = [1, 0];
          }
        }
        if (y > 0 && pageIndex === 0 || y < 0 && pageIndex === pageCount - 1) {
          newDelta = [1, 0];
        }
        this.setState({
          isPressed: false,
          delta: newDelta
        });
      }
    }, {
      key: 'handlePage',
      value: function handlePage() {
        var _props2 = this.props,
            onPage = _props2.onPage,
            pageIndex = _props2.pageIndex;
        var _state2 = this.state,
            isPressed = _state2.isPressed,
            pressed = _state2.pressed,
            delta = _state2.delta;

        if (arguments.length) {
          onPage.apply(this, Array.prototype.slice.call(arguments, 0));
          return;
        }
        if (isPressed) {
          return;
        }
        if (pressed[0]) {
          if (delta[1]) {
            var nextPage = pageIndex + (delta[1] > 0 ? -1 : 1);
            onPage(nextPage);
          }
          this.setState({
            pressed: [0, 0],
            delta: [0, 0]
          });
        }
      }
    }, {
      key: 'render',
      value: function render() {
        var style = this.props.style;

        if (style) {
          return _react2.default.createElement(Slider, this.props);
        }
        var _state3 = this.state,
            isPressed = _state3.isPressed,
            delta = _state3.delta;

        if (isPressed) {
          var _delta2 = _slicedToArray(delta, 2),
              y = _delta2[1];

          style = {
            offset: y
          };
        } else if (delta[0]) {
          var _delta3 = _slicedToArray(delta, 2),
              _y = _delta3[1];

          style = {
            offset: (0, _reactMotion.spring)(_y, { stiffness: 260, damping: 30, precision: 1 })
          };
        }
        return _react2.default.createElement(Slider, _extends({}, this.props, {
          style: style,
          onPage: this.handlePage.bind(this)
        }));
      }
    }]);

    return TouchSlider;
  }(_react.Component);

  TouchSlider.propTypes = Slider.propTypes;
  TouchSlider.defaultProps = {
    pageHeight: window.innerHeight
  };
  return TouchSlider;
}