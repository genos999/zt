<template>
	<div id="main">
		<div class="logo">
			<span>新广科技第一导管室直播</span>
			<img src="img/logo.png">
		</div>
		<div class="ban">
			<video id='videomv' class="video-js vjs-default-skin" controls allowfullscreen="true">
	            <source :src="video">    
	        </video>
		</div>
		<div class="tab">
			<span :class="active==1?'active':''" @click="active=1">互动聊天<u v-if="active==1"><br></u></span>
			<span :class="active==2?'active':''" @click="active=2">排行榜<u v-if="active==2"><br></u></span>
			<span :class="active==3?'active':''" @click="active=3">活动日程<u v-if="active==3"><br></u></span>
		</div>
		<div class="chat" v-if="active==1">
			<div class="kuang">
				<div class="into">专家加入房间<span>欢迎</span></div>
				<div class="bloak">
					<div class="head">
						<img src="img/icon.png">
					</div>
					<div class="rig">
						<span class="name">XXXX主任</span>
						<span class="zj">专家</span>
						<span class="cont">
							今天心血管主题直播，大家可以发起申请和提问，秘书管理一下，8:30正式开始。
						</span>
					</div>
				</div>
				<div class="bloak">
					<div class="head">
						<img src="img/icon.png">
					</div>
					<div class="rig">
						<span class="name">XXXX主任</span>
						<span class="ms">秘书</span>
						<span class="cont">
							收到，主任你还有其他需要安排的嘛？
						</span>
					</div>
				</div>
				<div class="bloak">
					<div class="head">
						<img src="img/icon.png">
					</div>
					<div class="rig">
						<span class="name">XXXX后台</span>
						<span class="xt">系统</span>
						<span class="cont">
							收到！
						</span>
					</div>
				</div>
				<div class="bloak">
					<div class="head">
						<img src="img/icon.png">
					</div>
					<div class="rig">
						<span class="name">XXXX后台</span>
						<span class="cont">
							导播人员准备就绪，好的呀！
						</span>
					</div>
				</div>
			</div>
			<div class="tom">
				<div class="tomsg">
					<img class="own" src="img/m_own.png">
					<input type="text" class="input" v-model="text" placeholder="说两句~">
					<img class="gif" src="img/m_mile.png" @click="doemot">
					<!-- <img class="gif" src="img/m_plus.png"> -->
					<img class="gif" src="img/m_gift.png" @click="dogift">
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
									<!-- <span v-text="g.name"></span> -->
								</li>
								<li v-for="g in gifs2" v-if="gifshow==2" @click="dopostmer(g)" v-cloak>
									<img :src="g.icon+'?v=1'">
									<!-- <span v-text="g.name"></span> -->
								</li>
								<li v-for="g in gifs3" v-if="gifshow==3" @click="dopostmer(g)" v-cloak>
									<img :src="g.icon+'?v=1'">
									<!-- <span v-text="g.name"></span> -->
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
									<button @click="sures">赠送</button>
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
					<div class="emot" v-if="emot" v-cloak>
						<li v-for="e in emoticon" @click="doemot">
							<img :src="e.icon">
						</li>
					</div>
				</div>
			</div>
		</div>
		<div class="chat" v-else-if="active==2">
			<div class="bang">
				<ul>
					<li v-for="(t,i) in guest" :key='i'>
						<span v-text='i+1'></span>
						<span><img :src="t.ico"></span>
						<span v-text='t.name'></span>
						<span v-text='t.pri'></span>
					</li>
				</ul>
			</div>
		</div>
		<div class="chat hy" v-else>
			<img src="img/hy1.png">
			<img src="img/hy2.png">
			<img src="img/hy3.png">
		</div>
	</div>
