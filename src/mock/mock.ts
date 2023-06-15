import Mock from 'mockjs'
import Vue from 'vue'
import { UserModule } from '@/store/modules/user'
import { i18n } from '@/lang'
import { LayoutconfModule } from '@/store/modules/layoutconf'

export interface IconfontConfigFace {
  code: string | number;
  data: object;
}

export interface LayoutConfigFace {
  code: string | number;
  data: object;
}


export const getIconfontConfig = function () {
  let config: IconfontConfigFace = {
    code: 0,
    data: {
      i18n: 'zh-CN',
      iconfont: {
        current: 'iconfont_2'
      },
      ttf: {
        current: 'puHuiTi'
      },
      ioTheme: {
        current: 'light'
      },
      theme: {
        current: 'theme-default',
        name: '默认主题',
        color: '#2E78FF'
      }
    }
  }

  return config
}

export const getLayoutConfig = function () {
  let config: LayoutConfigFace = {
    code: 0,
    data: {
      asMode: 'F-Mode',
      asConf: {
        isShowHamburger: true,
        isShowBreadcrumb: false,
        tab: {
          isShow: false
        },
        logo: {
          isShow: true,
          src: 'https://pic.imgdb.cn/item/643e33620d2dde577757401d.png',
          title: '易迅通业务系统管理端'
        },
        sidebar: {
          isCollapse: true
        },
        navbar: {
          isShow: true,
          items: [
            { id: 'lang', icon: '', lang_zh: '中/英', lang_en: 'Zh/En', isShow: true },
            { id: 'setting', icon: '', lang_zh: '设置', lang_en: 'Setting', isShow: true },
            { id: 'theme', icon: '', lang_zh: '主题', lang_en: 'Theme', isShow: true }
          ]
        },
        contentLayout: {
          current: LayoutconfModule.storeWorkbenchArr,
          items: [
            { id: 'mode_1', label: '布局一', value: 'LAYOUT_MODE_1', content: LAYOUT_MODE_1(), isActive: true },
            { id: 'mode_2', label: '布局二', value: 'LAYOUT_MODE_2', content: LAYOUT_MODE_2() },
            { id: 'mode_3', label: '布局三', value: 'LAYOUT_MODE_3', content: LAYOUT_MODE_3() },
            { id: 'mode_4', label: '布局四', value: 'LAYOUT_MODE_4', content: LAYOUT_MODE_4() }
          ]
        }
      }
    }
  }

  return config
}

export const getWorkbenchList = function () {
  let res = {
    code: 0,
    data: {
      total: 10,
      list: [
        {
          id: 'cLpyeF5#BmO[oM#qhD',
          title: '公车门户',
          name: '公车门户',
          orgName: ['单位1', '单位2'],
          orgRole: ['角色1', '角色2'],
          status: false,
          publishStatus: false,
          orgApply: '',
          crtUser: 'Linda Thomas',
          updTime: '1994-07-20'
        },
        {
          id: 'qDl^[@)Fw2L',
          title: '海南门户',
          name: '海南门户',
          orgName: '',
          orgRole: '',
          orgApply: '',
          status: false,
          publishStatus: false,
          crtUser: 'Jose Thompson',
          updTime: '2005-08-20'
        },
        {
          id: '7PzcwC1!xLLqC6wu0j',
          title: '神木门户',
          name: '神木门户',
          orgName: '',
          orgRole: '',
          orgApply: '不动产台账',
          status: true,
          publishStatus: true,
          crtUser: 'Ronald Brown',
          updTime: '2017-09-29'
        },
        {
          id: ')HdWrs*eVMxaowdh5G',
          title: '不动产门户不动产门户不动产门户不动产门户',
          name: '不动产门户不动产门户不动产门户不动产门户',
          orgName: ['单位1', '单位2'],
          orgRole: ['角色1', '角色2'],
          orgApply: '不动产台账',
          status: true,
          publishStatus: true,
          crtUser: 'Daniel White',
          updTime: '1992-01-21'
        },
        {
          id: 'dkqjJ)R',
          title: 'Pmilgj Dwzhcpjng Veweqw Wvqk',
          name: 'Pmilgj Dwzhcpjng Veweqw Wvqk',
          orgName: ['单位1', '单位2'],
          orgRole: ['角色1', '角色2'],
          orgApply: '不动产台账',
          status: false,
          publishStatus: true,
          crtUser: 'Richard Thomas',
          updTime: '2006-09-15'
        },
        {
          id: 'R3)uQX#6X2!Mcm!',
          title: 'Wdmm Mki Tpgl',
          name: 'Wdmm Mki Tpgl',
          orgName: ['单位1', '单位2'],
          orgRole: ['角色1', '角色2'],
          orgApply: '不动产台账',
          status: true,
          publishStatus: true,
          crtUser: 'Deborah Martin',
          updTime: '2015-12-10'
        },
        {
          id: ')8vted2Nfh*X2^',
          title: 'Tlbgiumib Aoyusdsuo Eapsqbgvfk Mthor',
          name: 'Tlbgiumib Aoyusdsuo Eapsqbgvfk Mthor',
          orgName: ['单位1', '单位2'],
          orgRole: ['角色1', '角色2'],
          orgApply: '不动产台账',
          status: false,
          publishStatus: true,
          crtUser: 'Linda Garcia',
          updTime: '2007-10-18'
        }
      ]
    }
  }
  return res
}

Mock.mock(`${process.env.VUE_APP_BASE_API}/mock/getIconfont`, 'get', getIconfontConfig)
Mock.mock(`${process.env.VUE_APP_BASE_API}/mock/getLayoutConfig`, 'get', getLayoutConfig)
Mock.mock(`${process.env.VUE_APP_BASE_API}/mock/getWorkbenchList`, 'get', getWorkbenchList)

Vue.prototype.$mock = Mock

