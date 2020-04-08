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
					<input type="text" v-model="text" placeholder="说两句~">
					<img class="gif" src="img/m_mile.png" @click="doemot">
					<!-- <img class="gif" src="img/m_plus.png"> -->
					<img class="gif" src="img/m_gift.png" @click="dogift">
					<div class="gift" v-if="zan" v-cloak>
						<li v-for="g in gifs" @click="dogift">
							<img :src="g.icon">
							<!-- <span v-text="g.name"></span> -->
						</li>
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
	  		video:'http://ivi.bupt.edu.cn/hls/cctv1hd.m3u8',
	  		text:'',
	  		zan:false,
	  		emot:false,
	  		guest:[
				{ico:'img/icon.png',name:'北京导管室主任',pri:'108E币'},
				{ico:'img/icon.png',name:'北京导管室主任',pri:'109E币'},
				{ico:'img/icon.png',name:'北京导管室主任北京导管室主任北京导管室主任',pri:'102E币'},
				{ico:'img/icon.png',name:'北京导管室主任',pri:'10E币'},
				{ico:'img/icon.png',name:'北京导管室主任',pri:'98E币'},
				{ico:'img/icon.png',name:'北京导管室主任',pri:'138E币'},
				{ico:'img/icon.png',name:'北京导管室主任',pri:'128E币'},
				{ico:'img/icon.png',name:'北京导管室主任',pri:'77E币'},
				{ico:'img/icon.png',name:'北京导管室主任',pri:'13E币'},
				{ico:'img/icon.png',name:'北京导管室主任',pri:'68E币'}
			],
			gifs:[
				{icon:'img/gif_01.png',name:'绷带'},
				{icon:'img/gif_02.png',name:'口罩'},
				{icon:'img/gif_03.png',name:'眼罩'},
				{icon:'img/gif_04.png',name:'药箱'},
				{icon:'img/gif_05.png',name:'心跳'},
				{icon:'img/gif_06.png',name:'一帆风顺'},
				{icon:'img/gif_07.png',name:'和平鸽'},
				{icon:'img/gif_08.png',name:'创口贴'},
				{icon:'img/gif_09.png',name:'小蓝瓶'},
				{icon:'img/gif_10.png',name:'针筒'},
				{icon:'img/gif_11.png',name:'纤服'},
				{icon:'img/gif_12.png',name:'防护服'},
				{icon:'img/gif_13.png',name:'救护车'},
				{icon:'img/gif_14.png',name:'羽蛇神'},
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
			]
	  	}
	},
	methods:{
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
.chat .tomsg input{height: 100px;line-height:normal;font-size: 20px;width: 65%;outline: none;background: none;border: none;padding-left: 20px;color: #fff;padding-bottom: 50px;}
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
</style>