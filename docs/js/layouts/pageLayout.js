// Номын 2.3: олон хуудсанд дахин ашиглах үндсэн layout.
export function renderPageLayout({id='',title='',subtitle='',content='',className=''}) {
  return `<section ${id?`id="${id}"`:''} class="page-section ${className}"><div class="container">${title?`<div class="section-heading"><div><h1>${title}</h1>${subtitle?`<p>${subtitle}</p>`:''}</div></div>`:''}${content}</div></section>`;
}
