var zappos = (function () {

var Zappos = {
  // API will need to be set before we can use the API.
  //    zappos.key = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
  key : null,
  
  // Force the use of AJAX instead of JSONP.
  force : false,
  
  // Incrementor for our JSONP function names.
  _zinc : (new Date).getTime(),

  search : function (args) {
    var params = args.options || {};
    params.term = args.term;
    //params.page = args.page.toString() || '1';
    if (typeof args.filters !== 'undefined') params.filters = args.filters;
    
    Zappos._createAPICall('Search', params, 'GET', args.callback);
  },

  product : function (args) {
    var params = args.options || {};
    //params.id = args.id.toString();
    
    Zappos._createAPICall('Product', params, 'GET', args.callback);
  },
  
  style : function (args) {
    var params = args.options || {};
    params.styleId = args.id.toString();
    
    Zappos._createAPICall('Product', params, 'GET', args.callback);
  },
  
  productImages : function (args) {
    var params = args.options || {};
    params.productId = args.id.toString();
    
    Zappos._createAPICall('Image', params, 'GET', args.callback);
  },
  
  styleImages : function (args) {
    var params = args.options || {};
    params.styleId = args.id.toString();
    
    Zappos._createAPICall('Image', params, 'GET', args.callback);
  },
  
  imageRecipes : function (callback) {
    Zappos._createAPICall('Image', 'recipes', 'GET', callback);
  },
    
  statistics : function (args) {
    var params = args.options || {};
    params.type = args.type;
    if (typeof args.limit !== 'undefined') params.limit = args.limit.toString();
    if (typeof args.location !== 'undefined') params.location = args.location;
    
    Zappos._createAPICall('Statistics', params, 'GET', args.callback);
  },
  
  brand : function (args) {
    var params = args.options || {};
    params.id = args.id.toString();
    
    Zappos._createAPICall('Brand', params, 'GET', args.callback);
  },
  
  reviews : function (args) {
    var params = args.options || {};
    params.page = args.page.toString();
    params.productId = args.id.toString();
    
    Zappos._createAPICall('Review', params, 'GET', args.callback);
  },
  
  autoComplete : function (term, callback) {
    var params = { term : term };
    Zappos._createAPICall('AutoComplete', params, 'GET', callback);
  },
  
  coreValues : function (id, callback) {
    switch (id) {
      case 'random' :

        break;
      // If `id` is a Number or a String that !== 'random', then we make a call
      // for a single CoreValue.
      case ((typeof id == 'number' || typeof id == 'string') ? id : false ) :
        Zappos._createAPICall('CoreValue', { id : id.toString() }, 'GET', callback);
        break;
      default :
        Zappos._createAPICall('CoreValue', {}, 'GET', callback);
        break;
    }
  },
  
  _createAPICall : function (controller, params, method, callback, secure) {
    if (!Zappos.key) throw "Error: Zappos API key is not set."; 
    
    var url = [],
        data = null;
    
    secure ? url.push('https://www.zappos.com/api/') : url.push('http://www.zappos.com/api/');    
    url.push(controller,'?');
    
    switch (method) {
      case 'GET' :
        if (typeof params === 'object') {
          url.push(Zappos._serialize(params), '&key=', Zappos.key);
        } else {
          url.push(params, '&key=', Zappos.key);
        }
        break;
        
      case 'POST' :
        url.push('key=', Zappos.key);
        data = Zappos._serialize(params);
        break;
    }
    
    if (Zappos.force || method == 'POST') {
      Zappos._ajaxFetch(url.join(''), callback, data);
    } else {
      Zappos._jsonpFetch(url.join(''), callback);
    }
  },

  _jsonpFetch : function (url, callback) {
    var head = document.getElementsByTagName('head')[0],
        script = document.createElement('script'),
        jsonp = 'jsonp' + Zappos._zinc++;

    window[jsonp] = function(data) {
      callback(data);
      head.removeChild(script);
    };
    
    url = url + '&callback=' + jsonp;

    // NASTY HACK - TODO: find a way to fix this...
    $('#output').val(url);

    script.setAttribute('src', url);
    head.appendChild(script);
  },
  
  _ajaxFetch : function (url, callback, data) {
    var request = Zappos._createRequest();
    if (!request) return;
    
    var method = data ? "POST" : "GET",
        data = data ? encodeURIComponent(Zappos._serialize(data)) : null;
    
    request.open(method, url, true);
    request.setRequestHeader('User-Agent','XMLHTTP/1.0');
    if (data) request.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    request.onreadystatechange = function() {
      if (request.readyState == 4 && request.status == 200) {
        callback(request.responseText);
      }
    }
    req.send(data);    
  },
  
  _createRequest : function () {
    var request = false;
    try {
      request = new XMLHttpRequest();
    } catch(e) {
      try {
        request = new ActiveXObject("Msxml2.XMLHTTP");
      } catch (e) {
        try {
          request = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (E) {
          request = false;
        }
      }
    }
    return request;
  },
  
  _serialize : function (data) {
    var serial = [];
    for (var k in data) {
      if (typeof data[k] == 'string' || typeof data[k] == 'number') {
        serial.push(k + '=' + escape(data[k]));
      } else if (data[k].length) {
        serial.push(k + '=["' + data[k].join('","') + '"]');
      } else {
        var obj = data[k],
            buffer = [];
        for (var key in obj) {
          if (typeof obj[key] === 'string') {
            buffer.push('"' + key + '":"' + obj[key] + '"');
          } else {
            buffer.push('"' + key + '":["' + obj[key].join('","') + '"],'); //FIXME: Get rid of last comma
          }
        }
        serial.push(k + '={' + buffer.join('') + '}');
      }
    }
    return serial.join('&');
  }
  
}

return (window.zappos = Zappos);
  
}());

