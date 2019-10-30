import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import Widget from '@ckeditor/ckeditor5-widget/src/widget';
import DrawioEditing from './drawio/drawioediting';
import DrawioUI from './drawio/drawioui';
import AutoDrawioEmbed from './drawio/autodrawioembed';
import InsertDrawioCommand from './drawio/InsertDrawioCommand';
import UpdateSelectedDrawioAttributeCommand from './drawio/UpdateSelectedDrawioAttributeCommand';

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

  init() {
    this.editor.commands.add(
      'insertDrawio',
      new InsertDrawioCommand(this.editor)
    );
    this.editor.commands.add(
      'updateSelectedDrawioAttribute',
      new UpdateSelectedDrawioAttributeCommand(this.editor)
    );
  }
}
