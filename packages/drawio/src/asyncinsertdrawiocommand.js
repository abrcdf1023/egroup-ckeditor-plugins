import Command from '@ckeditor/ckeditor5-core/src/command';
import { createDrawio } from './utils';

export default class AsyncInsertDrawioCommand extends Command {
  execute() {
    const editor = this.editor;
    editor.model.change(writer => {
      const { asyncInsertDrawio } = editor.config.get('drawio');
      if (asyncInsertDrawio) {
        asyncInsertDrawio().then(url => {
          editor.model.insertContent(createDrawio(writer, url));
        });
      } else {
        console.warn('Please config asyncInsertDrawio function.');
      }
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
