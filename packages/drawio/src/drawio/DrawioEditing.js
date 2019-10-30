import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

import { toWidget } from '@ckeditor/ckeditor5-widget/src/utils';

function createDrawio(element, writer) {
  const root = writer.createContainerElement('figure', {
    class: 'drawio-wrapper',
    style: 'margin: 1em 0;'
  });
  const container = writer.createContainerElement('div', {
    style: 'position: relative; height: 0; padding-bottom: 500px;'
  });
  // TODO: Use customized view button to replace drawio default iframe buttons.
  const iframe = writer.createEmptyElement('iframe', {
    class: 'drawio',
    style: 'position: absolute; height: 100%; top: 0; left: 0;',
    src: element.getAttribute('src')
  });

  writer.setCustomProperty('drawio', true, root);

  writer.insert(writer.createPositionAt(container, 0), iframe);

  writer.insert(writer.createPositionAt(root, 0), container);

  return root;
}
export default class DrawioEditing extends Plugin {
  init() {
    this._defineSchema();
    this._defineConverters();
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

    conversion
      .for('editingDowncast')
      // Attribute converter for editing downcast.Please read this issue
      // https://github.com/ckeditor/ckeditor5/issues/1845
      .add(dispatcher => {
        dispatcher.on('attribute:src:drawio', (evt, data, conversionApi) => {
          if (!data.attributeNewValue) return;
          const viewWriter = conversionApi.writer;
          const figure = conversionApi.mapper.toViewElement(data.item);
          const iframe = figure.getChild(0).getChild(0);
          viewWriter.setAttribute(
            data.attributeKey,
            data.attributeNewValue,
            iframe
          );
        });
      })
      .elementToElement({
        model: 'drawio',
        view: (modelElement, viewWriter) =>
          toWidget(createDrawio(modelElement, viewWriter), viewWriter, {
            label: 'drawio widget'
          })
      });

    conversion.for('dataDowncast').elementToElement({
      model: 'drawio',
      view: (modelElement, viewWriter) => createDrawio(modelElement, viewWriter)
    });

    conversion.for('upcast').elementToElement({
      view: {
        name: 'iframe',
        classes: 'drawio',
        attributes: {
          src: true
        }
      },
      model: (viewIframe, modelWriter) =>
        modelWriter.createElement('drawio', {
          src: viewIframe.getAttribute('src')
        })
    });
  }
}