export function LAYOUT_MODE_1() {
  // const accessToken = UserModule.token

  return [
    {
      x: 0,
      y: 0,
      w: 4,
      h: 4,
      i: '0',
      comp: {
        id: 'YxtImmovableApp',
        compName: 'YxtImmovableApp',
        compNameContent: 'YxtBissAppPanelContent',
        compNameExtyle: 'YxtBissAppPanelExtyle',
        icon: 'icon-Sort uiicon',
        title: '不动产统一管理',
        type: 'biss',
        panel: {
          content: {
            base_rows: [
              {
                id: 'title',
                type: 'input',
                inputType: 'input',
                label: '应用名称',
                value: '不动产统一管理',
                maxlength: 20,
                isAlwaysShow: true,
                rules: [
                  {
                    required: true,
                    message: '请输入应用名称',
                    trigger: 'blur'
                  }
                ]
              }
            ],
            exec_rows: [
              {
                id: 'application',
                type: 'select',
                label: '选择应用',
                value: '0',
                isAlwaysShow: true,
                rules: [
                  {
                    required: true,
                    message: '请选择应用',
                    trigger: 'blur'
                  }
                ],
                arr: [
                  {
                    label: '不动产统一管理',
                    value: '0'
                  },
                  {
                    label: '公务用车',
                    value: '1'
                  },
                  {
                    label: '公共机构节能',
                    value: '2'
                  },
                  {
                    label: '标准仓',
                    value: '3'
                  },
                  {
                    label: '监管中心',
                    value: '4'
                  }
                ]
              }
            ]
          },
          extyle: {
            cssMode: {
              current: 'LR',
              arr: [
                {
                  id: '0',
                  label: '样式-1',
                  value: 'LR',
                  src: 'https://pic2.imgdb.cn/item/642a7490a682492fcc0cc8b4.jpg'
                },
                {
                  id: '1',
                  label: '样式-2',
                  value: 'TB',
                  src: 'https://pic2.imgdb.cn/item/642a7477a682492fcc0c6e6a.jpg'
                }
              ]
            },
            imgMode: {
              current: 'none',
              arr: [
                {
                  id: '0',
                  label: '显示原图',
                  value: 'none'
                },
                {
                  id: '1',
                  label: '等比拉伸',
                  value: 'fill'
                }
              ]
            },
            iconClazz: {
              current: 'app_1',
              arr: []
            }
          }
        },
        requestConfig: {
          requestUrl: 'http://10.15.1.220:30082/api',
          accessToken: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODU3NTc5ODMsInVzZXJJZCI6MTAsInVzZXJfbmFtZSI6ImFkbWluIiwianRpIjoiMDU3NTMyZWEtNmZkMi00MGU4LWFiMjUtMjMyNzcxZGMwNzMyIiwiY2xpZW50X2lkIjoid2ViX2JhY2siLCJzY29wZSI6WyJiYWNrIl19.IMKUo08N03icTOQkN0d1dZFZkeUjvYMRW7k_UkF7bVOZKIqbI6LtCBqrvgcR3KxCxBK8iZKLmic3JOw2gR7dMsWQoJptRU6pgGkMr99TIHfBRyx5QUMFwx3UZjjozmKCuFGH-j8D0TnQILAKCGKHEeSRNGLxJZHZPF7_bI4wA1vRnJLsc5yUrgIKcy7lajtdIAcZgrmXVhE7Azwh8DNMxRNwLFXmfnhfcEsj0FuiWg8t3L8S6J7dH6uMOCO6mGY8RO2pnXFf5KNpnHzvKa4Yly2v-_kXPVVyoxxH0Zi0PjeNrOZDZW5zqCq4Mbq-x4IFNK4XFusUfgH9aSSMckScWw',
          roleId: '34',
          tenantId: '1',
          enterpriseCode: 'GW_202112081112116903',
          applicationCode: '001',
          applicationId: '1'
        },
        xyz: {
          i: '0'
        }
      },
      moved: false
    },
    {
      x: 4,
      y: 0,
      w: 4,
      h: 4,
      i: '1',
      comp: {
        id: 'YxtVehicleApp',
        compName: 'YxtVehicleApp',
        compNameContent: 'YxtBissAppPanelContent',
        compNameExtyle: 'YxtBissAppPanelExtyle',
        icon: 'icon-Sort uiicon',
        title: '公务用车',
        type: 'biss',
        panel: {
          content: {
            base_rows: [
              {
                id: 'title',
                type: 'input',
                inputType: 'input',
                label: '应用名称',
                value: '公务用车',
                maxlength: 20,
                isAlwaysShow: true,
                rules: [
                  {
                    required: true,
                    message: '请输入应用名称',
                    trigger: 'blur'
                  }
                ]
              }
            ],
            exec_rows: [
              {
                id: 'application',
                type: 'select',
                label: '选择应用',
                value: '1',
                isAlwaysShow: true,
                rules: [
                  {
                    required: true,
                    message: '请选择应用',
                    trigger: 'blur'
                  }
                ],
                arr: [
                  {
                    label: '不动产统一管理',
                    value: '0'
                  },
                  {
                    label: '公务用车',
                    value: '1'
                  },
                  {
                    label: '公共机构节能',
                    value: '2'
                  },
                  {
                    label: '标准仓',
                    value: '3'
                  },
                  {
                    label: '监管中心',
                    value: '4'
                  }
                ]
              }
            ]
          },
          extyle: {
            cssMode: {
              current: 'LR',
              arr: [
                {
                  id: '0',
                  label: '样式-1',
                  value: 'LR',
                  src: 'https://pic2.imgdb.cn/item/642a7490a682492fcc0cc8b4.jpg'
                },
                {
                  id: '1',
                  label: '样式-2',
                  value: 'TB',
                  src: 'https://pic2.imgdb.cn/item/642a7477a682492fcc0c6e6a.jpg'
                }
              ]
            },
            imgMode: {
              current: 'none',
              arr: [
                {
                  id: '0',
                  label: '显示原图',
                  value: 'none'
                },
                {
                  id: '1',
                  label: '等比拉伸',
                  value: 'fill'
                }
              ]
            },
            iconClazz: {
              current: 'app_2',
              arr: []
            }
          }
        },
        requestConfig: {
          requestUrl: 'http://10.15.1.220:30082/api',
          accessToken: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODU3NTc5ODMsInVzZXJJZCI6MTAsInVzZXJfbmFtZSI6ImFkbWluIiwianRpIjoiMDU3NTMyZWEtNmZkMi00MGU4LWFiMjUtMjMyNzcxZGMwNzMyIiwiY2xpZW50X2lkIjoid2ViX2JhY2siLCJzY29wZSI6WyJiYWNrIl19.IMKUo08N03icTOQkN0d1dZFZkeUjvYMRW7k_UkF7bVOZKIqbI6LtCBqrvgcR3KxCxBK8iZKLmic3JOw2gR7dMsWQoJptRU6pgGkMr99TIHfBRyx5QUMFwx3UZjjozmKCuFGH-j8D0TnQILAKCGKHEeSRNGLxJZHZPF7_bI4wA1vRnJLsc5yUrgIKcy7lajtdIAcZgrmXVhE7Azwh8DNMxRNwLFXmfnhfcEsj0FuiWg8t3L8S6J7dH6uMOCO6mGY8RO2pnXFf5KNpnHzvKa4Yly2v-_kXPVVyoxxH0Zi0PjeNrOZDZW5zqCq4Mbq-x4IFNK4XFusUfgH9aSSMckScWw',
          roleId: '34',
          tenantId: '1',
          enterpriseCode: 'GW_202112081112116903',
          applicationCode: '001',
          applicationId: '1'
        },
        xyz: {
          i: '1'
        }
      },
      moved: false
    },
    {
      x: 8,
      y: 0,
      w: 4,
      h: 4,
      i: '2',
      comp: {
        id: 'YxtEnergyApp',
        compName: 'YxtEnergyApp',
        compNameContent: 'YxtBissAppPanelContent',
        compNameExtyle: 'YxtBissAppPanelExtyle',
        icon: 'icon-Sort uiicon',
        title: '公共机构节能',
        type: 'biss',
        panel: {
          content: {
            base_rows: [
              {
                id: 'title',
                type: 'input',
                inputType: 'input',
                label: '应用名称',
                value: '公共机构节能',
                maxlength: 20,
                isAlwaysShow: true,
                rules: [
                  {
                    required: true,
                    message: '请输入应用名称',
                    trigger: 'blur'
                  }
                ]
              }
            ],
            exec_rows: [
              {
                id: 'application',
                type: 'select',
                label: '选择应用',
                value: '2',
                isAlwaysShow: true,
                rules: [
                  {
                    required: true,
                    message: '请选择应用',
                    trigger: 'blur'
                  }
                ],
                arr: [
                  {
                    label: '不动产统一管理',
                    value: '0'
                  },
                  {
                    label: '公务用车',
                    value: '1'
                  },
                  {
                    label: '公共机构节能',
                    value: '2'
                  },
                  {
                    label: '标准仓',
                    value: '3'
                  },
                  {
                    label: '监管中心',
                    value: '4'
                  }
                ]
              }
            ]
          },
          extyle: {
            cssMode: {
              current: 'LR',
              arr: [
                {
                  id: '0',
                  label: '样式-1',
                  value: 'LR',
                  src: 'https://pic2.imgdb.cn/item/642a7490a682492fcc0cc8b4.jpg'
                },
                {
                  id: '1',
                  label: '样式-2',
                  value: 'TB',
                  src: 'https://pic2.imgdb.cn/item/642a7477a682492fcc0c6e6a.jpg'
                }
              ]
            },
            imgMode: {
              current: 'none',
              arr: [
                {
                  id: '0',
                  label: '显示原图',
                  value: 'none'
                },
                {
                  id: '1',
                  label: '等比拉伸',
                  value: 'fill'
                }
              ]
            },
            iconClazz: {
              current: 'app_3',
              arr: []
            }
          }
        },
        requestConfig: {
          requestUrl: 'http://10.15.1.220:30082/api',
          accessToken: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODU3NTc5ODMsInVzZXJJZCI6MTAsInVzZXJfbmFtZSI6ImFkbWluIiwianRpIjoiMDU3NTMyZWEtNmZkMi00MGU4LWFiMjUtMjMyNzcxZGMwNzMyIiwiY2xpZW50X2lkIjoid2ViX2JhY2siLCJzY29wZSI6WyJiYWNrIl19.IMKUo08N03icTOQkN0d1dZFZkeUjvYMRW7k_UkF7bVOZKIqbI6LtCBqrvgcR3KxCxBK8iZKLmic3JOw2gR7dMsWQoJptRU6pgGkMr99TIHfBRyx5QUMFwx3UZjjozmKCuFGH-j8D0TnQILAKCGKHEeSRNGLxJZHZPF7_bI4wA1vRnJLsc5yUrgIKcy7lajtdIAcZgrmXVhE7Azwh8DNMxRNwLFXmfnhfcEsj0FuiWg8t3L8S6J7dH6uMOCO6mGY8RO2pnXFf5KNpnHzvKa4Yly2v-_kXPVVyoxxH0Zi0PjeNrOZDZW5zqCq4Mbq-x4IFNK4XFusUfgH9aSSMckScWw',
          roleId: '34',
          tenantId: '1',
          enterpriseCode: 'GW_202112081112116903',
          applicationCode: '001',
          applicationId: '1'
        },
        xyz: {
          i: '2'
        }
      },
      moved: false
    },
    {
      x: 12,
      y: 0,
      w: 4,
      h: 4,
      i: '3',
      comp: {
        id: 'YxtStandardApp',
        compName: 'YxtStandardApp',
        compNameContent: 'YxtBissAppPanelContent',
        compNameExtyle: 'YxtBissAppPanelExtyle',
        icon: 'icon-Sort uiicon',
        title: '标准仓',
        type: 'biss',
        panel: {
          content: {
            base_rows: [
              {
                id: 'title',
                type: 'input',
                inputType: 'input',
                label: '应用名称',
                value: '标准仓',
                maxlength: 20,
                isAlwaysShow: true,
                rules: [
                  {
                    required: true,
                    message: '请输入应用名称',
                    trigger: 'blur'
                  }
                ]
              }
            ],
            exec_rows: [
              {
                id: 'application',
                type: 'select',
                label: '选择应用',
                value: '3',
                isAlwaysShow: true,
                rules: [
                  {
                    required: true,
                    message: '请选择应用',
                    trigger: 'blur'
                  }
                ],
                arr: [
                  {
                    label: '不动产统一管理',
                    value: '0'
                  },
                  {
                    label: '公务用车',
                    value: '1'
                  },
                  {
                    label: '公共机构节能',
                    value: '2'
                  },
                  {
                    label: '标准仓',
                    value: '3'
                  },
                  {
                    label: '监管中心',
                    value: '4'
                  }
                ]
              }
            ]
          },
          extyle: {
            cssMode: {
              current: 'LR',
              arr: [
                {
                  id: '0',
                  label: '样式-1',
                  value: 'LR',
                  src: 'https://pic2.imgdb.cn/item/642a7490a682492fcc0cc8b4.jpg'
                },
                {
                  id: '1',
                  label: '样式-2',
                  value: 'TB',
                  src: 'https://pic2.imgdb.cn/item/642a7477a682492fcc0c6e6a.jpg'
                }
              ]
            },
            imgMode: {
              current: 'none',
              arr: [
                {
                  id: '0',
                  label: '显示原图',
                  value: 'none'
                },
                {
                  id: '1',
                  label: '等比拉伸',
                  value: 'fill'
                }
              ]
            },
            iconClazz: {
              current: 'app_4',
              arr: []
            }
          }
        },
        requestConfig: {
          requestUrl: 'http://10.15.1.220:30082/api',
          accessToken: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODU3NTc5ODMsInVzZXJJZCI6MTAsInVzZXJfbmFtZSI6ImFkbWluIiwianRpIjoiMDU3NTMyZWEtNmZkMi00MGU4LWFiMjUtMjMyNzcxZGMwNzMyIiwiY2xpZW50X2lkIjoid2ViX2JhY2siLCJzY29wZSI6WyJiYWNrIl19.IMKUo08N03icTOQkN0d1dZFZkeUjvYMRW7k_UkF7bVOZKIqbI6LtCBqrvgcR3KxCxBK8iZKLmic3JOw2gR7dMsWQoJptRU6pgGkMr99TIHfBRyx5QUMFwx3UZjjozmKCuFGH-j8D0TnQILAKCGKHEeSRNGLxJZHZPF7_bI4wA1vRnJLsc5yUrgIKcy7lajtdIAcZgrmXVhE7Azwh8DNMxRNwLFXmfnhfcEsj0FuiWg8t3L8S6J7dH6uMOCO6mGY8RO2pnXFf5KNpnHzvKa4Yly2v-_kXPVVyoxxH0Zi0PjeNrOZDZW5zqCq4Mbq-x4IFNK4XFusUfgH9aSSMckScWw',
          roleId: '34',
          tenantId: '1',
          enterpriseCode: 'GW_202112081112116903',
          applicationCode: '001',
          applicationId: '1'
        },
        xyz: {
          i: '3'
        }
      },
      moved: false
    },
    {
      x: 16,
      y: 0,
      w: 4,
      h: 4,
      i: '4',
      comp: {
        id: 'YxtSuperviseApp',
        compName: 'YxtSuperviseApp',
        compNameContent: 'YxtBissAppPanelContent',
        compNameExtyle: 'YxtBissAppPanelExtyle',
        icon: 'icon-Sort uiicon',
        title: '监管中心',
        type: 'biss',
        panel: {
          content: {
            base_rows: [
              {
                id: 'title',
                type: 'input',
                inputType: 'input',
                label: '应用名称',
                value: '监管中心',
                maxlength: 20,
                isAlwaysShow: true,
                rules: [
                  {
                    required: true,
                    message: '请输入应用名称',
                    trigger: 'blur'
                  }
                ]
              }
            ],
            exec_rows: [
              {
                id: 'application',
                type: 'select',
                label: '选择应用',
                value: '4',
                isAlwaysShow: true,
                rules: [
                  {
                    required: true,
                    message: '请选择应用',
                    trigger: 'blur'
                  }
                ],
                arr: [
                  {
                    label: '不动产统一管理',
                    value: '0'
                  },
                  {
                    label: '公务用车',
                    value: '1'
                  },
                  {
                    label: '公共机构节能',
                    value: '2'
                  },
                  {
                    label: '标准仓',
                    value: '3'
                  },
                  {
                    label: '监管中心',
                    value: '4'
                  }
                ]
              }
            ]
          },
          extyle: {
            cssMode: {
              current: 'LR',
              arr: [
                {
                  id: '0',
                  label: '样式-1',
                  value: 'LR',
                  src: 'https://pic2.imgdb.cn/item/642a7490a682492fcc0cc8b4.jpg'
                },
                {
                  id: '1',
                  label: '样式-2',
                  value: 'TB',
                  src: 'https://pic2.imgdb.cn/item/642a7477a682492fcc0c6e6a.jpg'
                }
              ]
            },
            imgMode: {
              current: 'none',
              arr: [
                {
                  id: '0',
                  label: '显示原图',
                  value: 'none'
                },
                {
                  id: '1',
                  label: '等比拉伸',
                  value: 'fill'
                }
              ]
            },
            iconClazz: {
              current: 'app_5',
              arr: []
            }
          }
        },
        requestConfig: {
          requestUrl: 'http://10.15.1.220:30082/api',
          accessToken: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODU3NTc5ODMsInVzZXJJZCI6MTAsInVzZXJfbmFtZSI6ImFkbWluIiwianRpIjoiMDU3NTMyZWEtNmZkMi00MGU4LWFiMjUtMjMyNzcxZGMwNzMyIiwiY2xpZW50X2lkIjoid2ViX2JhY2siLCJzY29wZSI6WyJiYWNrIl19.IMKUo08N03icTOQkN0d1dZFZkeUjvYMRW7k_UkF7bVOZKIqbI6LtCBqrvgcR3KxCxBK8iZKLmic3JOw2gR7dMsWQoJptRU6pgGkMr99TIHfBRyx5QUMFwx3UZjjozmKCuFGH-j8D0TnQILAKCGKHEeSRNGLxJZHZPF7_bI4wA1vRnJLsc5yUrgIKcy7lajtdIAcZgrmXVhE7Azwh8DNMxRNwLFXmfnhfcEsj0FuiWg8t3L8S6J7dH6uMOCO6mGY8RO2pnXFf5KNpnHzvKa4Yly2v-_kXPVVyoxxH0Zi0PjeNrOZDZW5zqCq4Mbq-x4IFNK4XFusUfgH9aSSMckScWw',
          roleId: '34',
          tenantId: '1',
          enterpriseCode: 'GW_202112081112116903',
          applicationCode: '001',
          applicationId: '1'
        },
        xyz: {
          i: '4'
        }
      },
      moved: false
    },
    {
      x: 0,
      y: 4,
      w: 7,
      h: 10,
      i: '5',
      comp: {
        id: 'YxtBissCommons',
        compName: 'YxtBissCommons',
        compNameContent: 'YxtBissCommonsPanelContent',
        compNameExtyle: 'YxtBissCommonsPanelExtyle',
        title: '常用功能',
        icon: 'icon-Calendar uiicon',
        type: 'biss',
        panel: {
          content: {
            base_rows: [
              {
                id: 'title',
                type: 'input',
                inputType: 'input',
                label: '组件标题',
                value: '常用功能',
                maxlength: 20,
                isAlwaysShow: true,
                rules: [
                  {
                    required: true,
                    message: '请输入组件标题',
                    trigger: 'blur'
                  }
                ]
              }
            ],
            exec_rows: [
              {
                id: 'minCount',
                type: 'inputNumber',
                inputType: 'inputNumber',
                min: 4,
                max: 20,
                label: '最小显示数量',
                value: 4,
                isAlwaysShow: true,
                rules: [
                  {
                    required: false,
                    message: '请设置最小显示数量',
                    trigger: 'blur'
                  }
                ]
              },
              {
                id: 'resource',
                type: 'select',
                label: '数据源',
                multiple: true,
                isAlwaysShow: true,
                value: [],
                rules: [
                  {
                    required: false,
                    message: '请选择数据源',
                    trigger: 'blur'
                  }
                ],
                arr: []
              }
            ]
          },
          extyle: {
            cssMode: {
              current: 'LR',
              arr: [
                {
                  id: '0',
                  label: '样式-1',
                  value: 'LR',
                  src: 'https://pic2.imgdb.cn/item/642a7490a682492fcc0cc8b4.jpg'
                },
                {
                  id: '1',
                  label: '样式-2',
                  value: 'TB',
                  src: 'https://pic2.imgdb.cn/item/642a7477a682492fcc0c6e6a.jpg'
                }
              ]
            },
            imgMode: {
              current: 'none',
              arr: [
                {
                  id: '0',
                  label: '显示原图',
                  value: 'none'
                },
                {
                  id: '1',
                  label: '等比拉伸',
                  value: 'fill'
                }
              ]
            },
            type: 'card',
            iconClazz: {
              current: 'todo_cor',
              arr: []
            }
          }
        },
        requestConfig: {
          requestUrl: 'http://10.15.1.220:30082/api',
          accessToken: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODU3NTc5ODMsInVzZXJJZCI6MTAsInVzZXJfbmFtZSI6ImFkbWluIiwianRpIjoiMDU3NTMyZWEtNmZkMi00MGU4LWFiMjUtMjMyNzcxZGMwNzMyIiwiY2xpZW50X2lkIjoid2ViX2JhY2siLCJzY29wZSI6WyJiYWNrIl19.IMKUo08N03icTOQkN0d1dZFZkeUjvYMRW7k_UkF7bVOZKIqbI6LtCBqrvgcR3KxCxBK8iZKLmic3JOw2gR7dMsWQoJptRU6pgGkMr99TIHfBRyx5QUMFwx3UZjjozmKCuFGH-j8D0TnQILAKCGKHEeSRNGLxJZHZPF7_bI4wA1vRnJLsc5yUrgIKcy7lajtdIAcZgrmXVhE7Azwh8DNMxRNwLFXmfnhfcEsj0FuiWg8t3L8S6J7dH6uMOCO6mGY8RO2pnXFf5KNpnHzvKa4Yly2v-_kXPVVyoxxH0Zi0PjeNrOZDZW5zqCq4Mbq-x4IFNK4XFusUfgH9aSSMckScWw',
          roleId: '34',
          tenantId: '1',
          enterpriseCode: 'GW_202112081112116903',
          applicationCode: '001',
          applicationId: '1'
        },
        xyz: {
          i: '5'
        }
      },
      moved: false
    },
    {
      x: 7,
      y: 4,
      w: 7,
      h: 10,
      i: '6',
      comp: {
        id: 'YxtBissNotices',
        compName: 'YxtBissNotices',
        compNameContent: 'YxtBissNoticesPanelContent',
        compNameExtyle: 'YxtBissNoticesPanelExtyle',
        title: '通知公告',
        icon: 'icon-User uiicon',
        type: 'biss',
        panel: {
          content: {
            base_rows: [
              {
                id: 'title',
                type: 'input',
                inputType: 'input',
                label: '组件标题',
                value: '通知公告',
                maxlength: 20,
                isAlwaysShow: true,
                rules: [
                  {
                    required: true,
                    message: '请输入组件标题',
                    trigger: 'blur'
                  }
                ]
              }
            ],
            exec_rows: [
              {
                id: 'field',
                type: 'checkbox',
                label: '内容字段',
                isAlwaysShow: true,
                value: [
                  '2',
                  '3'
                ],
                rules: [
                  {
                    required: false,
                    message: '请选择内容字段',
                    trigger: 'blur'
                  }
                ],
                arr: [
                  {
                    label: '作者/创建者',
                    value: '0'
                  },
                  {
                    label: '时间',
                    value: '1'
                  },
                  {
                    label: '分类信息',
                    value: '2',
                    disabled: true
                  },
                  {
                    label: '状态信息',
                    value: '3',
                    disabled: true
                  }
                ]
              },
              {
                id: 'lineCount',
                type: 'inputNumber',
                inputType: 'inputNumber',
                min: 1,
                max: 20,
                label: '显示行数',
                value: 5,
                isAlwaysShow: true,
                rules: [
                  {
                    required: false,
                    message: '请设置显示行数',
                    trigger: 'blur'
                  }
                ]
              }
            ]
          },
          extyle: {
            cssMode: {
              current: 'LR',
              arr: [
                {
                  id: '0',
                  label: '样式-1',
                  value: 'LR',
                  src: 'https://pic2.imgdb.cn/item/642a7490a682492fcc0cc8b4.jpg'
                },
                {
                  id: '1',
                  label: '样式-2',
                  value: 'TB',
                  src: 'https://pic2.imgdb.cn/item/642a7477a682492fcc0c6e6a.jpg'
                }
              ]
            },
            imgMode: {
              current: 'none',
              arr: [
                {
                  id: '0',
                  label: '显示原图',
                  value: 'none'
                },
                {
                  id: '1',
                  label: '等比拉伸',
                  value: 'fill'
                }
              ]
            },
            type: 'card',
            iconClazz: {
              current: 'todo_cor',
              arr: []
            }
          }
        },
        requestConfig: {
          requestUrl: 'http://10.15.1.220:30082/api',
          accessToken: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODU3NTc5ODMsInVzZXJJZCI6MTAsInVzZXJfbmFtZSI6ImFkbWluIiwianRpIjoiMDU3NTMyZWEtNmZkMi00MGU4LWFiMjUtMjMyNzcxZGMwNzMyIiwiY2xpZW50X2lkIjoid2ViX2JhY2siLCJzY29wZSI6WyJiYWNrIl19.IMKUo08N03icTOQkN0d1dZFZkeUjvYMRW7k_UkF7bVOZKIqbI6LtCBqrvgcR3KxCxBK8iZKLmic3JOw2gR7dMsWQoJptRU6pgGkMr99TIHfBRyx5QUMFwx3UZjjozmKCuFGH-j8D0TnQILAKCGKHEeSRNGLxJZHZPF7_bI4wA1vRnJLsc5yUrgIKcy7lajtdIAcZgrmXVhE7Azwh8DNMxRNwLFXmfnhfcEsj0FuiWg8t3L8S6J7dH6uMOCO6mGY8RO2pnXFf5KNpnHzvKa4Yly2v-_kXPVVyoxxH0Zi0PjeNrOZDZW5zqCq4Mbq-x4IFNK4XFusUfgH9aSSMckScWw',
          roleId: '34',
          tenantId: '1',
          enterpriseCode: 'GW_202112081112116903',
          applicationCode: '001',
          applicationId: '1'
        },
        xyz: {
          i: '6'
        }
      },
      moved: false
    },
    {
      x: 14,
      y: 4,
      w: 6,
      h: 20,
      i: '7',
      comp: {
        id: 'YxtBissTodos',
        compName: 'YxtBissTodos',
        compNameContent: 'YxtBissTodosPanelContent',
        compNameExtyle: 'YxtBissTodosPanelExtyle',
        title: '待办事项',
        icon: 'icon-Sort uiicon',
        type: 'biss',
        panel: {
          content: {
            base_rows: [
              {
                id: 'title',
                type: 'input',
                inputType: 'input',
                label: '组件标题',
                value: '待办事项',
                maxlength: 20,
                isAlwaysShow: true,
                rules: [
                  {
                    required: true,
                    message: '请输入组件标题',
                    trigger: 'blur'
                  }
                ]
              }
            ],
            exec_rows: [
              {
                id: 'field',
                type: 'checkbox',
                label: '内容字段',
                isAlwaysShow: true,
                value: [
                  '0'
                ],
                rules: [
                  {
                    required: false,
                    message: '请选择内容字段',
                    trigger: 'blur'
                  }
                ],
                arr: [
                  {
                    label: '业务分类',
                    value: '0'
                  }
                ]
              },
              {
                id: 'resource',
                type: 'select',
                label: '数据源',
                multiple: true,
                isAlwaysShow: true,
                value: [
                  '0',
                  '1'
                ],
                rules: [
                  {
                    required: false,
                    message: '请选择数据源',
                    trigger: 'blur'
                  }
                ],
                arr: [
                  {
                    label: '周转房',
                    value: '0'
                  },
                  {
                    label: '经营性资产',
                    value: '1'
                  },
                  {
                    label: '办公用房',
                    value: '2'
                  },
                  {
                    label: '固定资产',
                    value: '3'
                  },
                  {
                    label: '公共节能',
                    value: '4'
                  }
                ]
              }
            ]
          },
          extyle: {
            cssMode: {
              current: 'LR',
              arr: [
                {
                  id: '0',
                  label: '样式-1',
                  value: 'LR',
                  src: 'https://pic2.imgdb.cn/item/642a7490a682492fcc0cc8b4.jpg'
                },
                {
                  id: '1',
                  label: '样式-2',
                  value: 'TB',
                  src: 'https://pic2.imgdb.cn/item/642a7477a682492fcc0c6e6a.jpg'
                }
              ]
            },
            imgMode: {
              current: 'none',
              arr: [
                {
                  id: '0',
                  label: '显示原图',
                  value: 'none'
                },
                {
                  id: '1',
                  label: '等比拉伸',
                  value: 'fill'
                }
              ]
            },
            type: 'card',
            iconClazz: {
              current: 'todo_cor',
              arr: []
            }
          }
        },
        requestConfig: {
          requestUrl: 'http://10.15.1.220:30082/api',
          accessToken: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODU3NTc5ODMsInVzZXJJZCI6MTAsInVzZXJfbmFtZSI6ImFkbWluIiwianRpIjoiMDU3NTMyZWEtNmZkMi00MGU4LWFiMjUtMjMyNzcxZGMwNzMyIiwiY2xpZW50X2lkIjoid2ViX2JhY2siLCJzY29wZSI6WyJiYWNrIl19.IMKUo08N03icTOQkN0d1dZFZkeUjvYMRW7k_UkF7bVOZKIqbI6LtCBqrvgcR3KxCxBK8iZKLmic3JOw2gR7dMsWQoJptRU6pgGkMr99TIHfBRyx5QUMFwx3UZjjozmKCuFGH-j8D0TnQILAKCGKHEeSRNGLxJZHZPF7_bI4wA1vRnJLsc5yUrgIKcy7lajtdIAcZgrmXVhE7Azwh8DNMxRNwLFXmfnhfcEsj0FuiWg8t3L8S6J7dH6uMOCO6mGY8RO2pnXFf5KNpnHzvKa4Yly2v-_kXPVVyoxxH0Zi0PjeNrOZDZW5zqCq4Mbq-x4IFNK4XFusUfgH9aSSMckScWw',
          roleId: '34',
          tenantId: '1',
          enterpriseCode: 'GW_202112081112116903',
          applicationCode: '001',
          applicationId: '1'
        },
        xyz: {
          i: '7'
        }
      },
      moved: false
    },
    {
      x: 0,
      y: 14,
      w: 7,
      h: 10,
      i: '8',
      comp: {
        id: 'YxtBissDataCenter',
        compName: 'YxtBissDataCenter',
        compNameContent: 'YxtBissDataCenterPanelContent',
        compNameExtyle: 'YxtBissDataCenterPanelExtyle',
        title: '资料中心',
        icon: 'icon-Attachment uiicon',
        type: 'biss',
        dialogConfig: {
          btns: [
            {
              label: '确定',
              value: 'reset',
              type: 'primary'
            }
          ],
          tipIcon: 'uiicon icon-Calendar',
          iconColor: '#2E78FF',
          title: '预览'
        },
        panel: {
          content: {
            base_rows: [
              {
                id: 'title',
                type: 'input',
                inputType: 'input',
                label: '组件标题',
                value: '资料中心',
                maxlength: 20,
                isAlwaysShow: true,
                rules: [
                  {
                    required: true,
                    message: '请输入组件标题',
                    trigger: 'blur'
                  }
                ]
              }
            ],
            exec_rows: [
              {
                id: 'field',
                type: 'checkbox',
                label: '内容字段',
                isAlwaysShow: true,
                value: [
                  '1'
                ],
                rules: [
                  {
                    required: false,
                    message: '请选择内容字段',
                    trigger: 'blur'
                  }
                ],
                arr: [
                  {
                    label: '作者/创建者',
                    value: '0'
                  },
                  {
                    label: '时间',
                    value: '1'
                  }
                ]
              },
              {
                id: 'lineCount',
                type: 'inputNumber',
                inputType: 'inputNumber',
                min: 5,
                max: 20,
                label: '显示行数',
                value: 5,
                isAlwaysShow: true,
                rules: [
                  {
                    required: false,
                    message: '请设置显示行数',
                    trigger: 'blur'
                  }
                ]
              }
            ]
          },
          extyle: {
            cssMode: {
              current: 'LR',
              arr: [
                {
                  id: '0',
                  label: '样式-1',
                  value: 'LR',
                  src: 'https://pic2.imgdb.cn/item/642a7490a682492fcc0cc8b4.jpg'
                },
                {
                  id: '1',
                  label: '样式-2',
                  value: 'TB',
                  src: 'https://pic2.imgdb.cn/item/642a7477a682492fcc0c6e6a.jpg'
                }
              ]
            },
            imgMode: {
              current: 'none',
              arr: [
                {
                  id: '0',
                  label: '显示原图',
                  value: 'none'
                },
                {
                  id: '1',
                  label: '等比拉伸',
                  value: 'fill'
                }
              ]
            },
            type: 'card',
            iconClazz: {
              current: 'todo_cor',
              arr: []
            }
          }
        },
        requestConfig: {
          requestUrl: 'http://10.15.1.220:30082/api',
          accessToken: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODU3NTc5ODMsInVzZXJJZCI6MTAsInVzZXJfbmFtZSI6ImFkbWluIiwianRpIjoiMDU3NTMyZWEtNmZkMi00MGU4LWFiMjUtMjMyNzcxZGMwNzMyIiwiY2xpZW50X2lkIjoid2ViX2JhY2siLCJzY29wZSI6WyJiYWNrIl19.IMKUo08N03icTOQkN0d1dZFZkeUjvYMRW7k_UkF7bVOZKIqbI6LtCBqrvgcR3KxCxBK8iZKLmic3JOw2gR7dMsWQoJptRU6pgGkMr99TIHfBRyx5QUMFwx3UZjjozmKCuFGH-j8D0TnQILAKCGKHEeSRNGLxJZHZPF7_bI4wA1vRnJLsc5yUrgIKcy7lajtdIAcZgrmXVhE7Azwh8DNMxRNwLFXmfnhfcEsj0FuiWg8t3L8S6J7dH6uMOCO6mGY8RO2pnXFf5KNpnHzvKa4Yly2v-_kXPVVyoxxH0Zi0PjeNrOZDZW5zqCq4Mbq-x4IFNK4XFusUfgH9aSSMckScWw',
          roleId: '34',
          tenantId: '1',
          enterpriseCode: 'GW_202112081112116903',
          applicationCode: '001',
          applicationId: '1'
        },
        xyz: {
          i: '8'
        }
      },
      moved: false
    },
    {
      x: 7,
      y: 14,
      w: 7,
      h: 10,
      i: '9',
      comp: {
        id: 'YxtBissForgets',
        compName: 'YxtBissForgets',
        compNameContent: 'YxtBissForgetsPanelContent',
        compNameExtyle: 'YxtBissForgetsPanelExtyle',
        title: '备忘清单',
        icon: 'icon-Time uiicon',
        type: 'biss',
        panel: {
          content: {
            base_rows: [
              {
                id: 'title',
                type: 'input',
                inputType: 'input',
                label: '组件标题',
                value: '备忘清单',
                maxlength: 20,
                isAlwaysShow: true,
                rules: [
                  {
                    required: true,
                    message: '请输入组件标题',
                    trigger: 'blur'
                  }
                ]
              }
            ],
            exec_rows: [
              {
                id: 'lineCount',
                type: 'inputNumber',
                inputType: 'inputNumber',
                min: 4,
                max: 20,
                label: '显示行数',
                value: 4,
                isAlwaysShow: true,
                rules: [
                  {
                    required: false,
                    message: '请设置显示行数',
                    trigger: 'blur'
                  }
                ]
              }
            ]
          },
          extyle: {
            cssMode: {
              current: 'LR',
              arr: [
                {
                  id: '0',
                  label: '样式-1',
                  value: 'LR',
                  src: 'https://pic2.imgdb.cn/item/642a7490a682492fcc0cc8b4.jpg'
                },
                {
                  id: '1',
                  label: '样式-2',
                  value: 'TB',
                  src: 'https://pic2.imgdb.cn/item/642a7477a682492fcc0c6e6a.jpg'
                }
              ]
            },
            imgMode: {
              current: 'none',
              arr: [
                {
                  id: '0',
                  label: '显示原图',
                  value: 'none'
                },
                {
                  id: '1',
                  label: '等比拉伸',
                  value: 'fill'
                }
              ]
            },
            type: 'card',
            iconClazz: {
              current: 'todo_cor',
              arr: []
            }
          }
        },
        requestConfig: {
          requestUrl: 'http://10.15.1.220:30082/api',
          accessToken: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODU3NTc5ODMsInVzZXJJZCI6MTAsInVzZXJfbmFtZSI6ImFkbWluIiwianRpIjoiMDU3NTMyZWEtNmZkMi00MGU4LWFiMjUtMjMyNzcxZGMwNzMyIiwiY2xpZW50X2lkIjoid2ViX2JhY2siLCJzY29wZSI6WyJiYWNrIl19.IMKUo08N03icTOQkN0d1dZFZkeUjvYMRW7k_UkF7bVOZKIqbI6LtCBqrvgcR3KxCxBK8iZKLmic3JOw2gR7dMsWQoJptRU6pgGkMr99TIHfBRyx5QUMFwx3UZjjozmKCuFGH-j8D0TnQILAKCGKHEeSRNGLxJZHZPF7_bI4wA1vRnJLsc5yUrgIKcy7lajtdIAcZgrmXVhE7Azwh8DNMxRNwLFXmfnhfcEsj0FuiWg8t3L8S6J7dH6uMOCO6mGY8RO2pnXFf5KNpnHzvKa4Yly2v-_kXPVVyoxxH0Zi0PjeNrOZDZW5zqCq4Mbq-x4IFNK4XFusUfgH9aSSMckScWw',
          roleId: '34',
          tenantId: '1',
          enterpriseCode: 'GW_202112081112116903',
          applicationCode: '001',
          applicationId: '1'
        },
        xyz: {
          i: '9'
        }
      },
      moved: false
    }
  ]
}

