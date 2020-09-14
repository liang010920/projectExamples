import request from '@/utils/request'


//组织结构树
export function getOrganizationTree(data) {
  return request({
    url: '/api/SysOrganization/GetOrganizationTree',
    method: 'post',
    data
  })
}


//组织机构
export function getOrganizationList(data) {
  return request({
    url: '/api/SysOrganization/GetOrganizationList?id='+data.id+"&level="+data.level+"&name"+data.name,
    method: 'post',
    // paarm:{
    //   id:data.id,
    //   level:data.level,
    //   name:data.name
    // }
  })
}


//组织机构新增修改
export function organizationEdit(data) {
  return request({
    url: '/api/SysOrganization/OrganizationEdit',
    method: 'post',
    data: data,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}


//组织机构删除
export function organizationBatchDelete(data) {
  return request({
    url: '/api/SysOrganization/OrganizationBatchDelete?id='+data.id,
    method: 'get',
    // data:{
    //   id:data.id
    // }
  })
}
