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
      onCreateClick: (e, editor) => {
        setTimeout(() => {
          editor.execute('insertDrawio', 'resources/drawio/html/20191101093044_468c324ab4a64d99b64b4963350d4335.html')
        }, 1000)
      },
      formatSrc: (src) => {
        return `https://edstest-bucket.s3-ap-northeast-1.amazonaws.com/${src}`
      }
    },
    // edit button in the editor content.
    drawioEdit: {
      onOpenClick: (e, editor) => {
        console.log(editor.model.document.selection.getSelectedElement().getAttribute('src'))
        editor.execute('updateSelectedDrawioAttribute', {
          name: 'src',
          value: 'https://www.google.com.tw/'
        })
      }
    },
  })
  .then(editor => {
    CKEditorInspector.attach('editor', editor);

    window.editor = editor;
    
    editor.model.document.on( 'change', () => {
      document.getElementById('preview').innerHTML = editor.getData()
      document.getElementById('data').innerText = editor.getData()
    });
    document.getElementById('preview').innerHTML = editor.getData()
    document.getElementById('data').innerText = editor.getData()
  })
  .catch(error => {
    console.error(error.stack);
  });