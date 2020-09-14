import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import menu from '../views/menu/index.vue'
import info from '../views/menu/info.vue'

Vue.use(VueRouter)

const routes = [
	// {
	//   path: '/',
	//   name: 'Home',
	//   component: Home
	// },
	{
		path: '/',
		name: 'menu',
		component: menu,
		children: [{
			path: '/info',
			name: 'info',
			component: info,
			meta: {
				title: '一级',
			}
		},{
			path:'/',
			redirect:'/info'
		}]
	},

	// {
	//   path: '/about',
	//   name: 'About',
	//   // route level code-splitting
	//   // this generates a separate chunk (about.[hash].js) for this route
	//   // which is lazy-loaded when the route is visited.
	//   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
	// }
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
