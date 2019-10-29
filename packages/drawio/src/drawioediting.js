import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

import { toWidget } from '@ckeditor/ckeditor5-widget/src/utils';

import AsyncInsertDrawioCommand from './asyncinsertdrawiocommand';
export default class DrawioEditing extends Plugin {
  init() {
    this._defineSchema();
    this._defineConverters();

    this.editor.commands.add(
      'asyncInsertDrawio',
      new AsyncInsertDrawioCommand(this.editor)
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

    conversion.for('downcast').elementToElement({
      model: 'drawio',
      view: (modelElement, viewWriter) => {
        const root = viewWriter.createContainerElement('figure', {
          class: 'drawio-wrapper',
          style: 'margin: 1em 0;'
        });
        const container = viewWriter.createContainerElement('div', {
          style: 'position: relative; height: 0; padding-bottom: 500px;'
        });
        // TODO: Use customized view button to replace drawio default iframe buttons.
        const iframe = viewWriter.createEmptyElement('iframe', {
          class: 'drawio',
          style: 'position: absolute; height: 100%; top: 0; left: 0;',
          src: modelElement.getAttribute('src')
        });

        viewWriter.setCustomProperty('drawio', true, root);

        viewWriter.insert(viewWriter.createPositionAt(container, 0), iframe);

        viewWriter.insert(viewWriter.createPositionAt(root, 0), container);

        return toWidget(root, viewWriter, {
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