export function LAYOUT_MODE_2() {
  const accessToken = UserModule.token
  return [
    {
      x: 0,
      y: 0,
      w: 12,
      h: 4,
      i: '0',
      comp: { id: '0', compName: 'YxtBissApps', sliceIndex: 5, dialogConfig: { title: '房产地产统一管理' }, requestConfig: { requestUrl: 'http://121.36.17.224:30552/api', accessToken: accessToken } }
    },
    {
      x: 0,
      y: 4,
      w: 3,
      h: 14,
      i: '2',
      comp: { id: '0', compName: 'YxtBissCommons', todoTitle: i18n.t('message.portal.common') }
    },
    {
      x: 3,
      y: 4,
      w: 5,
      h: 14,
      i: '3',
      comp: { id: '0', compName: 'YxtBissNotices', todoTitle: i18n.t('message.portal.notice'), dialogConfig: { title: i18n.t('message.portal.action.noticeDetail') } }
    },
    {
      x: 8,
      y: 4,
      w: 4,
      h: 26,
      i: '1',
      comp: { id: '0', compName: 'YxtBissTodos', todoTitle: i18n.t('message.portal.todo'), requestConfig: { requestUrl: 'http://121.36.17.224:30552/api', accessToken: accessToken } }
    },
    {
      x: 0,
      y: 16,
      w: 4,
      h: 12,
      i: '4',
      comp: { id: '0', compName: 'YxtBissDataCenter', todoTitle: i18n.t('message.portal.dataCenter'), dialogConfig: { title: i18n.t('message.portal.action.attachmentPreview') } }
    },
    {
      x: 4,
      y: 16,
      w: 4,
      h: 12,
      i: '5',
      comp: { id: '0', compName: 'YxtBissForgets', todoTitle: i18n.t('message.portal.memoList'), dialogConfig: { title: i18n.t('message.portal.action.attachmentPreview') } }
    }
  ]
}

