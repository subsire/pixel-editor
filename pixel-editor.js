require=function(r,e,n){function t(n,o){function i(r){return t(i.resolve(r))}function f(e){return r[n][1][e]||e}if(!e[n]){if(!r[n]){var c="function"==typeof require&&require;if(!o&&c)return c(n,!0);if(u)return u(n,!0);var l=new Error("Cannot find module '"+n+"'");throw l.code="MODULE_NOT_FOUND",l}i.resolve=f;var s=e[n]=new t.Module(n);r[n][0].call(s.exports,i,s,s.exports)}return e[n].exports}function o(r){this.id=r,this.bundle=t,this.exports={}}var u="function"==typeof require&&require;t.isParcelRequire=!0,t.Module=o,t.modules=r,t.cache=e,t.parent=u;for(var i=0;i<n.length;i++)t(n[i]);return t}({21:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=function(){return function(e,t){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return function(e,t){var r=[],n=!0,o=!1,i=void 0;try{for(var l,a=e[Symbol.iterator]();!(n=(l=a.next()).done)&&(r.push(l.value),!t||r.length!==t);n=!0);}catch(e){o=!0,i=e}finally{try{!n&&a.return&&a.return()}finally{if(o)throw i}}return r}(e,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),t=exports.createElement=function(t){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:document.body,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},o=n.id,i=void 0===o?null:o,l=n.className,a=void 0===l?null:l,u=n.styles,c=void 0===u?null:u,s=n.props,f=void 0===s?null:s,d=document.createElement(t);return i&&d.setAttribute("id",i),a&&(Array.isArray(a)?a.forEach(function(e){d.classList.add(e)}):a.split(" ").forEach(function(e){d.classList.add(e)})),c&&Object.entries(c).forEach(function(t){var r=e(t,2),n=r[0],o=r[1];d.style[n]=o}),f&&Object.entries(f).forEach(function(t){var r=e(t,2),n=r[0],o=r[1];d[n]=o}),r.appendChild(d),d},r=exports.resetHtml=function(e){document.getElementById(e).textContent=""},n=exports.colors=[[255,0,0],[255,255,0],[0,255,0],[0,255,255],[0,0,255],[255,0,255],[255,0,0]],o=exports.valueToRgb=function(e){var t=(n.length-1)*e,r=Math.min(Math.floor(t),n.length-2),o=n[r+1],i=n[r],l=t-r;function a(e,t,r){return parseInt((t-e)*r+e)}return{red:a(i[0],o[0],l),green:a(i[1],o[1],l),blue:a(i[2],o[2],l)}},i=exports.decimalToHex=function(e){var t=e.toString(16);return 1===t.length?"0"+t:t},l=exports.hexToRgb=function(e){return 0===e.indexOf("#")&&(e=e.slice(1)),3===e.length&&(e=e[0]+e[0]+e[1]+e[1]+e[2]+e[2]),{red:parseInt(e.slice(0,2),16),green:parseInt(e.slice(2,4),16),blue:parseInt(e.slice(4,6),16)}},a=exports.rgbToHex=function(e){return"#"+i(e.red)+i(e.green)+i(e.blue)},u=exports.valueToHex=function(e){return a(o(e))},c=exports.contrastingColor=function(e){var t=l(e);return(299*t.red+587*t.green+114*t.blue)/1e3>=128?"#000":"#fff"},s=exports.getGridMatrix=function(e){return Array(parseInt(e)).fill().map(function(){return Array(parseInt(e)).fill()})},f=exports.getCanvasFromGrid=function(e){var t=document.createElement("canvas");t.width=e.length,t.height=e.length;for(var r=t.getContext("2d"),n=0;n<e.length;n++)for(var o=0;o<e.length;o++)e[n][o]&&(r.fillStyle=e[n][o],r.fillRect(n,o,1,1));return t};
},{}],11:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.createStore=exports.actionTypes=exports.defaultState=void 0;var e=require("./utils"),t=exports.defaultState={color:.5,grid:(0,e.getGridMatrix)(16),size:16},r=exports.actionTypes={ALL:"all",UPDATE_COLOR:"updateColor",UPDATE_GRID:"updateGrid",UPDATE_SIZE:"updateSize"},i=function(t){var i=Object.assign({},t),s=[];return{dispatch:function(t,a){switch(t){case r.UPDATE_COLOR:i=Object.assign(i,{color:a});break;case r.UPDATE_GRID:var c=i.grid,n=a.color,o=a.x,u=a.y;c[o][u]=n,i=Object.assign(i,{grid:c});break;case r.UPDATE_SIZE:i=Object.assign(i,{size:a,grid:(0,e.getGridMatrix)(a)})}t&&s.filter(function(e){return e.listener.includes(t)||e.listener===r.ALL}).forEach(function(e){e.callback()})},get:function(e){return i.hasOwnProperty(e)?i[e]:null},subscribe:function(e,t){s.push({listener:e,callback:t})}}},s=exports.createStore=function(e){return new i(e)};
},{"./utils":21}],12:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Download=void 0;var e=require("./utils"),t='\n<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">\n    <path d="M14.48,8.74a.6.6,0,0,0-.84,0l-3.05,3.12V3.18h0V3A.59.59,0,1,0,9.41,3v.66h0v8.14l-3.06-3a.59.59,0,1,0-.83.84l4.11,4a.63.63,0,0,0,.42.17.58.58,0,0,0,.42-.18l4-4.11A.6.6,0,0,0,14.48,8.74Z" style="fill: #fff"/>\n    <path d="M17.74,8.57a.6.6,0,0,0-.6.59v7.21H2.85V14.56h0V9.16a.6.6,0,0,0-1.19,0V17a.6.6,0,0,0,.59.6H17.74a.6.6,0,0,0,.59-.6V9.16A.6.6,0,0,0,17.74,8.57Z" style="fill: #fff"/>\n</svg>\n',n=exports.Download=function(n){var o=n.containerId,a=n.store;(0,e.resetHtml)(o);var r=(0,e.createElement)("div",document.getElementById(o)),l=(0,e.createElement)("button",r,{className:"download-button"});l.innerHTML=t+"<span>Download</span>";var i=function(t){if("function"==typeof window.navigator.msSaveBlob)window.navigator.msSaveBlob(t,"pixel-art.png");else{var n=(window.URL||window.webkitURL).createObjectURL(t),o=(0,e.createElement)("a",r,{props:{href:n,download:"pixel-art.png"},styles:{display:"none"}});o.click(),o.remove()}};return l.addEventListener("click",function(t){t.preventDefault();var n=(0,e.getCanvasFromGrid)(a.get("grid"));if("function"==typeof n.toBlob)n.toBlob(i);else if("function"==typeof n.msToBlob)i(n.msToBlob());else{var o=n.toDataURL();o=o.replace(/^data:[a-z]*;,/,"");for(var r=atob(o),l=new ArrayBuffer(r.length),s=new Uint8Array(l),d=0;d<r.length;d++)s[d]=r.charCodeAt(d);i(new Blob([l],{type:"image/png"}))}}),{render:function(){}}};
},{"./utils":21}],13:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Form=void 0;var e=require("./store"),t=require("./utils"),n={min:1,max:498},r='\n<svg xmlns="http://www.w3.org/2000/svg" width="42" height="45" viewBox="0 0 42 45">\n  <polygon points="29.48 15.43 28.07 14.02 21 21.09 13.93 14.02 12.52 15.43 19.59 22.5 12.52 29.57 13.93 30.98 21 23.91 28.07 30.98 29.48 29.57 22.41 22.5 29.48 15.43" style="fill: #d8d8d8"/>\n</svg>\n',a=exports.Form=function(a){var s=a.containerId,i=a.store;(0,t.resetHtml)(s);var o=(0,t.createElement)("div",document.getElementById(s)),m=(0,t.createElement)("div",document.getElementById(s),{className:"flex-container"}),l=(0,t.createElement)("input",o,{className:"form-input form-input-color",props:{type:"text",disabled:!0}}),c=(0,t.createElement)("input",m,{className:"form-input spacer",props:{type:"number",value:i.get("size"),min:n.min,max:n.max}}),p=(0,t.createElement)("div",m,{className:"form-input-space-x"}),u=(0,t.createElement)("input",m,{className:"form-input",props:{type:"number",value:i.get("size"),min:n.min,max:n.max}});p.innerHTML=r;var d=function(){var e=(0,t.valueToHex)(i.get("color"));l.value=e.toUpperCase(),l.style.backgroundColor=e,l.style.color=(0,t.contrastingColor)(e),c.value=i.get("size"),u.value=i.get("size")},v=function(t){i.dispatch(e.actionTypes.UPDATE_SIZE,Math.max(n.min,Math.min(n.max,parseInt(t.target.value))))};return i.subscribe(e.actionTypes.UPDATE_COLOR+" "+e.actionTypes.UPDATE_SIZE,d),c.addEventListener("change",v),u.addEventListener("change",v),{render:d}};
},{"./store":11,"./utils":21}],14:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Grid=void 0;var e=require("./store"),t=require("./utils"),r=exports.Grid=function(r){var o=r.containerId,i=r.store;(0,t.resetHtml)(o);var n=(0,t.createElement)("div",document.getElementById(o),{className:"grid-container"}),a=(0,t.createElement)("div",n,{className:"grid-container-box"}),c=(0,t.createElement)("canvas",a),l=a.offsetWidth,s=c.getContext("2d");s.canvas.width=l,s.canvas.height=l;var d=function(){!function(e){s.clearRect(0,0,l,l);var t=l/e;s.beginPath(),s.strokeStyle="#e0e0e0";for(var r=0;r<l+1;r+=t)s.moveTo(r,0),s.lineTo(r,l);for(var o=0;o<l+1;o+=t)s.moveTo(0,o),s.lineTo(l,o);s.stroke()}(i.get("size"))};return i.subscribe(e.actionTypes.UPDATE_SIZE,d),c.addEventListener("click",function(r){var o=c.getBoundingClientRect(),n=r.clientX-o.left,a=r.clientY-o.top,d=i.get("size"),f=(0,t.valueToHex)(i.get("color"));!function(t,r){var o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"#ffffff",n=i.get("size"),a=l/n;s.fillStyle=o,s.fillRect(t*a,r*a,a,a),i.dispatch(e.actionTypes.UPDATE_GRID,{x:t,y:r,color:o})}(Math.floor(n/l*d),Math.floor(a/l*d),f)}),{render:d}};
},{"./store":11,"./utils":21}],15:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Picker=void 0;var e=require("./store"),t=require("./utils"),n='\n<svg xmlns="http://www.w3.org/2000/svg" width="111" height="28" viewBox="0 0 111 28">\n    <polygon points="0 28 0 0 16 14 0 28" class="arrow"/>\n    <polygon points="111 0 111 28 95 14 111 0" class="arrow"/>\n</svg>\n',r=exports.Picker=function(r){var o=r.containerId,s=r.store;(0,t.resetHtml)(o);var i=(0,t.createElement)("div",document.getElementById(o),{className:"picker-container"}),a=(0,t.createElement)("div",i,{className:"picker-slider",styles:{background:"linear-gradient(to top"+t.colors.reduce(function(e,t){return e+", rgb("+t[0]+", "+t[1]+", "+t[2]+")"},"")+")"}}),c=(0,t.createElement)("div",i,{className:"picker-arrows"}),u=a.offsetHeight;c.innerHTML=n;var l=function(){var e=s.get("color"),n=(0,t.valueToHex)(e);c.style.top=100*(1-e)+"%",Array.from(c.getElementsByClassName("arrow")).forEach(function(e){e.style.fill=n})},m=function(t){var n=t-a.getBoundingClientRect().top;s.dispatch(e.actionTypes.UPDATE_COLOR,Math.max(0,Math.min(1-n/u,1))),l()},d=function(e){m(e.clientY)},v=function e(t){i.removeEventListener("mousemove",d),i.removeEventListener("mouseout",e),document.removeEventListener("mouseup",e),m(t.clientY)};return i.addEventListener("mousedown",function(e){i.addEventListener("mousemove",d),i.addEventListener("mouseout",v),document.addEventListener("mouseup",v),m(e.clientY)}),{render:l}};
},{"./store":11,"./utils":21}],9:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.App=void 0;var e=require("./store"),r=require("./download"),o=require("./form"),n=require("./grid"),t=require("./picker"),d=exports.App=function(){var d=(0,e.createStore)(e.defaultState),i=new r.Download({containerId:"download",store:d}),a=new o.Form({containerId:"form",store:d}),c=new n.Grid({containerId:"grid",store:d}),s=new t.Picker({containerId:"picker",store:d});i.render(),a.render(),c.render(),s.render()};
},{"./store":11,"./download":12,"./form":13,"./grid":14,"./picker":15}],6:[function(require,module,exports) {
"use strict";var r=require("./src/app");(0,r.App)();
},{"./src/app":9}]},{},[6])