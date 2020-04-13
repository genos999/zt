<template>
	<div id="main">
		<div class="logo">
			<img src="img/logo.png">
		</div>
		<div class="cent">
			<div class="rank">
				<div class="title">排行榜</div>
				<div class="aleft">
					<div class="tab">
						<span v-for="(t,i) in tab" :key='i' v-text="t" @click="act=i+1" :class="act==i+1?'active':''"></span>
					</div>
					<div class="tabCon">
						<div v-if="act==1" v-cloak>
							<ul>
								<li v-for="(t,i) in guest" :key='i'>
									<span v-text='i+1'></span>
									<span><img :src="t.ico"></span>
									<span v-text='t.name'></span>
									<span v-text='t.pri'></span>
								</li>
							</ul>
						</div>
						<div v-else-if="act==2" v-cloak>
							<ul>
								<li v-for="(t,i) in pro" :key='i'>
									<span v-text='i+1'></span>
									<span><img :src="t.ico"></span>
									<span v-text='t.name'></span>
									<span v-text='t.pri'></span>
								</li>
							</ul>
						</div>
						<div v-else v-cloak>
							<ul>
								<li v-for="(t,i) in audience" :key='i'>
									<span v-text='i+1'></span>
									<span><img :src="t.ico"></span>
									<span v-text='t.name'></span>
									<span v-text='t.pri'></span>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
			<div class="player">
				<div class="title">
					<div class="t1">
						<img src="img/icon.png">
						<span v-text="vid.tit" v-cloak></span>
					</div>
					<div class="t2">
						<img src="img/person.png">
						<span v-text='vid.num' v-cloak></span>
					</div>
				</div>
				<div class="acenter">
					<video muted id='videomv' class="video-js vjs-default-skin vjs-big-play-centered vjs-16-9" controls allowfullscreen="true">
			            <!-- <source :src="video"> -->
			        </video>
			        <!-- <vue-baberrage
					   :isShow= "barrageIsShow"
					   :barrageList = "barrageList"
					   :loop = "barrageLoop"
					   >
					</vue-baberrage> -->
					<div class="control">
						<div class="left">
							<img :src="share==0?'img/share.png':'img/share_on.png'" @mouseover="share=1" @mouseout="share=0" @click="shareshow">
							<img :src="phone==0?'img/phone.png':'img/phone_on.png'" @mouseover="phone=1" @mouseout="phone=0" @click="phoneshow">
							<img src="img/full.png" @click="fullscreen">
						</div>
						<div class="right">
							<img class="img" src="img/msg.png" @click="promsy">
							<img class="img" src="img/zan.png" @click="dogift">
							<span class="span">弹幕</span>
							<input id="check" type="checkbox" ref="check">
        					<label class="label" for="check" @click="check($event)"></label>
							<div class="proms" v-if="proms" v-cloak>
								<p>互动申请</p>
								<p class="form"><input type="text" placeholder="请输入你的名字"></p>
								<p class="form"><input type="text" placeholder="请输入你的单位"></p>
								<p class="form"><input type="text" placeholder="请输入你的电话"></p>
								<p class="form"><textarea placeholder="申请内容"></textarea></p>
								<button>提交申请</button>
								<a href="javascript:;" @click="proms=false"></a>
							</div>
							<div class="gift" v-if="zan" v-cloak>
								<div>
									<div class="giftit">
										<span @click="gifshow=1;divIndex=-1;items.price=0;" :class="gifshow==1?'active':''">礼物1</span>
										<span @click="gifshow=2;divIndex=-1;items.price=0;;" :class="gifshow==2?'active':''">礼物2</span>
										<span @click="gifshow=3;divIndex=-1;items.price=0;;" :class="gifshow==3?'active':''">礼物3</span>
										<span @click="gifshow=4;divIndex=-1;items.price=0;;" :class="gifshow==4?'active':''">礼物4</span>
										<span @click="gifshow=5;divIndex=-1;items.price=0;;" :class="gifshow==5?'active':''">礼物5</span>
									</div>
									<div class="gifmain">
										<li v-for="(g,i) in gifs1" v-if="gifshow==1" @click="dopostmer(g,$event,i)" :class="divIndex==i?'active':''" v-cloak>
											<img :src="g.icon">
											<span>{{g.name}}<em>￥ {{g.price}}E</em></span>
											<span class="bak" v-if="divIndex==i?show:!show">
												<img src="img/plus.png" @click="changeNum('1')">
												<input type="text" v-model="num">
												<img src="img/pus.png" @click="changeNum('-1')">
											</span>
										</li>
										<li v-for="(g,i) in gifs2" v-if="gifshow==2" @click="dopostmer(g,$event,i)" :class="divIndex==i?'active':''" v-cloak>
											<img :src="g.icon">
											<span>{{g.name}}<em>￥ {{g.price}}E</em></span>
											<span class="bak" v-if="divIndex==i?show:!show">
												<img src="img/plus.png" @click="changeNum('1')">
												<input type="text" v-model="num">
												<img src="img/pus.png" @click="changeNum('-1')">
											</span>
										</li>
										<li v-for="(g,i) in gifs3" v-if="gifshow==3" @click="dopostmer(g,$event,i)" :class="divIndex==i?'active':''" v-cloak>
											<img :src="g.icon">
											<span>{{g.name}}<em>￥ {{g.price}}E</em></span>
											<span class="bak" v-if="divIndex==i?show:!show">
												<img src="img/plus.png" @click="changeNum('1')">
												<input type="text" v-model="num">
												<img src="img/pus.png" @click="changeNum('-1')">
											</span>
										</li>
										<li v-for="(g,i) in gifs4" v-if="gifshow==4" @click="dopostmer(g,$event,i)" :class="divIndex==i?'active':''" v-cloak>
											<img :src="g.icon">
											<span>{{g.name}}<em>￥ {{g.price}}E</em></span>
											<span class="bak" v-if="divIndex==i?show:!show">
												<img src="img/plus.png" @click="changeNum('1')">
												<input type="text" v-model="num">
												<img src="img/pus.png" @click="changeNum('-1')">
											</span>
										</li>
										<li v-for="(g,i) in gifs5" v-if="gifshow==5" @click="dopostmer(g,$event,i)" :class="divIndex==i?'active':''" v-cloak>
											<img :src="g.icon">
											<span>{{g.name}}<em>￥ {{g.price}}E</em></span>
											<span class="bak" v-if="divIndex==i?show:!show">
												<img src="img/plus.png" @click="changeNum('1')">
												<input type="text" v-model="num">
												<img src="img/pus.png" @click="changeNum('-1')">
											</span>
										</li>
									</div>
									<div class="line"></div>
									<div class="topline">
										<div style="width:50%;float:left;"></div>
										<div style="width:50%;float:right;">
											<span>总计：{{items.price?items.price*num:0}}E</span>
											<button @click="dogifts">赠送</button>
										</div>
									</div>
								</div>
							</div>
							<div class="sure" v-if="sure" v-cloak>
								<div class="suremain">
									<a href="javascript:;" class="close" @click="closesure"></a>
									<p>支付</p>
									<ul>
										<li v-for="t in guest" v-cloak>
											<span id="check">
												<input type="checkbox" class="input_check" :id="'check'+t.id">
												<label class="label_check" :for="'check'+t.id"></label>
											</span>
											<img class="head" :src="t.ico" @click="doimgsure($event,t.id)">
											<span class="span" v-text="t.name"></span>
										</li>
									</ul>
									<div class="total">
										<span>￥{{items.price*num}}×{{personnum}}</span>
										<span>￥{{items.price*num*personnum}}</span>
									</div>
									<div class="way">
										<div class="ways">
											<input type="radio" name="echck" value="wechat" checked class="input_check1" id="checks1" v-model="checkedValue">
											<label class="label_check1" for="checks1"></label>
											<img src="img/wechat.png">
											<span>微信支付</span>
										</div>
										<div class="ways">
											<input type="radio" name="echck" value="alipay" class="input_check2" id="checks2" v-model="checkedValue">
											<label class="label_check2" for="checks2"></label>
											<img src="img/alipay.png">
											<span>支付宝</span>
											<a>推荐</a>
										</div>
									</div>
									<div class="ofsure">
										<button @click="pay($event)">确认支付</button>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div v-if="shareImg==1" class="share">
						<div class="sharecontent">
							<img src="img/icon_close.png" class="close abs" @click="shareImg=0">
							<img :src="haibao.head" class="head abs">
							<span class="name abs" v-text="haibao.name"></span>
							<img :src="haibao.banner" class="banner abs">
							<span class="titles abs" v-text="haibao.title"></span>
							<span class="time abs" v-text="'会议时间：'+haibao.time"></span>
							<img :src="haibao.code" class="code abs">
							<span class="link abs">{{haibao.link}}<a href="javascript:;" :data-clipboard-text="haibao.link" id="copy_text" @click="copy">复制</a></span>
						</div>
					</div>
					<div v-if="phoneImg==1" class="phone">
						<div class="phonecontent">
							<img src="img/icon_close.png" class="close abs" @click="phoneImg=0">
							<img :src="phoneItems.code" class="code abs">
						</div>
					</div>
				</div>
			</div>
			<div class="chat">
				<div class="ad"></div>
				<div class="im">
					<div v-for="item in message" :class="item.add" v-cloak>
						<div class="le"><img :src="item.ico" v-cloak></div>
						<div class="ri">
							<span v-text='item.name' v-cloak></span>
							<span class="gf" v-if="item.gf" v-cloak>官方</span>
							<span class="ms" v-if="item.ms" v-cloak>秘书</span>
							<span class="zj" v-if="item.zj" v-cloak>专家</span>
							<span class="ding" v-if="item.ding" v-cloak>顶</span>
							<span class="content" v-text="item.content" v-cloak></span>
						</div>
					</div>
				</div>
				<div class="con">
					<input type="text" class="input" v-model="text">
					<div class="mile">
						<img src="img/mile.png" @click="doemot">
						<button @click="adddanmu">发送</button>
					</div>
					<div class="emot" v-if="emot" v-cloak>
						<li v-for="e in emoticon" @click="doemot">
							<img :src="e.icon">
						</li>
					</div>
				</div>
			</div>
		</div>
		<div class="cont">
			<div class="ad">
				<img class="img" src="img/ad.png" v-if="showf">
				<img class="close" src="img/close.png" @click="close($event,1)" v-if="showf">
			</div>
			<div class="mains">
				<div class="art">
					<div class="act">
						<span @click="tiv=1" :class="tiv==1?'active':''">专家介绍</span>
						<span @click="tiv=2" :class="tiv==2?'active':''">会议日程</span>
						<span @click="tiv=3" :class="tiv==3?'active':''">免责声明</span>
					</div>
					<div class="p30" v-if="tiv==1" v-cloak>
						<img src="img/zj1.png">
						<img src="img/zj2.png">
						<img src="img/zj3.png">
						<img src="img/zj4.png">
						<img src="img/zj5.png">
						<img src="img/zj6.png">
						<img src="img/zj7.png">
						<img src="img/zj8.png">
						<img src="img/zj9.png">
						<img src="img/zj10.png">
						<img src="img/zj11.png">
					</div>
					<div class="p30" v-else-if="tiv==2" v-cloak>
						<img src="img/hy1.png">
						<img src="img/hy2.png">
						<img src="img/hy3.png">
					</div>
					<div class="p30" v-else v-cloak>
						<img src="img/sm1.png">
						<img src="img/sm2.png">
						<img src="img/sm3.png">
					</div>
				</div>
			</div>
			<div class="ads">
				<img class="img" src="img/ad.png" v-if="shows">
				<img class="close" src="img/close.png" @click="close($event,2)" v-if="shows">
			</div>
		</div>
	</div>
