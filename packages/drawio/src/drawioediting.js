import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

import { toWidget } from '@ckeditor/ckeditor5-widget/src/utils';

import InsertDrawioCommand from './insertdrawiocommand';
export default class DrawioEditing extends Plugin {
  init() {
    console.log('DrawioEditing#init() got called');

    this._defineSchema();
    this._defineConverters();

    this.editor.commands.add(
      'insertDrawio',
      new InsertDrawioCommand(this.editor)
    );
  }

  _defineSchema() {
    const schema = this.editor.model.schema;
    schema.register('drawio', {
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
      model: 'drawio',
      view: (modelElement, viewWriter) =>
        viewWriter.createContainerElement('iframe', {
          class: 'drawio',
          width: '100%',
          height: '500px'
        })
    });

    conversion.for('editingDowncast').elementToElement({
      model: 'drawio',
      view: (modelElement, viewWriter) => {
        const iframe = viewWriter.createContainerElement('iframe', {
          class: 'drawio',
          width: '100%',
          height: '500px',
          src: modelElement.getAttribute('src')
        });

        return toWidget(iframe, viewWriter, {
          label: 'drawio widget'
        });
      }
    });

    conversion.for('upcast').elementToElement({
      view: {
        name: 'iframe',
        classes: 'drawio',
        attributes: {
          src: true
        }
      },
      model: (viewImage, modelWriter) =>
        modelWriter.createElement('drawio', {
          src: viewImage.getAttribute('src')
        })
    });
  }
}
