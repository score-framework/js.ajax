/**
 * Copyright © 2015-2017 STRG.AT GmbH, Vienna, Austria
 *
 * This file is part of the The SCORE Framework.
 *
 * The SCORE Framework and all its parts are free software: you can redistribute
 * them and/or modify them under the terms of the GNU Lesser General Public
 * License version 3 as published by the Free Software Foundation which is in the
 * file named COPYING.LESSER.txt.
 *
 * The SCORE Framework and all its parts are distributed without any WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
 * PARTICULAR PURPOSE. For more details see the GNU Lesser General Public
 * License.
 *
 * If you have not received a copy of the GNU Lesser General Public License see
 * http://www.gnu.org/licenses/.
 *
 * The License-Agreement realised between you as Licensee and STRG.AT GmbH as
 * Licenser including the issue of its valid conclusion and its pre- and
 * post-contractual effects is governed by the laws of Austria. Any disputes
 * concerning this License-Agreement including the issue of its valid conclusion
 * and its pre- and post-contractual effects are exclusively decided by the
 * competent court, in whose district STRG.AT GmbH has its registered seat, at
 * the discretion of STRG.AT GmbH also the competent court, in whose district the
 * Licensee has his registered seat, an establishment or assets.
 */

// Universal Module Loader
// https://github.com/umdjs/umd
// https://github.com/umdjs/umd/blob/v1.0.0/returnExports.js
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.score.extend('ajax', [], factory);
    }
})(this, function() {

    var ajax = function(url, options) {
        return new Promise(function(resolve, reject) {
            return ajax.callback(url, options, resolve, reject);
        });
    };

    ajax.callback = function(url, options, successCallback, errorCallback) {
        if (typeof options == 'function') {
            errorCallback = successCallback;
            successCallback = options;
            options = {};
        } else if (!options) {
            options = {};
        }
        var request = new XMLHttpRequest();
        request.onreadystatechange = function() {
            if (request.readyState === XMLHttpRequest.DONE) {
                if (request.status == 200) {
                    var response;
                    if (request.responseType && typeof request.response != 'undefined') {
                        response = request.response;
                    } else {
                        response = request.responseText;
                        if (request.getResponseHeader('Content-Type').trim().substr(0, 16) == 'application/json') {
                            response = JSON.parse(response);
                        }
                    }
                    successCallback(response);
                } else if (errorCallback) {
                    errorCallback(new Error('Unexpected status code ' + request.status));
                }
            }
        };
        request.open(options.method || 'GET', url, true);
        if (!options.crossDomain) {
            request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        } else {
            // https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS#Requests_with_credentials
            request.withCredentials = true;
        }
        if (options.headers) {
            for (var key in options.headers) {
                request.setRequestHeader(key, options.headers[key]);
            }
        }
        request.send(options.data || '');
    };

    ajax.__version__ = '0.1.0';

    return ajax;

});
