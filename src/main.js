// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './store'
import './assets/iconfont/iconfont.js'

import Components from './components/index'
Vue.use(Components);

Vue.config.productionTip = false

axios.defaults.baseURL = 'http://localhost:3000'
// axios.defaults.baseURL = 'http://192.168.43.215:3000'
// axios.defaults.baseURL = 'http://www.wangyf.cn:3000'
axios.interceptors.request.use(
	config => {
		const token = localStorage.getItem('userToken');
		if (token) {
			// Bearer是JWT的认证头部信息
			config.headers.common['Authorization'] = 'Bearer ' + token;
		}
		return config;
	},
	error => {
		return Promise.reject(error);
	}
);


/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store,
	components: {
		App
	},
	template: '<App/>'
})