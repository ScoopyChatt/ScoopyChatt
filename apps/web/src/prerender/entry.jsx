// Build-time renderer for crawlers. tools/prerender.mjs loads the SSR build of this file
// and renders each route to HTML, so bots that do not run JavaScript (GPTBot, ClaudeBot,
// PerplexityBot) read the same article text visitors see. Never shipped to the browser.
import React from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Writable } from 'node:stream';
import { AppRoutes } from '@/App.jsx';

export function render(url) {
  return new Promise((resolve, reject) => {
    let html = '';
    const sink = new Writable({
      write(chunk, _enc, cb) { html += chunk.toString(); cb(); },
      final(cb) { resolve(html); cb(); },
    });
    const stream = renderToPipeableStream(
      <HelmetProvider context={{}}>
        <StaticRouter location={url}>
          <AppRoutes />
        </StaticRouter>
      </HelmetProvider>,
      {
        // Wait for every lazy page chunk, so the output is the page and not the loader.
        onAllReady() { stream.pipe(sink); },
        onShellError: reject,
        onError(err) { reject(err); },
      },
    );
    setTimeout(() => { stream.abort(); reject(new Error('render timed out: ' + url)); }, 20000);
  });
}
