import { configure } from '@storybook/react';
import { setOptions } from '@storybook/addon-options';

const req = require.context('../src', true, /story\.js$/)

function loadStories() {
  req.keys().forEach(req);
}
setOptions({
  name: 'TEMPLATE',
  url: 'https://sensorfact.nl'
  // downPanelInRight: true,
});

function normalizeBodyAndHTML() {
  const doc = document
  const styleTag = doc.createElement('style');
  styleTag.innerHTML = `
    html, body {
      margin: 0; padding: 0;
    }
    *, *:before, *:after {
      box-sizing: border-box;
    }
  `;
  doc.querySelector('head')
    .appendChild(styleTag);
}

function setupStyles() {
  return new Promise((resolve) => {
    const styleTag = document.createElement('style');
    const linkTag = document.createElement('link');
    styleTag.innerHTML = `
      import url('https://fonts.googleapis.com/css?family=Rubik:300,400,500');
      *, *:before, *:after { box-sizing: border-box; }

      html, body {
        font-weight: 300;
        line-height: 1.4;
        min-height: 100vh;
        margin: 0; padding: 0;
        font-family: 'Rubik', sans-serif;
      }
    `;

    linkTag.href = 'https://static.sensorfact.nl/fonts/sf-font.css';
    linkTag.rel = 'stylesheet';

    styleTag.type = 'text/css';
    document.head.appendChild(styleTag);
    document.head.appendChild(linkTag);
    resolve();
  });
}


setupStyles()
  .then(() => {
    configure(loadStories, module);
  });
