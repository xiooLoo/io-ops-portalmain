
import { Vue, Component } from 'vue-property-decorator'
import { getOption1, getOption2 } from '@/api/vformRender'
import { UserModule } from '@/store/modules/user'

@Component
export default class extends Vue {
  public apiRequets: any = {
    getOption1,
    getOption2,
    getDictTree: {
      dictUrl: 'http://121.36.17.224:31071/api/dict/key/tree',
      dictHeader: {
        roleId: 14,
        tenantId: 1
      },
      methods: 'get',
      dictData: {}
    },
    getDictValue: {
      dictUrl: 'http://121.36.17.224:31071/api/dict/value/restore/list',
      dictHeader: {
        roleId: 14,
        tenantId: 1
      },
      methods: 'get',
      dictData: {}
    }
  }

  public formJson: any = {
    widgetList: [
      {
        type: 'radio',
        icon: 'radio-field',
        formItemFlag: true,
        options: {
          name: 'fColor',
          label: '[低代码]车辆颜色',
          labelAlign: '',
          defaultValue: 1,
          columnWidth: '200px',
          size: '',
          displayStyle: 'inline',
          buttonStyle: false,
          border: false,
          labelWidth: null,
          labelHidden: false,
          disabled: false,
          hidden: false,
          optionItems: [
            {
              label: '通过API切换select1',
              value: 1
            },
            {
              label: '通过API切换select2',
              value: 2
            }
          ],
          required: false,
          requiredHint: '',
          validation: '',
          validationHint: '',
          customClass: [],
          labelIconClass: null,
          labelIconPosition: 'rear',
          labelTooltip: null,
          onCreated: '',
          onMounted: '',
          onChange:
            'let control1 = this.getWidgetRef(\'fchangeselect\')\nif(value===1){\n let newData = this.apiRequets.getOption1()\n console.log(newData)\n control1.loadOptions(newData.data)\n}\nif(value===2){\n let newData = this.apiRequets.getOption2()\n console.log(newData)\n control1.loadOptions(newData.data)\n}',
          onValidate: '',
          componentWidth: 100,
          conDisplay: 'display'
        },
        id: 'radio65500'
      },
      {
        type: 'radio',
        icon: 'radio-field',
        formItemFlag: true,
        options: {
          name: 'staus',
          label: '[低代码]radio标签',
          labelAlign: '',
          defaultValue: 1,
          columnWidth: '200px',
          size: 'small',
          displayStyle: 'inline',
          buttonStyle: true,
          border: false,
          labelWidth: null,
          labelHidden: false,
          disabled: false,
          hidden: false,
          optionItems: [
            {
              label: '可编辑',
              value: 1
            },
            {
              label: '仅可见',
              value: 2
            },
            {
              label: '隐藏',
              value: 3
            }
          ],
          required: true,
          requiredHint: '',
          validation: '',
          validationHint: '',
          customClass: ['top-right-btns'],
          labelIconClass: null,
          labelIconPosition: 'rear',
          labelTooltip: null,
          onCreated: '',
          onMounted: '',
          onChange:
            'let control1 = this.getWidgetRef(\'fFrom\')\n\nif(value===1){\n // 编辑\n control1.setDisabled(false)\n}else if(value===2){\n // 仅可见\n control1.setDisabled(true)\n control1.setHidden(false)\n}else if(value===3){\n // 隐藏\n control1.setHidden(true)\n}',
          onValidate: '',
          componentWidth: 20
        },
        id: 'radio33512'
      },
      {
        type: 'input',
        icon: 'text-field',
        formItemFlag: true,
        options: {
          name: 'fFrom',
          label: '[低代码]出发地',
          labelAlign: '',
          type: 'text',
          defaultValue: '',
          placeholder: '请输入出发地',
          columnWidth: '200px',
          size: '',
          labelWidth: null,
          labelHidden: false,
          readonly: false,
          disabled: false,
          hidden: false,
          clearable: true,
          showPassword: false,
          required: true,
          requiredHint: '出发地为必填项，请输入',
          validation: '',
          validationHint: '',
          customClass: '',
          labelIconClass: null,
          labelIconPosition: 'rear',
          labelTooltip: null,
          minLength: null,
          maxLength: null,
          showWordLimit: false,
          prefixIcon: '',
          suffixIcon: '',
          appendButton: false,
          appendButtonDisabled: false,
          buttonIcon: 'el-icon-search',
          onCreated: '',
          onMounted: '',
          onInput: '',
          onChange: '',
          onFocus: '',
          onBlur: '',
          onValidate: '',
          onAppendButtonClick: '',
          conDisplay: 'display',
          componentWidth: 52
        },
        id: 'input71687'
      },
      {
        type: 'select',
        icon: 'select-field',
        formItemFlag: true,
        options: {
          name: 'fchangeselect',
          label: '[低代码]select',
          labelAlign: '',
          defaultValue: '',
          placeholder: '',
          columnWidth: '200px',
          size: '',
          labelWidth: null,
          labelHidden: false,
          disabled: false,
          hidden: false,
          clearable: true,
          filterable: false,
          allowCreate: false,
          remote: false,
          automaticDropdown: false,
          multiple: false,
          multipleLimit: 0,
          optionItems: [
            {
              label: 'select 1',
              value: 1
            },
            {
              label: 'select 2',
              value: 2
            },
            {
              label: 'select 3',
              value: 3
            }
          ],
          required: false,
          requiredHint: '',
          validation: '',
          validationHint: '',
          customClass: [],
          labelIconClass: null,
          labelIconPosition: 'rear',
          labelTooltip: null,
          onCreated: '',
          onMounted: '',
          onRemoteQuery: '',
          onChange: '',
          onFocus: '',
          onBlur: '',
          onValidate: '',
          componentWidth: 20
        },
        id: 'select64696'
      },
      {
        type: 'divider',
        icon: 'divider',
        formItemFlag: false,
        options: {
          name: 'divider28135',
          label: '[低代码]divider',
          columnWidth: '200px',
          direction: 'horizontal',
          contentPosition: 'center',
          hidden: false,
          customClass: '',
          onCreated: '',
          onMounted: '',
          conDisplay: 'display',
          componentWidth: 100
        },
        id: 'divider28135'
      },
      {
        type: 'picture-upload',
        icon: 'picture-upload-field',
        formItemFlag: true,
        options: {
          name: 'pictureupload82229',
          label: '[低代码]文件上传',
          uploadName: 'file',
          labelAlign: '',
          labelWidth: null,
          labelHidden: false,
          columnWidth: '200px',
          disabled: false,
          hidden: false,
          required: false,
          requiredHint: '',
          customRule: '',
          customRuleHint: '',
          uploadURL: 'http://ylq.yxtdh.cn/test-gis/api/oss/upload/official',
          uploadTip: '',
          withCredentials: false,
          multipleSelect: false,
          showFileList: true,
          limit: 3,
          fileMaxSize: 20,
          fileTypes: ['png', 'jpg', 'jpeg', 'gif', 'bmp'],
          headerOption: [
            {
              key: 'accessToken',
              value: '{{token}}'
            }
          ],
          uploadKeyOption: [],
          customClass: '',
          labelIconClass: null,
          labelIconPosition: 'rear',
          labelTooltip: null,
          onCreated: '',
          onMounted: '',
          onBeforeUpload: '',
          onUploadSuccess: '',
          onUploadError: '',
          onFileRemove: '',
          onValidate: ''
        },
        id: 'pictureupload82229'
      },
      {
        type: 'select',
        icon: 'select-field',
        formItemFlag: true,
        options: {
          name: 'select69553',
          label: '数据字典应用1',
          labelAlign: '',
          defaultValue: '',
          placeholder: '',
          columnWidth: '200px',
          size: '',
          labelWidth: null,
          labelHidden: false,
          disabled: false,
          hidden: false,
          clearable: true,
          filterable: false,
          allowCreate: false,
          automaticDropdown: false,
          multiple: false,
          multipleLimit: 0,
          customClass: '',
          optionType: 'dynamic',
          dictKey: 'value',
          keyCode: 'DICT_AGENCY_PROPERTIES_INSTITUTION',
          ApiKey: '',
          dictApi: '',
          optionItems: [
            {
              label: '一类事业单位',
              value: '4'
            },
            {
              label: '二类事业单位',
              value: '5'
            }
          ],
          required: false,
          requiredHint: '',
          validation: '',
          validationHint: '',
          componentWidth: 100,
          conDisplay: 'block',
          labelIconClass: null,
          labelIconPosition: 'rear',
          labelTooltip: null,
          onCreated: '',
          onMounted: '',
          onRemoteQuery: '',
          onChange: '',
          onFocus: '',
          onBlur: '',
          onValidate: ''
        },
        id: 'select69553'
      },
      {
        type: 'checkbox',
        icon: 'checkbox-field',
        formItemFlag: true,
        options: {
          name: 'checkbox30171',
          label: '数据字典应用2',
          labelAlign: '',
          defaultValue: ['4', '5'],
          columnWidth: '200px',
          size: '',
          displayStyle: 'inline',
          buttonStyle: false,
          border: false,
          labelWidth: null,
          labelHidden: false,
          disabled: false,
          hidden: false,
          optionType: 'dynamic',
          dictKey: 'value',
          keyCode: 'DICT_VEHICLE_FUNDS_SOURCE',
          ApiKey: '',
          dictApi: '',
          optionItems: [
            {
              label: '国家拨款',
              value: '1'
            },
            {
              label: '自筹',
              value: '2'
            },
            {
              label: '省级拨款',
              value: '4'
            },
            {
              label: '市级拨款',
              value: '5'
            }
          ],
          required: false,
          requiredHint: '',
          validation: '',
          validationHint: '',
          componentWidth: 100,
          conDisplay: 'block',
          customClass: '',
          labelIconClass: null,
          labelIconPosition: 'rear',
          labelTooltip: null,
          onCreated: '',
          onMounted: '',
          onChange: '',
          onValidate: ''
        },
        id: 'checkbox30171'
      },
      {
        type: 'select',
        icon: 'select-field',
        formItemFlag: true,
        options: {
          name: 'tenantId',
          label: '选择租户（API）',
          labelAlign: '',
          defaultValue: '',
          placeholder: '',
          columnWidth: '200px',
          size: '',
          labelWidth: null,
          labelHidden: false,
          disabled: false,
          hidden: false,
          clearable: true,
          filterable: false,
          allowCreate: false,
          automaticDropdown: false,
          multiple: false,
          multipleLimit: 0,
          customClass: '',
          optionType: 'api',
          dictKey: 'value',
          keyCode: '',
          ApiKey: '1',
          dictApi: {
            label: '租户列表',
            key: '1',
            dictUrl: 'http://121.36.17.224:30552/api/manage/tenant/all',
            dictHeader: {
              roleId: 14,
              tenantId: 1
            },
            methods: 'get',
            hierarchy: '',
            dictDataMap: [],
            prop: {
              label: 'name',
              value: 'id'
            }
          },
          optionItems: [
            {
              code: '002211',
              id: '1',
              name: '测试平台123',
              parentId: '0',
              status: 1,
              tenantType: 1,
              updTime: '2023-02-09 22:47:28',
              label: '测试平台123',
              value: '1'
            },
            {
              code: '150000',
              id: '2',
              name: 'xxxx',
              parentId: '0',
              status: 1,
              tenantType: -1,
              updTime: '2022-12-06 19:04:41',
              label: 'xxxx',
              value: '2'
            },
            {
              code: 'T_202301161401453415',
              crtTime: '2015-01-30 07:27:29',
              id: '270',
              name: 'Sharon Lewis',
              parentId: '0',
              status: 1,
              tenantType: -1,
              updTime: '2015-03-01 03:29:53',
              label: 'Sharon Lewis',
              value: '270'
            },
            {
              code: '0022122',
              crtTime: '2022-03-17 17:37:16',
              id: '1504270610605711362',
              name: '测试缓存',
              parentId: '0',
              status: 1,
              tenantType: -1,
              updTime: '2022-12-13 21:54:52',
              label: '测试缓存',
              value: '1504270610605711362'
            },
            {
              code: '002211',
              crtTime: '2022-03-18 02:12:59',
              id: '1504400394891497473',
              name: '测试平台',
              parentId: '0',
              status: 1,
              tenantType: -1,
              updTime: '2022-03-18 03:09:54',
              label: '测试平台',
              value: '1504400394891497473'
            },
            {
              code: '00221221',
              crtTime: '2022-03-18 02:29:45',
              id: '1504404611857301506',
              name: '测试扩展',
              parentId: '0',
              status: 1,
              tenantType: -1,
              updTime: '2022-03-18 02:29:45',
              label: '测试扩展',
              value: '1504404611857301506'
            },
            {
              crtTime: '2022-04-12 19:56:05',
              id: '1513727626881290241',
              name: 'fwefee',
              parentId: '0',
              status: 1,
              tenantType: -1,
              updTime: '2022-04-12 19:56:05',
              label: 'fwefee',
              value: '1513727626881290241'
            },
            {
              crtTime: '2022-04-16 02:12:04',
              id: '1514909402043637761',
              name: '22',
              parentId: '0',
              status: 1,
              tenantType: -1,
              label: '22',
              value: '1514909402043637761'
            },
            {
              crtTime: '2022-04-28 04:11:54',
              id: '1519288224297828354',
              name: 'dwdwdwdwdw222222',
              parentId: '0',
              status: 1,
              tenantType: -1,
              updTime: '2022-12-27 17:50:31',
              label: 'dwdwdwdwdw222222',
              value: '1519288224297828354'
            },
            {
              crtTime: '2022-05-25 00:00:21',
              id: '1529009390930956289',
              name: 'test0031',
              parentId: '0',
              status: 1,
              tenantType: 1,
              updTime: '2022-05-25 00:08:41',
              label: 'test0031',
              value: '1529009390930956289'
            },
            {
              crtTime: '2022-06-07 00:46:18',
              id: '1533731997042782210',
              name: '山西省机关事务管理局',
              parentId: '0',
              status: 1,
              tenantType: 1,
              updTime: '2022-06-07 00:46:18',
              label: '山西省机关事务管理局',
              value: '1533731997042782210'
            },
            {
              crtTime: '2022-09-06 22:55:52',
              id: '1567043889438969857',
              name: '宁乡',
              parentId: '0',
              status: 1,
              tenantType: 1,
              updTime: '2022-09-06 22:55:52',
              label: '宁乡',
              value: '1567043889438969857'
            },
            {
              crtTime: '2022-10-14 23:00:20',
              id: '1580815753188814850',
              name: '测试租户',
              parentId: '0',
              status: 1,
              tenantType: 1,
              updTime: '2022-12-03 18:50:01',
              label: '测试租户',
              value: '1580815753188814850'
            },
            {
              crtTime: '2022-11-03 18:26:29',
              id: '1587994590973698049',
              name: '数字孪生测试',
              parentId: '0',
              status: 1,
              tenantType: 2,
              updTime: '2022-11-03 18:28:44',
              label: '数字孪生测试',
              value: '1587994590973698049'
            },
            {
              crtTime: '2022-11-08 22:22:30',
              id: '1589865926625845249',
              name: 'Q3mock租户',
              parentId: '0',
              status: 1,
              tenantType: 1,
              updTime: '2022-12-02 01:55:17',
              label: 'Q3mock租户',
              value: '1589865926625845249'
            },
            {
              code: 'T_202212011112491817',
              crtTime: '2022-12-01 19:26:49',
              id: '1589865926625845261',
              name: 'test-new-租户',
              parentId: '0',
              status: 1,
              tenantType: 1,
              updTime: '2022-12-01 23:45:08',
              label: 'test-new-租户',
              value: '1589865926625845261'
            },
            {
              code: 'T_202212091512533487',
              crtTime: '2022-12-09 23:23:53',
              id: '1589865926625845289',
              name: '接口租户222',
              parentId: '0',
              status: 1,
              tenantType: 2,
              updTime: '2022-12-09 23:23:53',
              label: '接口租户222',
              value: '1589865926625845289'
            },
            {
              code: 'T_202212151512027607',
              crtTime: '2022-12-15 23:36:03',
              id: '1589865926625845290',
              name: '测试组用户',
              parentId: '0',
              status: 1,
              tenantType: -1,
              updTime: '2022-12-15 23:52:31',
              label: '测试组用户',
              value: '1589865926625845290'
            },
            {
              code: 'T_202212151712102217',
              crtTime: '2022-12-16 01:50:10',
              id: '1589865926625845301',
              name: 'asda',
              parentId: '0',
              status: 1,
              tenantType: -1,
              updTime: '2022-12-16 01:50:10',
              label: 'asda',
              value: '1589865926625845301'
            },
            {
              code: 'T_202212161012366777',
              crtTime: '2022-12-16 18:29:37',
              id: '1589865926625845309',
              name: 'tian222222222',
              parentId: '0',
              status: 1,
              tenantType: 2,
              updTime: '2022-12-16 19:59:35',
              label: 'tian222222222',
              value: '1589865926625845309'
            },
            {
              code: 'T_202212161312413277',
              crtTime: '2022-12-16 21:54:41',
              id: '1589865926625845312',
              name: 'jianhua',
              parentId: '0',
              status: 1,
              tenantType: -1,
              updTime: '2022-12-17 00:34:02',
              label: 'jianhua',
              value: '1589865926625845312'
            },
            {
              code: 'T_202212261412059927',
              crtTime: '2022-12-26 22:59:06',
              id: '1589865926625845313',
              name: '123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890',
              parentId: '0',
              status: 1,
              tenantType: 1,
              updTime: '2023-01-06 02:16:02',
              label:
                '123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890',
              value: '1589865926625845313'
            },
            {
              code: 'T_202212261612411587',
              crtTime: '2022-12-27 00:00:41',
              id: '1589865926625845314',
              name: 'zzzzz',
              parentId: '0',
              status: 1,
              tenantType: 2,
              updTime: '2022-12-27 00:00:41',
              label: 'zzzzz',
              value: '1589865926625845314'
            },
            {
              code: 'T_202212281612173317',
              crtTime: '2022-12-29 00:58:17',
              id: '1589865926625845315',
              name: 'Vic测试租户',
              parentId: '0',
              status: 1,
              tenantType: -1,
              updTime: '2022-12-29 00:58:17',
              label: 'Vic测试租户',
              value: '1589865926625845315'
            },
            {
              code: 'T_202212291412249017',
              crtTime: '2022-12-29 22:21:25',
              id: '1589865926625845316',
              name: 'zrcs',
              parentId: '0',
              status: 1,
              tenantType: -1,
              updTime: '2022-12-29 22:21:25',
              label: 'zrcs',
              value: '1589865926625845316'
            },
            {
              code: 'T_202301051001443465',
              crtTime: '2023-01-05 18:07:44',
              id: '1589865926625845318',
              name: '12345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890',
              parentId: '0',
              status: 1,
              tenantType: -1,
              updTime: '2023-01-05 18:07:44',
              label:
                '12345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890',
              value: '1589865926625845318'
            },
            {
              code: 'T_202301051801377845',
              crtTime: '2023-01-06 02:37:38',
              id: '1589865926625845319',
              name: 'ABC',
              parentId: '0',
              status: 1,
              tenantType: 1,
              updTime: '2023-01-06 02:37:38',
              label: 'ABC',
              value: '1589865926625845319'
            },
            {
              code: 'T_202301101701086795',
              crtTime: '2023-01-11 01:24:09',
              id: '1589865926625845321',
              name: '测试123',
              parentId: '0',
              status: 1,
              tenantType: 1,
              updTime: '2023-01-11 01:24:09',
              label: '测试123',
              value: '1589865926625845321'
            },
            {
              code: 'T_202301131101451215',
              crtTime: '2023-01-13 19:36:45',
              id: '1589865926625845322',
              name: '水利',
              parentId: '0',
              status: 1,
              tenantType: -1,
              updTime: '2023-01-13 19:36:45',
              label: '水利',
              value: '1589865926625845322'
            },
            {
              code: 'T_202301151501475995',
              crtTime: '2023-01-15 23:42:48',
              id: '1589865926625845323',
              name: '01151541',
              parentId: '0',
              status: 1,
              tenantType: -1,
              updTime: '2023-01-15 23:42:48',
              label: '01151541',
              value: '1589865926625845323'
            },
            {
              code: 'T_202301161001431725',
              crtTime: '2023-01-16 18:50:43',
              id: '1589865926625845325',
              name: '1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123',
              parentId: '0',
              status: 1,
              tenantType: -1,
              updTime: '2023-01-17 17:47:42',
              label:
                '1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123',
              value: '1589865926625845325'
            },
            {
              code: 'T_202301171701171975',
              crtTime: '2023-01-18 01:14:17',
              id: '1589865926625845326',
              name: 'test测试',
              parentId: '0',
              status: 1,
              tenantType: -1,
              updTime: '2023-01-18 01:14:17',
              label: 'test测试',
              value: '1589865926625845326'
            },
            {
              code: 'T_202302071002054817',
              crtTime: '2023-02-07 18:36:05',
              id: '1589865926625845328',
              name: '普通租户0207',
              parentId: '0',
              status: 1,
              tenantType: 2,
              updTime: '2023-02-07 18:36:05',
              label: '普通租户0207',
              value: '1589865926625845328'
            },
            {
              code: 'T_202302081602512707',
              crtTime: '2023-02-09 00:57:51',
              id: '1589865926625845329',
              name: '中台超级管理员',
              parentId: '0',
              status: 1,
              tenantType: -1,
              updTime: '2023-02-09 00:57:51',
              label: '中台超级管理员',
              value: '1589865926625845329'
            },
            {
              code: 'T_202303021303129197',
              crtTime: '2023-03-02 21:41:13',
              id: '1589865926625845331',
              name: '9',
              parentId: '0',
              status: 1,
              tenantType: -1,
              updTime: '2023-03-02 21:41:13',
              label: '9',
              value: '1589865926625845331'
            },
            {
              code: 'T_202303021503325127',
              crtTime: '2023-03-02 23:41:33',
              id: '1589865926625845332',
              name: '2',
              parentId: '0',
              status: 1,
              tenantType: 2,
              updTime: '2023-03-02 23:41:33',
              label: '2',
              value: '1589865926625845332'
            }
          ],
          required: false,
          requiredHint: '',
          validation: '',
          validationHint: '',
          componentWidth: 100,
          conDisplay: 'block',
          labelIconClass: null,
          labelIconPosition: 'rear',
          labelTooltip: null,
          onCreated: '',
          onMounted: '',
          onRemoteQuery: '',
          onChange: '',
          onFocus: '',
          onBlur: '',
          onValidate: ''
        },
        id: 'select52074'
      },
      {
        type: 'cascader',
        icon: 'cascader-field',
        formItemFlag: true,
        options: {
          name: 'cascader68559',
          label: '单位API',
          labelAlign: '',
          defaultValue: '',
          placeholder: '',
          size: '',
          labelWidth: null,
          labelHidden: false,
          columnWidth: '200px',
          disabled: false,
          hidden: false,
          clearable: true,
          filterable: false,
          multiple: false,
          checkStrictly: false,
          showAllLevels: true,
          optionType: 'api',
          dictKey: 'value',
          keyCode: '',
          ApiKey: '2',
          dictApi: {
            label: '单位列表',
            key: '2',
            dictUrl: 'http://121.36.17.224:31071/api/manage/plan/tenant/${{tenantId}}/tree',
            dictHeader: {
              roleId: 14,
              tenantId: 1
            },
            methods: 'get',
            hierarchy: 'tree',
            dictDataMap: [
              {
                label: 'kindCodes',
                value: '{{danwei}}',
                type: 'global',
                format: 'string'
              }
            ],
            prop: {
              label: 'name',
              value: 'code'
            }
          },
          optionItems: [
            {
              children: [
                {
                  hasChild: false,
                  info: {
                    enterpriseCode: 'GW_202301151801426797',
                    code: 'GW_202301151801426797',
                    kindCode: 'GOVERNMENT_SERVICE_ENTERPRISE',
                    administrativeRank: '7',
                    level: '2',
                    extendInfo: {
                      unitLevel: 'CITY'
                    },
                    nationalOrgCode: 'dfsad',
                    enterpriseType: 2,
                    vehicleHasNum: 0,
                    treeId: '45',
                    areaCode: '610101',
                    parentCode: 'GW_202211151611504457',
                    orgCode: 'sdfgsf',
                    mpttLeft: 6,
                    name: '普通保障',
                    parentEnterpriseCodeList: ['GW_202211151611504457'],
                    property: '4',
                    vehiclePlanNum: 0,
                    mpttRight: 7,
                    id: '20000000002364',
                    personPlanNum: 0,
                    nodeId: '2561',
                    status: 1
                  },
                  enterpriseCode: 'GW_202301151801426797',
                  code: 'GW_202301151801426797',
                  kindCode: 'GOVERNMENT_SERVICE_ENTERPRISE',
                  administrativeRank: '7',
                  level: '2',
                  extendInfo: {
                    unitLevel: 'CITY'
                  },
                  nationalOrgCode: 'dfsad',
                  enterpriseType: 2,
                  vehicleHasNum: 0,
                  treeId: '45',
                  areaCode: '610101',
                  parentCode: 'GW_202211151611504457',
                  orgCode: 'sdfgsf',
                  mpttLeft: 6,
                  name: '普通保障',
                  parentEnterpriseCodeList: ['GW_202211151611504457'],
                  property: '4',
                  vehiclePlanNum: 0,
                  mpttRight: 7,
                  id: '20000000002364',
                  personPlanNum: 0,
                  nodeId: '2561',
                  status: 1,
                  label: '普通保障',
                  value: 'GW_202301151801426797'
                }
              ],
              hasChild: true,
              info: {
                enterpriseCode: 'GW_202211151611504457',
                code: 'GW_202211151611504457',
                kindCode: 'GOVERNMENT_SERVICE_ENTERPRISE',
                administrativeRank: '7',
                level: '1',
                extendInfo: {
                  unitLevel: 'COUNTRY'
                },
                nationalOrgCode: '1234',
                enterpriseType: 2,
                vehicleHasNum: 0,
                treeId: '45',
                areaCode: '610000',
                parentCode: 'DEPT_202211151611427377',
                orgCode: '123',
                mpttLeft: 5,
                name: 'mock政府保障单位',
                parentEnterpriseCodeList: ['GW_202211101811473107'],
                property: '1',
                vehiclePlanNum: 0,
                mpttRight: 8,
                id: '20000000002322',
                personPlanNum: 0,
                shortName: 'mock政府保障单位',
                nodeId: '1012',
                status: 1
              },
              enterpriseCode: 'GW_202211151611504457',
              code: 'GW_202211151611504457',
              kindCode: 'GOVERNMENT_SERVICE_ENTERPRISE',
              administrativeRank: '7',
              level: '1',
              extendInfo: {
                unitLevel: 'COUNTRY'
              },
              nationalOrgCode: '1234',
              enterpriseType: 2,
              vehicleHasNum: 0,
              treeId: '45',
              areaCode: '610000',
              parentCode: 'DEPT_202211151611427377',
              orgCode: '123',
              mpttLeft: 5,
              name: 'mock政府保障单位',
              parentEnterpriseCodeList: ['GW_202211101811473107'],
              property: '1',
              vehiclePlanNum: 0,
              mpttRight: 8,
              id: '20000000002322',
              personPlanNum: 0,
              shortName: 'mock政府保障单位',
              nodeId: '1012',
              status: 1,
              label: 'mock政府保障单位',
              value: 'GW_202211151611504457'
            }
          ],
          required: false,
          requiredHint: '',
          customRule: '',
          customRuleHint: '',
          customClass: [],
          labelIconClass: null,
          labelIconPosition: 'rear',
          labelTooltip: null,
          onCreated: '',
          onMounted: '',
          onChange: '',
          onFocus: '',
          onBlur: '',
          onValidate: ''
        },
        id: 'cascader68559'
      },
      {
        type: 'grid',
        category: 'container',
        icon: 'grid',
        cols: [
          {
            type: 'grid-col',
            category: 'container',
            icon: 'grid-col',
            internal: true,
            widgetList: [
              {
                type: 'button',
                icon: 'button',
                formItemFlag: false,
                options: {
                  name: 'button56243',
                  label: '校验',
                  columnWidth: '200px',
                  size: 'normal',
                  displayStyle: 'inline',
                  disabled: false,
                  hidden: false,
                  type: 'primary',
                  plain: false,
                  round: false,
                  circle: true,
                  icon: null,
                  customClass: '',
                  onCreated: '',
                  onMounted: '',
                  onClick:
                    'console.log(\'自己注册的render标识，参数是校验之后的回调函数\')\nlet fromRef = this.getFormRef()\n\nfromRef.validateForm(\n function(){\n console.log(\'提交数据\')\n }\n)'
                },
                id: 'button56243'
              },
              {
                type: 'button',
                icon: 'button',
                formItemFlag: false,
                options: {
                  name: 'button53171',
                  label: '发送外部事件',
                  columnWidth: '200px',
                  size: '',
                  displayStyle: 'inline',
                  disabled: false,
                  hidden: false,
                  type: 'primary',
                  plain: true,
                  round: true,
                  circle: false,
                  icon: null,
                  customClass: [],
                  onCreated: '',
                  onMounted: '',
                  onClick:
                    '// this.$emit(\'VFormRender\', {componentType:\'yxtAction\', data:{msg:\'aaaa\'}})\n//this.emitAppendButtonClick() fileAction\nthis.emitCustomMsg(\'VFormRender\',\'formAction\',{fileSign:\'buttonclick\',data:{msg:\'aaaa\'}})\nthis.$message(\'这是一条消息提示\');\n'
                },
                id: 'button53171'
              },
              {
                type: 'button',
                icon: 'button',
                formItemFlag: false,
                options: {
                  name: 'button48658',
                  label: '获取注入数据',
                  columnWidth: '200px',
                  size: '',
                  displayStyle: 'inline',
                  disabled: false,
                  hidden: false,
                  type: 'primary',
                  plain: false,
                  round: true,
                  circle: false,
                  icon: null,
                  customClass: [],
                  onCreated: '',
                  onMounted: '',
                  onClick: 'console.log(this.globalData)'
                },
                id: 'button48658'
              },
              {
                type: 'button',
                icon: 'button',
                formItemFlag: false,
                options: {
                  name: 'button6461',
                  label: '获取注入接口',
                  columnWidth: '200px',
                  size: '',
                  displayStyle: 'inline',
                  disabled: false,
                  hidden: false,
                  type: 'primary',
                  plain: false,
                  round: true,
                  circle: false,
                  icon: null,
                  customClass: '',
                  onCreated: '',
                  onMounted: '',
                  onClick: 'console.log(this.apiRequets)'
                },
                id: 'button6461'
              }
            ],
            options: {
              name: 'gridCol105691',
              hidden: false,
              span: 12,
              offset: 0,
              push: 0,
              pull: 0,
              responsive: false,
              md: 12,
              sm: 12,
              xs: 12,
              customClass: ''
            },
            id: 'grid-col-105691'
          },
          {
            type: 'grid-col',
            category: 'container',
            icon: 'grid-col',
            internal: true,
            widgetList: [
              {
                type: 'button',
                icon: 'button',
                formItemFlag: false,
                options: {
                  name: 'button107847',
                  label: '提交',
                  columnWidth: '200px',
                  size: '',
                  displayStyle: 'inline',
                  disabled: false,
                  hidden: false,
                  type: 'primary',
                  plain: false,
                  round: false,
                  circle: false,
                  icon: null,
                  customClass: '',
                  onCreated: '',
                  onMounted: '',
                  onClick:
                    'alert(JSON.stringify(this.getFormRef().formDataModel))',
                  componentWidth: 20,
                  conDisplay: 'display'
                },
                id: 'button107847'
              }
            ],
            options: {
              name: 'gridCol47244',
              hidden: false,
              span: 12,
              offset: 0,
              push: 0,
              pull: 0,
              responsive: false,
              md: 12,
              sm: 12,
              xs: 12,
              customClass: []
            },
            id: 'grid-col-47244'
          }
        ],
        options: {
          name: 'grid24844',
          hidden: false,
          gutter: 12,
          colHeight: null,
          customClass: ''
        },
        id: 'grid24844'
      }
    ],
    formConfig: {
      modelName: 'formData',
      refName: 'vForm',
      rulesName: 'rules',
      labelWidth: 80,
      labelPosition: 'top',
      size: '',
      labelAlign: 'label-left-align',
      cssCode: '',
      customClass: '',
      functions: '',
      layoutType: 'PC',
      onFormCreated: '',
      onFormMounted: '',
      onFormDataChange: '',
      onFormValidate: ''
    }
  }

  public globalData: any = {
    token: UserModule.token,
    roleId: -1,
    tenantId: -1
  }

  public renderKey: string | number = new Date().getTime()
  public formData: any = {}
  public optionData: any = {}

  testOnAppendButtonClick(clickedWidget) {
    console.log('test', clickedWidget)
  }

  testOnButtonClick(button) {
    console.log('test', button)
  }

  handleFormChange(data) {
    // 总参数
    // fieldName, newValue, oldValue, this.formDataModel, subFormName, subFormRowIndex,signtype
    console.log(data)
  }
}
