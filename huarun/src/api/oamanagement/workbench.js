import request from '@/utils/request'

export function GetParam(data) {

    var query = ""
    for (let i in data) {
        query += i + "=" + data[i] + "&"
    }

    if (query.length > 0) query = "?" + query
    console.log("param-----" + query)

    return query
}

// 会员列表
export function workbenchList(data) {

    return request({
        url: 'api/Member/GetMemberList' + GetParam(data),
        method: 'post',
        data: {}
    })
}
// 获得手环图表
export function EchartsInfo(data) {
    return request({
        url: '/api/DeviceData/GetDeviceDataChart' + GetParam(data),
        method: 'get',
        data: {}
    })
}

// 获得报警数据
export function WarnList(data) {
    return request({
        url: '/api/DeviceWarn/GetDeviceWarnList' + GetParam(data),
        method: 'get',
        data: {}
    })
}
// 获得报警图表数据
export function GetDeviceWarnChart(data) {
    return request({
        url: '/api/DeviceWarn/GetDeviceWarnChart' + GetParam(data),
        method: 'get',
        data: {}
    })
}

// 获取预警评估详情
export function GetMemberHealthInfo_ByWarnId(data) {
    return request({
        url: '/api/MemberHealth/GetMemberHealthInfo_ByWarnId' + GetParam(data),
        method: 'post',
        data: {}
    })
}

// 报警短信提醒
export function DeviceWarnDelete(data) {
    return request({
        url: '/api/DeviceWarn/DeviceWarnDelete' + GetParam(data),
        method: 'post',
        data: {}
    })
}

// 获得报警设置
export function WarnSettingList(data) {
    return request({
        url: 'api/DeviceWarnSetting/GetDeviceWarnSettingList',
        method: 'get',
        data: data
    })
}

// 修改报警设置
export function UpdateWarnSettingList(data) {
    return request({
        url: 'api/DeviceWarnSetting/UpdateDeviceWarnSettingList',
        method: 'post',
        data: data,
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    })
}

// 报警短信提醒
export function SendSms(data) {
    return request({
        url: '/api/Common/SendSms' + GetParam(data),
        method: 'post',
        data: {}
    })
}
// 报警打电话提醒
export function SendTel(data) {
    return request({
        url: '/api/Common/SendTel' + GetParam(data),
        method: 'post',
        data: {}
    })
}
// 会员添加或编辑
export function MemberAdd(data) {
    return request({
        url: '/api/Member/MemberAdd',
        method: 'post',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        data: data
    })
}
// 会员删除
export function MemberDelete(data) {
    return request({
        url: '/api/Member/MemberDelete' + GetParam(data),
        method: 'post',
        data: {}
    })
}

// 获得会员信息
export function MemberInfo(data) {
    return request({
        url: '/api/Member/GetMemberInfo' + GetParam(data),
        method: 'post',
        data: {}
    })
}
// 医生审核
export function MemberDoctorAudit(data) {
    return request({
        url: '/api/MemberDoctor/MemberDoctorAudit' + GetParam(data),
        method: 'post',
        data: {}
    })
}

export function oaMessageNumAPI(data) {
    return request({
        url: 'OaBackLog/num',
        method: 'post',
        data: data
    })
}

export function upload(data) {
    return request({
        url: '/api/Common/upload',
        method: 'post',
        data: data,
        headers: {
            'Content-Type': 'multipart/form-data'
          }
    })
}

// 新闻添加
export function NewsAdd(data) {
    return request({
        url: '/api/News/NewsAdd',
        method: 'post',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        data: data
    })
}

// 新闻删除
export function NewsDelete(data) {
    return request({
        url: '/api/News/NewsDelete' + GetParam(data),
        method: 'post',
        data: {}
    })
}

// 新闻列表
export function GetNewsList(data) {
    return request({
        url: '/api/News/GetNewsList' + GetParam(data),
        method: 'post',
        data: {}
    })
}
// 新闻详情
export function GetNewsInfo(data) {
    return request({
        url: '/api/News/GetNewsInfo' + GetParam(data),
        method: 'post',
        data: {}
    })
}

// 健康评估添加修改
export function MemberHealthAdd(data) {
    return request({
        url: '/api/MemberHealth/MemberHealthAdd',
        method: 'post',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        data: data
    })
}

// 健康评估删除
export function MemberHealthDelete(data) {
    return request({
        url: '/api/MemberHealth/MemberHealthDelete' + GetParam(data),
        method: 'post',
        data: {}
    })
}
// 健康评估列表
export function GetMemberHealthList(data) {
    return request({
        url: '/api/MemberHealth/GetMemberHealthList' + GetParam(data),
        method: 'post',
        data: {}
    })
}

// 健康评估列表详情
export function GetMemberHealthInfo(data) {
    return request({
        url: '/api/MemberHealth/GetMemberHealthInfo' + GetParam(data),
        method: 'post',
        data: {}
    })
}

// 健康档案列表
export function GetMemberAttachList(data) {
    return request({
        url: '/api/MemberAttach/GetMemberAttachList' + GetParam(data),
        method: 'post',
        data: {}
    })
}

// 档案添加
export function MemberAttachAdd(data) {
    return request({
        url: '/api/MemberAttach/MemberAttachAdd',
        method: 'post',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        data: data
    })
}
// 档案删除
export function MemberAttachDelete(data) {
    return request({
        url: '/api/MemberAttach/MemberAttachDelete' + GetParam(data),
        method: 'post',
        data: {}
    })
}

