import Command from '@ckeditor/ckeditor5-core/src/command';
import { createDrawio } from '../utils';

export default class InsertDrawioCommand extends Command {
  execute(url) {
    const editor = this.editor;
    editor.model.change(writer => {
      editor.model.insertContent(createDrawio(writer, url));
    });
  }

  refresh() {
    const model = this.editor.model;
    const selection = model.document.selection;
    const allowedIn = model.schema.findAllowedParent(
      selection.getFirstPosition(),
      'drawio'
    );

    this.isEnabled = allowedIn !== null;
  }
}
