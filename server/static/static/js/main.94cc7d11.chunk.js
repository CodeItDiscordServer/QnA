(this.webpackJsonpqna=this.webpackJsonpqna||[]).push([[0],{105:function(t,n,e){"use strict";e.r(n);var r=e(0),a=e.n(r),o=e(20),c=e.n(o),i=e(23),s=e(18),l=e(21),u=e(41),d=e(11),b="update entire filter, pieced together earlier",p="loading next infinite scroll page",f="appending these next few posts",h="this is the post details for the react client, share l8r.",g={PiazzaSearchResults:[],filterState:Object(d.a)(Object(d.a)({},{"Instructor has answered":!1,"Student has answered":!1}),{},{searchText:"",tags:{hw1:!1,hw2:!1,hw3:!1,hw4:!1,project:!1}}),pageState:{loading:!1,searchResults:void 0,scrollLoading:!1,piazzaPostDetails:[]}},O=Object(s.c)({searchState:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:g.PiazzaSearchResults,n=arguments.length>1?arguments[1]:void 0;switch(n.type){case h:return Object(d.a)(Object(d.a)({},t),{},{detailIds:n.data});case"SET_SEARCH_RESULTS":if(500===n.status)return t;if(200===n.status)return Object(d.a)(Object(d.a)({},t),{},{results:n.results,cursor:n.cursor});if(303===n.status)return t;break;case f:return Object(d.a)(Object(d.a)({},t),{},{results:t.results.concat(n.results),cursor:n.cursor});default:return t}},pageState:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:g.pageState,n=arguments.length>1?arguments[1]:void 0;switch(n.type){case"FETCHING":return Object.assign({},t,{loading:!0});case p:return Object.assign({},t,{scrollLoading:!0});case"SET_SEARCH_RESULTS":return Object.assign({},t,{loading:!1,scrollLoading:!1});case h:return Object.assign({},t,{loading:!1,piazzaPostDetails:n.data});case f:return 200!==n.status||n.results.length?Object.assign({},t,{scrollLoading:!1}):Object.assign({},t,{scrollLoading:!0});default:return t}},filterState:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:g.filterState,n=arguments.length>1?arguments[1]:void 0;switch(n.type){case" restricting filter to particular class":return Object(d.a)(Object(d.a)({},t),{},{classid:n.id});case b:return n.filter;default:return t}}}),j=function(t){return t.pageState.piazzaPostDetails},m=function(t){return t.searchState.cursor},v=function(t){return t.pageState.loading},x=function(t){return t.pageState.scrollLoading},w=function(t){return t.searchState.results},y=function(t){return t.filterState},k=(e(73),e(35)),S=e(6),E=(e(74),e(120)),C=e(4),N=e(30),L=e(31),z=e(32),T=e(37),I=e(36),F=e(1),_=e(122);function R(){var t=Object(C.a)(["\n  img {\n    width: 15px;\n    height: 15px;\n    display: inline-block;\n  }\n  margin: -2px 6px -10px 0;\n\n  font-size: 1.25em;\n"]);return R=function(){return t},t}var q=Object(F.a)(R()),D=function(t){var n=t.term;return Object(F.b)("span",{css:q},Object(F.b)("img",{src:"/static/negative-check.png",alt:"This search term was not found in the result"}),n)},A=function(t){var n=t.term;return Object(F.b)("span",{css:q},Object(F.b)("img",{src:"/static/positive-check.png",alt:"This search term was found!"}),n)},J=e(38),H=e.n(J),X=e(42),B=e.n(X),P={404:"NO RESULTS",405:"CAN'T CONNECT TO SERVER"},U={results:[],cursor:null},Y=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:404,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:U;return{type:"SET_SEARCH_RESULTS",status:t,results:n.results,cursor:n.cursor}},Z=function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:U;return{type:f,results:n.results,cursor:n.cursor,status:t}},G=function(t,n){return function(e){e({type:p});var r=JSON.parse(JSON.stringify(t)),a=[];Object.keys(r.tags).forEach((function(t){r.tags[t]&&a.push(t)})),r.skip=n,r.tags=a.join(","),setTimeout((function(){H.a.get("".concat("/api/search","?").concat(B.a.stringify(r)),{headers:{"Content-Type":"application/x-www-form-urlencoded;charset=utf-8"}}).then((function(t){200!==t.status?this.reject({code:t.status,message:t}):e(Z(200,t.data))})).catch((function(t){console.log(t),e(Z([]))}))}),420)}};function M(){var t=Object(C.a)(["\n      margin-left: auto;\n      margin-right:auto;\n      margin-bottom:50px;\n      padding-top:5px;\n      width: 64px;\n      height: 64px;\n      border-radius: 50%;\n      perspective: 800px;\n\n\n    .inner {\n      position: absolute;\n      box-sizing: border-box;\n      width: 100%;\n      height: 100%;\n      border-radius: 50%;\n      border:1px solid cornflowerblue;\n    }\n    .inner.one {\n      left: 0%;\n      top: 0%;\n      animation: rotate-one 1s linear infinite;\n      border-bottom: 3px solid #EFEFFA;\n    }\n\n    .inner.two {\n      right: 0%;\n      top: 0%;\n      animation: rotate-two 1s linear infinite;\n      border-right: 3px solid #EFEFFA;\n    }\n\n    .inner.three {\n      right: 0%;\n      bottom: 0%;\n      animation: rotate-three 1s linear infinite;\n      border-top: 3px solid #EFEFFA;\n    }\n\n    @keyframes rotate-one {\n      0% {\n        transform: rotateX(35deg) rotateY(-45deg) rotateZ(0deg);\n      }\n      100% {\n        transform: rotateX(35deg) rotateY(-45deg) rotateZ(360deg);\n      }\n    }\n\n    @keyframes rotate-two {\n      0% {\n        transform: rotateX(50deg) rotateY(10deg) rotateZ(0deg);\n      }\n      100% {\n        transform: rotateX(50deg) rotateY(10deg) rotateZ(360deg);\n      }\n    }\n\n    @keyframes rotate-three {\n      0% {\n        transform: rotateX(35deg) rotateY(55deg) rotateZ(0deg);\n      }\n      100% {\n        transform: rotateX(35deg) rotateY(55deg) rotateZ(360deg);\n      }\n    }\n  "]);return M=function(){return t},t}var V=function(){var t=Object(F.a)(M());return Object(F.b)("div",{css:t},Object(F.b)("p",null," !INFINITE SCROLL!"),Object(F.b)("div",{className:"inner one"}),Object(F.b)("div",{className:"inner two"}),Object(F.b)("div",{className:"inner three"}))},W=Object(r.createContext)({selected:[],update:function(){}});function Q(){var t=Object(C.a)(["\n     border: 1px solid #007fc7;\n    "]);return Q=function(){return t},t}function $(){var t=Object(C.a)(["\n      font-weight: bold;\n      padding: 15px;\n      color: #007FC7;\n      font-size: 1.3em;\n    "]);return $=function(){return t},t}function K(){var t=Object(C.a)(["\n    padding:10px;\n    font-weight:600;\n    font-size:1.0em;\n    color:#4AC16C;"]);return K=function(){return t},t}function tt(){var t=Object(C.a)(["\n    padding:10px;\n    font-weight:600;\n    font-size:1.0em;\n    color:#E9C300;"]);return tt=function(){return t},t}function nt(){var t=Object(C.a)(["\n  padding-left: 15px;\n  font-family: Roboto;\n  font-size:1.1em;\n  color: #444;\n  "]);return nt=function(){return t},t}function et(){var t=Object(C.a)(["\n  margin-left: 25px;\n  color: grey;\n  "]);return et=function(){return t},t}var rt={InfiniteScroll:G},at=function(t){Object(T.a)(e,t);var n=Object(I.a)(e);function e(){var t;return Object(N.a)(this,e),(t=n.call(this)).scrollListener=t.scrollListener.bind(Object(z.a)(t)),t}return Object(L.a)(e,[{key:"componentDidMount",value:function(){window.addEventListener("scroll",this.scrollListener)}},{key:"componentWillUnmount",value:function(){window.removeEventListener("scroll",this.scrollListener)}},{key:"scrollListener",value:function(){this.props.searchResults.length&&!this.props.isLoading&&window.innerHeight+window.scrollY>=document.body.offsetHeight&&this.props.InfiniteScroll(this.props.filters,this.props.cursor)}},{key:"render",value:function(){var t=this.props.searchResults,n=this.props.active;return Object(F.b)("div",null,void 0!==t&&!t&&Object(F.b)("h3",null,"zero search results"),t&&t.map((function(t,e){return Object(F.b)(ot,{selected:n.includes(t.id),key:"result-".concat(e),topic:t})})),this.props.isLoading&&Object(F.b)(V,null))}}]),e}(r.Component);function ot(t){var n=t.topic,e=n.post.subject,r=Object(F.a)($()),a=Object(F.a)(Q());return Object(F.b)(W.Consumer,null,(function(o){var c=o.update;return Object(F.b)("div",{onClick:function(){c(n.id)}},Object(F.b)(_.a,{css:t.selected&&a,elevation:1,style:{marginLeft:"70px",marginRight:"70px",marginBottom:"20px",padding:"20px"}},function(t){var n=Object(F.a)(tt()),e=Object(F.a)(K()),r=t.tags,a=[],o=function(t){return Object(F.b)("span",{css:n},t.text)},c=function(t){return Object(F.b)("span",{css:e},t.text," +",t.hits)};return r.forEach((function(t){a.push(Object(F.b)(o,{key:"tags-".concat(t),text:t}))})),t["good-q"]&&a.push(Object(F.b)(c,{key:"good-question-".concat(t.created),text:"Good Question",hits:t["good-q"]})),t["good-a"]&&a.push(Object(F.b)(c,{key:"good-answer-".concat(t.created),text:"Good Answer",hits:t["good-a"]})),Object(F.b)("div",{style:{padding:"5px"}},a)}(n),n.summariez&&function(t,n){var e=Object(F.a)(et());return Object(F.b)("div",{css:e},Object.keys(t).map((function(e){return t[e].length?Object(F.b)(A,{key:"good-term-".concat(e,"-").concat(n),term:e}):Object(F.b)(D,{key:"missing-term-".concat(e,"-").concat(n),term:e})})))}(n.summariez,n.date),Object(F.b)("div",{dangerouslySetInnerHTML:{__html:e},css:r}),Object(F.b)("hr",null),n.summariez&&Object.keys(n.summariez).map((function(t){return function(t,n,e){var r=Object(F.a)(nt());return Object(F.b)("div",{key:"meta-result-".concat(t,"-").concat(e)},n[t].length?n[t].map((function(n,e){var a=n[0].replace(t,"<b>".concat(t,"</b>"));return Object(F.b)("span",{key:"".concat(t,"-result-").concat(e),css:r,dangerouslySetInnerHTML:{__html:"...".concat(a,"...")}})})):"")}(t,n.summariez,n.created)}))))}))}var ct=Object(l.b)((function(t){return{isLoading:x(t),searchResults:w(t),filters:y(t),cursor:m(t)}}),rt)(at),it=e(123),st=e(119),lt=e(121);function ut(){var t=Object(C.a)(['\n.tag{\n  width: auto;\n  color:rgba(0,0,0,0.2)\n  margin:10px;\n}\n&{\n  margin: 5px;\n}\nlabel{\n  width: auto;\n}\nspan{\n  width: auto;\n}\n@media (min-width: 768px) {\n  width: 80vw;\n  margin: auto;\n  padding: 50px;\n\n\n}\n\n\ninput[type="checkbox"]{\n     display: none;\n   }\n\n   .check-container{\n     display:flex;\n     position:relative;\n     width:200px;\n     height:auto;\n   }\n\n   input[type="checkbox"] + label{\n     z-index:15;\n     position:absolute;\n     left:0;\n     top:-1px;\n     bottom:10px;\n     right:10px;\n     transition:all 0.3s ease;\n     cursor:pointer;\n     width:15px;\n     border:3px solid #666;\n    //  border-radius:50%;\n     height:15px;\n   }\n\n   .tag{\n     margin-left:40px;\n   }\n\n   input[type="checkbox"]:checked + label{\n     z-index:15;\n     display:inline-block;\n     transform:rotate(-50deg) translate(5px,-9px);\n     transition:all 0.3s ease;\n     width:20px;\n     border-radius:0%;\n     border-top-color:transparent;\n      border-right-color:transparent;\n      border-bottom-color:#2ecc71;\n      border-left-color:transparent;\n     height:20px;\n   }\n\n\n   input[type="checkbox"]:checked + label:before{\n     content:"";\n     position:absolute;\n     right:0;\n     bottom:-3px;\n     width:100%;\n     height:15px;\n     border-left:4px solid #2ecc7a;\n   }\n']);return ut=function(){return t},t}function dt(){var t=Object(C.a)(["font-weight:400;font-size:20px;"]);return dt=function(){return t},t}function bt(){var t=Object(C.a)(["alignment-baseline:center;flex:1;padding:5px;"]);return bt=function(){return t},t}function pt(){var t=Object(C.a)(["flex:11;alignment-baseline:center;"]);return pt=function(){return t},t}function ft(){var t=Object(C.a)(["display:flex;width:100%;"]);return ft=function(){return t},t}function ht(){var t=Object(C.a)(["display:flex; justify-content: space-between"]);return ht=function(){return t},t}function gt(){var t=Object(C.a)(["width: auto;"]);return gt=function(){return t},t}function Ot(){var t=Object(C.a)(["\n    @media (max-width: 768px) {\n      position: sticky;\n      top: 0;\n      overflow:hidden;\n      transition: width 1s;\n      display: block;\n      z-index: 5;\n      position: absolute;\n      background-color: Beige;\n      font-size: 32px;\n      width: ",";\n      height: 100vh;\n      overflow: scroll;\n        &::before{\n          content: \u2630\n        }\n      }\n    }"]);return Ot=function(){return t},t}function jt(){var t=Object(C.a)(["\n  margin: 5px;\n  font-size:1.2vw;\n  display:inline-block;\n  &.li{\n    color:red;\n    text-decoration: none;\n  }\n  &.selected{\n    color:red;\n    background-color: LemonChiffon;\n  }\n  @media (max-width: 768px){\n    font-size:25px;\n\n    margin: 10px 0 10px 0;\n      &:hover{\n        background-color: LemonChiffon;\n      }\n    }\n  }\n  "]);return jt=function(){return t},t}function mt(){var t=Object(C.a)(["\n    height:2vw;\n    width:90%;\n    font-size:1.90vw;\n    font-weight:800;\n    color:#2ecc7a;\n    padding:15px;\n    border-radius:30px;\n    background-color:rgba(0,0,0,0.0);\n    border:01px solid rgba(0,0,0,0.4);\n    box-shadow:2px 2px #00000025;\n    &:active,\n    &:focus{\n      outline:none;\n      background-color:rgba(0,0,0,0.05);\n    }\n  "]);return mt=function(){return t},t}function vt(){var t=Object(C.a)(["\n  display: flex;\n  @media (max-width: 768px) {\n    display: block;\n  }\n"]);return vt=function(){return t},t}function xt(){var t=Object(C.a)(["\n  display: none;\n  @media (max-width: 768px) {\n    display: block;\n    font-size: 32px;\n    cursor: pointer;\n    &:hover{\n      background-color: LemonChiffon;\n    }\n}"]);return xt=function(){return t},t}function wt(){var t=Object(C.a)(["\n  display: flex;\n  flex-wrap: wrap;\n  padding-top: 25px;\n  width: 100%;\n  @media (max-width: 768px) {\n    width:100%;\n  }\n "]);return wt=function(){return t},t}var yt=Object(F.a)(wt()),kt=Object(F.a)(xt()),St=Object(F.a)(vt());var Et=function(t){var n=a.a.useState(!1),e=Object(k.a)(n,2),r=e[0],o=e[1],c=Object(F.a)(mt()),i=Object(F.a)(jt()),s=Object(F.a)(Ot(),r?"80vw":"0px"),l=function(n){t.updateFilter(Object(d.a)(Object(d.a)({},t.filters),{},{tags:n}))},u=function(n,e){var r=Object(d.a)({},t.filters);r[n]=e,t.updateFilter(r)};return Object(F.b)("div",{css:Object(F.a)(gt())},!r&&Object(F.b)("div",{css:kt,onClick:function(){return o(!r)}},Object(F.b)("i",{className:"fa"},"\u2630")),Object(F.b)("div",{className:"contents"},Object(F.b)("div",{className:"inner",css:s},Object(F.b)("div",{css:St},Object(F.b)("div",{css:Object(F.a)(ht())},Object(F.b)(a.a.Fragment,null),Object(F.b)("div",{css:kt,onClick:function(){return o(!r)}},"\u276e"))),Object(F.b)("div",{id:"search-filter-box",css:Ct},Object(F.b)("div",{css:Object(F.a)(ft())},Object(F.b)("div",{css:Object(F.a)(pt()),onClick:function(t){t.stopPropagation()}},Object(F.b)("label",{htmlFor:"search-text"},Object(F.b)("input",{type:"text",placeholder:"help clarification tip",css:c,value:t.filters.searchText,onChange:function(n){var e;e=n.target.value,t.updateFilter(Object(d.a)(Object(d.a)({},t.filters),{},{searchText:e}))}}))),Object(F.b)("div",{css:Object(F.a)(bt())},t.loading?Object(F.b)(st.a,null):Object(F.b)(lt.a,{size:"large",variant:"outlined",onClick:function(){t.SearchSequence(t.filters),o(!r)}},"Search"))),Object(F.b)("div",{id:"misc-container",css:yt},Object(F.b)("div",{style:{cursor:"pointer"},key:"Instructor has answered",className:"check-container",css:i},Object(F.b)("input",{type:"checkbox",id:"Instructor has answered",checked:t.filters["Instructor has answered"],onChange:function(){u("Instructor has answered",!t.filters["Instructor has answered"])}}),Object(F.b)("label",{htmlFor:"Instructor has answered"}),Object(F.b)("div",{onClick:function(){u("Instructor has answered",!t.filters["Instructor has answered"])},className:"tag"},"Instructor has answered")),Object(F.b)("div",{style:{cursor:"pointer"},key:"Student has answered",className:"check-container",css:i},Object(F.b)("input",{type:"checkbox",id:"Student has answered",checked:t.filters["Student has answered"],onChange:function(){u("Student has answered",!t.filters["Student has answered"])}}),Object(F.b)("label",{htmlFor:"Student has answered"}),Object(F.b)("div",{onClick:function(){u("Student has answered",!t.filters["Student has answered"])},className:"tag"},"Student has answered"))),Object(F.b)("h3",{css:Object(F.a)(dt())},"Folders "),Object(F.b)("div",{id:"tags-list",css:yt},Object.keys(t.filters.tags).map((function(n){return Object(F.b)("div",{style:{cursor:"pointer"},key:"tag-check-".concat(n),className:"check-container",css:i},Object(F.b)("input",{type:"checkbox",id:"tag-".concat(n),checked:t.filters.tags[n],onChange:function(){var e=t.filters.tags;e[n]=!e[n],l(e)}}),Object(F.b)("label",{htmlFor:"tag-".concat(n)}),Object(F.b)("div",{onClick:function(){var e=t.filters.tags;e[n]=!e[n],l(e)},className:"tag"},n))}))),Object(F.b)("div",null)))))},Ct=Object(F.a)(ut()),Nt={SearchSequence:function(t){return function(n){n({type:"FETCHING"});var e=JSON.parse(JSON.stringify(t)),r=[];Object.keys(e.tags).forEach((function(t){e.tags[t]&&r.push(t)})),e.tags=r.join(","),H.a.get("".concat("/api/search","?").concat(B.a.stringify(e)),{headers:{"Content-Type":"application/x-www-form-urlencoded;charset=utf-8"}}).then((function(t){if(200===t.status)return n(Y(t.status,t.data)),void(t.data.results.length<15&&n(G(e,t.data.cursor)));400===t.status||404===t.status?this.reject({code:t.status,message:P["".concat(t.status)]}):this.reject({code:t.status,message:t})})).catch((function(t){console.log("\n\n\t".concat(JSON.stringify(t),"\n")),n(Y(500,[]))}))}},set_filter:function(t){return{type:b,filter:t}}},Lt=Object(l.b)((function(t){return{isLoading:v(t),filters:y(t)}}),Nt)((function(t){var n=t.isLoading,e=t.filters;return a.a.createElement("div",null,n&&a.a.createElement(it.a,null),a.a.createElement(Et,{loading:t.isLoading,filters:e,SearchSequence:t.SearchSequence,updateFilter:t.set_filter}))}));function zt(){var t=Object(C.a)(["\n    background-color: #A0A0A0;\n    text-color: #fff;\n    padding:10px;\n    border-radius: 25%;\n      position: fixed;\n      top: 30px;\n      right: 0px;\n      a{\n        text-decoration: none;\n      }\n    "]);return zt=function(){return t},t}var Tt=function(t){var n=Object(F.a)(zt());return t.selected.length?Object(F.b)("div",{css:n},Object(F.b)(i.b,{to:"/details"},"View details ",Object(F.b)("br",null),"of ",t.selected.length," posts!")):Object(F.b)("div",null)},It=function(t){return a.a.createElement("div",{className:"SearchContainer"},a.a.createElement(Lt,null),a.a.createElement(E.a,{variant:"middle"}),a.a.createElement(W.Consumer,null,(function(t){var n=t.selected;return a.a.createElement("div",null,a.a.createElement(Tt,{selected:n}),a.a.createElement(ct,{active:n}))})))};function Ft(){var t=Object(C.a)(['\n\n.tag{\n  color: orange;\n}\n.reply {\n  padding: 15px 15px 15px 10px;\n  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);\n  margin-bottom: 10px;\n}\n.followup::before {\n  content: "|";\n  margin-right:10px;\n  font-size: 200%;\n}\n.followup {\n  padding-left: 15px;\n}\n\n.question-subject{\n  font-size:200%;\n  font-stretch: 150%;\n}\n\n']);return Ft=function(){return t},t}var _t=Object(F.a)(Ft());function Rt(){var t=Object(C.a)(["\n      position: fixed;\n      top: 0px;\n      width:100vw;\n      height: 15px;\n\n      a{\n        text-decoration: none;\n      }\n    "]);return Rt=function(){return t},t}function qt(){var t=Object(C.a)(['\n    position: relative;\n    display: inline-block;\n    left: 40%;\n\n    p{\n      background-color: rgba(216,216,216,0.2)\n    }\n\n\n   .tooltiptext {\n    visibility: hidden;\n    width: 140px;\n    background-color: #555;\n    color: #fff;\n    text-align: center;\n    border-radius: 6px;\n    padding: 5px;\n    position: absolute;\n     top: 150%;\n    left: 50%;\n    margin-left: -75px;\n    opacity: 0;\n    transition: opacity 0.3s;\n  }\n\n  .tooltiptext::before {\n    content: "";\n    position: absolute;\n    bottom: 100%;\n    left: 50%;\n    margin-left: -5px;\n    border-width: 5px;\n    border-style: solid;\n    border-color: #555 transparent transparent transparent;\n  }\n\n  &:hover .tooltiptext {\n    visibility: visible;\n    opacity: 1;\n  }\n  ']);return qt=function(){return t},t}function Dt(){var t=Object(C.a)(["\n  position: absolute;\n  left: -9999px;\n  "]);return Dt=function(){return t},t}var At=function(t){var n=Object(F.a)(Dt()),e=Object(F.a)(qt()),r=Object(F.a)(Rt());if(!t.ids.length)return Object(F.b)("div",null);window.return(Object(F.b)("div",{css:r},Object(F.b)("input",{type:"text",readOnly:!0,css:n,value:"".concat(window.location.protocol,"//").concat(window.location.host,"/render/posts?dump=").concat(t.ids.join(",")),id:"myInput"}),Object(F.b)(lt.a,{type:"button",onClick:function(){var t=document.getElementById("myInput");t.select(),t.setSelectionRange(0,99999),document.execCommand("copy"),document.getElementById("myTooltip").textContent="Copied!",console.log("copied!")},css:e},Object(F.b)("p",null,"Share ",Object(F.b)("br",null)," ",t.ids.length," posts with a friend!"),Object(F.b)("span",{className:"tooltiptext",id:"myTooltip"},"Copy to clipboard"))))},Jt={DetailsJsonSearchSequence:function(t){return function(n){n({type:"FETCHING"}),H.a.get("/api/json-details?dump=".concat(t.join(","))).then((function(t){200!==t.status?this.reject({code:t.status,message:t}):n(function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:500,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];return{type:h,status:t,data:n}}(t.status,t.data.dump))})).catch((function(t){console.log("\n\n\t".concat(JSON.stringify(t),"\n")),n([])}))}}},Ht=function(t){Object(T.a)(e,t);var n=Object(I.a)(e);function e(){return Object(N.a)(this,e),n.apply(this,arguments)}return Object(L.a)(e,[{key:"componentDidMount",value:function(){this.props.ids.length&&this.props.ids.length!==this.props.details.length&&this.props.DetailsJsonSearchSequence(this.props.ids)}},{key:"renderDetails",value:function(){return Object(F.b)("div",{css:_t},this.props.details.length>0&&this.props.details.map((function(t,n){return Object(F.b)("div",{key:"post-#-".concat(n),className:"post-card"},t.tags.map((function(t,e){return Object(F.b)("span",{key:"post-".concat(n,"-tag-").concat(e),className:"tag"},t)})),Object(F.b)("p",{className:"question-subject"},t.post.subject),Object(F.b)("p",{className:"question-content"},t.post.content),Object(F.b)("h6",null,"Replies"),t.replies.map((function(t,e){return Object(F.b)("div",{key:"post-".concat(n,"-reply-").concat(e),className:"reply"},Object(F.b)("p",null,t.reply),t.followups.length>0&&Object(F.b)("h6",null,"Followups"),t.followups.length>0&&t.followups.map((function(t,r){return Object(F.b)("p",{key:"post-".concat(n,"-reply-").concat(e,"-followup-").concat(r),className:"followup"},t.reply)})))})),Object(F.b)("hr",null))})))}},{key:"render",value:function(){var t=this.props,n=t.isLoading,e=t.ids;return Object(F.b)("div",{className:"DetailsListContainer"},n&&Object(F.b)(it.a,null),Object(F.b)(lt.a,{type:"button"},Object(F.b)(i.b,{to:"/",style:{zIndex:5}},"Back To Search")),Object(F.b)(At,{ids:e}),Object(F.b)(E.a,{variant:"middle"}),!n&&this.renderDetails())}}]),e}(r.Component),Xt=Object(l.b)((function(t){return{isLoading:v(t),details:j(t)}}),Jt)(Ht);var Bt=function(){var t=Object(r.useState)([]),n=Object(k.a)(t,2),e=n[0],o=n[1];return a.a.createElement(W.Provider,{value:{selected:e,update:function(t){var n=[];if(e.includes(t)){for(var r=0;r<e.length;r++)e[r]!==t&&n.push(e[r]);o(n)}else(n=JSON.parse(JSON.stringify(e))).push(t),o(n)}}},a.a.createElement("div",{style:{fontFamily:"Roboto"}},a.a.createElement(S.a,{exact:!0,path:"/"},a.a.createElement(It,null)),a.a.createElement(S.a,{exact:!0,path:"/details"},a.a.createElement(Xt,{ids:e}))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var Pt,Ut=window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__();Pt=void 0!==Ut?Object(s.e)(O,Object(s.d)(Object(s.a)(u.a),Ut)):Object(s.e)(O,Object(s.a)(u.a)),c.a.render(a.a.createElement(a.a.StrictMode,null,a.a.createElement(l.a,{store:Pt},a.a.createElement(i.a,null,a.a.createElement(Bt,null)))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()})).catch((function(t){console.error(t.message)}))},64:function(t,n,e){t.exports=e(105)},73:function(t,n,e){},74:function(t,n,e){}},[[64,1,2]]]);
//# sourceMappingURL=main.94cc7d11.chunk.js.map