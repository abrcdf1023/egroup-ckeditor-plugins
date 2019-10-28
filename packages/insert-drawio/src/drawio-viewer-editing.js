import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

export default class DrawioViewerEditing extends Plugin {
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

    conversion.elementToElement({
      model: 'drawioViewer',
      view: {
        name: 'iframe',
        classes: 'drawio-viewer'
      }
    });
  }
}