</template>
<script>
import '../assets/scss/style.css';
import videojs from 'video.js'
import 'videojs-contrib-hls'
import 'video.js/dist/video.min.js'
import { MESSAGE_TYPE } from 'vue-baberrage'
import Clipboard from 'clipboard'
export default {
	data(){
	  	return{
	  		tab:[],
	  		act:1,
	  		sure:false,
	  		gifshow:1,
	  		postmer:false,
			guest:[],
			pro:[],
			audience:[],
			vid:[],
			video:'',
			showf:true,
			shows:true,
			tiv:1,
			message:[],
			proms:false,
			zan:false,
			emot:false,
			gifs1:[],
			gifs2:[],
			gifs3:[],
			emoticon:[],
			playshow:0,
			text:'',
			msg: [],
			barrageIsShow: true,
			currentId : 0,
			barrageLoop: false,
			barrageList: [],
			items:[],
			num:1,
			attr:[],
			personnum:0,
			checkedValue:'',
			url:'http://demo1.kol110.com/data.php',
			share:0,
			shareImg:0,
			phone:0,
			phoneImg:0,
			haibao:[],
			phoneItems:[],
			divIndex:-1,
			show:true,
		}
	},
	methods:{
		dogifts:function(){
			var thar = this;
			thar.zan = false;
			thar.sure = true;
		},
		copy:function(){
			var thar = this;
			var clipborad = new Clipboard("#copy_text");
			clipborad.on('success',e=>{
				alert('复制成功');
				clipborad.destroy();
			})
			clipborad.on('error',e=>{
				Message({
					message:'该浏览器暂不支持自动复制',
					type:'warning'
				});
				clipborad.destroy();
			})
		},
		shareshow:function(){
			var thar = this;
			thar.shareImg = 1;
			if(thar.haibao==''){
				this.getHaibao();
			}
		},
		phoneshow:function(){
			var thar = this;
			thar.phoneImg = 1;
			if(thar.phoneItems==''){
				this.getPhoneCode();
			}
		},
		getPhoneCode:function(){
			var thar = this;
		  	this.$axios({
			    method:"get",
			    url:thar.url,
			    params:{type:'phonecode'}
			}).
			then((res)=>{
				if(res.data.code==200){
			    	thar.phoneItems = res.data.data;
				}
			},(err)=>{
			    console.log(err);
			})
		},
		getHaibao:function(){
			var thar = this;
		  	this.$axios({
			    method:"get",
			    url:thar.url,
			    params:{type:'haibao'}
			}).
			then((res)=>{
				if(res.data.code==200){
			    	thar.haibao = res.data.data;
				}
			},(err)=>{
			    console.log(err);
			})
		},
		getVideo:function(){
			var thar = this;
		  	this.$axios({
			    method:"get",
			    url:thar.url,
			    params:{type:'video'}
			}).
			then((res)=>{
			    if(res.data.code==200){
			    	thar.video = res.data.data;
				}
			},(err)=>{
			    console.log(err);
			})
		},
		getTab:function(){
			var thar = this;
		  	this.$axios({
			    method:"get",
			    url:thar.url,
			    params:{type:'tab'}
			}).
			then((res)=>{
			    if(res.data.code==200){
			    	thar.tab = res.data.data;
				}
			},(err)=>{
			    console.log(err);
			})
		},
		getGuest:function(){
			var thar = this;
		  	this.$axios({
			    method:"get",
			    url:thar.url,
			    params:{type:'guest'}
			}).
			then((res)=>{
			    if(res.data.code==200){
			    	thar.guest = res.data.data;
				}
			},(err)=>{
			    console.log(err);
			})
		},
		getPro:function(){
			var thar = this;
			this.$axios({
			    method:"get",
			    url:thar.url,
			    params:{type:'pro'}
			}).
			then((res)=>{
			    if(res.data.code==200){
			    	thar.pro = res.data.data;
				}
			},(err)=>{
			    console.log(err);
			})
		},
		getAudience:function(){
			var thar = this;
			this.$axios({
			    method:"get",
			    url:thar.url,
			    params:{type:'audience'}
			}).
			then((res)=>{
			    if(res.data.code==200){
			    	thar.audience = res.data.data;
				}
			},(err)=>{
			    console.log(err);
			})
		},
		getVid:function(){
			var thar = this;
			this.$axios({
			    method:"get",
			    url:thar.url,
			    params:{type:'vid'}
			}).
			then((res)=>{
			    if(res.data.code==200){
			    	thar.vid = res.data.data;
				}
			},(err)=>{
			    console.log(err);
			})
		},
		getMessage:function(){
			var thar = this;
			this.$axios({
			    method:"get",
			    url:thar.url,
			    params:{type:'message'}
			}).
			then((res)=>{
			    if(res.data.code==200){
			    	thar.message = res.data.data;
				}
			},(err)=>{
			    console.log(err);
			})
		},
		getGifs1:function(){
			var thar = this;
			this.$axios({
			    method:"get",
			    url:thar.url,
			    params:{type:'gifs1'}
			}).
			then((res)=>{
			    if(res.data.code==200){
			    	thar.gifs1 = res.data.data;
				}
			},(err)=>{
			    console.log(err);
			})
		},
		getGifs2:function(){
			var thar = this;
			this.$axios({
			    method:"get",
			    url:thar.url,
			    params:{type:'gifs2'}
			}).
			then((res)=>{
			    if(res.data.code==200){
			    	thar.gifs2 = res.data.data;
				}
			},(err)=>{
			    console.log(err);
			})
		},
		getGifs3:function(){
			var thar = this;
			this.$axios({
			    method:"get",
			    url:thar.url,
			    params:{type:'gifs3'}
			}).
			then((res)=>{
			    if(res.data.code==200){
			    	thar.gifs3 = res.data.data;
				}
			},(err)=>{
			    console.log(err);
			})
		},
		getGifs4:function(){
			var thar = this;
			this.$axios({
			    method:"get",
			    url:thar.url,
			    params:{type:'gifs4'}
			}).
			then((res)=>{
			    if(res.data.code==200){
			    	thar.gifs4 = res.data.data;
				}
			},(err)=>{
			    console.log(err);
			})
		},
		getGifs5:function(){
			var thar = this;
			this.$axios({
			    method:"get",
			    url:thar.url,
			    params:{type:'gifs5'}
			}).
			then((res)=>{
			    if(res.data.code==200){
			    	thar.gifs5 = res.data.data;
				}
			},(err)=>{
			    console.log(err);
			})
		},
		getEmoticon:function(){
			var thar = this;
			this.$axios({
			    method:"get",
			    url:thar.url,
			    params:{type:'emoticon'}
			}).
			then((res)=>{
			    if(res.data.code==200){
			    	thar.emoticon = res.data.data;
				}
			},(err)=>{
			    console.log(err);
			})
		},
		getMsg:function(){
			var thar = this;
			this.$axios({
			    method:"get",
			    url:thar.url,
			    params:{type:'msg'}
			}).
			then((res)=>{
			    if(res.data.code==200){
			    	thar.msg = res.data.data;
				}
			},(err)=>{
			    console.log(err);
			})
		},
		pay:function(e){
			var thar = this;
			alert(thar.items.price*thar.num*thar.personnum+','+thar.checkedValue);
		},
		doimgsure:function(e,id){
			var thar = this;
			var change = true;
			if(e.currentTarget.parentElement.firstElementChild.firstElementChild.checked==false){
				e.currentTarget.parentElement.firstElementChild.firstElementChild.checked = true;
				thar.attr.push(id);
			}else{
				e.currentTarget.parentElement.firstElementChild.firstElementChild.checked = false;
				for(var i=0;i<thar.attr.length;i++){
					if(thar.attr[i]==id){
						thar.attr.splice(i,1);
					}
				}
			}
			//小->大排序
			for (var i = 0; i < thar.attr.length; i++) {
				for (var j = 0; j < thar.attr.length; j++) {
					if (thar.attr[i] < thar.attr[j]) {
						var h;
						h = thar.attr[i];
						thar.attr[i] = thar.attr[j];
						thar.attr[j] = h;
					}
				}
			}
			thar.personnum = thar.attr.length;
		},
		closesure:function(){
			var thar = this;
			thar.sure = false;
			thar.postmer = false;
			thar.zan = false;
		},
		changeNum:function(i){
			var thar = this;
			i = Number(i);
			if(thar.num+i<1){
				thar.num = 1;
			}else{
				thar.num = thar.num+i;
			}
		},
		dopostmer:function(o,e,i){
			var thar = this;
			thar.items = o;
			thar.divIndex=i;
		},
		fullscreen:function(){
			var player = videojs('videomv', {}, function(){})
			player.requestFullscreen();
		},
		playvideo:function(e){
			var thar = this;
			var player = videojs('videomv', {}, function(){})
			if(thar.playshow==0){
				thar.playshow = 1;
				player.play();
			}else{
				thar.playshow = 0;
				player.pause();
			}
		},
		close:function(e,i){
			var thar = this;
			if(i==1){
				thar.showf = false;
			}else{
				thar.shows = false;
			}
		},
		dogift:function(){
			var thar = this;
			if(thar.zan){
				thar.zan=false;
			}else{
				thar.zan = true;
			}
			thar.proms = false;
			thar.emot = false;
			thar.num = 1;
		},
		promsy:function(){
			var thar = this;
			if(thar.proms){
				thar.proms = false;
			}else{
				thar.proms = true;
			}
			thar.zan = false;
			thar.emot = false;
		},
		doemot:function(){
			var thar = this;
			if(thar.emot){
				thar.emot = false;
			}else{
				thar.emot = true;
			}
			thar.zan = false;
			thar.proms = false;
		},
		adddanmu:function(){
			var thar = this;
			var num = parseInt(Math.random()*10);
			thar.barrageList.push({
				id: num,
				avatar: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3064584167,3502823640&fm=26&gp=0.jpg',
				msg: thar.text,
				time: num
			});
		},
		addToList() {
			var thar = this;
			thar.msg.forEach((v) => {
				this.barrageList.push({
					id: v.id,
					avatar: v.avatar,
					msg: v.msg,
					time: v.time
				});
			});
		},
		check:function(e){
			var thar = this;
			if(this.$refs.check.checked){
				thar.barrageIsShow = false;
			}else{
				this.addToList();
				thar.barrageIsShow = true;
			}
		},
		page:function(i){
			var thar = this;
			i = Number(i);
			if(thar.gifshow+i < 1){
				thar.gifshow = 3;
			}else if(thar.gifshow+i > 3){
				thar.gifshow = 1;
			}else{
				thar.gifshow = thar.gifshow+i;
			}
		}
	},
	mounted(){
		this.$refs.check.checked = false;
		setTimeout(function(){
			var player = videojs('videomv', {}, function(){})
			player.play();
		}, 500);
	},
	created(){
		this.getVideo();
		this.getTab();
		this.getGuest();
		this.getPro();
		this.getAudience();
		this.getVid();
		this.getMessage();
		this.getGifs1();
		this.getGifs2();
		this.getGifs3();
		this.getGifs4();
		this.getGifs5();
		this.getEmoticon();
		this.getMsg();
	}
}

