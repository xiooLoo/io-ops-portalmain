
declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode {}
    // tslint:disable no-empty-interface
    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [elem: string]: any;
    }
  }
}

declare interface Window {
  __POWERED_BY_QIANKUN__: any;
  __INJECTED_PUBLIC_PATH_BY_QIANKUN__: any;
  qiankunStarted: boolean;
}

window.__POWERED_BY_QIANKUN__ = window.__POWERED_BY_QIANKUN__ || ''
window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__ || ''
