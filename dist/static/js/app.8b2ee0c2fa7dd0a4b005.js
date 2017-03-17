webpackJsonp([1,2],{111:function(e,s,t){"use strict";var a=t(1),n=t(122),r=t(118),i=t.n(r),o=t(121),c=t.n(o);a.a.use(n.a),a.a.use(c.a),s.a=new n.a({routes:[{path:"/",name:"Hello",component:i.a,children:[{path:"search/:query",name:"Search"},{path:"message/:timestamp",name:"Message"}]}]})},112:function(e,s,t){t(116);var a=t(110)(t(113),t(120),null,null);e.exports=a.exports},113:function(e,s,t){"use strict";Object.defineProperty(s,"__esModule",{value:!0}),s.default={name:"app"}},114:function(e,s,t){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var a=t(0),n=t.n(a);s.default={name:"hello",mounted:function(){var e=this;this.$http.get("/users").then(function(s){e.users=s.body.map(function(e){return e.user_name}),e.loading=!1}),this.$http.get("/channels").then(function(s){e.channels=s.body.map(function(e){return e.channel_name})}),"Search"===this.$route.name&&(this.searchTerm=decodeURIComponent(this.$route.params.query),this.search()),"Message"===this.$route.name&&this.expandMessage({timestamp:this.$route.params.timestamp})},watch:{searchTerm:function(e,s){e!==s&&(this.userSuggestions=[],this.channelSuggestions=[]);var t=/@([^\s]+)/,a=/from:/,n=t.exec(e),r=a.exec(e);if(null!==n&&null===r){var i=n[1];this.userSuggestions=this.users.filter(function(e){return null!==new RegExp(i).exec(e)})}var o=/#([^\s]+)/,c=/in:/,l=o.exec(e),u=c.exec(e);if(null!==l&&null===u){var h=l[1];this.channelSuggestions=this.channels.filter(function(e){return null!==new RegExp(h).exec(e)})}}},data:function(){return{loading:!0,searchTerm:"",resultsForTerm:"",messages:[],users:[],channels:[],userSuggestions:[],channelSuggestions:[]}},filters:{dateFormat:function(e){var s=1e3*parseFloat(e);return n()(s).format("MM/DD/YY h:mm A")}},methods:{parseMessage:function(e){if(""===e.text)return e.hide=!0,e;e.channel_link="slack://channel?id="+e.channel_id+"&team="+e.team_id,e.user_link="slack://user?team="+e.team_id+"&id="+e.user_id,e.text=e.text.replace(/^<@[A-Z0-9]*\|.* uploaded a file:/,"");var s=/<(.*)\|.*>( and commented:)?/,t=s.exec(e.text);if(null!==t){var a=t[1];e.image_link=a;var n=a.replace(/^.*.slack.com\/files\/[^\/]*\//,"");e.image_src="https://files.slack.com/files-pri/"+e.team_id+"-"+n}return e.text=e.text.replace(s,""),e},sortMessages:function(e,s){return parseFloat(e.timestamp)-parseFloat(s.timestamp)},expandMessage:function(e){var s=this;this.loading=!0;var t={params:{t:e.timestamp}};this.$router.push({path:"/message/"+e.timestamp}),this.$http.get("/findByTimestamp",t).then(function(t){var a=t.body.map(s.parseMessage).sort(s.sortMessages);s.messages=a.map(function(s){return s.timestamp===e.timestamp&&(s.expanded=!0),s}),s.resultsForTerm="",s.loading=!1})},pickSuggestedUser:function(e){this.userSuggestions=[],this.searchTerm="from:@"+e},pickSuggestedChannel:function(e){this.channelSuggestions=[],this.searchTerm="in:#"+e},search:function(){var e=this;if(""!==this.searchTerm){this.loading=!0;var s=/from:@?([^\s]*)/,t=/in:#?([^\s]*)/,a=s.exec(this.searchTerm),n=null!==a?a[1]:null,r=t.exec(this.searchTerm),i=null!==r?r[1]:null,o=this.searchTerm.replace(s,"").replace(t,"").trim(),c={params:{}};null!==n&&(c.params.u=n),null!==i&&(c.params.c=i),""!==o&&(c.params.q=o),this.$router.push({path:"/search/"+encodeURIComponent(this.searchTerm)}),this.$http.get("/messages",c).then(function(s){e.resultsForTerm=e.searchTerm,e.messages=s.body.map(e.parseMessage).sort(e.sortMessages),e.loading=!1},function(s){alert("Something went wrong :("),e.loading=!1})}}}}},115:function(e,s){},116:function(e,s){},117:function(e,s,t){function a(e){return t(n(e))}function n(e){var s=r[e];if(!(s+1))throw new Error("Cannot find module '"+e+"'.");return s}var r={"./af":2,"./af.js":2,"./ar":8,"./ar-dz":3,"./ar-dz.js":3,"./ar-ly":4,"./ar-ly.js":4,"./ar-ma":5,"./ar-ma.js":5,"./ar-sa":6,"./ar-sa.js":6,"./ar-tn":7,"./ar-tn.js":7,"./ar.js":8,"./az":9,"./az.js":9,"./be":10,"./be.js":10,"./bg":11,"./bg.js":11,"./bn":12,"./bn.js":12,"./bo":13,"./bo.js":13,"./br":14,"./br.js":14,"./bs":15,"./bs.js":15,"./ca":16,"./ca.js":16,"./cs":17,"./cs.js":17,"./cv":18,"./cv.js":18,"./cy":19,"./cy.js":19,"./da":20,"./da.js":20,"./de":22,"./de-at":21,"./de-at.js":21,"./de.js":22,"./dv":23,"./dv.js":23,"./el":24,"./el.js":24,"./en-au":25,"./en-au.js":25,"./en-ca":26,"./en-ca.js":26,"./en-gb":27,"./en-gb.js":27,"./en-ie":28,"./en-ie.js":28,"./en-nz":29,"./en-nz.js":29,"./eo":30,"./eo.js":30,"./es":32,"./es-do":31,"./es-do.js":31,"./es.js":32,"./et":33,"./et.js":33,"./eu":34,"./eu.js":34,"./fa":35,"./fa.js":35,"./fi":36,"./fi.js":36,"./fo":37,"./fo.js":37,"./fr":40,"./fr-ca":38,"./fr-ca.js":38,"./fr-ch":39,"./fr-ch.js":39,"./fr.js":40,"./fy":41,"./fy.js":41,"./gd":42,"./gd.js":42,"./gl":43,"./gl.js":43,"./he":44,"./he.js":44,"./hi":45,"./hi.js":45,"./hr":46,"./hr.js":46,"./hu":47,"./hu.js":47,"./hy-am":48,"./hy-am.js":48,"./id":49,"./id.js":49,"./is":50,"./is.js":50,"./it":51,"./it.js":51,"./ja":52,"./ja.js":52,"./jv":53,"./jv.js":53,"./ka":54,"./ka.js":54,"./kk":55,"./kk.js":55,"./km":56,"./km.js":56,"./ko":57,"./ko.js":57,"./ky":58,"./ky.js":58,"./lb":59,"./lb.js":59,"./lo":60,"./lo.js":60,"./lt":61,"./lt.js":61,"./lv":62,"./lv.js":62,"./me":63,"./me.js":63,"./mi":64,"./mi.js":64,"./mk":65,"./mk.js":65,"./ml":66,"./ml.js":66,"./mr":67,"./mr.js":67,"./ms":69,"./ms-my":68,"./ms-my.js":68,"./ms.js":69,"./my":70,"./my.js":70,"./nb":71,"./nb.js":71,"./ne":72,"./ne.js":72,"./nl":74,"./nl-be":73,"./nl-be.js":73,"./nl.js":74,"./nn":75,"./nn.js":75,"./pa-in":76,"./pa-in.js":76,"./pl":77,"./pl.js":77,"./pt":79,"./pt-br":78,"./pt-br.js":78,"./pt.js":79,"./ro":80,"./ro.js":80,"./ru":81,"./ru.js":81,"./se":82,"./se.js":82,"./si":83,"./si.js":83,"./sk":84,"./sk.js":84,"./sl":85,"./sl.js":85,"./sq":86,"./sq.js":86,"./sr":88,"./sr-cyrl":87,"./sr-cyrl.js":87,"./sr.js":88,"./ss":89,"./ss.js":89,"./sv":90,"./sv.js":90,"./sw":91,"./sw.js":91,"./ta":92,"./ta.js":92,"./te":93,"./te.js":93,"./tet":94,"./tet.js":94,"./th":95,"./th.js":95,"./tl-ph":96,"./tl-ph.js":96,"./tlh":97,"./tlh.js":97,"./tr":98,"./tr.js":98,"./tzl":99,"./tzl.js":99,"./tzm":101,"./tzm-latn":100,"./tzm-latn.js":100,"./tzm.js":101,"./uk":102,"./uk.js":102,"./uz":103,"./uz.js":103,"./vi":104,"./vi.js":104,"./x-pseudo":105,"./x-pseudo.js":105,"./yo":106,"./yo.js":106,"./zh-cn":107,"./zh-cn.js":107,"./zh-hk":108,"./zh-hk.js":108,"./zh-tw":109,"./zh-tw.js":109};a.keys=function(){return Object.keys(r)},a.resolve=n,e.exports=a,a.id=117},118:function(e,s,t){t(115);var a=t(110)(t(114),t(119),"data-v-6a910cd0",null);e.exports=a.exports},119:function(e,s){e.exports={render:function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("div",{staticClass:"hello"},[0!==e.users.length||e.loading?t("div",[t("input",{directives:[{name:"model",rawName:"v-model",value:e.searchTerm,expression:"searchTerm"}],staticClass:"search-box",attrs:{placeholder:"Search for... e.g. #my-channel or @gooduser"},domProps:{value:e.searchTerm},on:{keyup:function(s){if(!("button"in s)&&13!==s.keyCode)return null;e.search(s)},input:function(s){s.target.composing||(e.searchTerm=s.target.value)}}}),e._v(" "),t("button",{staticClass:"search-button",attrs:{disabled:""===e.searchTerm},on:{click:e.search}},[e._v("\n      Search\n    ")]),e._v(" "),e.userSuggestions.length>0?t("ul",{staticClass:"auto-suggest"},e._l(e.userSuggestions,function(s){return t("li",{staticClass:"suggestion",on:{click:function(t){e.pickSuggestedUser(s)}}},[e._v("\n        @"+e._s(s)+"\n      ")])})):e._e(),e._v(" "),e.channelSuggestions.length>0?t("ul",{staticClass:"auto-suggest"},e._l(e.channelSuggestions,function(s){return t("li",{staticClass:"suggestion",on:{click:function(t){e.pickSuggestedChannel(s)}}},[e._v("\n        #"+e._s(s)+"\n      ")])})):e._e()]):t("div",[e._m(0)]),e._v(" "),0===e.messages.length&&""==e.resultsForTerm&&"Message"!==e.$route.name?t("div",[t("br"),e._v(" "),t("h2",[e.loading?e._e():t("span",[e._v("\n        Nothing to show yet, start searching\n      ")]),e._v(" "),e.loading?t("span",[e._v("\n        Loading...\n      ")]):e._e()])]):e._e(),e._v(" "),0!==e.messages.length||e.loading||""===e.resultsForTerm||"Message"===e.$route.name?e._e():t("div",{staticClass:"results"},[t("div",{staticClass:"desc"},[e._v("No results for '"+e._s(e.resultsForTerm)+"'")])]),e._v(" "),e.messages.length>0&&!e.loading?t("div",{staticClass:"results"},["Message"!==e.$route.name?t("div",{staticClass:"desc"},[e._v("\n      Results for '"+e._s(e.resultsForTerm)+"':\n    ")]):e._e(),e._v(" "),t("ul",e._l(e.messages,function(s){return s.hide?e._e():t("li",{staticClass:"message",class:{expanded:s.expanded}},[t("div",{staticClass:"details"},[t("span",{staticClass:"user"},[t("a",{attrs:{href:s.user_link}},[e._v("@"+e._s(s.user_name))])]),e._v(" "),t("span",{staticClass:"channel"},[t("a",{attrs:{href:s.channel_link}},[e._v("#"+e._s(s.channel_name))])]),e._v(" "),t("span",{staticClass:"timestamp"},[t("button",{staticClass:"expand-button",on:{click:function(t){e.expandMessage(s)}}},[e._v("\n              "+e._s(e._f("dateFormat")(s.timestamp))+"\n            ")])])]),e._v(" "),null!==s.image_src?t("a",{attrs:{href:s.image_link,target:"_blank"}},[t("img",{attrs:{src:s.image_src}})]):e._e(),e._v(" "),t("span",{staticClass:"text"},[e._v(e._s(s.text))])])}))]):e._e()])},staticRenderFns:[function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("div",{staticClass:"results"},[t("div",{staticClass:"instructions-container"},[t("h2",[e._v("Getting Set Up")]),e._v(" "),t("ul",{staticClass:"instructions"},[t("li",[e._v("Set up a free "),t("a",{attrs:{target:"_blank",href:"https://stitchdata.com/signup"}},[e._v(" Stitch account ")]),e._v(" to sync data to your heroku postgres account")]),e._v(" "),t("li",[e._v("Once you've logged into Stitch, create a webhook integration. "),t("b",[e._v('Please note, you have to name the integration "Stitch" for this app to work correctly')]),e._v(", and make sure to note the webhook url, and copy it. ")]),e._v(" "),t("li",[e._v(" You'll get taken to the Destination page next. Make sure to leave this tab open for later.")]),e._v(" "),t("li",[e._v(" Open up your Slack group settings and head to "),t("code",[e._v(" menu / Configure Apps / Custom Integrations / Outgoing Webhooks")]),e._v(". ")]),e._v(" "),t("li",[e._v(' Click "Add A Configuration" and confirm. Scroll down and choose the channel you\'d like to set up. You can add more channels later by setting up more webhooks. Add the webhook url you copied earlier from Stitch in the "URL(s)" section. Scroll down and click "Save Settings"')]),e._v(" "),t("li",[e._v("Now you'll need to add your Heroku Postgres to Stitch, so it can load the messages. Head to this app's repository in your Heroku account. On the Overview tab for this app, you'll see the Heroku Postgres add-on listed. Click on it.")]),e._v(" "),t("li",[e._v('Scroll down, and click the "View Credentials" button. Copy over the relevant sections into the Stitch destination page, and click "Save Destination" in Stitch."')])]),e._v(" "),t("p",[t("b",[e._v("And, you're done!")]),e._v(" After a few messages have gone through, you'll be able to search and view them here. ")])])])}]}},120:function(e,s){e.exports={render:function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("div",{attrs:{id:"app"}},[e._m(0),e._v(" "),e._m(1),e._v(" "),t("h2",[e._v("Search your entire archive, even if you have a free account.")]),e._v(" "),t("router-view")],1)},staticRenderFns:[function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("a",{attrs:{href:"https://github.com/shaunymca/ephemeraltoeternal",target:"_blank"}},[t("img",{staticStyle:{position:"absolute",top:"0",right:"0",border:"0"},attrs:{src:"https://camo.githubusercontent.com/365986a132ccd6a44c23a9169022c0b5c890c387/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f7265645f6161303030302e706e67",alt:"Fork me on GitHub","data-canonical-src":"https://s3.amazonaws.com/github/ribbons/forkme_right_red_aa0000.png"}})])},function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("h1",[t("a",{attrs:{href:"/"}},[e._v("ephemeral → eternal")])])}]}},126:function(e,s){},127:function(e,s,t){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var a=t(1),n=t(112),r=t.n(n),i=t(111);a.a.config.productionTip=!1,new a.a({el:"#app",router:i.a,template:"<App/>",components:{App:r.a}})}},[127]);
//# sourceMappingURL=app.8b2ee0c2fa7dd0a4b005.js.map