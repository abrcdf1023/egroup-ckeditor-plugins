import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import Widget from '@ckeditor/ckeditor5-widget/src/widget';
import DrawioViewerEditing from './drawioviewerediting';
import DrawioViewerUI from './drawioviewerui';

export default class DrawioViewer extends Plugin {
  /**
   * @inheritDoc
   */
  static get pluginName() {
    return 'DrawioViewer';
  }

  static get requires() {
    return [Widget, DrawioViewerEditing, DrawioViewerUI];
  }
}
