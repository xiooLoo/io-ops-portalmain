import { i18n } from '@/lang'
import { UUserState } from './modules/user'
import { UAppState } from './modules/app'
import { UThemeconfState } from './modules/themeconf'
import { ULayoutconfState } from './modules/layoutconf'

/**
 * vuex module types
 */
export interface StoreModulesFace {
  user: UUserState;
  appconf: UAppState;
  themeconf: UThemeconfState;
  layoutconf: ULayoutconfState;
 }

export interface DynamicBtnListFace {
  authSign?: string;
  id?: string;
  name?: string;
  parentId?: string;
  sort?: number | string;
  type?: number | string;
  url?: string;
}

export interface ThemeFace {
  current: string;
  name: string;
  color: string;
  isActive?: boolean;
}

export type LangTypes = 'zh-CN' | 'zh-EN'

// 门户布局模式
export enum AsModeEnum {
  fmode = 'F-Mode',
  fimode = 'FI-Mode',
  tmode = 'T-Mode',
  zmode = 'Z-Mode'
}
// 门户布局模式-映射
export function asModeListCompare() {
  return [
    {
      id: 'F-Mode',
      name: i18n.t('message.portal.theme.menuF'),
      iconName: 'F-Mode',
      isActive: true
    },
    {
      id: 'FI-Mode',
      name: i18n.t('message.portal.theme.menuFI'),
      iconName: 'FI-Mode',
      isActive: false
    },
    {
      id: 'T-Mode',
      name: i18n.t('message.portal.theme.menuT'),
      iconName: 'T-Mode',
      isActive: false
    },
    {
      id: 'Z-Mode',
      name: i18n.t('message.portal.theme.menuZ'),
      iconName: 'Z-Mode',
      isActive: false
    }
  ]
}

export interface AsConfFace {
  isShowHamburger?: boolean;
  isShowBreadcrumb?: boolean;
  tab: {
    isShow?: boolean;
  };
  logo: {
    isShow?: boolean;
    src: string;
    title: string;
  };
  sidebar?: {
    isCollapse?: boolean;
  };
  navbar: {
    isShow: boolean;
    items: Array<any>;
  };
  contentLayout: {
    current: string;
    items: Array<any>;
  };
}

export interface StoreWorkbenchArrFace {
  x: number | string;
  y: number | string;
  w: number | string;
  h: number | string;
  i: string;
  comp: any;
}