export function LAYOUT_MODE_3() {
  return [
    {
      x: 0,
      y: 0,
      w: 3,
      h: 4,
      i: '0'
    },
    {
      x: 3,
      y: 0,
      w: 3,
      h: 4,
      i: '1'
    },
    {
      x: 6,
      y: 0,
      w: 3,
      h: 4,
      i: '2'
    },
    {
      x: 9,
      y: 0,
      w: 3,
      h: 4,
      i: '3'
    },
    {
      x: 0,
      y: 3,
      w: 3,
      h: 4,
      i: '4'
    },
    {
      x: 3,
      y: 3,
      w: 3,
      h: 4,
      i: '5'
    },
    {
      x: 6,
      y: 3,
      w: 3,
      h: 4,
      i: '6'
    },
    {
      x: 9,
      y: 3,
      w: 3,
      h: 4,
      i: '7'
    },
    {
      x: 0,
      y: 7,
      w: 6,
      h: 22,
      i: '8',
      comp: { id: '0', compName: 'YxtBissCommons', todoTitle: '土地用途-面积分析' }
    },
    {
      x: 6,
      y: 7,
      w: 6,
      h: 22,
      i: '9',
      comp: { id: '0', compName: 'YxtBissNotices', todoTitle: '土地类型-登记比例', dialogConfig: { title: i18n.t('message.portal.action.noticeDetail') } }
    }
  ]
}

