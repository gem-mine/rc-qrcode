webpackJsonp(["README.md"],{"/6h/":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=function(){function t(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,n,o){return n&&t(e.prototype,n),o&&t(e,o),e}}();var a=function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.buffer=[],this.length=0}return o(t,[{key:"get",value:function(t){var e=Math.floor(t/8);return this.buffer[e]>>>7-t%8&1}},{key:"put",value:function(t,e){for(var n=0;n<e;n++)this.putBit(t>>>e-n-1&1)}},{key:"putBit",value:function(t){var e=Math.floor(this.length/8);this.buffer.length<=e&&this.buffer.push(0),t&&(this.buffer[e]|=128>>>this.length%8),this.length++}}]),t}();e.default=a,t.exports=e.default},"/SRH":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=function(){function t(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,n,o){return n&&t(e.prototype,n),o&&t(e,o),e}}(),a=i(n("/6h/")),s=i(n("lPEt")),r=i(n("/lia")),u=n("R6qD");function i(t){return t&&t.__esModule?t:{default:t}}function c(t){return t<128?[t]:t<2048?[192+(t>>6),128+(63&t)]:[224+(t>>12),128+(t>>6&63),128+(63&t)]}var l=function(){function t(e,n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.PAD0=236,this.PAD1=17,this.typeNumber=-1,this.errorCorrectLevel=n,this.modules=null,this.moduleCount=0,this.dataCache=null,this.rsBlocks=null,this.totalDataCount=-1,this.data=e,this.utf8bytes=function(t){for(var e=[],n=0;n<t.length;n++)for(var o=c(t.charCodeAt(n)),a=0;a<o.length;a++)e.push(o[a]);return e}(e),this.make()}return o(t,[{key:"getModuleCount",value:function(){return this.moduleCount}},{key:"make",value:function(){this.getRightType(),this.dataCache=this.createData(),this.createQrcode()}},{key:"makeImpl",value:function(t){this.moduleCount=4*this.typeNumber+17,this.modules=new Array(this.moduleCount);for(var e=0;e<this.moduleCount;e++)this.modules[e]=new Array(this.moduleCount);this.setupPositionProbePattern(0,0),this.setupPositionProbePattern(this.moduleCount-7,0),this.setupPositionProbePattern(0,this.moduleCount-7),this.setupPositionAdjustPattern(),this.setupTimingPattern(),this.setupTypeInfo(!0,t),this.typeNumber>=7&&this.setupTypeNumber(!0),this.mapData(this.dataCache,t)}},{key:"setupPositionProbePattern",value:function(t,e){for(var n=-1;n<=7;n++)if(!(t+n<=-1||this.moduleCount<=t+n))for(var o=-1;o<=7;o++)e+o<=-1||this.moduleCount<=e+o||(this.modules[t+n][e+o]=0<=n&&n<=6&&(0==o||6==o)||0<=o&&o<=6&&(0==n||6==n)||2<=n&&n<=4&&2<=o&&o<=4)}},{key:"createQrcode",value:function(){for(var t=0,e=0,n=null,o=0;o<8;o++){this.makeImpl(o);var a=r.default.getLostPoint(this);(0==o||t>a)&&(t=a,e=o,n=this.modules)}this.modules=n,this.setupTypeInfo(!1,e),this.typeNumber>=7&&this.setupTypeNumber(!1)}},{key:"setupTimingPattern",value:function(){for(var t=8;t<this.moduleCount-8;t++)null==this.modules[t][6]&&(this.modules[t][6]=t%2==0,null==this.modules[6][t]&&(this.modules[6][t]=t%2==0))}},{key:"setupPositionAdjustPattern",value:function(){for(var t=r.default.getPatternPosition(this.typeNumber),e=0;e<t.length;e++)for(var n=0;n<t.length;n++){var o=t[e],a=t[n];if(null==this.modules[o][a])for(var s=-2;s<=2;s++)for(var u=-2;u<=2;u++)this.modules[o+s][a+u]=-2==s||2==s||-2==u||2==u||0==s&&0==u}}},{key:"setupTypeNumber",value:function(t){for(var e=r.default.getBCHTypeNumber(this.typeNumber),n=0;n<18;n++){var o=!t&&1==(e>>n&1);this.modules[Math.floor(n/3)][n%3+this.moduleCount-8-3]=o,this.modules[n%3+this.moduleCount-8-3][Math.floor(n/3)]=o}}},{key:"setupTypeInfo",value:function(t,e){for(var n=u.QRErrorCorrectLevel[this.errorCorrectLevel]<<3|e,o=r.default.getBCHTypeInfo(n),a=0;a<15;a++){var s=!t&&1==(o>>a&1);a<6?this.modules[a][8]=s:a<8?this.modules[a+1][8]=s:this.modules[this.moduleCount-15+a][8]=s;s=!t&&1==(o>>a&1);a<8?this.modules[8][this.moduleCount-a-1]=s:a<9?this.modules[8][15-a-1+1]=s:this.modules[8][15-a-1]=s}this.modules[this.moduleCount-8][8]=!t}},{key:"createData",value:function(){var t=new a.default,e=this.typeNumber>9?16:8;t.put(4,4),t.put(this.utf8bytes.length,e);for(var n=0,o=this.utf8bytes.length;n<o;n++)t.put(this.utf8bytes[n],8);for(t.length+4<=8*this.totalDataCount&&t.put(0,4);t.length%8!=0;)t.putBit(!1);for(;!(t.length>=8*this.totalDataCount||(t.put(this.PAD0,8),t.length>=8*this.totalDataCount));)t.put(this.PAD1,8);return this.createBytes(t)}},{key:"createBytes",value:function(t){for(var e=0,n=0,o=0,a=this.rsBlock.length/3,u=new Array,i=0;i<a;i++)for(var c=this.rsBlock[3*i+0],l=this.rsBlock[3*i+1],p=this.rsBlock[3*i+2],f=0;f<c;f++)u.push([p,l]);for(var d=new Array(u.length),h=new Array(u.length),m=0;m<u.length;m++){var g=u[m][0],k=u[m][1]-g;n=Math.max(n,g),o=Math.max(o,k),d[m]=new Array(g);for(i=0;i<d[m].length;i++)d[m][i]=255&t.buffer[i+e];e+=g;var v=r.default.getErrorCorrectPolynomial(k),y=new s.default(d[m],v.getLength()-1).mod(v);h[m]=new Array(v.getLength()-1);for(i=0;i<h[m].length;i++){var b=i+y.getLength()-h[m].length;h[m][i]=b>=0?y.get(b):0}}var w=new Array(this.totalDataCount),P=0;for(i=0;i<n;i++)for(m=0;m<u.length;m++)i<d[m].length&&(w[P++]=d[m][i]);for(i=0;i<o;i++)for(m=0;m<u.length;m++)i<h[m].length&&(w[P++]=h[m][i]);return w}},{key:"mapData",value:function(t,e){for(var n=-1,o=this.moduleCount-1,a=7,s=0,u=this.moduleCount-1;u>0;u-=2)for(6==u&&u--;;){for(var i=0;i<2;i++)if(null==this.modules[o][u-i]){var c=!1;s<t.length&&(c=1==(t[s]>>>a&1)),r.default.getMask(e,o,u-i)&&(c=!c),this.modules[o][u-i]=c,-1==--a&&(s++,a=7)}if((o+=n)<0||this.moduleCount<=o){o-=n,n=-n;break}}}},{key:"getRightType",value:function(){for(var t=1;t<41;t++){var e=u.RSBlockTable[4*(t-1)+this.errorCorrectLevel];if(void 0==e)throw new Error("bad rs block @ typeNumber:"+t+"/errorCorrectLevel:"+this.errorCorrectLevel);for(var n=e.length/3,o=0,a=0;a<n;a++){var s=e[3*a+0];o+=e[3*a+2]*s}var r=t>9?2:1;if(this.utf8bytes.length+r<o||40==t){this.typeNumber=t,this.rsBlock=e,this.totalDataCount=o;break}}}}]),t}();e.default=l,t.exports=e.default},"/lia":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=a(n("lPEt"));function a(t){return t&&t.__esModule?t:{default:t}}var s=new(a(n("nNno")).default),r=0,u=1,i=2,c=3,l=4,p=5,f=6,d=7;e.default={PATTERN_POSITION_TABLE:[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],G15:1335,G18:7973,G15_MASK:21522,getBCHTypeInfo:function(t){for(var e=t<<10;this.getBCHDigit(e)-this.getBCHDigit(this.G15)>=0;)e^=this.G15<<this.getBCHDigit(e)-this.getBCHDigit(this.G15);return(t<<10|e)^this.G15_MASK},getBCHTypeNumber:function(t){for(var e=t<<12;this.getBCHDigit(e)-this.getBCHDigit(this.G18)>=0;)e^=this.G18<<this.getBCHDigit(e)-this.getBCHDigit(this.G18);return t<<12|e},getBCHDigit:function(t){for(var e=0;0!==t;)e++,t>>>=1;return e},getPatternPosition:function(t){return this.PATTERN_POSITION_TABLE[t-1]},getMask:function(t,e,n){switch(t){case r:return(e+n)%2==0;case u:return e%2==0;case i:return n%3==0;case c:return(e+n)%3==0;case l:return(Math.floor(e/2)+Math.floor(n/3))%2==0;case p:return e*n%2+e*n%3==0;case f:return(e*n%2+e*n%3)%2==0;case d:return(e*n%3+(e+n)%2)%2==0;default:throw new Error("bad maskPattern:"+t)}},getErrorCorrectPolynomial:function(t){for(var e=new o.default([1],0),n=0;n<t;n++)e=e.multiply(new o.default([1,s.gexp(n)],0));return e},getLostPoint:function(t){for(var e=t.getModuleCount(),n=0,o=0,a=0;a<e;a++)for(var s=0,r=t.modules[a][0],u=0;u<e;u++){var i=t.modules[a][u];if(u<e-6&&i&&!t.modules[a][u+1]&&t.modules[a][u+2]&&t.modules[a][u+3]&&t.modules[a][u+4]&&!t.modules[a][u+5]&&t.modules[a][u+6]&&(u<e-10?t.modules[a][u+7]&&t.modules[a][u+8]&&t.modules[a][u+9]&&t.modules[a][u+10]&&(n+=40):u>3&&t.modules[a][u-1]&&t.modules[a][u-2]&&t.modules[a][u-3]&&t.modules[a][u-4]&&(n+=40)),a<e-1&&u<e-1){var c=0;i&&c++,t.modules[a+1][u]&&c++,t.modules[a][u+1]&&c++,t.modules[a+1][u+1]&&c++,0!==c&&4!==c||(n+=3)}r^i?s++:(r=i,s>=5&&(n+=3+s-5),s=1),i&&o++}for(var l=0;l<e;l++)for(var p=0,f=t.modules[0][l],d=0;d<e;d++){var h=t.modules[d][l];d<e-6&&h&&!t.modules[d+1][l]&&t.modules[d+2][l]&&t.modules[d+3][l]&&t.modules[d+4][l]&&!t.modules[d+5][l]&&t.modules[d+6][l]&&(d<e-10?t.modules[d+7][l]&&t.modules[d+8][l]&&t.modules[d+9][l]&&t.modules[d+10][l]&&(n+=40):d>3&&t.modules[d-1][l]&&t.modules[d-2][l]&&t.modules[d-3][l]&&t.modules[d-4][l]&&(n+=40)),f^h?p++:(f=h,p>=5&&(n+=3+p-5),p=1)}return n+=10*(Math.abs(100*o/e/e-50)/5)}},t.exports=e.default},IQ7J:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=function(){function t(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,n,o){return n&&t(e.prototype,n),o&&t(e,o),e}}(),a=r(n("WJJ6")),s=r(n("/SRH"));function r(t){return t&&t.__esModule?t:{default:t}}var u=[],i=function(t){var e=t.options;return e.pdground&&(t.row>1&&t.row<5&&t.col>1&&t.col<5||t.row>t.count-6&&t.row<t.count-2&&t.col>1&&t.col<5||t.row>1&&t.row<5&&t.col>t.count-6&&t.col<t.count-2)?e.pdground:e.foreground},c=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),"string"==typeof e&&(e={text:e}),this.options=(0,a.default)({},{text:"",render:"",size:256,correctLevel:3,background:"#fff",foreground:"#000",image:"",imageSize:30},e);for(var n=null,o=0,r=u.length;o<r;o++)if(u[o].text==this.options.text&&u[o].text.correctLevel==this.options.correctLevel){n=u[o].obj;break}if(o==r&&(n=new s.default(this.options.text,this.options.correctLevel),u.push({text:this.options.text,correctLevel:this.options.correctLevel,obj:n})),this.options.render)switch(this.options.render){case"canvas":return this.createCanvas(n);case"table":return this.createTable(n);case"svg":return this.createSVG(n);default:return this.createDefault(n)}return this.createDefault(n)}return o(t,[{key:"createDefault",value:function(t){if(document.createElement("canvas").getContext)return this.createCanvas(t);return document.createElementNS&&document.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect?this.createSVG(t):this.createTable(t)}},{key:"createCanvas",value:function(t){var e=this.options,n=document.createElement("canvas"),o=n.getContext("2d"),a=t.getModuleCount(),s=function(t){var e=t.backingStorePixelRatio||t.webkitBackingStorePixelRatio||t.mozBackingStorePixelRatio||t.msBackingStorePixelRatio||t.oBackingStorePixelRatio||t.backingStorePixelRatio||1;return(window.devicePixelRatio||1)/e}(o),r=e.size,u=r*s,c=e.imageSize*s,l=(u/a).toPrecision(4),p=(u/a).toPrecision(4);n.width=u,n.height=u;for(var f=0;f<a;f++)for(var d=0;d<a;d++){var h=Math.ceil((d+1)*l)-Math.floor(d*l),m=Math.ceil((f+1)*l)-Math.floor(f*l),g=i({row:f,col:d,count:a,options:e});o.fillStyle=t.modules[f][d]?g:e.background,o.fillRect(Math.round(d*l),Math.round(f*p),h,m)}return e.image&&function(t,e){var n=new Image;n.onload=function(){e(this),n.onload=null},n.src=t}(e.image,function(t){var e=((u-c)/2).toFixed(2),n=((u-c)/2).toFixed(2);o.drawImage(t,e,n,c,c)}),n.style.width=r+"px",n.style.height=r+"px",n}},{key:"createTable",value:function(t){var e=this.options,n=t.getModuleCount(),o=Math.floor(e.size/n),a=Math.floor(e.size/n);o<=0&&(o=n<80?2:1),a<=0&&(a=n<80?2:1);var s=[];s.push('<table style="border:0px; margin:0px; padding:0px; border-collapse:collapse; background-color:'+e.background+';">');for(var r=0;r<n;r++){s.push('<tr style="border:0px; margin:0px; padding:0px; height:'+a+'px">');for(var u=0;u<n;u++){var c=i({row:r,col:u,count:n,options:e});t.modules[r][u]?s.push('<td style="border:0px; margin:0px; padding:0px; width:'+o+"px; background-color:"+c+'"></td>'):s.push('<td style="border:0px; margin:0px; padding:0px; width:'+o+"px; background-color:"+e.background+'"></td>')}s.push("</tr>")}if(s.push("</table>"),e.image){var l=o*n,p=a*n,f=((l-e.imageSize)/2).toFixed(2),d=((p-e.imageSize)/2).toFixed(2);s.unshift("<div style='position:relative;\n                        width:"+l+"px;\n                        height:"+p+"px;'>"),s.push("<img src='"+e.image+"'\n                        width='"+e.imageSize+"'\n                        height='"+e.imageSize+"'\n                        style='position:absolute;left:"+f+"px; top:"+d+"px;'>"),s.push("</div>")}var h=document.createElement("span");return h.innerHTML=s.join(""),h.firstChild}},{key:"createSVG",value:function(t){var e=this.options,n=t.getModuleCount(),o=n/e.size,a=document.createElementNS("http://www.w3.org/2000/svg","svg");a.setAttribute("width",e.size),a.setAttribute("height",e.size),a.setAttribute("viewBox","0 0 "+n+" "+n);for(var s=0;s<n;s++)for(var r=0;r<n;r++){var u=document.createElementNS("http://www.w3.org/2000/svg","rect"),c=i({row:s,col:r,count:n,options:e});u.setAttribute("x",r),u.setAttribute("y",s),u.setAttribute("width",1),u.setAttribute("height",1),u.setAttribute("stroke-width",0),t.modules[s][r]?u.setAttribute("fill",c):u.setAttribute("fill",e.background),a.appendChild(u)}if(e.image){var l=document.createElementNS("http://www.w3.org/2000/svg","image");l.setAttributeNS("http://www.w3.org/1999/xlink","href",e.image),l.setAttribute("x",((n-e.imageSize*o)/2).toFixed(2)),l.setAttribute("y",((n-e.imageSize*o)/2).toFixed(2)),l.setAttribute("width",e.imageSize*o),l.setAttribute("height",e.imageSize*o),a.appendChild(l)}return a}}]),t}();e.default=c,t.exports=e.default},R6qD:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={QRErrorCorrectLevel:[1,0,3,2],RSBlockTable:[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]]},t.exports=e.default},WJJ6:function(t,e,n){"use strict";var o=Object.prototype.hasOwnProperty,a=Object.prototype.toString,s=Object.defineProperty,r=Object.getOwnPropertyDescriptor,u=function(t){return"function"==typeof Array.isArray?Array.isArray(t):"[object Array]"===a.call(t)},i=function(t){if(!t||"[object Object]"!==a.call(t))return!1;var e,n=o.call(t,"constructor"),s=t.constructor&&t.constructor.prototype&&o.call(t.constructor.prototype,"isPrototypeOf");if(t.constructor&&!n&&!s)return!1;for(e in t);return void 0===e||o.call(t,e)},c=function(t,e){s&&"__proto__"===e.name?s(t,e.name,{enumerable:!0,configurable:!0,value:e.newValue,writable:!0}):t[e.name]=e.newValue},l=function(t,e){if("__proto__"===e){if(!o.call(t,e))return;if(r)return r(t,e).value}return t[e]};t.exports=function t(){var e,n,o,a,s,r,p=arguments[0],f=1,d=arguments.length,h=!1;for("boolean"==typeof p&&(h=p,p=arguments[1]||{},f=2),(null==p||"object"!=typeof p&&"function"!=typeof p)&&(p={});f<d;++f)if(null!=(e=arguments[f]))for(n in e)o=l(p,n),p!==(a=l(e,n))&&(h&&a&&(i(a)||(s=u(a)))?(s?(s=!1,r=o&&u(o)?o:[]):r=o&&i(o)?o:{},c(p,{name:n,newValue:t(h,r,a)})):void 0!==a&&c(p,{name:n,newValue:a}));return p}},f90g:function(t,e,n){t.exports={content:["article",{},["p","\u4e8c\u7ef4\u7801\u7ec4\u4ef6\uff0c\u7528\u4e8e\u7ed8\u5236\u4e8c\u7ef4\u7801"],["h2","Usage"],["pre",{lang:"js",highlighted:'<span class="token keyword">import</span> Qrcode <span class="token keyword">from</span> <span class="token string">\'@gem-mine/rc-qrcode\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> React <span class="token keyword">from</span> <span class="token string">\'react\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> ReactDOM <span class="token keyword">from</span> <span class="token string">\'react-dom\'</span><span class="token punctuation">;</span>\nReactDOM<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span><span class="token operator">&lt;</span>Qrcode <span class="token operator">/</span><span class="token operator">></span><span class="token punctuation">,</span> container<span class="token punctuation">)</span><span class="token punctuation">;</span>'},["code","import Qrcode from '@gem-mine/rc-qrcode';\nimport React from 'react';\nimport ReactDOM from 'react-dom';\nReactDOM.render(<Qrcode />, container);"]],["h3","\u57fa\u672c\u4f7f\u7528"],["p","\u57fa\u672c\u4f7f\u7528"],function(){var t=n("U7vG"),e=(n("O27J"),function(){function t(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,n,o){return n&&t(e.prototype,n),o&&t(e,o),e}}()),o=function(t){return t&&t.__esModule?t:{default:t}}(n("qYAe"));var a=function(n){function a(t){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,a),function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(a.__proto__||Object.getPrototypeOf(a)).call(this,t))}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(a,t.Component),e(a,[{key:"render",value:function(){return t.createElement("div",null,t.createElement(o.default,{text:"2017.03.29"}))}}]),a}();return t.createElement(a,null)},["pre",{lang:"jsx",highlighted:'<span class="token keyword">import</span> Qrcode <span class="token keyword">from</span> <span class="token string">"@gem-mine/rc-qrcode"</span><span class="token punctuation">;</span>\n\n<span class="token keyword">class</span> <span class="token class-name">Demo</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span>\n  <span class="token function">constructor</span><span class="token punctuation">(</span>props<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">super</span><span class="token punctuation">(</span>props<span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n\n  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">let</span> _p <span class="token operator">=</span> <span class="token punctuation">{</span>\n      text<span class="token punctuation">:</span> <span class="token string">\'2017.03.29\'</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span><span class="token punctuation">;</span>\n    <span class="token keyword">return</span> <span class="token punctuation">(</span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span>\n        <span class="token operator">&lt;</span>Qrcode <span class="token punctuation">{</span><span class="token operator">...</span>_p<span class="token punctuation">}</span> <span class="token operator">/</span><span class="token operator">></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>\n    <span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\nReactDOM<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Demo</span> <span class="token punctuation">/></span></span><span class="token punctuation">,</span> mountNode<span class="token punctuation">)</span><span class="token punctuation">;</span>'},["code","import Qrcode from \"@gem-mine/rc-qrcode\";\n\nclass Demo extends React.Component {\n  constructor(props) {\n    super(props);\n  }\n\n  render() {\n    let _p = {\n      text: '2017.03.29',\n    };\n    return (\n      <div>\n        <Qrcode {..._p} />\n      </div>\n    );\n  }\n}\nReactDOM.render(<Demo />, mountNode);"]],["h3","\u4e8c\u7ef4\u7801\u56fe\u6848"],["p","\u4e8c\u7ef4\u7801\u56fe\u6848"],function(){var t=n("U7vG"),e=(n("O27J"),function(){function t(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,n,o){return n&&t(e.prototype,n),o&&t(e,o),e}}()),o=function(t){return t&&t.__esModule?t:{default:t}}(n("qYAe"));var a=function(n){function a(t){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,a),function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(a.__proto__||Object.getPrototypeOf(a)).call(this,t))}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(a,t.Component),e(a,[{key:"render",value:function(){return t.createElement("div",null,t.createElement(o.default,{text:"2017.12.05",image:"//cs.101.com/v0.1/static/fish/image/11.png?serviceName=fish"}))}}]),a}();return t.createElement(a,null)},["pre",{lang:"jsx",highlighted:'<span class="token keyword">import</span> Qrcode <span class="token keyword">from</span> <span class="token string">"@gem-mine/rc-qrcode"</span><span class="token punctuation">;</span>\n\n<span class="token keyword">class</span> <span class="token class-name">Demo</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span>\n  <span class="token function">constructor</span><span class="token punctuation">(</span>props<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">super</span><span class="token punctuation">(</span>props<span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n\n  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">let</span> _p <span class="token operator">=</span> <span class="token punctuation">{</span>\n      text<span class="token punctuation">:</span> <span class="token string">\'2017.12.05\'</span><span class="token punctuation">,</span>\n      image<span class="token punctuation">:</span> <span class="token string">\'//cs.101.com/v0.1/static/fish/image/11.png?serviceName=fish\'</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span><span class="token punctuation">;</span>\n    <span class="token keyword">return</span> <span class="token punctuation">(</span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span>\n        <span class="token operator">&lt;</span>Qrcode <span class="token punctuation">{</span><span class="token operator">...</span>_p<span class="token punctuation">}</span> <span class="token operator">/</span><span class="token operator">></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>\n    <span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n\nReactDOM<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Demo</span> <span class="token punctuation">/></span></span><span class="token punctuation">,</span> mountNode<span class="token punctuation">)</span><span class="token punctuation">;</span>'},["code","import Qrcode from \"@gem-mine/rc-qrcode\";\n\nclass Demo extends React.Component {\n  constructor(props) {\n    super(props);\n  }\n\n  render() {\n    let _p = {\n      text: '2017.12.05',\n      image: '//cs.101.com/v0.1/static/fish/image/11.png?serviceName=fish',\n    };\n    return (\n      <div>\n        <Qrcode {..._p} />\n      </div>\n    );\n  }\n}\n\nReactDOM.render(<Demo />, mountNode);"]],["h2","API"],["table",["thead",["tr",["th","\u53c2\u6570"],["th","\u8bf4\u660e"],["th","\u7c7b\u578b"],["th","\u9ed8\u8ba4\u503c"]]],["tbody",["tr",["td","size"],["td","\u5fc5\u9009\u53c2\u6570,\u4e8c\u7ef4\u7801\u5927\u5c0f"],["td","Number"],["td","256"]],["tr",["td","text"],["td","\u5fc5\u9009\u53c2\u6570,\u8981\u7f16\u7801\u7684\u5b57\u7b26\u4e32"],["td","String"],["td","''"]],["tr",["td","correctLevel"],["td","\u7ea0\u9519\u7ea7\u522b\uff0c\u53ef\u53d60\u30011\u30012\u30013\uff0c\u6570\u5b57\u8d8a\u5927\u8bf4\u660e\u6240\u9700\u7ea0\u9519\u7ea7\u522b\u8d8a\u5927"],["td","Number"],["td","3"]],["tr",["td","background"],["td","\u80cc\u666f\u8272"],["td","String"],["td","'#fff'"]],["tr",["td","foreground"],["td","\u524d\u666f\u8272"],["td","String"],["td","'#000'"]],["tr",["td","image"],["td","\u4e2d\u95f4\u56fe\u7247\u7684url\uff0c\u53ea\u652f\u6301\u914d\u7f6e\u6b63\u65b9\u5f62\u56fe\u7247"],["td","String"],["td","''"]],["tr",["td","imageSize"],["td","\u4e2d\u95f4\u56fe\u7247\u7684\u5927\u5c0f"],["td","Number"],["td","3"]]]],["h2","License"],["p","rc-qrcode is released under the MIT license."]],meta:{filename:"README.md"},description:["section",["h1","rc-qrcode"]],toc:["ul",["li",["a",{className:"md-tools-toc-h2",href:"#Usage",title:"Usage"},"Usage"]],["li",["a",{className:"md-tools-toc-h2",href:"#API",title:"API"},"API"]],["li",["a",{className:"md-tools-toc-h2",href:"#License",title:"License"},"License"]]],style:[]}},lPEt:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=function(){function t(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,n,o){return n&&t(e.prototype,n),o&&t(e,o),e}}();var a=new(function(t){return t&&t.__esModule?t:{default:t}}(n("nNno")).default),s=function(){function t(e,n){if(function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),void 0===e.length)throw new Error(e.length+"/"+n);for(var o=0;o<e.length&&0===e[o];)o++;this.num=new Array(e.length-o+n);for(var a=0;a<e.length-o;a++)this.num[a]=e[a+o]}return o(t,[{key:"get",value:function(t){return this.num[t]}},{key:"getLength",value:function(){return this.num.length}},{key:"multiply",value:function(e){for(var n=new Array(this.getLength()+e.getLength()-1),o=0;o<this.getLength();o++)for(var s=0;s<e.getLength();s++)n[o+s]^=a.gexp(a.glog(this.get(o))+a.glog(e.get(s)));return new t(n,0)}},{key:"mod",value:function(e){var n=this.getLength(),o=e.getLength();if(n-o<0)return this;for(var s=new Array(n),r=0;r<n;r++)s[r]=this.get(r);for(;s.length>=o;){for(var u=a.glog(s[0])-a.glog(e.get(0)),i=0;i<e.getLength();i++)s[i]^=a.gexp(a.glog(e.get(i))+u);for(;0===s[0];)s.shift()}return new t(s,0)}}]),t}();e.default=s,t.exports=e.default},nNno:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=function(){function t(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,n,o){return n&&t(e.prototype,n),o&&t(e,o),e}}();var a=function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.EXP_TABLE=new Array(256),this.LOG_TABLE=new Array(256);for(var e=0;e<8;e++)this.EXP_TABLE[e]=1<<e;for(var n=8;n<256;n++)this.EXP_TABLE[n]=this.EXP_TABLE[n-4]^this.EXP_TABLE[n-5]^this.EXP_TABLE[n-6]^this.EXP_TABLE[n-8];for(var o=0;o<255;o++)this.LOG_TABLE[this.EXP_TABLE[o]]=o}return o(t,[{key:"glog",value:function(t){if(t<1)throw new Error("glog("+t+")");return this.LOG_TABLE[t]}},{key:"gexp",value:function(t){for(;t<0;)t+=255;for(;t>=256;)t-=255;return this.EXP_TABLE[t]}}]),t}();e.default=a,t.exports=e.default},qYAe:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o,a,s=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[o]=n[o])}return t},r=function(){function t(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,n,o){return n&&t(e.prototype,n),o&&t(e,o),e}}(),u=l(n("U7vG")),i=l(n("IQ7J")),c=l(n("HW6M"));function l(t){return t&&t.__esModule?t:{default:t}}var p=(a=o=function(t){function e(t){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e);var n=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));return n.spanDom=null,n.innerHTML=function(){n.spanDom&&(n.spanDom.innerHTML="",n.spanDom.appendChild(new i.default(s({},n.props))))},n.getQrnode=function(t){t&&(n.spanDom=t,n.innerHTML())},n}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(e,u["default"].Component),r(e,[{key:"componentDidUpdate",value:function(){this.innerHTML()}},{key:"render",value:function(){var t=this.props,e=t.prefixCls,n=t.className,o=(0,c.default)(n,function(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}({},e,!0));return u.default.createElement("span",{className:o,ref:this.getQrnode})}}]),e}(),o.defaultProps={prefixCls:"fish-qrcode",className:"",text:"",size:256,correctLevel:3,background:"#fff",foreground:"#000",image:"",imageSize:30},a);p.getCanvas=function(t){if(document.createElement("canvas").getContext)return new i.default(s({},t))},e.default=p,t.exports=e.default}});