// 档案详情
export function GetMemberAttachInfo(data) {
    return request({
        url: '/api/MemberAttach/GetMemberAttachInfo' + GetParam(data),
        method: 'post',
        data: {}
    })
}

// 医生添加或编辑
export function MemberDoctorAdd(data) {
    return request({
        url: '/api/MemberDoctor/MemberDoctorAdd',
        method: 'post',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        data: data
    })
}

// 医生列表
export function GetMemberDoctorList(data) {
    return request({
        url: '/api/MemberDoctor/GetMemberDoctorList' + GetParam(data),
        method: 'post',
        data: {}
    })
}
// 医生删除
export function MemberDoctorDelete(data) {
    return request({
        url: '/api/MemberDoctor/MemberDoctorDelete' + GetParam(data),
        method: 'post',
        data: {}
    })
}
// 医生详情
export function GetMemberDoctorInfo(data) {
    return request({
        url: '/api/MemberDoctor/GetMemberDoctorInfo' + GetParam(data),
        method: 'post',
        data: {}
    })
}
// 管理人员列表
export function GetMemberAdminList(data) {
    return request({
        url: '/api/MemberAdmin/GetMemberAdminList' + GetParam(data),
        method: 'post',
        data: {}
    })
}
// 管理人员添加
export function MemberAdminAdd(data) {
    return request({
        url: '/api/MemberAdmin/MemberAdminAdd',
        method: 'post',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        data: data
    })
}
// 管理人员详情
export function GetMemberAdminInfo(data) {
    return request({
        url: '/api/MemberAdmin/GetMemberAdminInfo'+ GetParam(data),
        method: 'post',
        data: {}
    })
}
// 管理人员删除
export function MemberAdminDelete(data) {
    return request({
        url: '/api/MemberAdmin/MemberDoctorDelete'+ GetParam(data),
        method: 'post',
        data: {}
    })
}
// 获得角色列表
export function GetSysUserRoleList(data) {
    return request({
        url: '/api/SysUserRole/GetSysUserRoleList'+ GetParam(data),
        method: 'get',
        data: {}
    })
}
// 角色添加或编辑
export function SysUserRoleAdd(data) {
    return request({
        url: '/api/SysUserRole/SysUserRoleAdd',
        method: 'post',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        data: data
    })
}
// 获得角色信息
export function GetSysUserRoleInfo(data) {
    return request({
        url: '/api/SysUserRole/GetSysUserRoleInfo'+ GetParam(data),
        method: 'post',
        data: {}
    })
}
// 角色权限删除
export function SysUserRoleDelete(data) {
    return request({
        url: '/api/SysUserRole/SysUserRoleDelete'+ GetParam(data),
        method: 'post',
        data: {}
    })
}
// 获得登录人员的首页数据
export function GetMemberIndex(data) {
    return request({
        url: '/api/Member/GetMemberIndex'+ GetParam(data),
        method: 'post',
        data: {}
    })
}
// 会员导入
export function MemberExportIn(data) {
    return request({
        url: '/api/Member/MemberExportIn',
        method: 'post',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        data: data
    })
}
// 会员登录
export function MemberLogin(data) {
    return request({
        url: '/api/Member/MemberLogin' + GetParam(data),
        method: 'post',
        data: {}
    })
}
// 获得登录人员的大屏数据
export function GetMemberIndexTotal(data) {
    return request({
        url: '/api/Member/GetMemberIndexTotal' + GetParam(data),
        method: 'post',
        data: {}
    })
}

// banner删除
export function SysBannerDelete(data) {
    return request({
        url: '/api/SysBanner/SysBannerDelete'+ GetParam(data),
        method: 'post',
        data: {}
    })
}
// banner列表
export function GetSysBannerList(data) {
    return request({
        url: '/api/SysBanner/GetSysBannerList'+ GetParam(data),
        method: 'get',
        data: {}
    })
}
// banner添加或编辑
export function SysBannerAdd(data) {
    return request({
        url: '/api/SysBanner/SysBannerAdd',
        method: 'post',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        data: data
    })
}
// banner信息
export function GetSysBannerInfo(data) {
    return request({
        url: '/api/SysBanner/GetSysBannerInfo'+ GetParam(data),
        method: 'post',
        data: {}
    })
}
// 消息添加或编辑
export function SysMessageAdd(data) {
    return request({
        url: '/api/SysMessage/SysMessageAdd',
        method: 'post',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        data: data
    })
}
// 消息列表
export function GetSysMessageList(data) {
    return request({
        url: '/api/SysMessage/GetSysMessageList'+ GetParam(data),
        method: 'get',
        data: {}
    })
}
// 消息删除
export function SysMessageDelete(data) {
    return request({
        url: '/api/SysMessage/SysMessageDelete'+ GetParam(data),
        method: 'post',
        data: {}
    })
}
// 消息信息
export function GetSysMessageInfo(data) {
    return request({
        url: '/api/SysMessage/GetSysMessageInfo'+ GetParam(data),
        method: 'post',
        data: {}
    })
}
//人员信息导入信息
export function GetMemberList(data){
  return request({
      url: '/api/Member/GetMemberList'+ GetParam(data),
      method: 'post',
      data: {}
  })
}
