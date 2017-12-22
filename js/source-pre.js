(function (){ // Don't spoil global namespace.
  const entityMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;',
  };

  function escapeHtml(string) {
    return String(string).replace(/[&<>"'`=\/]/g, function (s) {
      return entityMap[s];
    });
  }

  function get(url) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", url);
      xhr.onload = () => resolve(xhr.responseText);
      xhr.onerror = () => reject(xhr.statusText);
      xhr.send();
    });
  }

  window.addEventListener('load', function() {
    document.querySelectorAll('pre[src],code[src]').forEach(function(el, i) {
      const srcFile = el.getAttribute('src');
      get(srcFile).then((data) => {
        el.innerHTML = escapeHtml(data)
          .split`b+`.join`<b>`.split`b-`.join`</b>` // replace b+ and b- with <b> and </b>... Yeah not the best markup
          ;
      }).catch((err) => {
        console.error(err);
      });
    });
  });
})();
