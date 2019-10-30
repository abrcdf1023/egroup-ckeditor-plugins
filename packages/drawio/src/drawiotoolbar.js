import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import WidgetToolbarRepository from '@ckeditor/ckeditor5-widget/src/widgettoolbarrepository';
import { getSelectedDrawioWidget } from './utils';

export default class DrawioToolbar extends Plugin {
  static get requires() {
    return [WidgetToolbarRepository];
  }

  static get pluginName() {
    return 'DrawioToolbar';
  }

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
