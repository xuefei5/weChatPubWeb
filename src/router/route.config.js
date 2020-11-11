import Vue from 'vue'
import VueRouter from 'vue-router'
import memberHome from '@/components/memberHome'
import activityIndex from '@/components/member/activities/activityIndex'
import activityDetail from '@/components/member/activities/activityDetail'
import groupCourses from '@/components/member/groupCourses/groupCourses'
import personalCourses from '@/components/member/personalCourses/personalCourses'
import personalCourseDetail from '@/components/member/personalCourses/personalCourseDetail'
import mine from '@/components/member/mine/mine'
import test from '@/components/member/test/index'

//正式菜单开始
import imitatewechat from '@/components/imitatewechat/index'
import hypermarket from '@/components/hypermarket/index'
import weChatIndex from '@/components/wechat/main/index'
import mainRoute from "../components/wechat/main/mainRoute";
import villageList from "../components/wechat/village/villageList";

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'hash',
    base: __dirname,
    //路由映射map
    routes: [
        //{ path: '/', redirect: '/memberHome/activityIndex' },
        //{ path: '*', redirect: '/memberHome/activityIndex' },
          { path: '/', redirect: '/imitatewechat/index' },
          { path: '*', redirect: '/imitatewechat/index' },
	    {
	      path: '/memberHome',
	      name: 'memberHome',
	      component: memberHome,
	      children:[
	      	   {
			      path: '/memberHome/activityIndex',
			      name: 'activityIndex',
			      component: activityIndex,
            meta:{
              index:2
            },
			    },
			     {
			      path: '/memberHome/activityDetail/:activityId',
			      name: 'activityDetail',
			      component: activityDetail
			    },
			    {
			      path: '/memberHome/groupCourses',
			      name: 'groupCourses',
			      component: groupCourses
			    },
			    {
			      path: '/memberHome/mine',
			      name: 'mine',
			      component: mine
			    },
			    {
			      path: '/memberHome/personalCourses',
			      name: 'personalCourses',
			      component: personalCourses
			    },
			     {
			      path: '/memberHome/personalCourseDetail/:courseId/:date',
			      name: 'personalCourseDetail',
			      component: personalCourseDetail
			    },
          {
            path: '/memberHome/test',
            name: 'test',
            component: test
          }

	      ]
	    },
      //正式菜单开始
      {
        path: '/imitatewechat/index',
        name: 'imitatewechat',
        component: imitatewechat,
        meta:{
          index:1
        },
        children:[
          ]
      },
      {
        path: '/hypermarket/index',
        name: 'hypermarket',
        component: hypermarket,
        meta:{
          index:2
        },
        children:[
        ]
      },
      {
        path: '/weChatMain',
        name: 'weChatMain',
        component: weChatIndex,
        meta:{
          index:2
        }
      },
      {
        path: '/mainRoute',
        name: 'mainRoute',
        component: mainRoute,
        meta:{
          index:3
        },
        children:[
          {
            path: 'villageList',
            name: 'villageList',
            component: villageList,
            meta:{
              index:4
            }
          }
        ]
      },

    ]
});

export default router;
