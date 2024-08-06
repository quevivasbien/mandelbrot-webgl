(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function i(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(o){if(o.ep)return;o.ep=!0;const r=i(o);fetch(o.href,r)}})();/*!
 *  decimal.js v10.4.3
 *  An arbitrary-precision Decimal type for JavaScript.
 *  https://github.com/MikeMcl/decimal.js
 *  Copyright (c) 2022 Michael Mclaughlin <M8ch88l@gmail.com>
 *  MIT Licence
 */var ue=9e15,ie=1e9,Me="0123456789abcdef",_e="2.3025850929940456840179914546843642076011014886287729760333279009675726096773524802359972050895982983419677840422862486334095254650828067566662873690987816894829072083255546808437998948262331985283935053089653777326288461633662222876982198867465436674744042432743651550489343149393914796194044002221051017141748003688084012647080685567743216228355220114804663715659121373450747856947683463616792101806445070648000277502684916746550586856935673420670581136429224554405758925724208241314695689016758940256776311356919292033376587141660230105703089634572075440370847469940168269282808481184289314848524948644871927809676271275775397027668605952496716674183485704422507197965004714951050492214776567636938662976979522110718264549734772662425709429322582798502585509785265383207606726317164309505995087807523710333101197857547331541421808427543863591778117054309827482385045648019095610299291824318237525357709750539565187697510374970888692180205189339507238539205144634197265287286965110862571492198849978748873771345686209167058",ye="3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989380952572010654858632789",Ae={precision:20,rounding:4,modulo:1,toExpNeg:-7,toExpPos:21,minE:-ue,maxE:ue,crypto:!1},Ve,J,w=!0,xe="[DecimalError] ",te=xe+"Invalid argument: ",Ge=xe+"Precision limit exceeded",Ke=xe+"crypto unavailable",Je="[object Decimal]",T=Math.floor,L=Math.pow,mt=/^0b([01]+(\.[01]*)?|\.[01]+)(p[+-]?\d+)?$/i,ht=/^0x([0-9a-f]+(\.[0-9a-f]*)?|\.[0-9a-f]+)(p[+-]?\d+)?$/i,pt=/^0o([0-7]+(\.[0-7]*)?|\.[0-7]+)(p[+-]?\d+)?$/i,je=/^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i,X=1e7,g=7,gt=9007199254740991,vt=_e.length-1,Oe=ye.length-1,m={toStringTag:Je};m.absoluteValue=m.abs=function(){var e=new this.constructor(this);return e.s<0&&(e.s=1),p(e)};m.ceil=function(){return p(new this.constructor(this),this.e+1,2)};m.clampedTo=m.clamp=function(e,t){var i,n=this,o=n.constructor;if(e=new o(e),t=new o(t),!e.s||!t.s)return new o(NaN);if(e.gt(t))throw Error(te+t);return i=n.cmp(e),i<0?e:n.cmp(t)>0?t:new o(n)};m.comparedTo=m.cmp=function(e){var t,i,n,o,r=this,s=r.d,u=(e=new r.constructor(e)).d,f=r.s,c=e.s;if(!s||!u)return!f||!c?NaN:f!==c?f:s===u?0:!s^f<0?1:-1;if(!s[0]||!u[0])return s[0]?f:u[0]?-c:0;if(f!==c)return f;if(r.e!==e.e)return r.e>e.e^f<0?1:-1;for(n=s.length,o=u.length,t=0,i=n<o?n:o;t<i;++t)if(s[t]!==u[t])return s[t]>u[t]^f<0?1:-1;return n===o?0:n>o^f<0?1:-1};m.cosine=m.cos=function(){var e,t,i=this,n=i.constructor;return i.d?i.d[0]?(e=n.precision,t=n.rounding,n.precision=e+Math.max(i.e,i.sd())+g,n.rounding=1,i=wt(n,nt(n,i)),n.precision=e,n.rounding=t,p(J==2||J==3?i.neg():i,e,t,!0)):new n(1):new n(NaN)};m.cubeRoot=m.cbrt=function(){var e,t,i,n,o,r,s,u,f,c,a=this,l=a.constructor;if(!a.isFinite()||a.isZero())return new l(a);for(w=!1,r=a.s*L(a.s*a,1/3),!r||Math.abs(r)==1/0?(i=M(a.d),e=a.e,(r=(e-i.length+1)%3)&&(i+=r==1||r==-2?"0":"00"),r=L(i,1/3),e=T((e+1)/3)-(e%3==(e<0?-1:2)),r==1/0?i="5e"+e:(i=r.toExponential(),i=i.slice(0,i.indexOf("e")+1)+e),n=new l(i),n.s=a.s):n=new l(r.toString()),s=(e=l.precision)+3;;)if(u=n,f=u.times(u).times(u),c=f.plus(a),n=b(c.plus(a).times(u),c.plus(f),s+2,1),M(u.d).slice(0,s)===(i=M(n.d)).slice(0,s))if(i=i.slice(s-3,s+1),i=="9999"||!o&&i=="4999"){if(!o&&(p(u,e+1,0),u.times(u).times(u).eq(a))){n=u;break}s+=4,o=1}else{(!+i||!+i.slice(1)&&i.charAt(0)=="5")&&(p(n,e+1,1),t=!n.times(n).times(n).eq(a));break}return w=!0,p(n,e,l.rounding,t)};m.decimalPlaces=m.dp=function(){var e,t=this.d,i=NaN;if(t){if(e=t.length-1,i=(e-T(this.e/g))*g,e=t[e],e)for(;e%10==0;e/=10)i--;i<0&&(i=0)}return i};m.dividedBy=m.div=function(e){return b(this,new this.constructor(e))};m.dividedToIntegerBy=m.divToInt=function(e){var t=this,i=t.constructor;return p(b(t,new i(e),0,1,1),i.precision,i.rounding)};m.equals=m.eq=function(e){return this.cmp(e)===0};m.floor=function(){return p(new this.constructor(this),this.e+1,3)};m.greaterThan=m.gt=function(e){return this.cmp(e)>0};m.greaterThanOrEqualTo=m.gte=function(e){var t=this.cmp(e);return t==1||t===0};m.hyperbolicCosine=m.cosh=function(){var e,t,i,n,o,r=this,s=r.constructor,u=new s(1);if(!r.isFinite())return new s(r.s?1/0:NaN);if(r.isZero())return u;i=s.precision,n=s.rounding,s.precision=i+Math.max(r.e,r.sd())+4,s.rounding=1,o=r.d.length,o<32?(e=Math.ceil(o/3),t=(1/Ie(4,e)).toString()):(e=16,t="2.3283064365386962890625e-10"),r=ce(s,1,r.times(t),new s(1),!0);for(var f,c=e,a=new s(8);c--;)f=r.times(r),r=u.minus(f.times(a.minus(f.times(a))));return p(r,s.precision=i,s.rounding=n,!0)};m.hyperbolicSine=m.sinh=function(){var e,t,i,n,o=this,r=o.constructor;if(!o.isFinite()||o.isZero())return new r(o);if(t=r.precision,i=r.rounding,r.precision=t+Math.max(o.e,o.sd())+4,r.rounding=1,n=o.d.length,n<3)o=ce(r,2,o,o,!0);else{e=1.4*Math.sqrt(n),e=e>16?16:e|0,o=o.times(1/Ie(5,e)),o=ce(r,2,o,o,!0);for(var s,u=new r(5),f=new r(16),c=new r(20);e--;)s=o.times(o),o=o.times(u.plus(s.times(f.times(s).plus(c))))}return r.precision=t,r.rounding=i,p(o,t,i,!0)};m.hyperbolicTangent=m.tanh=function(){var e,t,i=this,n=i.constructor;return i.isFinite()?i.isZero()?new n(i):(e=n.precision,t=n.rounding,n.precision=e+7,n.rounding=1,b(i.sinh(),i.cosh(),n.precision=e,n.rounding=t)):new n(i.s)};m.inverseCosine=m.acos=function(){var e,t=this,i=t.constructor,n=t.abs().cmp(1),o=i.precision,r=i.rounding;return n!==-1?n===0?t.isNeg()?Y(i,o,r):new i(0):new i(NaN):t.isZero()?Y(i,o+4,r).times(.5):(i.precision=o+6,i.rounding=1,t=t.asin(),e=Y(i,o+4,r).times(.5),i.precision=o,i.rounding=r,e.minus(t))};m.inverseHyperbolicCosine=m.acosh=function(){var e,t,i=this,n=i.constructor;return i.lte(1)?new n(i.eq(1)?0:NaN):i.isFinite()?(e=n.precision,t=n.rounding,n.precision=e+Math.max(Math.abs(i.e),i.sd())+4,n.rounding=1,w=!1,i=i.times(i).minus(1).sqrt().plus(i),w=!0,n.precision=e,n.rounding=t,i.ln()):new n(i)};m.inverseHyperbolicSine=m.asinh=function(){var e,t,i=this,n=i.constructor;return!i.isFinite()||i.isZero()?new n(i):(e=n.precision,t=n.rounding,n.precision=e+2*Math.max(Math.abs(i.e),i.sd())+6,n.rounding=1,w=!1,i=i.times(i).plus(1).sqrt().plus(i),w=!0,n.precision=e,n.rounding=t,i.ln())};m.inverseHyperbolicTangent=m.atanh=function(){var e,t,i,n,o=this,r=o.constructor;return o.isFinite()?o.e>=0?new r(o.abs().eq(1)?o.s/0:o.isZero()?o:NaN):(e=r.precision,t=r.rounding,n=o.sd(),Math.max(n,e)<2*-o.e-1?p(new r(o),e,t,!0):(r.precision=i=n-o.e,o=b(o.plus(1),new r(1).minus(o),i+e,1),r.precision=e+4,r.rounding=1,o=o.ln(),r.precision=e,r.rounding=t,o.times(.5))):new r(NaN)};m.inverseSine=m.asin=function(){var e,t,i,n,o=this,r=o.constructor;return o.isZero()?new r(o):(t=o.abs().cmp(1),i=r.precision,n=r.rounding,t!==-1?t===0?(e=Y(r,i+4,n).times(.5),e.s=o.s,e):new r(NaN):(r.precision=i+6,r.rounding=1,o=o.div(new r(1).minus(o.times(o)).sqrt().plus(1)).atan(),r.precision=i,r.rounding=n,o.times(2)))};m.inverseTangent=m.atan=function(){var e,t,i,n,o,r,s,u,f,c=this,a=c.constructor,l=a.precision,d=a.rounding;if(c.isFinite()){if(c.isZero())return new a(c);if(c.abs().eq(1)&&l+4<=Oe)return s=Y(a,l+4,d).times(.25),s.s=c.s,s}else{if(!c.s)return new a(NaN);if(l+4<=Oe)return s=Y(a,l+4,d).times(.5),s.s=c.s,s}for(a.precision=u=l+10,a.rounding=1,i=Math.min(28,u/g+2|0),e=i;e;--e)c=c.div(c.times(c).plus(1).sqrt().plus(1));for(w=!1,t=Math.ceil(u/g),n=1,f=c.times(c),s=new a(c),o=c;e!==-1;)if(o=o.times(f),r=s.minus(o.div(n+=2)),o=o.times(f),s=r.plus(o.div(n+=2)),s.d[t]!==void 0)for(e=t;s.d[e]===r.d[e]&&e--;);return i&&(s=s.times(2<<i-1)),w=!0,p(s,a.precision=l,a.rounding=d,!0)};m.isFinite=function(){return!!this.d};m.isInteger=m.isInt=function(){return!!this.d&&T(this.e/g)>this.d.length-2};m.isNaN=function(){return!this.s};m.isNegative=m.isNeg=function(){return this.s<0};m.isPositive=m.isPos=function(){return this.s>0};m.isZero=function(){return!!this.d&&this.d[0]===0};m.lessThan=m.lt=function(e){return this.cmp(e)<0};m.lessThanOrEqualTo=m.lte=function(e){return this.cmp(e)<1};m.logarithm=m.log=function(e){var t,i,n,o,r,s,u,f,c=this,a=c.constructor,l=a.precision,d=a.rounding,h=5;if(e==null)e=new a(10),t=!0;else{if(e=new a(e),i=e.d,e.s<0||!i||!i[0]||e.eq(1))return new a(NaN);t=e.eq(10)}if(i=c.d,c.s<0||!i||!i[0]||c.eq(1))return new a(i&&!i[0]?-1/0:c.s!=1?NaN:i?0:1/0);if(t)if(i.length>1)r=!0;else{for(o=i[0];o%10===0;)o/=10;r=o!==1}if(w=!1,u=l+h,s=ee(c,u),n=t?be(a,u+10):ee(e,u),f=b(s,n,u,1),me(f.d,o=l,d))do if(u+=10,s=ee(c,u),n=t?be(a,u+10):ee(e,u),f=b(s,n,u,1),!r){+M(f.d).slice(o+1,o+15)+1==1e14&&(f=p(f,l+1,0));break}while(me(f.d,o+=10,d));return w=!0,p(f,l,d)};m.minus=m.sub=function(e){var t,i,n,o,r,s,u,f,c,a,l,d,h=this,N=h.constructor;if(e=new N(e),!h.d||!e.d)return!h.s||!e.s?e=new N(NaN):h.d?e.s=-e.s:e=new N(e.d||h.s!==e.s?h:NaN),e;if(h.s!=e.s)return e.s=-e.s,h.plus(e);if(c=h.d,d=e.d,u=N.precision,f=N.rounding,!c[0]||!d[0]){if(d[0])e.s=-e.s;else if(c[0])e=new N(h);else return new N(f===3?-0:0);return w?p(e,u,f):e}if(i=T(e.e/g),a=T(h.e/g),c=c.slice(),r=a-i,r){for(l=r<0,l?(t=c,r=-r,s=d.length):(t=d,i=a,s=c.length),n=Math.max(Math.ceil(u/g),s)+2,r>n&&(r=n,t.length=1),t.reverse(),n=r;n--;)t.push(0);t.reverse()}else{for(n=c.length,s=d.length,l=n<s,l&&(s=n),n=0;n<s;n++)if(c[n]!=d[n]){l=c[n]<d[n];break}r=0}for(l&&(t=c,c=d,d=t,e.s=-e.s),s=c.length,n=d.length-s;n>0;--n)c[s++]=0;for(n=d.length;n>r;){if(c[--n]<d[n]){for(o=n;o&&c[--o]===0;)c[o]=X-1;--c[o],c[n]+=X}c[n]-=d[n]}for(;c[--s]===0;)c.pop();for(;c[0]===0;c.shift())--i;return c[0]?(e.d=c,e.e=ze(c,i),w?p(e,u,f):e):new N(f===3?-0:0)};m.modulo=m.mod=function(e){var t,i=this,n=i.constructor;return e=new n(e),!i.d||!e.s||e.d&&!e.d[0]?new n(NaN):!e.d||i.d&&!i.d[0]?p(new n(i),n.precision,n.rounding):(w=!1,n.modulo==9?(t=b(i,e.abs(),0,3,1),t.s*=e.s):t=b(i,e,0,n.modulo,1),t=t.times(e),w=!0,i.minus(t))};m.naturalExponential=m.exp=function(){return Ce(this)};m.naturalLogarithm=m.ln=function(){return ee(this)};m.negated=m.neg=function(){var e=new this.constructor(this);return e.s=-e.s,p(e)};m.plus=m.add=function(e){var t,i,n,o,r,s,u,f,c,a,l=this,d=l.constructor;if(e=new d(e),!l.d||!e.d)return!l.s||!e.s?e=new d(NaN):l.d||(e=new d(e.d||l.s===e.s?l:NaN)),e;if(l.s!=e.s)return e.s=-e.s,l.minus(e);if(c=l.d,a=e.d,u=d.precision,f=d.rounding,!c[0]||!a[0])return a[0]||(e=new d(l)),w?p(e,u,f):e;if(r=T(l.e/g),n=T(e.e/g),c=c.slice(),o=r-n,o){for(o<0?(i=c,o=-o,s=a.length):(i=a,n=r,s=c.length),r=Math.ceil(u/g),s=r>s?r+1:s+1,o>s&&(o=s,i.length=1),i.reverse();o--;)i.push(0);i.reverse()}for(s=c.length,o=a.length,s-o<0&&(o=s,i=a,a=c,c=i),t=0;o;)t=(c[--o]=c[o]+a[o]+t)/X|0,c[o]%=X;for(t&&(c.unshift(t),++n),s=c.length;c[--s]==0;)c.pop();return e.d=c,e.e=ze(c,n),w?p(e,u,f):e};m.precision=m.sd=function(e){var t,i=this;if(e!==void 0&&e!==!!e&&e!==1&&e!==0)throw Error(te+e);return i.d?(t=Qe(i.d),e&&i.e+1>t&&(t=i.e+1)):t=NaN,t};m.round=function(){var e=this,t=e.constructor;return p(new t(e),e.e+1,t.rounding)};m.sine=m.sin=function(){var e,t,i=this,n=i.constructor;return i.isFinite()?i.isZero()?new n(i):(e=n.precision,t=n.rounding,n.precision=e+Math.max(i.e,i.sd())+g,n.rounding=1,i=Et(n,nt(n,i)),n.precision=e,n.rounding=t,p(J>2?i.neg():i,e,t,!0)):new n(NaN)};m.squareRoot=m.sqrt=function(){var e,t,i,n,o,r,s=this,u=s.d,f=s.e,c=s.s,a=s.constructor;if(c!==1||!u||!u[0])return new a(!c||c<0&&(!u||u[0])?NaN:u?s:1/0);for(w=!1,c=Math.sqrt(+s),c==0||c==1/0?(t=M(u),(t.length+f)%2==0&&(t+="0"),c=Math.sqrt(t),f=T((f+1)/2)-(f<0||f%2),c==1/0?t="5e"+f:(t=c.toExponential(),t=t.slice(0,t.indexOf("e")+1)+f),n=new a(t)):n=new a(c.toString()),i=(f=a.precision)+3;;)if(r=n,n=r.plus(b(s,r,i+2,1)).times(.5),M(r.d).slice(0,i)===(t=M(n.d)).slice(0,i))if(t=t.slice(i-3,i+1),t=="9999"||!o&&t=="4999"){if(!o&&(p(r,f+1,0),r.times(r).eq(s))){n=r;break}i+=4,o=1}else{(!+t||!+t.slice(1)&&t.charAt(0)=="5")&&(p(n,f+1,1),e=!n.times(n).eq(s));break}return w=!0,p(n,f,a.rounding,e)};m.tangent=m.tan=function(){var e,t,i=this,n=i.constructor;return i.isFinite()?i.isZero()?new n(i):(e=n.precision,t=n.rounding,n.precision=e+10,n.rounding=1,i=i.sin(),i.s=1,i=b(i,new n(1).minus(i.times(i)).sqrt(),e+10,0),n.precision=e,n.rounding=t,p(J==2||J==4?i.neg():i,e,t,!0)):new n(NaN)};m.times=m.mul=function(e){var t,i,n,o,r,s,u,f,c,a=this,l=a.constructor,d=a.d,h=(e=new l(e)).d;if(e.s*=a.s,!d||!d[0]||!h||!h[0])return new l(!e.s||d&&!d[0]&&!h||h&&!h[0]&&!d?NaN:!d||!h?e.s/0:e.s*0);for(i=T(a.e/g)+T(e.e/g),f=d.length,c=h.length,f<c&&(r=d,d=h,h=r,s=f,f=c,c=s),r=[],s=f+c,n=s;n--;)r.push(0);for(n=c;--n>=0;){for(t=0,o=f+n;o>n;)u=r[o]+h[n]*d[o-n-1]+t,r[o--]=u%X|0,t=u/X|0;r[o]=(r[o]+t)%X|0}for(;!r[--s];)r.pop();return t?++i:r.shift(),e.d=r,e.e=ze(r,i),w?p(e,l.precision,l.rounding):e};m.toBinary=function(e,t){return $e(this,2,e,t)};m.toDecimalPlaces=m.toDP=function(e,t){var i=this,n=i.constructor;return i=new n(i),e===void 0?i:(F(e,0,ie),t===void 0?t=n.rounding:F(t,0,8),p(i,e+i.e+1,t))};m.toExponential=function(e,t){var i,n=this,o=n.constructor;return e===void 0?i=G(n,!0):(F(e,0,ie),t===void 0?t=o.rounding:F(t,0,8),n=p(new o(n),e+1,t),i=G(n,!0,e+1)),n.isNeg()&&!n.isZero()?"-"+i:i};m.toFixed=function(e,t){var i,n,o=this,r=o.constructor;return e===void 0?i=G(o):(F(e,0,ie),t===void 0?t=r.rounding:F(t,0,8),n=p(new r(o),e+o.e+1,t),i=G(n,!1,e+n.e+1)),o.isNeg()&&!o.isZero()?"-"+i:i};m.toFraction=function(e){var t,i,n,o,r,s,u,f,c,a,l,d,h=this,N=h.d,v=h.constructor;if(!N)return new v(h);if(c=i=new v(1),n=f=new v(0),t=new v(n),r=t.e=Qe(N)-h.e-1,s=r%g,t.d[0]=L(10,s<0?g+s:s),e==null)e=r>0?t:c;else{if(u=new v(e),!u.isInt()||u.lt(c))throw Error(te+u);e=u.gt(t)?r>0?t:c:u}for(w=!1,u=new v(M(N)),a=v.precision,v.precision=r=N.length*g*2;l=b(u,t,0,1,1),o=i.plus(l.times(n)),o.cmp(e)!=1;)i=n,n=o,o=c,c=f.plus(l.times(o)),f=o,o=t,t=u.minus(l.times(o)),u=o;return o=b(e.minus(i),n,0,1,1),f=f.plus(o.times(c)),i=i.plus(o.times(n)),f.s=c.s=h.s,d=b(c,n,r,1).minus(h).abs().cmp(b(f,i,r,1).minus(h).abs())<1?[c,n]:[f,i],v.precision=a,w=!0,d};m.toHexadecimal=m.toHex=function(e,t){return $e(this,16,e,t)};m.toNearest=function(e,t){var i=this,n=i.constructor;if(i=new n(i),e==null){if(!i.d)return i;e=new n(1),t=n.rounding}else{if(e=new n(e),t===void 0?t=n.rounding:F(t,0,8),!i.d)return e.s?i:e;if(!e.d)return e.s&&(e.s=i.s),e}return e.d[0]?(w=!1,i=b(i,e,0,t,1).times(e),w=!0,p(i)):(e.s=i.s,i=e),i};m.toNumber=function(){return+this};m.toOctal=function(e,t){return $e(this,8,e,t)};m.toPower=m.pow=function(e){var t,i,n,o,r,s,u=this,f=u.constructor,c=+(e=new f(e));if(!u.d||!e.d||!u.d[0]||!e.d[0])return new f(L(+u,c));if(u=new f(u),u.eq(1))return u;if(n=f.precision,r=f.rounding,e.eq(1))return p(u,n,r);if(t=T(e.e/g),t>=e.d.length-1&&(i=c<0?-c:c)<=gt)return o=et(f,u,i,n),e.s<0?new f(1).div(o):p(o,n,r);if(s=u.s,s<0){if(t<e.d.length-1)return new f(NaN);if(e.d[t]&1||(s=1),u.e==0&&u.d[0]==1&&u.d.length==1)return u.s=s,u}return i=L(+u,c),t=i==0||!isFinite(i)?T(c*(Math.log("0."+M(u.d))/Math.LN10+u.e+1)):new f(i+"").e,t>f.maxE+1||t<f.minE-1?new f(t>0?s/0:0):(w=!1,f.rounding=u.s=1,i=Math.min(12,(t+"").length),o=Ce(e.times(ee(u,n+i)),n),o.d&&(o=p(o,n+5,1),me(o.d,n,r)&&(t=n+10,o=p(Ce(e.times(ee(u,t+i)),t),t+5,1),+M(o.d).slice(n+1,n+15)+1==1e14&&(o=p(o,n+1,0)))),o.s=s,w=!0,f.rounding=r,p(o,n,r))};m.toPrecision=function(e,t){var i,n=this,o=n.constructor;return e===void 0?i=G(n,n.e<=o.toExpNeg||n.e>=o.toExpPos):(F(e,1,ie),t===void 0?t=o.rounding:F(t,0,8),n=p(new o(n),e,t),i=G(n,e<=n.e||n.e<=o.toExpNeg,e)),n.isNeg()&&!n.isZero()?"-"+i:i};m.toSignificantDigits=m.toSD=function(e,t){var i=this,n=i.constructor;return e===void 0?(e=n.precision,t=n.rounding):(F(e,1,ie),t===void 0?t=n.rounding:F(t,0,8)),p(new n(i),e,t)};m.toString=function(){var e=this,t=e.constructor,i=G(e,e.e<=t.toExpNeg||e.e>=t.toExpPos);return e.isNeg()&&!e.isZero()?"-"+i:i};m.truncated=m.trunc=function(){return p(new this.constructor(this),this.e+1,1)};m.valueOf=m.toJSON=function(){var e=this,t=e.constructor,i=G(e,e.e<=t.toExpNeg||e.e>=t.toExpPos);return e.isNeg()?"-"+i:i};function M(e){var t,i,n,o=e.length-1,r="",s=e[0];if(o>0){for(r+=s,t=1;t<o;t++)n=e[t]+"",i=g-n.length,i&&(r+=j(i)),r+=n;s=e[t],n=s+"",i=g-n.length,i&&(r+=j(i))}else if(s===0)return"0";for(;s%10===0;)s/=10;return r+s}function F(e,t,i){if(e!==~~e||e<t||e>i)throw Error(te+e)}function me(e,t,i,n){var o,r,s,u;for(r=e[0];r>=10;r/=10)--t;return--t<0?(t+=g,o=0):(o=Math.ceil((t+1)/g),t%=g),r=L(10,g-t),u=e[o]%r|0,n==null?t<3?(t==0?u=u/100|0:t==1&&(u=u/10|0),s=i<4&&u==99999||i>3&&u==49999||u==5e4||u==0):s=(i<4&&u+1==r||i>3&&u+1==r/2)&&(e[o+1]/r/100|0)==L(10,t-2)-1||(u==r/2||u==0)&&(e[o+1]/r/100|0)==0:t<4?(t==0?u=u/1e3|0:t==1?u=u/100|0:t==2&&(u=u/10|0),s=(n||i<4)&&u==9999||!n&&i>3&&u==4999):s=((n||i<4)&&u+1==r||!n&&i>3&&u+1==r/2)&&(e[o+1]/r/1e3|0)==L(10,t-3)-1,s}function Ne(e,t,i){for(var n,o=[0],r,s=0,u=e.length;s<u;){for(r=o.length;r--;)o[r]*=t;for(o[0]+=Me.indexOf(e.charAt(s++)),n=0;n<o.length;n++)o[n]>i-1&&(o[n+1]===void 0&&(o[n+1]=0),o[n+1]+=o[n]/i|0,o[n]%=i)}return o.reverse()}function wt(e,t){var i,n,o;if(t.isZero())return t;n=t.d.length,n<32?(i=Math.ceil(n/3),o=(1/Ie(4,i)).toString()):(i=16,o="2.3283064365386962890625e-10"),e.precision+=i,t=ce(e,1,t.times(o),new e(1));for(var r=i;r--;){var s=t.times(t);t=s.times(s).minus(s).times(8).plus(1)}return e.precision-=i,t}var b=function(){function e(n,o,r){var s,u=0,f=n.length;for(n=n.slice();f--;)s=n[f]*o+u,n[f]=s%r|0,u=s/r|0;return u&&n.unshift(u),n}function t(n,o,r,s){var u,f;if(r!=s)f=r>s?1:-1;else for(u=f=0;u<r;u++)if(n[u]!=o[u]){f=n[u]>o[u]?1:-1;break}return f}function i(n,o,r,s){for(var u=0;r--;)n[r]-=u,u=n[r]<o[r]?1:0,n[r]=u*s+n[r]-o[r];for(;!n[0]&&n.length>1;)n.shift()}return function(n,o,r,s,u,f){var c,a,l,d,h,N,v,P,z,$,_,y,K,O,U,oe,ne,re,W,pe,ge=n.constructor,ke=n.s==o.s?1:-1,C=n.d,x=o.d;if(!C||!C[0]||!x||!x[0])return new ge(!n.s||!o.s||(C?x&&C[0]==x[0]:!x)?NaN:C&&C[0]==0||!x?ke*0:ke/0);for(f?(h=1,a=n.e-o.e):(f=X,h=g,a=T(n.e/h)-T(o.e/h)),W=x.length,ne=C.length,z=new ge(ke),$=z.d=[],l=0;x[l]==(C[l]||0);l++);if(x[l]>(C[l]||0)&&a--,r==null?(O=r=ge.precision,s=ge.rounding):u?O=r+(n.e-o.e)+1:O=r,O<0)$.push(1),N=!0;else{if(O=O/h+2|0,l=0,W==1){for(d=0,x=x[0],O++;(l<ne||d)&&O--;l++)U=d*f+(C[l]||0),$[l]=U/x|0,d=U%x|0;N=d||l<ne}else{for(d=f/(x[0]+1)|0,d>1&&(x=e(x,d,f),C=e(C,d,f),W=x.length,ne=C.length),oe=W,_=C.slice(0,W),y=_.length;y<W;)_[y++]=0;pe=x.slice(),pe.unshift(0),re=x[0],x[1]>=f/2&&++re;do d=0,c=t(x,_,W,y),c<0?(K=_[0],W!=y&&(K=K*f+(_[1]||0)),d=K/re|0,d>1?(d>=f&&(d=f-1),v=e(x,d,f),P=v.length,y=_.length,c=t(v,_,P,y),c==1&&(d--,i(v,W<P?pe:x,P,f))):(d==0&&(c=d=1),v=x.slice()),P=v.length,P<y&&v.unshift(0),i(_,v,y,f),c==-1&&(y=_.length,c=t(x,_,W,y),c<1&&(d++,i(_,W<y?pe:x,y,f))),y=_.length):c===0&&(d++,_=[0]),$[l++]=d,c&&_[0]?_[y++]=C[oe]||0:(_=[C[oe]],y=1);while((oe++<ne||_[0]!==void 0)&&O--);N=_[0]!==void 0}$[0]||$.shift()}if(h==1)z.e=a,Ve=N;else{for(l=1,d=$[0];d>=10;d/=10)l++;z.e=l+a*h-1,p(z,u?r+z.e+1:r,s,N)}return z}}();function p(e,t,i,n){var o,r,s,u,f,c,a,l,d,h=e.constructor;e:if(t!=null){if(l=e.d,!l)return e;for(o=1,u=l[0];u>=10;u/=10)o++;if(r=t-o,r<0)r+=g,s=t,a=l[d=0],f=a/L(10,o-s-1)%10|0;else if(d=Math.ceil((r+1)/g),u=l.length,d>=u)if(n){for(;u++<=d;)l.push(0);a=f=0,o=1,r%=g,s=r-g+1}else break e;else{for(a=u=l[d],o=1;u>=10;u/=10)o++;r%=g,s=r-g+o,f=s<0?0:a/L(10,o-s-1)%10|0}if(n=n||t<0||l[d+1]!==void 0||(s<0?a:a%L(10,o-s-1)),c=i<4?(f||n)&&(i==0||i==(e.s<0?3:2)):f>5||f==5&&(i==4||n||i==6&&(r>0?s>0?a/L(10,o-s):0:l[d-1])%10&1||i==(e.s<0?8:7)),t<1||!l[0])return l.length=0,c?(t-=e.e+1,l[0]=L(10,(g-t%g)%g),e.e=-t||0):l[0]=e.e=0,e;if(r==0?(l.length=d,u=1,d--):(l.length=d+1,u=L(10,g-r),l[d]=s>0?(a/L(10,o-s)%L(10,s)|0)*u:0),c)for(;;)if(d==0){for(r=1,s=l[0];s>=10;s/=10)r++;for(s=l[0]+=u,u=1;s>=10;s/=10)u++;r!=u&&(e.e++,l[0]==X&&(l[0]=1));break}else{if(l[d]+=u,l[d]!=X)break;l[d--]=0,u=1}for(r=l.length;l[--r]===0;)l.pop()}return w&&(e.e>h.maxE?(e.d=null,e.e=NaN):e.e<h.minE&&(e.e=0,e.d=[0])),e}function G(e,t,i){if(!e.isFinite())return it(e);var n,o=e.e,r=M(e.d),s=r.length;return t?(i&&(n=i-s)>0?r=r.charAt(0)+"."+r.slice(1)+j(n):s>1&&(r=r.charAt(0)+"."+r.slice(1)),r=r+(e.e<0?"e":"e+")+e.e):o<0?(r="0."+j(-o-1)+r,i&&(n=i-s)>0&&(r+=j(n))):o>=s?(r+=j(o+1-s),i&&(n=i-o-1)>0&&(r=r+"."+j(n))):((n=o+1)<s&&(r=r.slice(0,n)+"."+r.slice(n)),i&&(n=i-s)>0&&(o+1===s&&(r+="."),r+=j(n))),r}function ze(e,t){var i=e[0];for(t*=g;i>=10;i/=10)t++;return t}function be(e,t,i){if(t>vt)throw w=!0,i&&(e.precision=i),Error(Ge);return p(new e(_e),t,1,!0)}function Y(e,t,i){if(t>Oe)throw Error(Ge);return p(new e(ye),t,i,!0)}function Qe(e){var t=e.length-1,i=t*g+1;if(t=e[t],t){for(;t%10==0;t/=10)i--;for(t=e[0];t>=10;t/=10)i++}return i}function j(e){for(var t="";e--;)t+="0";return t}function et(e,t,i,n){var o,r=new e(1),s=Math.ceil(n/g+4);for(w=!1;;){if(i%2&&(r=r.times(t),Ye(r.d,s)&&(o=!0)),i=T(i/2),i===0){i=r.d.length-1,o&&r.d[i]===0&&++r.d[i];break}t=t.times(t),Ye(t.d,s)}return w=!0,r}function We(e){return e.d[e.d.length-1]&1}function tt(e,t,i){for(var n,o=new e(t[0]),r=0;++r<t.length;)if(n=new e(t[r]),n.s)o[i](n)&&(o=n);else{o=n;break}return o}function Ce(e,t){var i,n,o,r,s,u,f,c=0,a=0,l=0,d=e.constructor,h=d.rounding,N=d.precision;if(!e.d||!e.d[0]||e.e>17)return new d(e.d?e.d[0]?e.s<0?0:1/0:1:e.s?e.s<0?0:e:NaN);for(t==null?(w=!1,f=N):f=t,u=new d(.03125);e.e>-2;)e=e.times(u),l+=5;for(n=Math.log(L(2,l))/Math.LN10*2+5|0,f+=n,i=r=s=new d(1),d.precision=f;;){if(r=p(r.times(e),f,1),i=i.times(++a),u=s.plus(b(r,i,f,1)),M(u.d).slice(0,f)===M(s.d).slice(0,f)){for(o=l;o--;)s=p(s.times(s),f,1);if(t==null)if(c<3&&me(s.d,f-n,h,c))d.precision=f+=10,i=r=u=new d(1),a=0,c++;else return p(s,d.precision=N,h,w=!0);else return d.precision=N,s}s=u}}function ee(e,t){var i,n,o,r,s,u,f,c,a,l,d,h=1,N=10,v=e,P=v.d,z=v.constructor,$=z.rounding,_=z.precision;if(v.s<0||!P||!P[0]||!v.e&&P[0]==1&&P.length==1)return new z(P&&!P[0]?-1/0:v.s!=1?NaN:P?0:v);if(t==null?(w=!1,a=_):a=t,z.precision=a+=N,i=M(P),n=i.charAt(0),Math.abs(r=v.e)<15e14){for(;n<7&&n!=1||n==1&&i.charAt(1)>3;)v=v.times(e),i=M(v.d),n=i.charAt(0),h++;r=v.e,n>1?(v=new z("0."+i),r++):v=new z(n+"."+i.slice(1))}else return c=be(z,a+2,_).times(r+""),v=ee(new z(n+"."+i.slice(1)),a-N).plus(c),z.precision=_,t==null?p(v,_,$,w=!0):v;for(l=v,f=s=v=b(v.minus(1),v.plus(1),a,1),d=p(v.times(v),a,1),o=3;;){if(s=p(s.times(d),a,1),c=f.plus(b(s,new z(o),a,1)),M(c.d).slice(0,a)===M(f.d).slice(0,a))if(f=f.times(2),r!==0&&(f=f.plus(be(z,a+2,_).times(r+""))),f=b(f,new z(h),a,1),t==null)if(me(f.d,a-N,$,u))z.precision=a+=N,c=s=v=b(l.minus(1),l.plus(1),a,1),d=p(v.times(v),a,1),o=u=1;else return p(f,z.precision=_,$,w=!0);else return z.precision=_,f;f=c,o+=2}}function it(e){return String(e.s*e.s/0)}function Te(e,t){var i,n,o;for((i=t.indexOf("."))>-1&&(t=t.replace(".","")),(n=t.search(/e/i))>0?(i<0&&(i=n),i+=+t.slice(n+1),t=t.substring(0,n)):i<0&&(i=t.length),n=0;t.charCodeAt(n)===48;n++);for(o=t.length;t.charCodeAt(o-1)===48;--o);if(t=t.slice(n,o),t){if(o-=n,e.e=i=i-n-1,e.d=[],n=(i+1)%g,i<0&&(n+=g),n<o){for(n&&e.d.push(+t.slice(0,n)),o-=g;n<o;)e.d.push(+t.slice(n,n+=g));t=t.slice(n),n=g-t.length}else n-=o;for(;n--;)t+="0";e.d.push(+t),w&&(e.e>e.constructor.maxE?(e.d=null,e.e=NaN):e.e<e.constructor.minE&&(e.e=0,e.d=[0]))}else e.e=0,e.d=[0];return e}function Nt(e,t){var i,n,o,r,s,u,f,c,a;if(t.indexOf("_")>-1){if(t=t.replace(/(\d)_(?=\d)/g,"$1"),je.test(t))return Te(e,t)}else if(t==="Infinity"||t==="NaN")return+t||(e.s=NaN),e.e=NaN,e.d=null,e;if(ht.test(t))i=16,t=t.toLowerCase();else if(mt.test(t))i=2;else if(pt.test(t))i=8;else throw Error(te+t);for(r=t.search(/p/i),r>0?(f=+t.slice(r+1),t=t.substring(2,r)):t=t.slice(2),r=t.indexOf("."),s=r>=0,n=e.constructor,s&&(t=t.replace(".",""),u=t.length,r=u-r,o=et(n,new n(i),r,r*2)),c=Ne(t,i,X),a=c.length-1,r=a;c[r]===0;--r)c.pop();return r<0?new n(e.s*0):(e.e=ze(c,a),e.d=c,w=!1,s&&(e=b(e,o,u*4)),f&&(e=e.times(Math.abs(f)<54?L(2,f):A.pow(2,f))),w=!0,e)}function Et(e,t){var i,n=t.d.length;if(n<3)return t.isZero()?t:ce(e,2,t,t);i=1.4*Math.sqrt(n),i=i>16?16:i|0,t=t.times(1/Ie(5,i)),t=ce(e,2,t,t);for(var o,r=new e(5),s=new e(16),u=new e(20);i--;)o=t.times(t),t=t.times(r.plus(o.times(s.times(o).minus(u))));return t}function ce(e,t,i,n,o){var r,s,u,f,c=e.precision,a=Math.ceil(c/g);for(w=!1,f=i.times(i),u=new e(n);;){if(s=b(u.times(f),new e(t++*t++),c,1),u=o?n.plus(s):n.minus(s),n=b(s.times(f),new e(t++*t++),c,1),s=u.plus(n),s.d[a]!==void 0){for(r=a;s.d[r]===u.d[r]&&r--;);if(r==-1)break}r=u,u=n,n=s,s=r}return w=!0,s.d.length=a+1,s}function Ie(e,t){for(var i=e;--t;)i*=e;return i}function nt(e,t){var i,n=t.s<0,o=Y(e,e.precision,1),r=o.times(.5);if(t=t.abs(),t.lte(r))return J=n?4:1,t;if(i=t.divToInt(o),i.isZero())J=n?3:2;else{if(t=t.minus(i.times(o)),t.lte(r))return J=We(i)?n?2:3:n?4:1,t;J=We(i)?n?1:4:n?3:2}return t.minus(o).abs()}function $e(e,t,i,n){var o,r,s,u,f,c,a,l,d,h=e.constructor,N=i!==void 0;if(N?(F(i,1,ie),n===void 0?n=h.rounding:F(n,0,8)):(i=h.precision,n=h.rounding),!e.isFinite())a=it(e);else{for(a=G(e),s=a.indexOf("."),N?(o=2,t==16?i=i*4-3:t==8&&(i=i*3-2)):o=t,s>=0&&(a=a.replace(".",""),d=new h(1),d.e=a.length-s,d.d=Ne(G(d),10,o),d.e=d.d.length),l=Ne(a,10,o),r=f=l.length;l[--f]==0;)l.pop();if(!l[0])a=N?"0p+0":"0";else{if(s<0?r--:(e=new h(e),e.d=l,e.e=r,e=b(e,d,i,n,0,o),l=e.d,r=e.e,c=Ve),s=l[i],u=o/2,c=c||l[i+1]!==void 0,c=n<4?(s!==void 0||c)&&(n===0||n===(e.s<0?3:2)):s>u||s===u&&(n===4||c||n===6&&l[i-1]&1||n===(e.s<0?8:7)),l.length=i,c)for(;++l[--i]>o-1;)l[i]=0,i||(++r,l.unshift(1));for(f=l.length;!l[f-1];--f);for(s=0,a="";s<f;s++)a+=Me.charAt(l[s]);if(N){if(f>1)if(t==16||t==8){for(s=t==16?4:3,--f;f%s;f++)a+="0";for(l=Ne(a,o,t),f=l.length;!l[f-1];--f);for(s=1,a="1.";s<f;s++)a+=Me.charAt(l[s])}else a=a.charAt(0)+"."+a.slice(1);a=a+(r<0?"p":"p+")+r}else if(r<0){for(;++r;)a="0"+a;a="0."+a}else if(++r>f)for(r-=f;r--;)a+="0";else r<f&&(a=a.slice(0,r)+"."+a.slice(r))}a=(t==16?"0x":t==2?"0b":t==8?"0o":"")+a}return e.s<0?"-"+a:a}function Ye(e,t){if(e.length>t)return e.length=t,!0}function _t(e){return new this(e).abs()}function yt(e){return new this(e).acos()}function bt(e){return new this(e).acosh()}function xt(e,t){return new this(e).plus(t)}function zt(e){return new this(e).asin()}function It(e){return new this(e).asinh()}function Pt(e){return new this(e).atan()}function kt(e){return new this(e).atanh()}function Lt(e,t){e=new this(e),t=new this(t);var i,n=this.precision,o=this.rounding,r=n+4;return!e.s||!t.s?i=new this(NaN):!e.d&&!t.d?(i=Y(this,r,1).times(t.s>0?.25:.75),i.s=e.s):!t.d||e.isZero()?(i=t.s<0?Y(this,n,o):new this(0),i.s=e.s):!e.d||t.isZero()?(i=Y(this,r,1).times(.5),i.s=e.s):t.s<0?(this.precision=r,this.rounding=1,i=this.atan(b(e,t,r,1)),t=Y(this,r,1),this.precision=n,this.rounding=o,i=e.s<0?i.minus(t):i.plus(t)):i=this.atan(b(e,t,r,1)),i}function St(e){return new this(e).cbrt()}function Bt(e){return p(e=new this(e),e.e+1,2)}function Mt(e,t,i){return new this(e).clamp(t,i)}function At(e){if(!e||typeof e!="object")throw Error(xe+"Object expected");var t,i,n,o=e.defaults===!0,r=["precision",1,ie,"rounding",0,8,"toExpNeg",-ue,0,"toExpPos",0,ue,"maxE",0,ue,"minE",-ue,0,"modulo",0,9];for(t=0;t<r.length;t+=3)if(i=r[t],o&&(this[i]=Ae[i]),(n=e[i])!==void 0)if(T(n)===n&&n>=r[t+1]&&n<=r[t+2])this[i]=n;else throw Error(te+i+": "+n);if(i="crypto",o&&(this[i]=Ae[i]),(n=e[i])!==void 0)if(n===!0||n===!1||n===0||n===1)if(n)if(typeof crypto<"u"&&crypto&&(crypto.getRandomValues||crypto.randomBytes))this[i]=!0;else throw Error(Ke);else this[i]=!1;else throw Error(te+i+": "+n);return this}function Ot(e){return new this(e).cos()}function Ct(e){return new this(e).cosh()}function rt(e){var t,i,n;function o(r){var s,u,f,c=this;if(!(c instanceof o))return new o(r);if(c.constructor=o,Ze(r)){c.s=r.s,w?!r.d||r.e>o.maxE?(c.e=NaN,c.d=null):r.e<o.minE?(c.e=0,c.d=[0]):(c.e=r.e,c.d=r.d.slice()):(c.e=r.e,c.d=r.d?r.d.slice():r.d);return}if(f=typeof r,f==="number"){if(r===0){c.s=1/r<0?-1:1,c.e=0,c.d=[0];return}if(r<0?(r=-r,c.s=-1):c.s=1,r===~~r&&r<1e7){for(s=0,u=r;u>=10;u/=10)s++;w?s>o.maxE?(c.e=NaN,c.d=null):s<o.minE?(c.e=0,c.d=[0]):(c.e=s,c.d=[r]):(c.e=s,c.d=[r]);return}else if(r*0!==0){r||(c.s=NaN),c.e=NaN,c.d=null;return}return Te(c,r.toString())}else if(f!=="string")throw Error(te+r);return(u=r.charCodeAt(0))===45?(r=r.slice(1),c.s=-1):(u===43&&(r=r.slice(1)),c.s=1),je.test(r)?Te(c,r):Nt(c,r)}if(o.prototype=m,o.ROUND_UP=0,o.ROUND_DOWN=1,o.ROUND_CEIL=2,o.ROUND_FLOOR=3,o.ROUND_HALF_UP=4,o.ROUND_HALF_DOWN=5,o.ROUND_HALF_EVEN=6,o.ROUND_HALF_CEIL=7,o.ROUND_HALF_FLOOR=8,o.EUCLID=9,o.config=o.set=At,o.clone=rt,o.isDecimal=Ze,o.abs=_t,o.acos=yt,o.acosh=bt,o.add=xt,o.asin=zt,o.asinh=It,o.atan=Pt,o.atanh=kt,o.atan2=Lt,o.cbrt=St,o.ceil=Bt,o.clamp=Mt,o.cos=Ot,o.cosh=Ct,o.div=Tt,o.exp=Ft,o.floor=Rt,o.hypot=$t,o.ln=qt,o.log=Dt,o.log10=Wt,o.log2=Ut,o.max=Yt,o.min=Zt,o.mod=Xt,o.mul=Ht,o.pow=Vt,o.random=Gt,o.round=Kt,o.sign=Jt,o.sin=jt,o.sinh=Qt,o.sqrt=ei,o.sub=ti,o.sum=ii,o.tan=ni,o.tanh=ri,o.trunc=oi,e===void 0&&(e={}),e&&e.defaults!==!0)for(n=["precision","rounding","toExpNeg","toExpPos","maxE","minE","modulo","crypto"],t=0;t<n.length;)e.hasOwnProperty(i=n[t++])||(e[i]=this[i]);return o.config(e),o}function Tt(e,t){return new this(e).div(t)}function Ft(e){return new this(e).exp()}function Rt(e){return p(e=new this(e),e.e+1,3)}function $t(){var e,t,i=new this(0);for(w=!1,e=0;e<arguments.length;)if(t=new this(arguments[e++]),t.d)i.d&&(i=i.plus(t.times(t)));else{if(t.s)return w=!0,new this(1/0);i=t}return w=!0,i.sqrt()}function Ze(e){return e instanceof A||e&&e.toStringTag===Je||!1}function qt(e){return new this(e).ln()}function Dt(e,t){return new this(e).log(t)}function Ut(e){return new this(e).log(2)}function Wt(e){return new this(e).log(10)}function Yt(){return tt(this,arguments,"lt")}function Zt(){return tt(this,arguments,"gt")}function Xt(e,t){return new this(e).mod(t)}function Ht(e,t){return new this(e).mul(t)}function Vt(e,t){return new this(e).pow(t)}function Gt(e){var t,i,n,o,r=0,s=new this(1),u=[];if(e===void 0?e=this.precision:F(e,1,ie),n=Math.ceil(e/g),this.crypto)if(crypto.getRandomValues)for(t=crypto.getRandomValues(new Uint32Array(n));r<n;)o=t[r],o>=429e7?t[r]=crypto.getRandomValues(new Uint32Array(1))[0]:u[r++]=o%1e7;else if(crypto.randomBytes){for(t=crypto.randomBytes(n*=4);r<n;)o=t[r]+(t[r+1]<<8)+(t[r+2]<<16)+((t[r+3]&127)<<24),o>=214e7?crypto.randomBytes(4).copy(t,r):(u.push(o%1e7),r+=4);r=n/4}else throw Error(Ke);else for(;r<n;)u[r++]=Math.random()*1e7|0;for(n=u[--r],e%=g,n&&e&&(o=L(10,g-e),u[r]=(n/o|0)*o);u[r]===0;r--)u.pop();if(r<0)i=0,u=[0];else{for(i=-1;u[0]===0;i-=g)u.shift();for(n=1,o=u[0];o>=10;o/=10)n++;n<g&&(i-=g-n)}return s.e=i,s.d=u,s}function Kt(e){return p(e=new this(e),e.e+1,this.rounding)}function Jt(e){return e=new this(e),e.d?e.d[0]?e.s:0*e.s:e.s||NaN}function jt(e){return new this(e).sin()}function Qt(e){return new this(e).sinh()}function ei(e){return new this(e).sqrt()}function ti(e,t){return new this(e).sub(t)}function ii(){var e=0,t=arguments,i=new this(t[e]);for(w=!1;i.s&&++e<t.length;)i=i.plus(t[e]);return w=!0,p(i,this.precision,this.rounding)}function ni(e){return new this(e).tan()}function ri(e){return new this(e).tanh()}function oi(e){return p(e=new this(e),e.e+1,1)}m[Symbol.for("nodejs.util.inspect.custom")]=m.toString;m[Symbol.toStringTag]="Decimal";var A=m.constructor=rt(Ae);_e=new A(_e);ye=new A(ye);const si=document.getElementById("glcanvas");function ui(e){return{position:ci(e)}}function ci(e){const t=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,t);const i=[1,1,-1,1,1,-1,-1,-1];return e.bufferData(e.ARRAY_BUFFER,new Float32Array(i),e.STATIC_DRAW),t}function Xe(e,t,i){const n=e.createShader(t);return e.shaderSource(n,i),e.compileShader(n),e.getShaderParameter(n,e.COMPILE_STATUS)?n:(alert(`An error occurred compiling the shaders: ${e.getShaderInfoLog(n)}`),e.deleteShader(n),null)}function fi(e,t,i){const n=Xe(e,e.VERTEX_SHADER,t),o=Xe(e,e.FRAGMENT_SHADER,i),r=e.createProgram();return e.attachShader(r,n),e.attachShader(r,o),e.linkProgram(r),e.getProgramParameter(r,e.LINK_STATUS)?r:(alert(`Unable to initialize the shader program: ${e.getProgramInfoLog(r)}`),null)}const ai=`
precision highp float;

attribute vec4 aVertexPosition;

uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;

varying vec2 coords;

void main(void) {
    gl_Position = aVertexPosition;
    coords = vec2(aVertexPosition.x, aVertexPosition.y) * 0.5 + 0.5;
}
`;function qe(e,t=["uX0","uY0","uX1","uY1"]){const i=si.getContext("webgl",{preserveDrawingBuffer:!0});if(!i){alert("Unable to initialize WebGL. Your browser or machine may not support it.");return}const n=fi(i,ai,e),o={};for(const s of t)o[s]=i.getUniformLocation(n,s);const r={gl:i,program:n,attribLocations:{vertexPosition:i.getAttribLocation(n,"aVertexPosition")},uniformLocations:o,buffers:ui(i)};return I>1&&(r.uniformLocations.uPixWidth=i.getUniformLocation(n,"uPixWidth")),r}const li=document.getElementById("glcanvas");function di(){return I===1?`
        precision highp float;

        uniform float uX0;
        uniform float uY0;
        uniform float uX1;
        uniform float uY1;

        varying vec2 coords;
        void main() {
            vec2 c = vec2(
                coords.x * (uX1 - uX0) + uX0,
                coords.y * (uY1 - uY0) + uY0
            );
            vec2 z = c;
            for (int i = 0; i < ${D}; i++) {
                if (dot(z, z) > 4.0) {
                    float t = float(i) + 1. - log(log(dot(z, z)))/log(2.);
                    gl_FragColor = vec4(
                        (-cos(0.02 * t) + 1.0) / 2.0, 
                        (-cos(0.03 * t) + 1.0) / 2.0, 
                        (-cos(0.05 * t) + 1.0) / 2.0, 
                        1.0
                    );
                    return;
                }
                z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
            }
            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
        }
        `:`
        precision highp float;

        uniform float uX0;
        uniform float uY0;
        uniform float uX1;
        uniform float uY1;

        uniform float uPixWidth;
        
        varying vec2 coords;

        vec4 iteration(vec2 c) {
            vec2 z = c;
            for (int i = 0; i < ${D}; i++) {
                if (dot(z, z) > 4.0) {
                    float t = float(i) + 1. - log(log(dot(z, z)))/log(2.);
                    return vec4(
                        (-cos(0.02 * t) + 1.0) / 2.0, 
                        (-cos(0.03 * t) + 1.0) / 2.0, 
                        (-cos(0.05 * t) + 1.0) / 2.0, 
                        1.0
                    );
                }
                z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
            }
            return vec4(0.0, 0.0, 0.0, 1.0);
        }

        void main() {
            vec2 cBase = vec2(
                coords.x * (uX1 - uX0) + uX0 - 0.5 * uPixWidth,
                coords.y * (uY1 - uY0) + uY0 - 0.5 * uPixWidth
            );
            for (int xi = 0; xi < ${I}; xi++) {
                for (int yi = 0; yi < ${I}; yi++) {
                    vec2 c = cBase + vec2(
                        float(xi) + 0.5,
                        float(yi) + 0.5
                    ) * uPixWidth / ${I}.0;
                    gl_FragColor = gl_FragColor + iteration(c) / (${I}.0 * ${I}.0);
                }
            }
        }
        `}function mi(e){const{gl:t,buffers:i,program:n,attribLocations:o,uniformLocations:r}=e,s=2,u=t.FLOAT,f=!1,c=0,a=0;if(t.bindBuffer(t.ARRAY_BUFFER,i.position),t.vertexAttribPointer(o.vertexPosition,s,u,f,c,a),t.enableVertexAttribArray(o.vertexPosition),t.useProgram(n),t.uniform1f(r.uX0,E.x0),t.uniform1f(r.uY0,E.y0),t.uniform1f(r.uX1,E.x1),t.uniform1f(r.uY1,E.y1),e.uniformLocations.uPixWidth){const l=E.x1.minus(E.x0).div(li.width);t.uniform1f(r.uPixWidth,l)}t.drawArrays(t.TRIANGLE_STRIP,0,4)}let Le;function ot(e=!1){(!Le||e)&&(Le=qe(di())),mi(Le)}const hi=document.getElementById("glcanvas");function pi(){let e=`
    precision highp float;

    uniform float ONE;

    uniform vec2 uX0;
    uniform vec2 uY0;
    uniform vec2 uX1;
    uniform vec2 uY1;

    ${I>1?`uniform vec2 uPixWidth;
`:""}

    varying vec2 coords;

    // emulation based on https://github.com/gsson/wasm-talk/blob/master/mandelbrot-webgl/crate/src/mandelbrot64.frag

    vec2 quickTwoSum(float a, float b) {
        float sum = (a + b) * ONE;
        float err = b - (sum - a) * ONE;
        return vec2(sum, err);
    }

    vec2 twoSum(float a, float b) {
        float s = (a + b);
        float v = (s * ONE - a) * ONE;
        float err = (a - (s - v) * ONE) * ONE + (b - v);
        return vec2(s, err);
    }

    vec2 twoSub(float a, float b) {
        float s = (a - b);
        float v = (s * ONE - a) * ONE;
        float err = (a - (s - v) * ONE) * ONE - (b + v);
        return vec2(s, err);
    }

    vec2 split(float a) {
        const float SPLIT = 4097.0;
        float t = a * SPLIT;
        float a_hi = t * ONE - (t - a);
        float a_lo = a * ONE - a_hi;
        return vec2(a_hi, a_lo);
    }

    vec2 twoProd(float a, float b) {
        float prod = a * b;
        vec2 a_fp64 = split(a);
        vec2 b_fp64 = split(b);
        float err = (
            (a_fp64.x * b_fp64.x - prod) +
            a_fp64.x * b_fp64.y + a_fp64.y * b_fp64.x)
        + a_fp64.y * b_fp64.y;
        return vec2(prod, err);
    }

    vec2 mul_fp64(vec2 a, vec2 b) {
        vec2 prod = twoProd(a.x, b.x);
        // y component is for the error
        prod.y += a.x * b.y;
        prod = quickTwoSum(prod.x, prod.y);
        prod.y += a.y * b.x;
        prod = quickTwoSum(prod.x, prod.y);
        return prod;
    }

    vec2 add_fp64(vec2 a, vec2 b) {
        vec2 s, t;
        s = twoSum(a.x, b.x);
        t = twoSum(a.y, b.y);
        s.y += t.x;
        s = quickTwoSum(s.x, s.y);
        s.y += t.y;
        s = quickTwoSum(s.x, s.y);
        return s;
    }

    vec2 sub_fp64(vec2 a, vec2 b) {
        vec2 s, t;
        s = twoSub(a.x, b.x);
        t = twoSub(a.y, b.y);
        s.y += t.x;
        s = quickTwoSum(s.x, s.y);
        s.y += t.y;
        s = quickTwoSum(s.x, s.y);
        return s;
    }

    vec2 div_fp64(vec2 a, vec2 b) {
        float xn = 1.0 / b.x;
        vec2 yn = a * xn;
        float diff = (sub_fp64(a, mul_fp64(b, yn))).x;
        vec2 prod = twoProd(xn, diff);
        return add_fp64(yn, prod);
    }

    vec4 iterate(vec2 c_re, vec2 c_im) {
        vec2 z_re = c_re;
        vec2 z_im = c_im;

        for (int i = 0; i < ${D}; i++) {
            vec2 z_re_squared = mul_fp64(z_re, z_re);
            vec2 z_im_squared = mul_fp64(z_im, z_im);
            if (z_re_squared.x + z_im_squared.x >= 4.0) {
                vec2 z = vec2(z_re.x, z_im.x);
                float t = float(i) + 1. - log(log(dot(z, z))) / log(2.);
                return vec4(
                    (-cos(0.02 * t) + 1.0) / 2.0, 
                    (-cos(0.03 * t) + 1.0) / 2.0, 
                    (-cos(0.05 * t) + 1.0) / 2.0, 
                    1.0
                );
            }

            vec2 z_re_temp = add_fp64(sub_fp64(z_re_squared, z_im_squared), c_re);

            z_im = add_fp64(mul_fp64(z_re * 2.0, z_im), c_im);
            z_re = z_re_temp;
        }
        return vec4(0.0, 0.0, 0.0, 1.0);
    }
    `;return I===1?e+=`
        void main() {
            vec2 c_re = add_fp64(mul_fp64(vec2(coords.x, 0.0), sub_fp64(uX1, uX0)), uX0);
            vec2 c_im = add_fp64(mul_fp64(vec2(coords.y, 0.0), sub_fp64(uY1, uY0)), uY0);
            gl_FragColor = iterate(c_re, c_im);
        }
        `:e+=`
        void main() {
            vec2 cBase_re = sub_fp64(
                add_fp64(mul_fp64(vec2(coords.x, 0.0), sub_fp64(uX1, uX0)), uX0),
                mul_fp64(vec2(0.5, 0.0), uPixWidth)
            );
            vec2 cBase_im = sub_fp64(
                add_fp64(mul_fp64(vec2(coords.y, 0.0), sub_fp64(uY1, uY0)), uY0),
                mul_fp64(vec2(0.5, 0.0), uPixWidth)
            );
            for (int xi = 0; xi < ${I}; xi++) {
                for (int yi = 0; yi < ${I}; yi++) {
                    vec2 c_re = add_fp64(
                        cBase_re,
                        mul_fp64(
                            vec2(float(xi) + 0.5, 0.0),
                            div_fp64(uPixWidth, vec2(${I}.0, 0.0))
                        )
                    );
                    vec2 c_im = add_fp64(
                        cBase_im,
                        mul_fp64(
                            vec2(float(yi) + 0.5, 0.0),
                            div_fp64(uPixWidth, vec2(${I}.0, 0.0))
                        )
                    );
                    gl_FragColor = gl_FragColor + iterate(c_re, c_im) / (${I}.0 * ${I}.0);
                }
            }
        }
        `,e}function fe(e){const t=new Float32Array(2);return t[0]=e,t[1]=e-t[0],t}function gi(e){const{gl:t,buffers:i,program:n,attribLocations:o,uniformLocations:r}=e,s=2,u=t.FLOAT,f=!1,c=0,a=0;if(t.bindBuffer(t.ARRAY_BUFFER,i.position),t.vertexAttribPointer(o.vertexPosition,s,u,f,c,a),t.enableVertexAttribArray(o.vertexPosition),t.useProgram(n),t.uniform2fv(r.uX0,fe(E.x0)),t.uniform2fv(r.uY0,fe(E.y0)),t.uniform2fv(r.uX1,fe(E.x1)),t.uniform2fv(r.uY1,fe(E.y1)),t.uniform1f(r.ONE,1),e.uniformLocations.uPixWidth){const l=E.x1.minus(E.x0).div(hi.width).toNumber();t.uniform2fv(r.uPixWidth,fe(l))}t.drawArrays(t.TRIANGLE_STRIP,0,4)}const vi=["uX0","uY0","uX1","uY1","ONE"];let Se;function wi(e=!1){(!Se||e)&&(Se=qe(pi(),vi)),gi(Se)}const Ni=document.getElementById("glcanvas");function Ei(){let e=`
    precision highp float;

    uniform float uZReHistory[${D}];
    uniform float uZImHistory[${D}];

    uniform vec2 uDeltaOrigin;
    uniform vec2 uViewSize;

    ${I>1?`uniform float uPixWidth;
`:""}
    
    varying vec2 coords;

    vec4 iterate(vec2 dc) {
        vec2 dz = dc;
        for (int i = 0; i < ${D}; i++) {
            vec2 z0 = vec2(uZReHistory[i], uZImHistory[i]);
            vec2 z = z0 + dz;
            if (dot(z, z) > 4.0) {
                float t = float(i) + 1. - log(log(dot(z, z)))/log(2.);
                return vec4(
                    (-cos(0.02 * t) + 1.0) / 2.0, 
                    (-cos(0.03 * t) + 1.0) / 2.0, 
                    (-cos(0.05 * t) + 1.0) / 2.0, 
                    1.0
                );
            }
            // dz' = 2 * z * dz + dz^2 + dc
            dz = vec2(
                2.0 * z0.x * dz.x - 2.0 * z0.y * dz.y + dz.x * dz.x - dz.y * dz.y + dc.x,
                2.0 * z0.x * dz.y + 2.0 * z0.y * dz.x + 2.0 * dz.x * dz.y + dc.y
            );
        }
        return vec4(0.0, 0.0, 0.0, 1.0);
    }
    `;return I===1?e+=`
        void main() {
            vec2 dc = uDeltaOrigin + coords * uViewSize;
            gl_FragColor = iterate(dc);
        }
        `:e+=`
        void main() {
            vec2 dcBase = uDeltaOrigin + coords * uViewSize;
            for (int xi = 0; xi < ${I}; xi++) {
                for (int yi = 0; yi < ${I}; yi++) {
                    vec2 dc = dcBase + vec2(
                        float(xi) + 0.5,
                        float(yi) + 0.5
                    ) * uPixWidth / ${I}.0;
                    gl_FragColor = gl_FragColor + iterate(dc) / (${I}.0 * ${I}.0);
                }
            }
        }
        `,e}function _i(){let e=q;const t=[e.re.toNumber()],i=[e.im.toNumber()];for(let n=0;n<D-1;n++){const o={re:e.re.times(e.re).minus(e.im.times(e.im)).plus(q.re),im:e.re.times(e.im).times(2).plus(q.im)};e=o,t.push(o.re.toNumber()),i.push(o.im.toNumber())}return{zReHistory:t,zImHistory:i}}function yi(e){const{gl:t,buffers:i,program:n,attribLocations:o,uniformLocations:r}=e,s=2,u=t.FLOAT,f=!1,c=0,a=0;t.bindBuffer(t.ARRAY_BUFFER,i.position),t.vertexAttribPointer(o.vertexPosition,s,u,f,c,a),t.enableVertexAttribArray(o.vertexPosition),t.useProgram(n);const{zReHistory:l,zImHistory:d}=_i();if(t.uniform1fv(r.uZReHistory,l),t.uniform1fv(r.uZImHistory,d),t.uniform2fv(r.uDeltaOrigin,[E.x0.minus(q.re),E.y0.minus(q.im)]),t.uniform2fv(r.uViewSize,[E.x1.minus(E.x0),E.y1.minus(E.y0)]),e.uniformLocations.uPixWidth){const h=E.x1.minus(E.x0).div(Ni.width).toNumber();t.uniform1f(r.uPixWidth,h)}t.drawArrays(t.TRIANGLE_STRIP,0,4)}const bi=["uZReHistory","uZImHistory","uDeltaOrigin","uViewSize"];let Be;function st(e=!1){(!Be||e)&&(Be=qe(Ei(),bi)),yi(Be)}const H=document.getElementById("2dcanvas");let ve;function xi(e=!1){(!ve||e)&&(ve=H.getContext("2d",{willReadFrequently:!0}));const t=new Uint8ClampedArray(H.width*H.height*4),i=E.x0.toNumber(),n=E.x1.toNumber(),o=E.y0.toNumber(),r=E.y1.toNumber();for(let u=0;u<H.height;u++)for(let f=0;f<H.width;f++){const c=u*H.width+f,a=i+f*(n-i)/(H.width-1),l=r-u*(r-o)/(H.height-1),d={re:a,im:l},h={...d};for(let N=0;N<D;N++){if(h.re*h.re+h.im*h.im>4){const P=N+1-Math.log(Math.log(h.re*h.re+h.im*h.im))/Math.log(2);t[c*4+0]=255*(1-Math.cos(.02*P))/2,t[c*4+1]=255*(1-Math.cos(.03*P))/2,t[c*4+2]=255*(1-Math.cos(.05*P))/2;break}const v=h.re*h.re-h.im*h.im+d.re;h.im=2*h.re*h.im+d.im,h.re=v}t[c*4+3]=255}const s=ve.getImageData(0,0,H.width,H.height);s.data.set(t),ve.putImageData(s,0,0)}const V=document.getElementById("2dcanvas");let ae;function ut(e=!1){(!ae||e)&&(ae=V.getContext("2d",{willReadFrequently:!0}));const t=new Uint8ClampedArray(V.width*V.height*4),{x0:i,y0:n,x1:o,y1:r}=E;let s=q;const u=[{re:s.re.toNumber(),im:s.im.toNumber()}];for(let d=0;d<D-1;d++){const h={re:s.re.times(s.re).minus(s.im.times(s.im)).plus(q.re),im:s.re.times(s.im).times(2).plus(q.im)};s=h,u.push({re:h.re.toNumber(),im:h.im.toNumber()})}const f={re:i.minus(q.re).toNumber(),im:n.minus(q.im).toNumber()},c=o.minus(i).toNumber(),a=r.minus(n).toNumber();for(let d=0;d<V.height;d++)for(let h=0;h<V.width;h++){const N=d*V.width+h,v=h/(V.width-1),P=1-d/(V.height-1),z=f.re+v*c,$=f.im+P*a,_={re:z,im:$},y={..._};for(let K=0;K<D;K++){const O=u[K],U={re:O.re+y.re,im:O.im+y.im};if(U.re*U.re+U.im*U.im>4){const re=K+1-Math.log(Math.log(U.re*U.re+U.im*U.im))/Math.log(2);t[N*4+0]=255*(1-Math.cos(.02*re))/2,t[N*4+1]=255*(1-Math.cos(.03*re))/2,t[N*4+2]=255*(1-Math.cos(.05*re))/2;break}const oe=2*O.re*y.re-2*O.im*y.im+y.re*y.re-y.im*y.im+_.re,ne=2*O.re*y.im+2*O.im*y.re+2*y.re*y.im+_.im;y.re=oe,y.im=ne}t[N*4+3]=255}const l=ae.getImageData(0,0,V.width,V.height);l.data.set(t),ae.reset(),ae.putImageData(l,0,0)}const le=document.getElementById("glcanvas"),Ee=document.getElementById("2dcanvas");let Z=le,Q=ot;const k={x:new A(-.5),y:new A(0),halfWidth:new A(1.5)},E={x0:new A(-2),y0:new A(-1.5),x1:new A(1),y1:new A(1.5)};function zi(){const e=1.5/k.halfWidth.toNumber(),t=3+Math.floor(Math.log(e)/Math.log(10));document.getElementById("view-loc").innerHTML=`re: ${k.x.toPrecision(t)}, im: ${k.y.toPrecision(t)}, zoom: ${e.toPrecision(3)}`}function Ii(){const e=4+Math.ceil(-Math.log(k.halfWidth)/Math.log(10));for(;A.precision<e;)A.precision+=4;for(;A.precision>e+8;)A.precision-=4}function De(){const e=k.halfWidth.times(Z.height/Z.width);E.x0=k.x.minus(k.halfWidth),E.x1=k.x.plus(k.halfWidth),E.y0=k.y.minus(e),E.y1=k.y.plus(e),zi(),Ii()}let D=document.getElementById("max-iters").value,Fe=document.getElementById("auto-max-iters").checked,I=parseInt(document.getElementById("anti-aliasing").value);function ct(e){e&&(D=e,document.getElementById("max-iters").value=D)}function ft(){let e=-Math.log(k.halfWidth),t=100*(e>0?Math.ceil(e/2):1);return D!==t?(ct(t),!0):!1}function R(e=!1){Fe&&(e|=ft()),Q(e)}document.getElementById("auto-max-iters").addEventListener("click",()=>{Fe=document.getElementById("auto-max-iters").checked,document.getElementById("max-iters").disabled=Fe,ft()&&R(!0)});document.getElementById("max-iters").addEventListener("input",()=>{ct(parseInt(document.getElementById("max-iters").value)),R(!0)});document.getElementById("anti-aliasing").addEventListener("change",e=>{I=parseInt(e.target.value),R(!0)});const de=document.getElementById("help-overlay");document.getElementById("show-help-button").addEventListener("click",()=>{de.style.display="block"});document.getElementById("close-help-button").addEventListener("click",()=>{de.style.display="none"});de.addEventListener("click",e=>{e.target===de&&(de.style.display="none")});function Re(){Z.width=.8*window.innerWidth,Z.height=.8*window.innerHeight,console.log(`Canvas size: ${Z.width}x${Z.height}`),De()}window.addEventListener("resize",()=>{Re(),R(!0)});let q={re:new A(0),im:new A(0)};function Pi(e,t){const i=E.x1.minus(E.x0),n=E.y1.minus(E.y0);return{re:E.x0.plus(i.times(e)),im:E.y0.plus(n.times(t))}}function at(e){if(Q!==ut&&Q!==st)return;const t=e.offsetX/Z.width,i=1-e.offsetY/Z.height;q=Pi(t,i),console.log(`Perturbation point: ${q.re}, ${q.im}`),R()}Ee.addEventListener("click",at);le.addEventListener("click",at);function se(e){e?(Z=le,Re(),Ee.style.display="none",le.style.display="block"):(Z=Ee,Re(),Ee.style.display="block",le.style.display="none"),document.getElementById("anti-aliasing").disabled=!e}se(!0);document.getElementById("render-type").addEventListener("change",e=>{e.target.value==="WebGL"?(Q=ot,se(!0)):e.target.value==="WebGL-64"?(Q=wi,se(!0)):e.target.value==="WebGL-Perturb"?(Q=st,se(!0)):e.target.value==="JS"?(Q=xi,se(!1)):e.target.value==="JS-Perturb"&&(Q=ut,se(!1)),R(!0)});document.getElementById("render-type").value="WebGL";document.getElementById("download-link").addEventListener("click",()=>{const e=document.getElementById("download-link");e.href=Z.toDataURL()});function he(e,t){k.x=k.x.plus(k.halfWidth.times(e)),k.y=k.y.plus(k.halfWidth.times(t)),De()}function Ue(e){k.halfWidth=k.halfWidth.div(e),De()}const S={left:!1,right:!1,up:!1,down:!1,zoomOut:!1,zoomIn:!1},B={left:"a",right:"d",up:"w",down:"s",zoomOut:"q",zoomIn:"e"};window.addEventListener("keydown",e=>{switch(e.key){case B.left:S.left=!0;break;case B.right:S.right=!0;break;case B.up:S.up=!0;break;case B.down:S.down=!0;break;case B.zoomOut:S.zoomOut=!0;break;case B.zoomIn:S.zoomIn=!0;break}});window.addEventListener("keyup",e=>{switch(e.key){case B.left:S.left=!1;break;case B.right:S.right=!1;break;case B.up:S.up=!1;break;case B.down:S.down=!1;break;case B.zoomOut:S.zoomOut=!1;break;case B.zoomIn:S.zoomIn=!1;break}});document.getElementById("up-key").innerText=B.up.toUpperCase();document.getElementById("left-key").innerText=B.left.toUpperCase();document.getElementById("down-key").innerText=B.down.toUpperCase();document.getElementById("right-key").innerText=B.right.toUpperCase();document.getElementById("zoom-out-key").innerText=B.zoomIn.toUpperCase();document.getElementById("zoom-in-key").innerText=B.zoomOut.toUpperCase();const Pe=.25,lt=2;document.getElementById("zoom-out").addEventListener("click",()=>{Ue(1/lt),R()});document.getElementById("zoom-in").addEventListener("click",()=>{Ue(lt),R()});document.getElementById("move-up").addEventListener("click",()=>{he(0,Pe),R()});document.getElementById("move-down").addEventListener("click",()=>{he(0,-Pe),R()});document.getElementById("move-left").addEventListener("click",()=>{he(-Pe,0),R()});document.getElementById("move-right").addEventListener("click",()=>{he(Pe,0),R()});const we=.04,He=1.25;function ki(){let e=0,t=0,i=1;S.left&&(e-=we),S.right&&(e+=we),S.up&&(t+=we),S.down&&(t-=we),S.zoomOut&&(i/=He),S.zoomIn&&(i*=He),(e!==0||t!==0)&&he(e,t),i!==1&&Ue(i),(e!==0||t!==0||i!==1)&&R()}function dt(){ki(),requestAnimationFrame(dt)}R();dt();
