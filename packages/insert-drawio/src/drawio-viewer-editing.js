import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

import {
  toWidget,
  toWidgetEditable
} from '@ckeditor/ckeditor5-widget/src/utils';
import Widget from '@ckeditor/ckeditor5-widget/src/widget';

export default class DrawioViewerEditing extends Plugin {
  static get requires() {
    // ADDED
    return [Widget];
  }

  init() {
    console.log('DrawioViewerEditing#init() got called');

    this._defineSchema();
    this._defineConverters();
  }

  _defineSchema() {
    // ADDED
    const schema = this.editor.model.schema;

    schema.register('drawioViewer', {
      // Behaves like a self-contained object (e.g. an image).
      isObject: true,

      // Allow in places where other blocks are allowed (e.g. directly in the root).
      allowWhere: '$block'
    });
  }

  _defineConverters() {
    // ADDED
    const conversion = this.editor.conversion;

    conversion.for('upcast').elementToElement({
      model: 'drawioViewer',
      view: {
        name: 'iframe',
        classes: 'drawio-viewer'
      }
    });
    conversion.for('dataDowncast').elementToElement({
      model: 'drawioViewer',
      view: {
        name: 'iframe',
        classes: 'drawio-viewer'
      }
    });
    conversion.for('editingDowncast').elementToElement({
      model: 'drawioViewer',
      view: (modelElement, viewWriter) => {
        const iframe = viewWriter.createContainerElement('iframe', {
          class: 'drawio-viewer'
        });

        return toWidget(iframe, viewWriter, {
          label: 'drawio viewer widget'
        });
      }
    });
  }
}
