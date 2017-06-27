module.exports = {
  block: 'page',
  content: [
    {
      block: 'datepicker',
      mods: {popup: true},
    },
    {
      block: 'rating',
      content: [{
        elem: 'star',
        content: 'star content',
      }],
    },
    {
      block: 'img',
      mods: {lightbox: true},
    },
    {
      block: 'news-list',
      content: [{
        elem: 'item',
        elemMods: {active: false},
        content: 'star content',
      }],
    },
  ],
};
