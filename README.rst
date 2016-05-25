.. image:: https://raw.githubusercontent.com/score-framework/py.doc/master/docs/score-banner.png
    :target: http://score-framework.org

`The SCORE Framework`_ is a collection of harmonized python and javascript
libraries for the development of large scale web projects. Powered by strg.at_.

.. _The SCORE Framework: http://score-framework.org
.. _strg.at: http://strg.at


**********
score.ajax
**********

.. _js_ajax:

A small helper for managing AJAX requests.

Quickstart
==========

.. code-block:: html

    <script src="score.init.js"></script>
    <script src="score.ajax.js"></script>
    <script>
        score.ajax('/api/fruits').then(function(result) {
            for (var i = 0; i < result.length; i++) {
                console.log('Initiating self-defense against ' + result[i]);
            }
        });
    </script>

Details
=======

Return value
------------

The return value of this function depends on the `Content-Type`_ header of the
server response. You can find a good documentation of the
`XMLHttpRequest.response`_ types on MDN.

.. _Content-Type: https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.17
.. _XMLHttpRequest.response: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/response

Callback
--------

Internet explorer does not provide promises_, you will either have to use a
polyfill, or use the callback-based API of this module:

.. code-block:: javascript

    score.ajax.callback('/api/fruits', function(result) {
        for (var i = 0; i < result.length; i++) {
            console.log('Initiating self-defense against ' + result[i]);
        }
    }, function() {
        // this is the error callback
        alert('Could not load fruits, nothing to defend against!');
    });

If you are passing any options, you must provide them *before* the callback:

.. code-block:: javascript

    score.ajax.callback('/api/fruits', {headers: {'X-Spam': 'spam!'}}, function(result) {
        ...

.. _promises: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise

Options
-------

You can pass an options object after the URL. The following keys are currently
supported:

* ``method``: An HTTP verb to use (i.e. "POST", "PUT", etc.) Defaults to "GET".
* ``headers``: An object mapping HTTP headers to values. These will be sent as
  part of the request. Note that you cannot set certain headers (you can find
  the `list of forbidden headers`_ on MDN). Also note, that it is also possible
  to perform `cross-domain AJAX requests`_, albeit with heavy restrictions.
  
.. _CROSS-domain AJAX requests: https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
.. _list of forbidden headers: https://developer.mozilla.org/en-US/docs/Glossary/Forbidden_header_name


License
=======

Copyright © 2015,2016 STRG.AT GmbH, Vienna, Austria

All files in and beneath this directory are part of The SCORE Framework.
The SCORE Framework and all its parts are free software: you can redistribute
them and/or modify them under the terms of the GNU Lesser General Public
License version 3 as published by the Free Software Foundation which is in the
file named COPYING.LESSER.txt.

The SCORE Framework and all its parts are distributed without any WARRANTY;
without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
PARTICULAR PURPOSE. For more details see the GNU Lesser General Public License.

If you have not received a copy of the GNU Lesser General Public License see
http://www.gnu.org/licenses/.

The License-Agreement realised between you as Licensee and STRG.AT GmbH as
Licenser including the issue of its valid conclusion and its pre- and
post-contractual effects is governed by the laws of Austria. Any disputes
concerning this License-Agreement including the issue of its valid conclusion
and its pre- and post-contractual effects are exclusively decided by the
competent court, in whose district STRG.AT GmbH has its registered seat, at the
discretion of STRG.AT GmbH also the competent court, in whose district the
Licensee has his registered seat, an establishment or assets.
