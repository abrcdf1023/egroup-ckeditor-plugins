import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import DrawioEditUI from './drawioedit/DrawioEditUI';

export default class DrawioEdit extends Plugin {
  static get requires() {
    return [DrawioEditUI];
  }

  static get pluginName() {
    return 'DrawioEdit';
  }
}
