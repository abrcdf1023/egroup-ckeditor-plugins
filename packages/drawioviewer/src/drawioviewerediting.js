import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

import {
  toWidget,
  toWidgetEditable
} from '@ckeditor/ckeditor5-widget/src/utils';
import Widget from '@ckeditor/ckeditor5-widget/src/widget';

import InsertDrawioViewerCommand from './insertdrawioviewercommand';
export default class DrawioViewerEditing extends Plugin {
  static get requires() {
    // ADDED
    return [Widget];
  }

  init() {
    console.log('DrawioViewerEditing#init() got called');

    this._defineSchema();
    this._defineConverters();

    this.editor.commands.add(
      'insertDrawioViewer',
      new InsertDrawioViewerCommand(this.editor)
    );
  }

  _defineSchema() {
    const schema = this.editor.model.schema;
    schema.register('drawioViewer', {
      // Behaves like a self-contained object (e.g. an image).
      isObject: true,
      isBlock: true,
      allowIn: '$root',
      allowAttributes: ['src']
    });
  }

  _defineConverters() {
    const conversion = this.editor.conversion;

    conversion.for('dataDowncast').elementToElement({
      model: 'drawioViewer',
      view: (modelElement, viewWriter) =>
        viewWriter.createContainerElement('iframe', {
          class: 'drawio-viewer',
          width: '100%',
          height: '500px'
        })
    });

    conversion.for('editingDowncast').elementToElement({
      model: 'drawioViewer',
      view: (modelElement, viewWriter) => {
        const iframe = viewWriter.createContainerElement('iframe', {
          class: 'drawio-viewer',
          width: '100%',
          height: '500px',
          src: modelElement.getAttribute('src')
        });

        return toWidget(iframe, viewWriter, {
          label: 'drawio viewer widget'
        });
      }
    });

    conversion.for('upcast').elementToElement({
      view: {
        name: 'iframe',
        classes: 'drawio-viewer',
        attributes: {
          src: true
        }
      },
      model: (viewImage, modelWriter) =>
        modelWriter.createElement('drawioViewer', {
          src: viewImage.getAttribute('src')
        })
    });
  }
}
