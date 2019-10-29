import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import List from '@ckeditor/ckeditor5-list/src/list';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';

import Drawio from '@e-group/ckeditor-drawio';
import DrawioToobar from '@e-group/ckeditor-drawiotoolbar';
import DrawioEdit from '@e-group/ckeditor-drawioedit';

import CKEditorInspector from '@ckeditor/ckeditor5-inspector';

ClassicEditor
  .create(document.querySelector('#editor'), {
    plugins: [
      Essentials, Paragraph, Heading, List, Bold, Italic,
      Drawio, DrawioToobar, DrawioEdit
    ],
    toolbar: ['heading', 'bold', 'italic', 'numberedList', 'bulletedList', 'drawio'],
    drawio: {
      toolbar: ['drawioEdit'],
      drawioEdit: {
        onClick: () => {
          console.log('clicked')
        }
      },
      autoEmbedMatcher: (url) => {
        console.log(url)
        return true
      }
    }
  })
  .then(editor => {
    CKEditorInspector.attach('editor', editor);

    window.editor = editor;
  })
  .catch(error => {
    console.error(error.stack);
  });