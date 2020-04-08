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
						<span v-for="(t,i) in tab" :key='i' v-text="t" @click="act=i+1"></span>
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
					<video id='videomv' class="video-js vjs-default-skin" controls allowfullscreen="true">
			            <source :src="video">    
			        </video>
			        <vue-baberrage
					   :isShow= "barrageIsShow"
					   :barrageList = "barrageList"
					   :loop = "barrageLoop"
					   >
					</vue-baberrage>
					<div class="control">
						<div class="left">
							<img src="img/share.png">
							<img src="img/phone.png">
							<img src="img/full.png" @click="fullscreen">
							<img :src="playshow==0?'img/play.png':'img/pause.png'" @click="playvideo($event)">
						</div>
						<div class="right">
							<img class="img" src="img/msg.png" @click="promsy">
							<img class="img" src="img/zan.png" @click="dogift">
							<span class="span">弹幕</span>
							<input id="check" type="checkbox" ref="check">
        					<label class="label" for="check" @click="check($event)"></label>
							<div class="proms" v-if="proms" v-cloak>
								<div class="promy"></div>
								<div class="sq">互动申请</div>
								<div class="tct">
									<img src="img/icon.png">
									<span>XXX</span>
									<span>北京一导管室主任</span>
								</div>
								<div class="arts">
									各位同志好，我发表一下我的观点，这个手术难度还是非常大的，因为血管非常的狭窄，整个手术持续了一个小时
								</div>
								<div class="an">
									<div class="jt" @click="proms=false">
										<img src="img/i1.png">
										<span>接通</span>
									</div>
									<div class="hl" @click="proms=false">
										<img src="img/i2.png">
										<span>忽略</span>
									</div>
								</div>
							</div>
							<div class="gift" v-if="zan" v-cloak>
								<div>
									<div class="giftit">
										<span @click="gifshow=1" :class="gifshow==1?'active':''">礼物1</span>
										<span @click="gifshow=2" :class="gifshow==2?'active':''">礼物2</span>
										<span @click="gifshow=3" :class="gifshow==3?'active':''">礼物3</span>
									</div>
									<div class="pre">
										<img src="img/pre.png" @click="page('-1')">
									</div>
									<div class="gifmain">
										<li v-for="g in gifs1" v-if="gifshow==1" @click="dopostmer(g)" v-cloak>
											<img :src="g.icon+'?v=1.32'">
											<span v-text="g.name"></span>
										</li>
										<li v-for="g in gifs2" v-if="gifshow==2" @click="dopostmer(g)" v-cloak>
											<img :src="g.icon+'?v=1'">
											<span v-text="g.name"></span>
										</li>
										<li v-for="g in gifs3" v-if="gifshow==3" @click="dopostmer(g)" v-cloak>
											<img :src="g.icon+'?v=1'">
											<span v-text="g.name"></span>
										</li>
									</div>
									<div class="next">
										<img src="img/next.png" @click="page('1')">
									</div>
								</div>
								<div class="postmer" v-if="postmer" v-cloak>
									<div class="imgleft">
										<img :src="items.icon">
									</div>
									<div class="imgright">
										<span v-text='items.name'></span>
										<span v-text="'￥'+items.price+' e'"></span>
										<span>数量：<img src="img/jian.png" @click="changeNum('-1')"><input type="text" v-model="num"><img src="img/jia.png" @click="changeNum('1')"></span>
										<span>
											￥{{items.price*num}} e
											<button @click="sure=true">赠送</button>
										</span>
									</div>
								</div>
								<div class="sure" v-if="sure" v-cloak>
									<div class="suremain">
										<img class="close" @click="closesure" src="img/icon_close.png">
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
									</div>
								</div>
							</div>
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
import videojs from 'video.js'
import 'videojs-contrib-hls'
import 'video.js/dist/video.min.js'
import { MESSAGE_TYPE } from 'vue-baberrage'
export default {
	data(){
	  	return{
	  		tab:['嘉宾','产品','观众'],
	  		act:1,
	  		sure:false,
	  		gifshow:1,
	  		postmer:false,
	  		guest:[
				{id:1,ico:'img/icon.png',name:'北京导管室主任',pri:'108E币'},
				{id:2,ico:'img/icon.png',name:'北京导管室主任',pri:'109E币'},
				{id:3,ico:'img/icon.png',name:'北京导管室主任',pri:'102E币'},
				{id:4,ico:'img/icon.png',name:'北京导管室主任',pri:'10E币'},
				{id:5,ico:'img/icon.png',name:'北京导管室主任',pri:'98E币'},
				{id:6,ico:'img/icon.png',name:'北京导管室主任',pri:'138E币'},
				{id:7,ico:'img/icon.png',name:'北京导管室主任',pri:'128E币'},
				{id:8,ico:'img/icon.png',name:'北京导管室主任',pri:'77E币'},
				{id:9,ico:'img/icon.png',name:'北京导管室主任',pri:'13E币'},
				{id:10,ico:'img/icon.png',name:'北京导管室主任',pri:'68E币'}
			],
			pro:[
				{ico:'img/icon.png',name:'南京导管室主任',pri:'108E币'},
				{ico:'img/icon.png',name:'南京导管室主任',pri:'109E币'},
				{ico:'img/icon.png',name:'南京导管室主任',pri:'102E币'},
				{ico:'img/icon.png',name:'南京导管室主任',pri:'10E币'},
				{ico:'img/icon.png',name:'北京导管室主任',pri:'98E币'},
				{ico:'img/icon.png',name:'北京导管室主任',pri:'138E币'},
				{ico:'img/icon.png',name:'北京导管室主任',pri:'128E币'},
				{ico:'img/icon.png',name:'北京导管室主任',pri:'77E币'},
				{ico:'img/icon.png',name:'北京导管室主任',pri:'13E币'},
				{ico:'img/icon.png',name:'北京导管室主任',pri:'68E币'}
			],
			audience:[
				{ico:'img/icon.png',name:'成都导管室主任',pri:'108E币'},
				{ico:'img/icon.png',name:'北京导管室主任',pri:'109E币'},
				{ico:'img/icon.png',name:'成都导管室主任',pri:'102E币'},
				{ico:'img/icon.png',name:'北京导管室主任',pri:'10E币'},
				{ico:'img/icon.png',name:'成都导管室主任',pri:'98E币'},
				{ico:'img/icon.png',name:'北京导管室主任',pri:'138E币'},
				{ico:'img/icon.png',name:'成都导管室主任',pri:'128E币'},
				{ico:'img/icon.png',name:'北京导管室主任',pri:'77E币'},
				{ico:'img/icon.png',name:'北京导管室主任',pri:'13E币'},
				{ico:'img/icon.png',name:'北京导管室主任',pri:'68E币'}
			],
			vid:{tit:'新广直播网页，第101期心血管病危介入治疗专场',num:'4950'},
			video:'http://ivi.bupt.edu.cn/hls/cctv1hd.m3u8',
			showf:true,
			shows:true,
			tiv:1,
			message:[
				{add:'left',ico:'img/icon.png',name:'Lorem lpsum',gf:true,ms:false,zj:false,ding:true,content:'1最好我们提前半小时开始直'},
				{add:'right',ico:'img/icon.png',name:'Lorem lpsum',gf:true,ms:false,zj:false,ding:false,content:'2最好我们提前半小时开始直'},
				{add:'left',ico:'img/icon.png',name:'Lorem lpsum',gf:false,ms:true,zj:false,ding:false,content:'3最好我们提前半小时开始直'},
				{add:'right',ico:'img/icon.png',name:'Lorem lpsum',gf:false,ms:false,zj:true,ding:false,content:'4最好我们提前半小时开始直播，现在手术室空置，导播看到回复一下我'},
				{add:'left',ico:'img/icon.png',name:'Lorem lpsum',gf:true,ms:false,zj:false,ding:false,content:'5最好我们提前半小时开始直播'},
			],
			proms:false,
			zan:false,
			emot:false,
			gifs1:[
				{icon:'img/gif_01.png',name:'救护车',price:10},
				{icon:'img/gif_02.png',name:'口罩',price:11},
				{icon:'img/gif_03.png',name:'眼罩',price:12},
				{icon:'img/gif_04.png',name:'羽蛇神',price:13},
				{icon:'img/gif_05.png',name:'小蓝瓶',price:14},
				{icon:'img/gif_01.png',name:'救护车',price:15},
			],
			gifs2:[
				{icon:'img/gif_01.png',name:'救护车',price:20},
				{icon:'img/gif_01.png',name:'救护车',price:30},
				{icon:'img/gif_01.png',name:'救护车',price:40},
				{icon:'img/gif_01.png',name:'救护车',price:50},
				{icon:'img/gif_01.png',name:'救护车',price:60},
				{icon:'img/gif_01.png',name:'救护车',price:70},
			],
			gifs3:[
				{icon:'img/gif_01.png',name:'救护车',price:10},
				{icon:'img/gif_01.png',name:'救护车',price:10},
				{icon:'img/gif_01.png',name:'救护车',price:10},
				{icon:'img/gif_01.png',name:'救护车',price:10},
				{icon:'img/gif_01.png',name:'救护车',price:10},
				{icon:'img/gif_01.png',name:'救护车',price:10},
			],
			emoticon:[
				{icon:'img/emoticon/爱慕.png'},
				{icon:'img/emoticon/安慰.png'},
				{icon:'img/emoticon/悲泣.png'},
				{icon:'img/emoticon/不会吧.png'},
				{icon:'img/emoticon/财主.png'},
				{icon:'img/emoticon/大笑.png'},
				{icon:'img/emoticon/呆若木鸡.png'},
				{icon:'img/emoticon/飞吻.png'},
				{icon:'img/emoticon/尴尬.png'},
				{icon:'img/emoticon/害羞.png'},
				{icon:'img/emoticon/呼叫.png'},
				{icon:'img/emoticon/花痴.png'},
				{icon:'img/emoticon/加油.png'},
				{icon:'img/emoticon/流口水.png'},
				{icon:'img/emoticon/亲亲.png'},
				{icon:'img/emoticon/色情狂.png'},
				{icon:'img/emoticon/天使.png'},
				{icon:'img/emoticon/跳舞.png'},
				{icon:'img/emoticon/偷笑.png'},
				{icon:'img/emoticon/吐舌头.png'},
				{icon:'img/emoticon/微信.png'},
				{icon:'img/emoticon/我的妈呀.png'},
				{icon:'img/emoticon/享受.png'},
				{icon:'img/emoticon/疑问.png'},
				{icon:'img/emoticon/忧伤.png'},
				{icon:'img/emoticon/晕.png'},
				{icon:'img/emoticon/再见.png'}
			],
			playshow:0,
			text:'',
			msg: [
				{id:1,'msg':'11111111',time:5,avatar: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3064584167,3502823640&fm=26&gp=0.jpg'},
				{id:2,'msg':'2222222',time:7,avatar: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3064584167,3502823640&fm=26&gp=0.jpg'},
				{id:3,'msg':'3333333333',time:10,avatar: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3064584167,3502823640&fm=26&gp=0.jpg'},
				{id:4,'msg':'4444444444',time:16,avatar: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3064584167,3502823640&fm=26&gp=0.jpg'},
				{id:5,'msg':'55555555555',time:7,avatar: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3064584167,3502823640&fm=26&gp=0.jpg'},
				{id:6,'msg':'666666666666',time:11,avatar: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3064584167,3502823640&fm=26&gp=0.jpg'},
				{id:7,'msg':'7777777777',time:12,avatar: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3064584167,3502823640&fm=26&gp=0.jpg'},
				{id:8,'msg':'8888888888',time:9,avatar: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3064584167,3502823640&fm=26&gp=0.jpg'},
			],
			barrageIsShow: true,
			currentId : 0,
			barrageLoop: false,
			barrageList: [],
			items:[],
			num:1,
			attr:[],
			personnum:0
		}
	},
	methods:{
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
		dopostmer:function(o){
			var thar = this;
			thar.postmer = true;
			thar.items = o;
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
		var player = videojs('videomv', {}, function(){})
		player.play();
	}
}

</script>
<style scoped>
*{padding:0;margin:0;margin: 0 auto;color: #4a4a4a;}
[v-cloak]{display: none ! important;}
ul li{list-style-type: none;}
#main{background:url(/img/bg.png) no-repeat #dfebf1;background-size:100%;height: auto;}
#main .logo img{width: 575px;margin: 0 auto;display: block;padding-top: 80px;}
#main .cent{width: 98%;margin: 0 auto;margin-top: 80px;display: flex;justify-content: space-around;}
#main .cent .rank{width: 23%;float: left;padding-bottom: 10px;background: #fff;}
#main .cent .chat{width: 23%;float: left;height: auto;background: #fff;}
#main .cent .player{width: 55%;height: auto;float: left;background: #fff;margin: 0 0.5%;}
#main .cent .rank .title{text-align: center;background:#cbcbcb;height: 50px;line-height: 50px;font-size: 18px;letter-spacing: 2px;}
#main .cent .rank .tab{width: 90%;margin: 0 auto;height: 50px;line-height: 50px;}
#main .cent .rank .tab span{font-size:16px;width: 33.33%;text-align: center;display: block;float: left;cursor: pointer;}
#main .cent .rank .tab span:nth-child(1){text-align: left;}
#main .cent .rank .tab span:nth-child(3){text-align: right;}
#main .cent .rank .tabCon{width: 90%;margin: 0 auto;}
#main .cent .rank .aleft{background:#fff;}
#main .cent .rank .aleft ul li{overflow: hidden;font-size: 14px;background: #dfebf1;height: 40px;line-height: 40px;margin: 10px 0;}
#main .cent .rank .aleft ul li:nth-child(1){margin-top: 0px;}
#main .cent .rank .aleft ul li span img{width: 21px;vertical-align: text-top;}
#main .cent .rank .aleft ul li span:nth-child(1){width: 30px;display: block;float: left;padding-left: 7px;}
#main .cent .rank .aleft ul li span:nth-child(2){width: 30px;display: block;float: left;}
#main .cent .rank .aleft ul li span:nth-child(3){width: 108px;display: block;float: left;}
#main .cent .rank .aleft ul li span:nth-child(4){text-align: right;display: block;padding-right: 7px;}
#main .cent .player .title{background:#fff;height: 65px;line-height: 65px;padding:0 20px;}
#main .cent .player .title .t1{float: left;}
#main .cent .player .title .t2{float: right;}
#main .cent .player .title .t1 img{width: 25px;vertical-align: middle;margin-right: 15px;}
#main .cent .player .title .t1 span{font-size: 17px;}
#main .cent .player .title .t2 img{width: 20px;vertical-align: sub;}
#main .cent .player .title .t2 span{font-size: 14px;}
#main .cent .player .acenter{position: relative;}
#main .cent .player #videomv{width: 100%;height:450px;}
#main .cent .player .control{width: 100%;height:75px;background:#fff;line-height: 75px;}
#main .cent .player .control .left img{vertical-align: middle;cursor: pointer;margin: 0 5px;width: 25px;}
#main .cent .player .control .left{float: left;}
#main .cent .player .control .right{float: right;position: relative;}
#main .cent .player .control .right .proms{width: 300px;height: 220px;background: #292b38;position: absolute;bottom: 60px;border-radius: 10px;left: -125px;}
#main .cent .player .control .right .proms:before {content: "";position: absolute;width: 0;height: 0;border: 7px solid transparent;border-top-color: #32769b;left: 50%;margin-left: -4px;bottom: -14px;}
#main .cent .player .control .right .promy{height: 7px;width: 100%;background: #32769b;position: absolute;bottom: 0;border-bottom-left-radius: 10px;border-bottom-right-radius: 10px;}
#main .cent .player .control .right .proms .sq{font-size: 22px;color: #fff;text-align: center;height: 25px;margin-top: -10px;}
#main .cent .player .control .right .proms .tct{width: 80%;margin: 0 auto;margin-top: 15px;}
#main .cent .player .control .right .proms .tct img{width: 25px;vertical-align: sub;}
#main .cent .player .control .right .proms .tct span{color: #16d8f4;padding-left: 20px;}
#main .cent .player .control .right .proms .arts{width: 80%;margin: 0 auto;margin-top: -15px;color: #fff;line-height: 21px;font-size: 14px;}
#main .cent .player .control .right .proms .an{width: 80%;margin: 0 auto;margin-top: -5px;}
#main .cent .player .control .right .proms .an img{width: 38px;vertical-align:middle;}
#main .cent .player .control .right .proms .an span{color: #fff;font-size: 16px;}
#main .cent .player .control .right .proms .an .jt{float: left;width: 50%;margin-bottom: 10px;cursor: pointer;}
#main .cent .player .control .right .proms .an .hl{float: right;width: 50%;text-align: right;margin-bottom: 10px;cursor: pointer;}
#main .cent .player .control .right .img{width: 45px;margin: 0 10px;vertical-align: middle;cursor: pointer;}
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
.chat .ad{height: 150px;background:blue;width: 100%;}
.chat .im{overflow: auto;height: 330px;padding: 20px 10px 15px 15px;font-size: 14px;}
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
.cont .mains .art .act span{font-size:16px;width: 33.33%;background: #dfebf1;display: block;float: left;height: 40px;text-align: center;line-height: 40px;cursor: pointer;}
.cont .mains .art .act span.active{background: #9fe3ff;}
.cont .mains .art img{width:100%;vertical-align: bottom;}
.p30{clear:both;padding-top: 15px;}
.gift{position: absolute;width: 390px;height: auto;background: #292b38;border-radius: 10px;left: -190px;bottom: 75px;padding:0 10px 10px 10px;opacity: 0.97;}
.gift .giftit{width: 100%;height: 30px;line-height: 30px;text-align: center;}
.gift .giftit span{width: 33.33%;display: block;float: left;cursor: pointer;color: #fff;}
.gift .giftit span.active{color: #29abe2;}
.gift .pre{float: left;width: 10%;margin-top: 20%;}
.gift .next{float: right;width: 10%;margin-top: 20%;}
.gift .pre img{float: left;cursor: pointer;}
.gift .next img{float: right;cursor: pointer;}
.gift .gifmain{margin: 0 auto;width: 80%;float: left;height: 180px;}
.gift .gifmain li{width: 104px;height: 90px;float:left;list-style-type: none;position: relative;cursor: pointer;background: #211931;}
.gift .gifmain li:hover{background: #2b194b;}
.gift .gifmain li img{width: 100%;height: 92px;}
.gift .gifmain li span{position: absolute;bottom: -27px;font-size: 12px;left: 33px;}
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
.sure{position: absolute;background: #292b38;width: 300px;height: 500px;top: -280px;left: 420px;border-radius: 15px;}
.sure .suremain{position: relative;width: 100%;height: 100%;}
.sure .suremain .close{position: absolute;right: 10px;top: 10px;cursor:pointer;}
.sure .suremain p{color: #fff;text-align: center;font-size: 18px;letter-spacing: 6px;height: 50px;line-height: 50px;}
.sure .suremain ul{padding:0 10px;height: 320px;overflow: auto;}
.sure .suremain ul li{width: 33.33%;text-align: center;background: none;height: auto;float: left;line-height: 50px;position: relative;}
.sure .suremain ul li:hover{background: none;}
.sure .suremain ul li img.head{width: 40px;height: auto;margin:0 auto;display: block;cursor: pointer;}
.sure .suremain ul li span.span{margin-top: -10px;display: block;color: #fff;font-size: 12px ! important;margin-right: 0 ! important;}
#check {margin: 20px auto;}
#check .input_check {position: absolute;width: 20px;height: 20px;visibility: hidden;background: #E92333;}
#check span {position: relative;}
#check .input_check+label.label_check {display: inline-block;width: 20px;height: 20px;background: url('/img/sure.png') no-repeat;background-position: -31px -3px;position: absolute;top: 0;left: 28px;}
#check .input_check:checked+label.label_check {background-position: -2px 0px;}
.sure .suremain .total{padding: 0px 40px;margin-top: -20px;}
.sure .suremain .total span{width: 50%;}
.sure .suremain .total span:nth-child(1){color: #969696;font-size: 25px;float: left;}
.sure .suremain .total span:nth-child(2){color: #bb0e57;font-size: 35px;float: right;text-align: right;}
</style>