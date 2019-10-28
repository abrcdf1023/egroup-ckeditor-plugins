import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import DrawioViewerEditing from './drawio-viewer-editing';
import DrawioViewerUI from './drawio-viewer-ui';
// This SVG file import will be handled by webpack's raw-text loader.
// This means that imageIcon will hold the source SVG.
import imageIcon from '@ckeditor/ckeditor5-core/theme/icons/image.svg';

import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';

class DrawioViewer extends Plugin {
  static get requires() {
    return [DrawioViewerEditing, DrawioViewerUI];
  }

  static get pluginName() {
    return 'DrawioViewer';
  }
}

export default DrawioViewer;
