import '../node_modules/semantic-ui-css/semantic.min.css'
import Vue from 'vue'
import App from './App'
/* eslint-disable no-unused-vars */
import semantic from 'semantic'

// very simple markdown to html converter. Tries to output correct HTML by not allowing many kinds of nesting.
// Specifically, the order of nesting matters. For example '**//nesting//**'' works, but '//**nesting**//' doesn't.
// This helps because it will deal nicely with bad markdown like '**//nesting**//' (which will become
// '<strong>//nesting</strong>//')
Vue.filter('simpleMarkdown', function (markdown) {
  // TODO: To support some kinds of markdown (like lists), we should first split the string into lines,
  // and then work on each line separately. Later, when rejoining, empty lines should be replaced by
  // </p><p>
  return '<p>' +
    _.escape(markdown)

    // Note that we remove \n\n, so using '= ', etc. in the last line of a paragraph does not work
    .replace('\n\n', '</p><p>')

    // Headers
    .replace(/== ([^<>]*?)\n/g, '<h2>$1</h2>')
    .replace(/= ([^<>]*?)\n/g, '<h1>$1</h1>')

    // Text decoration
    .replace(/\*\*([^<>]*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\/\/([^<>]*?)\/\//g, '<em>$1</em>') +
    '</p>'
})

/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { App }
})