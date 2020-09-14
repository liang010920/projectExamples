/** 项目管理路由 */
import Layout from '@/views/layout/workbenchLayout'

function memberType() {
  var memberType = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']

  if (JSON.parse(localStorage.getItem("memberInfo")) != null) {
    if (JSON.parse(localStorage.getItem("memberInfo")).MemberType == '3') {
      memberType = ['5', '6', '7', '8', '9']
    }

    if (JSON.parse(localStorage.getItem("memberInfo")).MemberType == '9') {
      memberType = ['1', '2', '3', '4', '5', '6', '7', '10']
    }
  }

  return memberType
}

// console.log("路由页面的权限菜单---------------" + memberType())

const workbenchRouter = {
  path: '/workbench',
  component: Layout,
  redirect: '/workbench/index',
  name: 'workbench',
  hidden: true,
  meta: {
    title: '首页'
  },
  children: [{
      path: 'index',
      component: () => import('@/views/OAManagement/index'),
      hidden: memberType().indexOf('1') == -1,
      meta: {
        title: '首页',
        icon: 'goout'
      }
    },
    {
      path: 'monitor/index',
      component: () => import('@/views/OAManagement/monitor/index'),
      hidden: memberType().indexOf('2') == -1,
      meta: {
        title: '实时监测',
        icon: 'workbench'
      }
    },
    {
      path: 'statistics/index',
      component: () => import('@/views/OAManagement/statistics/index'),
      hidden: memberType().indexOf('3') == -1,
      meta: {
        title: '统计分析',
        icon: 'examine'
      }
    },
    {
      path: 'earlyWarning/index',
      component: () => import('@/views/OAManagement/earlyWarning/index'),
      hidden: memberType().indexOf('4') == -1,
      meta: {
        title: '报警消息',
        icon: 'task'
      }
    },
    {
      path: 'appraisers/index',
      component: () => import('@/views/OAManagement/appraisers/index'),
      hidden: memberType().indexOf('5') == -1,
      meta: {
        title: '健康评估',
        icon: 'log'
      }
    },
    {
      path: 'record/index',
      component: () => import('@/views/OAManagement/record/index'),
      hidden: memberType().indexOf('6') == -1,
      meta: {
        title: '健康档案',
        icon: 'schedule'
      }
    },
    {
      path: 'intellectual/main',
      component: () => import('@/views/OAManagement/intellectual/main'),
      hidden: memberType().indexOf('7') == -1,
      meta: {
        title: '健康知识',
        icon: 'notice'
      }
    },
    {
      path: 'myinfo/index',
      component: () => import('@/views/OAManagement/myinfo/index'),
      hidden: memberType().indexOf('8') == -1,
      meta: {
        title: '我的资料',
        icon: 'examine-category-overtime'
      }
    },
    {
      path: 'mymessage/main',
      component: () => import('@/views/OAManagement/mymessage/index'),
      hidden: memberType().indexOf('9') == -1,
      meta: {
        title: '我的消息',
        icon: 'examine-category-seven'
      }
    },
    {
      path: '/workbench',
      component: Layout,
      component: () => import('@/views/OAManagement/system/index'),
      hidden: memberType().indexOf('10') == -1,
      name: 'workbench',
      meta: {
        title: '系统管理',
        icon: 'check'
      },
      children: [{
          path: 'member/index',
          component: () => import('@/views/OAManagement/system/member/index'),
          hidden: memberType().indexOf('11') == -1,
          meta: {
            title: '人员管理',
            icon: 'schedule'
          }
        },
        {
          path: 'authority/index',
          component: () => import('@/views/OAManagement/system/authority/index'),
          hidden: memberType().indexOf('12') == -1,
          meta: {
            title: '权限管理',
            icon: 'schedule'
          }
        },
        {
          path: 'systemInfo/index',
          component: () => import('@/views/OAManagement/system/systemInfo/index'),
          hidden: memberType().indexOf('13') == -1,
          meta: {
            title: '系统设置',
            icon: 'schedule'
          }
        },
        {
          path: 'systemLog/index',
          component: () => import('@/views/OAManagement/system/systemLog/index'),
          hidden: memberType().indexOf('14') == -1,
          meta: {
            title: '标签管理',
            icon: 'reminder'
          }
        },
        {
          path: 'banner/index',
          component: () => import('@/views/OAManagement/system/banner/index'),
          hidden: memberType().indexOf('15') == -1,
          meta: {
            title: 'Banner管理',
            icon: 'banner'
          }
        }

      ]
    }
  ]
}

export default workbenchRouter
