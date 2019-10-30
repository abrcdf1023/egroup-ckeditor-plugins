import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import ContextualBalloon from '@ckeditor/ckeditor5-ui/src/panel/balloon/contextualballoon';

export default class DrawioEditUI extends Plugin {
  static get requires() {
    return [ContextualBalloon];
  }

  static get pluginName() {
    return 'DrawioEditUI';
  }

  init() {
    this._createButton();
  }

  destroy() {
    super.destroy();
  }

  _createButton() {
    const editor = this.editor;
    const t = editor.t;

    editor.ui.componentFactory.add('drawioedit', locale => {
      const view = new ButtonView(locale);
      const { onOpenClick } = editor.config.get('drawioEdit') || {};

      view.set({
        label: t('Open Drawio Editor'),
        withText: true,
        tooltip: true
      });

      if (onOpenClick) {
        this.listenTo(view, 'execute', e => {
          onOpenClick(e, editor);
        });
      }

      return view;
    });
  }
}
