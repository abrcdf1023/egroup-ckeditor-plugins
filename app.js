import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import List from '@ckeditor/ckeditor5-list/src/list';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Link from '@ckeditor/ckeditor5-link/src/link';
import MediaEmbed from '@ckeditor/ckeditor5-media-embed/src/mediaembed';

import Drawio from '@e-group/ckeditor-drawio/src/drawio';
import DrawioToobar from '@e-group/ckeditor-drawio/src/drawiotoolbar';
import DrawioEdit from '@e-group/ckeditor-drawio/src/drawioedit';

import CKEditorInspector from '@ckeditor/ckeditor5-inspector';

ClassicEditor
  .create(document.querySelector('#editor'), {
    plugins: [
      Essentials, Paragraph, Heading, List, Bold, Italic, Link, MediaEmbed,
      Drawio, DrawioToobar, DrawioEdit
    ],
    toolbar: {
      items: ['link', 'mediaEmbed', 'heading', 'bold', 'italic', 'numberedList', 'bulletedList', 'drawio'],
    },
    drawio: {
      toolbar: ['drawioEdit'],
      autoEmbedMatcher: (url) => {
        return url.indexOf('edstest-bucket') !== -1
      },
      asyncInsertDrawio: () => new Promise((resolve) => {
        setTimeout(() => {
          resolve('https://edstest-bucket.s3-ap-northeast-1.amazonaws.com/resources/flow/html/0872d2689b644670875af0d6c29e91c3.html')
        }, 2000)
      })
    },
    drawioEdit: {
      onOpenClick: () => {
        console.log('Open Clicked')
      }
    },
  })
  .then(editor => {
    CKEditorInspector.attach('editor', editor);

    window.editor = editor;
  })
  .catch(error => {
    console.error(error.stack);
  });