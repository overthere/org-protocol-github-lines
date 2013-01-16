// ==UserScript==
// @name           org-protocol-github-files
// @description    Insert Emacs links for files on github
// @author         Rüdiger Sonderfeld <ruediger@c-plusplus.de>
// @include        https://github.com/*
// @version        0.1.0
// @grant          none
// @license        LGPL http://www.gnu.org/licenses/lgpl.html
// ==/UserScript==

var forEach = Array.prototype.forEach;

// Emacs Icon is part of Emacs and GPLv3!
var emacsIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAABGdBTUEAANbY1E9YMgAAA6JJREFUeNpiiQhZyfD%2FPyMDCEBpm%2F%2F%2FGYIZGRkcmBgZZf7%2B%2B8%2Fw%2B%2Fffx39%2B%2Fz%2Fw5%2B%2B%2FdRzsLEeAcgwsrIwMjEAGQACxMCAADyPD%2Fw6gohRmZgZ2Pj52Bi5uNgZRUS4Gfn4OEVZWZsMPH35mXb74evaXL78qgQZ8AWkCCCCYAXxAvP4%2Fwz8nKWluBg1NUQYODhaG37%2F%2BMTAxMTJwcLIwSEryMFhay7LfvfMhp7fzuOaXrz%2BDWFiYPwEEENgARsb%2F7UBXOTEAFfsHaDJYWcsx%2FPz5l4GRiYHh54%2B%2FDN%2B%2B%2FwLz%2F%2F1jZNDUEmWQleNxvnLlRwcLC0MWQACxAL0B8nMyIzMjAxcXK8PTp58Yfv3%2Bx%2FDl6y%2BGa1dfgoxnYAbKsbOzMHz%2B9Ivh%2Fr13DE%2BefGRgZ2NMAlq8DCCAgC5gjADaxA5yKkjR7dtvGU4cf8xgbCzF8ANo%2B%2F1770Ghy%2FD1y2%2BGt%2B%2B%2BMbx5843hL9ACZhZG9n%2F%2FGKIAAogFaIE1MLQZfv36y%2FD5808GLh5WhlMnHzP8%2BP6HwdBYgoEHGJDHjz1i%2BPjhB8OPn38YWFgYGf79BXr4H9jrFgABxAK0WAYYTQwqasIMxiZSDNLSfAw8PGwMf%2F4AvQG0Vd9IkoEbyN%2B86QbDR6AFIC%2BBESOYKQkQQCxAm%2F%2FZ2CowJKUag8IQ6Nr%2FQJf8Ynjw8D3DixdfGO4CvcQIlJCS4mN4%2FeoLAyhd%2FIcYA6QZ%2FwMEEMu%2Ff%2F8fKakIioEEfgNtvXnjDcPatVcZvgEDkYWFCZxY%2Fv79B5QDxgJQ538gAdbMCEpI%2Fx8DBBATKxvz4V077zDcvfsW7IJ3wID6%2BOE7MJCYwE4HJiIGISFOBn4%2BDgZOTlZgjDAhpT2GgwABxGygH%2F7x86ef0deuvmZlY2dmMDWTZjACxgAoHFiASRJsOzDU%2F4FsBtkKdPivX2D%2BJ6ABJQABxKynG%2FYEmKLEvn37bX7x4nOGVy%2B%2FMIiL8QBToxiDjrYYg7qGCIO8vAA4Nn4CY%2BHd2%2B%2FgGAP6oQNo3gqAAAIZAPLTUWBAmXNwsCoCwxAcnR%2BA0fb%2B%2FQ%2BwfzU0RBl09cQZlJWFGE4C08injz9XMjEzFgOl%2FgIEECwvfAaaFvD3z7%2FeHz9%2BJ719%2B40ZFNafPv1gePnyM8PlSy%2BBqfAHw7PnXz68ffNtAjBwW4D2%2FAVpBAgg5Nz4GWh7GtDWlW9efwsHRqc1UEwciP8AU9wjIH8fExPDCjZWlgvIoQgQYADfw28ecb4M7wAAAABJRU5ErkJggg%3D%3D";

/*
 * Structure is
 * <tr><td><span class="mini-icon-text-file" /></td><td class="content"><a href="..."></a></td></tr>
 */

var textFiles = document.querySelectorAll(".mini-icon-text-file");
forEach.call(textFiles, function(textFile) {
  var tr = textFile.parentNode;
  if(!tr) {
    return;
  }
  var content = tr.nextElementSibling;
  if(!content) {
    return;
  }
  var fileLink = content.firstElementChild;
  if(!fileLink) {
    return;
  }

  var href = fileLink.getAttribute('href');
  if(!href) {
    return;
  }

  var file = href.replace(/(blob|tree)\/[^\/]+\//, ""); // remove /blob/branch/ part
  var orgLink = "org-protocol://github-lines:/" + file + "/";
  var imgHTML = '<a href="' + orgLink + '"><img src="' + emacsIcon + '" alt="E" title="Open in Emacs"></img></a>';

  var range = document.createRange();
  range.selectNode(tr);
  var documentFragment = range.createContextualFragment(imgHTML);
  tr.replaceChild(documentFragment, textFile);
});
