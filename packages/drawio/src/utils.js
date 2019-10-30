import { isWidget } from '@ckeditor/ckeditor5-widget/src/utils';

export function createDrawio(writer, drawioUrl) {
  const drawio = writer.createElement('drawio', {
    src: drawioUrl
  });

  return drawio;
}

export function isDrawioWidget(viewElement) {
  return !!viewElement.getCustomProperty('drawio') && isWidget(viewElement);
}

export function getSelectedDrawioWidget(selection) {
  const selectedElement = selection.getSelectedElement();

  if (selectedElement && isDrawioWidget(selectedElement)) {
    return selectedElement;
  }

  return null;
}
