/* implementation: Copyright (C) 2012-2013 Kurt Milam - http://xioup.com | Source: https://gist.github.com/1868955
*  NPM packaging: Copyright (C) 2012-2014 Pierre-Yves Gérardy | https://github.com/pygy/underscoreDeepExtend
*
* Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
**/

( // Module boilerplate to support browser globals, node.js and AMD.
  (typeof module !== "undefined" && function (m) { module.exports = m(); }) ||
  (typeof define === "function" && function (m) { define('underscoreDeepExtend', m); }) ||
  (function (m) { window['underscoreDeepExtend'] = m(); })
)(function () { return function(_) {

return function underscoreDeepExtend(obj) {
  var parentRE = /#{\s*?_\s*?}/,
      source,
  
      isAssign = function (oProp, sProp) {
        return (_.isUndefined(oProp) || _.isNull(oProp) ||_.isFunction(oProp) || _.isNull(sProp) || _.isDate(sProp));
      },
  
      procAssign = function (oProp, sProp, propName) {
        return sProp;
      },
  
      hasRegex = function (oProp, sProp) {
        return ( _.isString(sProp) && parentRE.test(sProp) );
      },
  
      procRegex = function (oProp, sProp, propName) {
        if (!_.isString(oProp)) {
          return oProp;
          //throw new Error('Trying to combine a string with a non-string (' + propName + ')');
        } else {
          return sProp.replace(parentRE, oProp);
        }
      },
  
      hasArray = function (oProp, sProp) {
        return (_.isArray(oProp) || _.isArray(sProp));
      },
  
      procArray = function (oProp, sProp, propName) {
        if (!_.isArray(oProp) || !_.isArray(sProp)){
          throw new Error('Trying to combine an array with a non-array (' + propName + ')');
        } else {
          return _.reject(_.deepExtend(oProp, sProp), _.isNull);
        }
      },
  
      hasObject = function (oProp, sProp) {
        return (_.isObject(oProp) || _.isObject(sProp));
      },
  
      procObject = function (oProp, sProp, propName) {
        if (!_.isObject(oProp) || !_.isObject(sProp)){
          throw new Error('Trying to combine an object with a non-object (' + propName + ')');
        } else {
          return _.deepExtend(oProp, sProp);
        }
      },

      procMain = function(propName) {
        var oProp = _.clone(obj[propName]),
            sProp = _.clone(source[propName]);
          
        if ( isAssign(oProp, sProp) ) {
          obj[propName] = procAssign(oProp, sProp, propName);
        }
        else if ( hasRegex(oProp, sProp) ) {
          obj[propName] = procRegex(oProp, sProp, propName);
        }
        else if ( hasArray(oProp, sProp) ){
          obj[propName] = procArray(oProp, sProp, propName);
        }
        else if ( hasObject(oProp, sProp) ){
          obj[propName] = procObject(oProp, sProp, propName);
        } else {
          obj[propName] = procAssign(oProp, sProp, propName);
        }
      },
  
      extendObject = function(src) {
        source = src;
        Object.keys(source).forEach(procMain);
      };

  _.each(Array.prototype.slice.call(arguments, 1), extendObject);
  
  return obj;
};

};
});
