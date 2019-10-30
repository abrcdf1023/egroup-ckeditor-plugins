import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

export default class DrawioUI extends Plugin {
  init() {
    const editor = this.editor;
    const t = editor.t;

    // The "Drawio" button must be registered among the UI components of the editor
    // to be displayed in the toolbar.
    editor.ui.componentFactory.add('Drawio', locale => {
      // The button will be an instance of ButtonView.
      const buttonView = new ButtonView(locale);
      const { onCreateClick } = editor.config.get('drawio') || {};

      buttonView.set({
        // The t() function helps localize the editor. All strings enclosed in t() can be
        // translated and change when the language of the editor changes.
        label: t('Create Drawio'),
        withText: true,
        tooltip: true
      });

      // Execute the command when the button is clicked (executed).
      if (onCreateClick) {
        this.listenTo(buttonView, 'execute', e => {
          onCreateClick(e, editor);
        });
      }

      return buttonView;
    });
  }
}