</template>
<script>
import 'lib-flexible'
import videojs from 'video.js'
import 'videojs-contrib-hls'
import 'video.js/dist/video.min.js'
import { MESSAGE_TYPE } from 'vue-baberrage'
export default {
	data(){
	  	return{
	  		active:1,
	  		act:1,
	  		gifshow:1,
	  		postmer:false,
	  		sure:false,
	  		video:'',
	  		text:'',
	  		zan:false,
	  		emot:false,
	  		items:[],
			num:1,
			attr:[],
			personnum:0,
			checkedValue:'',
	  		guest:[],
			gifs1:[],
			gifs2:[],
			gifs3:[],
			emoticon:[],
			url:'http://demo1.kol110.com/data.php'
	  	}
	},
	methods:{
		getVideo:function(){
			var thar = this;
		  	this.$axios({
			    method:"get",
			    url:thar.url,
			    params:{type:'video'}
			}).
			then((res)=>{
			    thar.video = res.data;
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
			    thar.guest = res.data;
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
			    thar.gifs1 = res.data;
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
			    thar.gifs2 = res.data;
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
			    thar.gifs3 = res.data;
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
			    thar.emoticon = res.data;
			},(err)=>{
			    console.log(err);
			})
		},
		sures:function(){
			var thar = this;
			thar.sure=true;
			thar.postmer=false;
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
		dopostmer:function(o){
			var thar = this;
			thar.postmer = true;
			thar.items = o;
		},
		dogift:function(){
			var thar = this;
			if(thar.zan){
				thar.zan=false;
			}else{
				thar.zan = true;
			}
			thar.emot=false;
		},
		doemot:function(){
			var thar = this;
			if(thar.emot){
				thar.emot = false;
			}else{
				thar.emot = true;
			}
			thar.zan = false;
		}
	},
	mounted(){
		
	},
	created(){
		this.getVideo();
		this.getGuest();
		this.getGifs1();
		this.getGifs2();
		this.getGifs3();
		this.getEmoticon();
	}
}
</script>
<style scoped>
#main{background:url(/img/m_bg.png) no-repeat #020e58;background-size:100%;height: auto;}
.logo{width: 60%;padding-top: 50px;margin:0 auto;}
.logo span{text-align: center;color: #bdbdbd;font-size: 20px;display: block;margin-bottom: 10px;}
.logo img{width: 100%;}
.ban{margin-top: 40px;}
.ban img{width: 100%;}
.ban video{width: 100%;height: 100%;}
.tab{margin-top: 10px;height: 50px;line-height: 50px;}
.tab span{width: 33.33%;text-align: center;display: block;float: left;background: #001150;color: #fff;font-size: 18px;    position: relative;}
.tab span.active{background: #142b9e;}
.tab span u{border-bottom: 4px solid #16b1f4;border-radius: 1px;width: 30px;display: block;position: absolute;bottom: 5px;left: 42%;}
.chat{margin-top:5px;}
.chat .kuang{padding: 1px 40px;height: auto;overflow: auto;max-height: 500px;margin-bottom: 60px;}
.chat .kuang .into{text-align: center;display: table;background: #001150;margin: 0 auto;padding: 3px 18px;border-radius: 20px;}
.chat .kuang .into span{color: #16b1f4;padding-left: 20px;}
.chat .kuang .bloak{margin:10px 0;clear: both;display: flex;}
.chat .kuang .bloak .head{width: 12%;float: left;}
.chat .kuang .bloak .head img{width: 40px;}
.chat .kuang .bloak .rig{width: 87%;float: right;}
.chat .kuang .bloak .rig span{color: #fff;}
.chat .kuang .bloak .rig .zj{background: #16b1f4;margin-left: 15px;padding: 2px 6px;border-radius: 10px;}
.chat .kuang .bloak .rig .ms{background: #fd83b2;margin-left: 15px;padding: 2px 6px;border-radius: 10px;}
.chat .kuang .bloak .rig .xt{background: #16b1f4;margin-left: 15px;padding: 2px 6px;border-radius: 10px;}
.chat .kuang .bloak .rig .cont{display: block;width:60%;margin-left: 0;margin-top: 10px;background: #2c3ea9;padding: 10px 20px;border-top-right-radius: 15px;border-bottom-left-radius: 15px;border-bottom-right-radius: 15px;margin-bottom: 20px;}
.chat .tom{position: relative;}
.chat .tomsg{background: #2c3ea9;height: 60px;width: 95%;position: fixed;bottom: 0;padding: 0 25px;}
.chat .tomsg .own{width: 40px;}
.chat .tomsg .gif{width: 40px;margin-right: 18px;vertical-align: super;}
.chat .tomsg input.input{height: 100px;line-height:normal;font-size: 20px;width: 65%;outline: none;background: none;border: none;padding-left: 20px;color: #fff;padding-bottom: 50px;}
input::-webkit-input-placeholder{padding-top: 5px;line-height: normal;}
.bang ul li{overflow: hidden;font-size: 17px;background: #001150;height: 40px;line-height: 40px;margin: 10px 0;}
.bang ul li span img{width: 21px;vertical-align: text-top;}
.bang ul li span{color: #fff;}
.bang ul li span:nth-child(1){width: 10%;display: block;float: left;padding-left: 20px;}
.bang ul li span:nth-child(2){width: 5%;display: block;float: left;}
.bang ul li span:nth-child(3){width: 65%;display: block;float: left;}
.bang ul li span:nth-child(4){text-align: right;display: block;padding-right: 7px;}
.hy img{width: 100%;vertical-align: bottom;}
.gift{position: absolute;width: 100%;height: auto;background: #292b38;border-radius: 10px;left: 0;bottom: 62px;}
.gift li{width: 78px;height: 70px;float:left;list-style-type: none;position: relative;cursor: pointer;overflow: hidden;}
.gift li img{width: 100%;}
.gift li span{position: absolute;bottom: -27px;font-size: 12px;left: 33px;}
.emot{position: absolute;width: 100%;height: auto;background: #142a6f;left: 0;bottom: 62px;}
.emot li{width: 78px;height: 70px;float:left;list-style-type: none;position: relative;cursor: pointer;overflow: hidden;}
.emot li img{width: 100%;}
.gift{position: absolute;width: 100%;height: auto;background: #102061;border-radius: 10px;left: 0px;bottom: 60px;padding:0;opacity: 0.97;margin: 0 auto;}
.gift .giftit{width: 100%;height: 40px;line-height: 40px;text-align: center;}
.gift .giftit span{width: 33.33%;display: block;float: left;cursor: pointer;color: #fff;}
.gift .giftit span.active{color: #29abe2;}
.gift .pre{float: left;width: 10%;margin-top: 20%;}
.gift .next{float: right;width: 10%;margin-top: 20%;}
.gift .pre img{float: left;cursor: pointer;}
.gift .next img{float: right;cursor: pointer;}
.gift .gifmain{margin: 0 auto;width: 80%;float: left;height: 220px;}
.gift .gifmain li{width: 33.3%;height: 110px;float:left;list-style-type: none;position: relative;cursor: pointer;background: #102061;}
.gift .gifmain li:hover{background: #001150;}
.gift .gifmain li img{width: 100%;height: 110px;}
.gift .gifmain li span{position: absolute;bottom: -27px;font-size: 12px;left: 33px;}
.blue {border-radius: 100px;background: #e6ff75;color: #fff;}
.green {border-radius: 100px;background: #75ffcd;color: #fff;}
.red {border-radius: 100px;background: #e68fba;color: #fff;}
.yellow {border-radius: 100px;background: #dfc795;color: #fff;}
.baberrage-stage {position: absolute;width: 100%;height: 450px;overflow: hidden;top: 0;font-size: 15px;}
/*.emot{position: absolute;width: 485px;height: auto;background: #e0e0e0;left: -160px;bottom: 40px;border-radius: 10px;}*/
/*.emot li{width: 78px;height: 70px;float:left;list-style-type: none;position: relative;cursor: pointer;overflow: hidden;}*/
/*.emot li img{width: 100%;cursor: pointer;}*/
/*.emot li img:hover{background: #b5b5b5;border-radius: 10px;}*/
.postmer{position: absolute;background: #2c3ea9;width: 270px;height: 140px;top: -160px;left: 90px;border-radius: 15px;}
.postmer:before{content: "";position: absolute;width: 0;height: 0;border: 15px solid transparent;border-top-color: #2c3ea9;left: 50%;margin-left: -12px;bottom: -30px;}
.postmer .imgleft{width: 50%;float: left;}
.postmer .imgleft img{margin-top: 15%;width: 100%;}
.postmer .imgright{width: 45%;float: left;padding:5px 0px 0 0;}
.postmer .imgright span{display: block;height: 30px;line-height: 30px;clear:both;}
.postmer .imgright span:nth-child(1){color: #fff;font-size: 15px;}
.postmer .imgright span:nth-child(2){color: #ffea02;font-size: 14px;}
.postmer .imgright span:nth-child(3){color: #fff;font-size: 13px;}
.postmer .imgright span:nth-child(4){color: #ffea02;font-size: 14px;}
.postmer .imgright img{cursor: pointer;}
.postmer .imgright img:nth-child(1){margin-left: 2px;}
.postmer .imgright input{width: 20px;margin:0 2px;border:none;outline: none;background: none;color: #fff;text-align: center;font-size: 12px;height: 30px;line-height: 30px;}
.postmer .imgright span button{font-size: 12px;border:none;background: #102061;color: #fff;padding: 2px 5px;border-radius: 5px;float: right;margin-top: 4px;outline: none;cursor: pointer;}
.sure{position: absolute;background: #292b38;width: 100%;height: 550px;top: -290px;left: 0;border-radius: 15px;}
.sure .suremain{position: relative;width: 90%;height: 100%;}
.sure .suremain .close{position: absolute;right: 10px;top: 10px;cursor:pointer;}
.sure .suremain p{color: #fff;text-align: center;font-size: 18px;letter-spacing: 6px;height: 60px;line-height: 60px;}
.sure .suremain ul{padding:0 10px;height: 320px;overflow: auto;}
.sure .suremain ul li{margin-top:10px;width: 33.33%;text-align: center;background: none;height: 80px;float: left;line-height: 80px;position: relative;}
.sure .suremain ul li:hover{background: none;}
.sure .suremain ul li img.head{width: 40px;height: auto;margin:0 auto;display: block;cursor: pointer;}
.sure .suremain ul li span.span{margin-top: -10px;display: block;color: #fff;font-size: 14px ! important;margin-right: 0 ! important;}
#check {margin: 20px auto;}
#check .input_check {position: absolute;width: 20px;height: 20px;visibility: hidden;background: #E92333;}
#check span {position: relative;}
#check .input_check+label.label_check {display: inline-block;width: 20px;height: 20px;background: url('/img/sure.png') no-repeat;background-position: -31px -3px;position: absolute;top: 0;left: 28px;}
#check .input_check:checked+label.label_check {background-position: -2px 0px;}
.sure .suremain .total{padding: 0px 40px;margin-top: -10px;height: auto;}
.sure .suremain .total span{width: 50%;}
.sure .suremain .total span:nth-child(1){color: #969696;font-size: 25px;float: left;}
.sure .suremain .total span:nth-child(2){color: #bb0e57;font-size: 35px;float: right;text-align: right;}
.way{clear: both;padding:0 10px;margin-top: 0px;display: inline-block;width: 92%;}
.way .ways:nth-child(1){width: 45%;float: left;} 
.way .ways:nth-child(2){width: 55%;float: left;} 
.way .ways:nth-child(2) img{margin-left: 90px;}
.way .ways img{vertical-align: middle;margin:0 5px;margin-left: 80px;}
.way .input_check1,.way .input_check2 {position: absolute;width: 15px;height: 15px;visibility: hidden;background: #E92333;}
.way .input_check1+label.label_check1{display: inline-block;width: 20px;height: 20px;background: url('/img/sure.png') no-repeat;background-position: -30px 0px;position: absolute;bottom: 100px;left: 55px;border:1px solid #ff0267;border-radius: 50%;cursor: pointer;}
.way .input_check2+label.label_check2 {display: inline-block;width: 20px;height: 20px;background: url('/img/sure.png') no-repeat;background-position: -40px -3px;position: absolute;bottom: 100px;left: 280px;border:1px solid #ff0267;border-radius: 50%;cursor: pointer;}
.way .input_check1:checked+label.label_check1,.way .input_check2:checked+label.label_check2 {background-position: 0px 0px;}
.way .ways span{color: #fff;font-size: 16px;}
.way .ways a{color: #fff;background: #00aaee;font-size: 12px;padding: 0px 7px;border-radius: 10px;text-align: right;margin-left: 5px;}
.ofsure{clear:both;height: 40px;margin-top: 15px;}
.ofsure button{clear:both;width: 80%;padding:0 10px;background: #ff0267;color: #fff;height: 40px;line-height: 40px;border:none;outline: none;border-radius: 5px;margin: 0 auto;display: block;cursor: pointer;font-size: 17px;}
</style>