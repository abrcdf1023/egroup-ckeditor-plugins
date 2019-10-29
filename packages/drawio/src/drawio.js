import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import Widget from '@ckeditor/ckeditor5-widget/src/widget';
import DrawioEditing from './drawioediting';
import DrawioUI from './drawioui';
import AutoDrawioEmbed from './autodrawioembed';

export default class Drawio extends Plugin {
  /**
   * @inheritDoc
   */
  static get pluginName() {
    return 'Drawio';
  }

  static get requires() {
    return [Widget, DrawioEditing, DrawioUI, AutoDrawioEmbed];
  }
}
