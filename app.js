import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import InsertImage from '@egroup/ckeditor-insert-image';

ClassicEditor
  .create(document.querySelector('#editor'), {
    plugins: [ Essentials, Paragraph, Bold, Italic, InsertImage ],
    toolbar: ['bold', 'italic', 'insertImage']
  })
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