import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import WidgetToolbarRepository from '@ckeditor/ckeditor5-widget/src/widgettoolbarrepository';
import { isWidget } from '@ckeditor/ckeditor5-widget/src/utils';

export default class DrawioToolbar extends Plugin {
  /**
   * @inheritDoc
   */
  static get requires() {
    return [WidgetToolbarRepository];
  }

  /**
   * @inheritDoc
   */
  static get pluginName() {
    return 'DrawioToolbar';
  }

  /**
   * @inheritDoc
   */
  afterInit() {
    const editor = this.editor;
    const t = editor.t;
    const widgetToolbarRepository = editor.plugins.get(WidgetToolbarRepository);

    widgetToolbarRepository.register('drawio', {
      ariaLabel: t('Drawio toolbar'),
      items: editor.config.get('drawio.toolbar') || [],
      getRelatedElement: getSelectedDrawioWidget
    });
  }
}

function isDrawioWidget(viewElement) {
  return !!viewElement.getCustomProperty('drawio') && isWidget(viewElement);
}

function getSelectedDrawioWidget(selection) {
  const viewElement = selection.getSelectedElement();

  if (viewElement && isDrawioWidget(viewElement)) {
    return viewElement;
  }

  return null;
}
