/* eslint-disable spaced-comment */
import { IRootStore } from '../store';
import { RouteRecordRaw } from 'vue-router';
import type { IMessage } from 'element-plus/es/el-message/src/types.d';
import { INotification } from 'element-plus/lib/el-notification/src/notification.type';
import type { ILoadingInstance, ILoadingOptions } from 'element-plus/es/el-loading/src/loading.type';

export interface IAsyncDataContext {
  route: RouteRecordRaw;
  store: IRootStore;
}
declare module '@vue/runtime-core' {
  interface ComponentCustomOptions {
    asyncData?(context: IAsyncDataContext): Promise<any>;
  }

  interface ComponentCustomProperties {
    $message: IMessage;
    $notify: INotification;
    $loading: (options?: ILoadingOptions) => ILoadingInstance;
  }
}