</script>
<style scoped>
*{padding:0;margin:0;margin: 0 auto;color: #4a4a4a;}
[v-cloak]{display: none ! important;}
ul li{list-style-type: none;}
#main{background:url(/img/bg.png) no-repeat #dfebf1;background-size:100%;height: auto;}
#main .logo img{width: 575px;margin: 0 auto;display: block;padding-top: 80px;}
#main .cent{width: 97%;margin: 0 auto;margin-top: 80px;display: flex;justify-content: space-around;}
#main .cent .rank{width: 378px;/*no*/float: left;padding-bottom: 10px;background: #fff;}
#main .cent .chat{width: 378px;/*no*/float: left;height: auto;background: #fff;}
#main .cent .player{width: 1095px;/*no*/height: auto;float: left;background: #fff;margin: 0 0.5%;}
#main .cent .rank .title{text-align: center;background:#cbcbcb;letter-spacing: 2px;}
#main .cent .rank .tab{width: 100%;margin: 0 auto;}
#main .cent .rank .tab span{width: 33.33333%;text-align: center;display: block;float: left;cursor: pointer;}
/*#main .cent .rank .tab span:nth-child(1){text-align: left;}*/
/*#main .cent .rank .tab span:nth-child(3){text-align: right;}*/
#main .cent .rank .tab span.active{background:#15b0e9;color:#fff;border-radius: 5px;}
#main .cent .rank .tabCon{width: 90%;margin: 0 auto;}
#main .cent .rank .aleft{background:#fff;}
#main .cent .rank .aleft ul li{overflow: hidden;background: #dfebf1;margin: 15px 0;}
#main .cent .rank .aleft ul li:nth-child(1){margin-top: 5px;}
#main .cent .rank .aleft ul li span{color: #858585;}
#main .cent .rank .aleft ul li span img{width: 30px;vertical-align: middle;}
#main .cent .rank .aleft ul li span:nth-child(1){display: block;float: left;}
#main .cent .rank .aleft ul li span:nth-child(2){width: 30px;display: block;float: left;}
#main .cent .rank .aleft ul li span:nth-child(3){margin-left:10px;display: block;float: left;}
#main .cent .rank .aleft ul li span:nth-child(4){text-align: right;display: block;padding-right: 7px;}
#main .cent .player .title{background:#fff;}
#main .cent .player .title .t1{float: left;}
#main .cent .player .title .t2{float: right;}
#main .cent .player .title .t1 img{vertical-align: middle;}
#main .cent .player .title .t1 span{}
#main .cent .player .title .t2 img{width: 30px;vertical-align: sub;}
#main .cent .player .title .t2 span{font-size: 18px;padding: 0 30px 0 10px;}
#main .cent .player .acenter{position: relative;}
#main .cent .player #videomv{width: 100%;height:450px;}
#main .cent .player .control{width: 100%;background:#fff;}
#main .cent .player .control .left img{vertical-align: middle;cursor: pointer;margin: 0 10px;width: 25px;}
#main .cent .player .control .left{float: left;}
#main .cent .player .control .right{float: right;}
#main .cent .player .control .right .img{width: 45px;margin: 0 10px;vertical-align: middle;cursor: pointer;}
#main .cent .player .control .right .img:nth-child(2){width: 60px;}
#main .cent .player .control .right .span{margin-right: 10px;font-size: 15px;}
.control input[type="checkbox"] {
  -webkit-appearance: none;
}
.control input[type="checkbox"]:checked + label.label,
.control input[type="checkbox"]:not(:checked) + label.label {
  background-color: #e0e0e0;
  display: inline-block;
  height: 20px;
  width: 50px;
  border-radius: 20px;
  position: relative;
  -webkit-transition: background-color 0.4s;
  transition: background-color 0.4s;
  vertical-align: middle;
  cursor: pointer;
}
.control  input[type="checkbox"]:checked + label.label:after,
.control  input[type="checkbox"]:not(:checked) + label.label:after {
  background-color: #1aa5ff;
  content: " ";
  height: 20px;
  width: 20px;
  border-radius: 21px;
  position: absolute;
  left: 1px;
  top: 0px;
  -webkit-transition: left 0.4s;
  transition: left 0.4s;
}
.control input[type="checkbox"]:checked + label.label {background-color: #e0e0e0;}
.control input[type="checkbox"]:checked + label.label:after {left: 29px;}
.chat .ad{background:blue;width: 100%;}
.chat .im{overflow: auto;}
.chat .im .left{clear: both;margin-bottom: 5px;height: auto;display: inline-block;}
.chat .im .right{clear: both;margin-bottom: 5px;height: auto;display: inline-block;float: right}
.chat .im .left img{width: 26px;float: left;margin-right: 20px;}
.chat .im .right img{width: 26px;float: left;margin-left: 10px;}
.chat .im .left .gf{margin-left: 10px;background: #29abe2;color: #fff;padding: 2px 8px;border-radius: 9px;}
.chat .im .left .ms{margin-left: 10px;background: #ea68a2;color: #fff;padding: 2px 8px;border-radius: 9px;}
.chat .im .left .ding{margin-left: 7px;background: #f8b551;color: #fff;padding: 2px 8px;border-radius: 9px;}
.chat .im .left .content{display: block;background: #f1f1f1;padding: 10px 10px;margin: 15px 0;border-radius: 23px 20px 20px 0;width: 95%;}
.chat .im .right .gf{margin-right: 10px;background: #29abe2;color: #fff;padding: 2px 8px;border-radius: 9px;}
.chat .im .right .ms{margin-left: 10px;background: #ea68a2;color: #fff;padding: 2px 8px;border-radius: 9px;}
.chat .im .right .zj{margin-left: 10px;background: #22ac38;color: #fff;padding: 2px 8px;border-radius: 9px;}
.chat .im .right .ding{margin-left: 7px;background: #f8b551;color: #fff;padding: 2px 8px;border-radius: 9px;}
.chat .im .right .content{width:65%;display: block;background: #f1f1f1;padding: 10px 10px;margin: 15px 0;border-radius: 23px 20px 20px 0;text-align: left;float: right;}
.chat .im .left .le{width: 15%;float: left;}
.chat .im .right .le{width: 15%;float: right;}
.chat .im .left .ri{float: left;}
.chat .im .right .ri{text-align: right;}
.chat .con{height: 75px;margin-top: 10px;position: relative;}
.chat .con .input{height: 30px;border:1px solid #ccc;margin: 0 auto;display: block;width: 90%;outline: none;}
.chat .con .mile{margin-top: 10px;}
.chat .con .mile img{margin-left: 15px;width: 29px;cursor: pointer;}
.chat .con .mile button{margin-right: 15px;color: #fff;background: #6d6d6d;float: right;border:none;outline: none;padding: 4px 17px;cursor: pointer;}
::-webkit-scrollbar {width: 6px;height: 4px;background-color: #F5F5F5;}
::-webkit-scrollbar-track {-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);background: #fff;}
::-webkit-scrollbar-thumb {border-radius: 3px;-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);background-color: #3D4B4E;}
::-webkit-scrollbar-thumb:hover {border-radius: 3px;-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);background-color: #3D4B4E;}
.cont{width: 98%;margin: 0 auto;display: flex;justify-content: space-around;margin-top: 1%;}
.cont .ad{width: 23%;float: left;margin: unset;position: relative;}
.cont .mains{width: 55%;height: auto;float: left;background: #fff;margin: 0 0.5%;}
.cont .ads{width: 23%;float: left;margin: unset;position: relative;}
.cont .ad .img,.cont .ads .img{width: 100%;margin-top: 60px;margin-top: 145px;opacity: 0.7;}
.cont .ad .close,.cont .ads .close{position: absolute;right: 5px;top: 155px;width: 25px;cursor: pointer;}
.cont .mains .art{padding: 30px 80px;}
.cont .mains .art .act span{width: 33.33%;background: #dfebf1;display: block;float: left;text-align: center;cursor: pointer;}
.cont .mains .art .act span.active{background: #9fe3ff;}
.cont .mains .art img{width:100%;vertical-align: bottom;}
.p30{clear:both;padding-top: 15px;}
.gift{position: absolute;width: 500px;height: 410px;background: #fff;border-radius: 10px;left: 45%;bottom: 90px;padding:0 10px 10px 10px;opacity: 0.97;}
.gift .giftit{width: 100%;height: 40px;line-height: 40px;text-align: center;overflow-x: scroll;overflow: auto;white-space: nowrap;overflow-y:hidden;}
.gift .giftit span{width: 20%;float: left;cursor: pointer;color: #858585;}
.gift .giftit span.active{color: #29abe2;}
.gift .pre{float: left;width: 10%;margin-top: 20%;}
.gift .next{float: right;width: 10%;margin-top: 20%;}
.gift .pre img{float: left;cursor: pointer;}
.gift .next img{float: right;cursor: pointer;}
.gift .gifmain{margin: 0 auto;width: 80%;height: auto;}
.gift .gifmain li{width: 32%;height: 150px;float:left;list-style-type: none;cursor: pointer;line-height: 20px;}
.gift .gifmain li.active{border:1px solid #ff0468;height: 150px;border-bottom: none;}
.gift .gifmain li img{width: 100%;height: 90px;}
.gift .gifmain li span{font-size: 12px;width: 100%;line-height: 30px;text-align: center;display: block;}
.gift .gifmain li span em{color: #29abe2;font-style:normal}
.gift .gifmain li span.bak{background:#ff0468;width: 100%;height: 30px;display: block;}
.gift .gifmain li span.bak img{width: 20px;height: auto;vertical-align: middle;margin-top: 5px;}
.gift .gifmain li span.bak img:nth-child(1){float: left;padding-left: 15px;}
.gift .gifmain li span.bak img:nth-child(3){float: right;padding-right: 15px;}
.gift .gifmain li span.bak input{border:none;width: 30px;text-align: center;background:none;outline: none;margin-left: 10px;color: #fff;line-height: 30px;}
.gift .gifmain li:nth-child(4){clear: both;}
.gift .line{height: 10px;clear: both;}
.gift .topline{clear:both;width: 100%;border-top: 3px solid #ccc;}
.gift .topline span{font-size: 20px;}
.gift .topline button{border:none;outline: none;background:#ff0468;color: #fff;padding: 5px 15px;border-radius: 5px;margin-left: 25px;cursor: pointer;}
.blue {border-radius: 100px;background: #e6ff75;color: #fff;}
.green {border-radius: 100px;background: #75ffcd;color: #fff;}
.red {border-radius: 100px;background: #e68fba;color: #fff;}
.yellow {border-radius: 100px;background: #dfc795;color: #fff;}
.baberrage-stage {position: absolute;width: 100%;height: 450px;overflow: hidden;top: 0;font-size: 15px;}
.emot{position: absolute;width: 485px;height: auto;background: #e0e0e0;left: -160px;bottom: 40px;border-radius: 10px;}
.emot li{width: 78px;height: 70px;float:left;list-style-type: none;position: relative;cursor: pointer;overflow: hidden;}
.emot li img{width: 100%;cursor: pointer;}
.emot li img:hover{background: #b5b5b5;border-radius: 10px;}
.postmer{position: absolute;background: #292b38;width: 230px;height: 140px;top: -160px;left: 90px;border-radius: 15px;}
.postmer:before{content: "";position: absolute;width: 0;height: 0;border: 15px solid transparent;border-top-color: #292b38;left: 50%;margin-left: -12px;bottom: -30px;}
.postmer .imgleft{width: 50%;float: left;}
.postmer .imgleft img{margin-top: 30%;width: 100px;}
.postmer .imgright{width: 45%;float: left;padding:10px 5px 0 0;}
.postmer .imgright span{display: block;height: 30px;line-height: 30px;}
.postmer .imgright span:nth-child(1){color: #fff;font-size: 15px;}
.postmer .imgright span:nth-child(2){color: #ffea02;font-size: 14px;}
.postmer .imgright span:nth-child(3){color: #fff;font-size: 13px;}
.postmer .imgright span:nth-child(4){color: #ffea02;font-size: 14px;}
.postmer .imgright img{cursor: pointer;}
.postmer .imgright img:nth-child(1){margin-left: 5px;}
.postmer .imgright input{width: 15px;margin:0 5px;border:none;outline: none;background: none;color: #fff;text-align: center;}
.postmer .imgright span button{border:none;background: #211931;color: #fff;padding: 3px 10px;border-radius: 5px;float: right;margin-top: 4px;outline: none;cursor: pointer;}
.sure{background: url(/img/pay.png) no-repeat;position: absolute;background-size: 100%;}
.sure .suremain{position: relative;width: 100%;height: 100%;}
.sure .suremain .close{position: absolute;right: 10px;top: 10px;cursor:pointer;}
.sure .suremain p{color: #fff;text-align: center;font-size: 22px;letter-spacing: 6px;height: 50px;line-height: 50px;}
.sure .suremain ul{padding:0 10px;height: 320px;overflow: auto;margin-top: 20px;}
.sure .suremain ul li{width: 33.33%;text-align: center;background: none;height: auto;float: left;line-height: 50px;position: relative;}
.sure .suremain ul li:hover{background: none;}
.sure .suremain ul li img.head{width: 40px;height: auto;margin:0 auto;display: block;cursor: pointer;}
.sure .suremain ul li span.span{margin-top: -10px;display: block;color: #000;font-size: 12px ! important;margin-right: 0 ! important;white-space: nowrap;}
#check {margin: 20px auto;}
#check .input_check {position: absolute;width: 20px;height: 20px;visibility: hidden;background: #E92333;}
#check span {position: relative;}
#check .input_check+label.label_check {display: inline-block;width: 20px;height: 20px;background: url('/img/sure.png') no-repeat;background-position: -31px -3px;position: absolute;top: 0;right: 28px;}
#check .input_check:checked+label.label_check {background-position: -2px 0px;}
.sure .suremain .total{padding: 0px 40px;margin-top: -10px;height: auto;}
.sure .suremain .total span{width: 50%;}
.sure .suremain .total span:nth-child(1){color: #969696;font-size: 25px;float: left;}
.sure .suremain .total span:nth-child(2){color: #bb0e57;font-size: 35px;float: right;text-align: right;}
.suremain a.close{position: absolute;right: 0;top: 0;width: 60px;height: 60px;}
.way{clear: both;padding:0 10px;width: 92%;}
.way .ways:nth-child(1){width: 45%;float: left;} 
.way .ways:nth-child(2){width: 55%;float: left;} 
.way .ways:nth-child(2) img{margin-left: 30px;}
.way .ways img{vertical-align: middle;margin:0 5px;margin-left: 30px;}
.way .input_check1,.way .input_check2 {position: absolute;width: 15px;height: 15px;visibility: hidden;background: #E92333;}
.way .input_check1+label.label_check1{display: inline-block;width: 20px;height: 20px;background: url('/img/sure1.png') no-repeat;background-position: -40px -3px;position: absolute;bottom: 87px;left: 15px;border:1px solid #ff0267;border-radius: 50%;cursor: pointer;}
.way .input_check2+label.label_check2 {display: inline-block;width: 20px;height: 20px;background: url('/img/sure1.png') no-repeat;background-position: -40px -3px;position: absolute;bottom: 87px;left: 165px;border:1px solid #ff0267;border-radius: 50%;cursor: pointer;}
.way .input_check1:checked+label.label_check1,.way .input_check2:checked+label.label_check2 {background-position: 0px 0px;}
.way .ways span{color: #4a4a4a;font-size: 14px;}
.way .ways a{color: #fff;background: #00aaee;font-size: 12px;padding: 0px 7px;border-radius: 10px;text-align: right;margin-left: 5px;}
.ofsure{clear:both;height: 40px;}
.ofsure button{clear:both;width: 80%;padding:0 10px;background: #08baff;color: #fff;height: 40px;line-height: 40px;border:none;outline: none;border-radius: 5px;margin: 0 auto;display: block;cursor: pointer;}
.share{background: url(/img/haibao.png) no-repeat;position: absolute;left: 0;background-size: 100%;}
.sharecontent{position: relative;width: 100%;height: 100%;z-index: 1;}
.abs{position: absolute;}
.sharecontent span{color: #fff;}
.sharecontent .link a{color: #239fff;}
.sharecontent .close{top: 5px;right: 5px;cursor: pointer;}
.phone{background: url(/img/sharem.png) no-repeat;position: absolute;background-size: 100%;}
.phonecontent{position: relative;width: 100%;height: 100%;z-index: 1;}
.phone .close{top: 0px;right: 0px;cursor: pointer;z-index: 1;width: 20px;}
.phone .code{width: 70px;border-radius: 10px;}
.phonecontent:before{content: "";position: absolute;width: 0;height: 0;border: 15px solid transparent;border-top-color: #0076d0;left: 50%;margin-left: -12px;bottom: -30px;}
.proms{position: absolute;background: url(/img/hudong.png) no-repeat;background-size: 100%;}
.proms p{width: 100%;text-align: center;color: #fff;height: 65px;}
.proms .form input{height: 40px;line-height: 40px;border:none;border-bottom: 1px solid #9fe3ff;outline: none;}
.proms .form textarea{margin-top:20px;height: 60px;line-height: 40px;border:none;border-bottom: 1px solid #9fe3ff;outline: none;}
.proms button{clear:both;background:#08baff;height: 40px;line-height: 40px;color: #fff;text-align: center;border:none;margin: 0 auto;width: 70%;border-radius: 5px;margin-top: 35px;display: block;cursor: pointer;}
.proms a{position: absolute;right: 0;top: 0;width: 70px;height: 70px;}
</style>