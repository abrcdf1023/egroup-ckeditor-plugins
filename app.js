// app.js

import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import List from '@ckeditor/ckeditor5-list/src/list';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';

import SimpleBox from '@egroup/ckeditor-simplebox'; // ADDED

ClassicEditor
  .create(document.querySelector('#editor'), {
    plugins: [
      Essentials, Paragraph, Heading, List, Bold, Italic,
      SimpleBox // ADDED
    ],
    toolbar: ['heading', 'bold', 'italic', 'numberedList', 'bulletedList']
  })
  // For develop usage.
  .then(async editor => {
    if (!process.env.production) {
      const CKEditorInspector = await import('@ckeditor/ckeditor5-inspector').then(el => el.default)
      CKEditorInspector.attach(editor);
    }
    console.log('Editor was initialized', editor);
  })
  .catch(error => {
    console.error(error.stack);
  });