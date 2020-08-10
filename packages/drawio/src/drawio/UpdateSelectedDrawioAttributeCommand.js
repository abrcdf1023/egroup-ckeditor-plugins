import Command from '@ckeditor/ckeditor5-core/src/command';

function getSelectedDrawioWidget(selection) {
  const selectedElement = selection.getSelectedElement();

  if (selectedElement && selectedElement.name === 'drawio') {
    return selectedElement;
  }

  return null;
}

export default class UpdateSelectedDrawioAttributeCommand extends Command {
  execute(options) {
    const editor = this.editor;
    const selection = editor.model.document.selection;

    editor.model.change(writer => {
      writer.setAttribute(
        options.name,
        options.value,
        getSelectedDrawioWidget(selection)
      );
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