export function LAYOUT_MODE_4() {
  return [
    {
      x: 0,
      y: 0,
      w: 3,
      h: 4,
      i: '0'
    },
    {
      x: 3,
      y: 0,
      w: 3,
      h: 4,
      i: '1'
    },
    {
      x: 6,
      y: 0,
      w: 3,
      h: 4,
      i: '2'
    },
    {
      x: 9,
      y: 0,
      w: 3,
      h: 4,
      i: '3'
    },
    {
      x: 0,
      y: 4,
      w: 8,
      h: 13,
      i: '4',
      comp: { id: '0', compName: 'YxtBissCommons', todoTitle: '资产残值' }
    },
    {
      x: 8,
      y: 4,
      w: 4,
      h: 13,
      i: '5',
      comp: { id: '0', compName: 'YxtBissNotices', todoTitle: '办公用品处置情况', dialogConfig: { title: i18n.t('message.portal.action.noticeDetail') } }
    },
    {
      x: 0,
      y: 14,
      w: 8,
      h: 13,
      i: '6',
      comp: { id: '0', compName: 'YxtBissCommons', todoTitle: '办公用品缺货情况' }
    },
    {
      x: 8,
      y: 14,
      w: 4,
      h: 13,
      i: '7',
      comp: { id: '0', compName: 'YxtBissNotices', todoTitle: '资产分类', dialogConfig: { title: i18n.t('message.portal.action.noticeDetail') } }
    }
  ]
}
