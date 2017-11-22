(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var calculator = function () {
    var displayNumber = 0,
        op = '',
        equation = [];

    //----- cache DOM

    var $display = $('#display-number'),
        $numbers = $('.number'),
        $operators = $('.operator'),
        $clear = $('#clear-btn'),
        $equals = $('#equal-btn'),
        $posNeg = $('#pos-neg');

    //----- END cache DOM
    //----- general functions

    var render = function render(val) {
        $display.text(val);
    };
    var onNum = function onNum(event) {
        var curDigit = $(event.target).text();
        if (displayNumber) {
            displayNumber += curDigit;
        } else {
            displayNumber = curDigit;
        }
        if (op) {
            equation.push(op);
            op = '';
        }
        if (equation.length < 2) {
            equation = [displayNumber];
        }
        render(displayNumber);
    };
    var onOp = function onOp(event) {
        op = $(event.target).text();
        if (displayNumber) {
            if (equation.length === 3) {
                sum();
                equation.push(op);
                op = '';
            }
        }
        if (equation.length === 1) {
            equation.push(op);
            op = '';
        }
        displayNumber = '';
    };
    var clearDisplay = function clearDisplay() {
        displayNumber = 0;
        op = '';
        equation = [];
        render(displayNumber);
    };
    var sum = function sum() {

        if (equation.length === 2) {
            equation.push(displayNumber);
        }
        displayNumber = eval(equation.join(' ')).toString();
        render(displayNumber);
        equation = [displayNumber];
        displayNumber = '';
    };
    var posOrNeg = function posOrNeg() {
        if (displayNumber) {
            var _dn = displayNumber;
            if (_dn.startsWith('-')) {
                _dn = _dn.substr(_dn.indexOf('-') + 1);
            } else {
                _dn = '-' + _dn;
            }
            displayNumber = _dn;
            render(_dn);
        } else if (equation.length === 1) {
            var _dn2 = equation[0];
            if (_dn2.startsWith('-')) {
                _dn2 = _dn2.substr(_dn2.indexOf('-') + 1);
            } else {
                _dn2 = '-' + _dn2;
            }
            equation[0] = _dn2;
            render(_dn2);
        } else {
            dn = '-';
            displayNumber = dn;
            render(dn);
        }
    };

    //----- END general functions
    //----- bind Events

    $numbers.click(function (event) {
        return onNum(event);
    });
    $operators.click(function (event) {
        return onOp(event);
    });
    $clear.click(clearDisplay);
    $equals.click(sum);
    $posNeg.click(posOrNeg);

    //----- END bind Events

    render(displayNumber);
}();

},{}]},{},[1]);
