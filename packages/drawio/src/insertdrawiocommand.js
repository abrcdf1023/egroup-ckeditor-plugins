import Command from '@ckeditor/ckeditor5-core/src/command';

export default class InsertDrawioCommand extends Command {
  execute() {
    this.editor.model.change(writer => {
      const drawioUrl = prompt('Drawio URL');
      // Insert <drawio>*</drawio> at the current selection position
      // in a way that will result in creating a valid model structure.
      this.editor.model.insertContent(createDrawio(writer, drawioUrl));
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

function createDrawio(writer, drawioUrl) {
  const drawio = writer.createElement('drawio', {
    src: drawioUrl
  });

  return drawio;
}
