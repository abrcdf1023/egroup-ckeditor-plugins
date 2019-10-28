import Command from '@ckeditor/ckeditor5-core/src/command';

export default class InsertDrawioViewerCommand extends Command {
  execute() {
    this.editor.model.change(writer => {
      const drawioViewerUrl = prompt('Drawio Viewer URL');
      // Insert <drawioViewer>*</drawioViewer> at the current selection position
      // in a way that will result in creating a valid model structure.
      this.editor.model.insertContent(
        createDrawioViewer(writer, drawioViewerUrl)
      );
    });
  }

  refresh() {
    const model = this.editor.model;
    const selection = model.document.selection;
    const allowedIn = model.schema.findAllowedParent(
      selection.getFirstPosition(),
      'drawioViewer'
    );

    this.isEnabled = allowedIn !== null;
  }
}

function createDrawioViewer(writer, drawioViewerUrl) {
  const drawioViewer = writer.createElement('drawioViewer', {
    src: drawioViewerUrl
  });

  return drawioViewer;
}
