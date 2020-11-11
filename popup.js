import { formOnSubmit,createBookmarkRow } from './helpers.js'

chrome.tabs.query({}, (tabs) => {
  const tabsCountElement = document.getElementById('no-of-tabs')
  tabsCountElement.innerHTML = `You have ${tabs.length} tabs opened`
})

chrome.storage.sync.get('bookmarks', (result) => {
  const buttonDiv = document.getElementById('buttons')

  if (!Array.isArray(result.bookmarks)) {
    return
  }

  for (const bookmark of result.bookmarks) {
    const newBookmarkRow = createBookmarkRow(bookmark)
    buttonDiv.appendChild(newBookmarkRow)
  }
})

const form = document.getElementById('myform')
form.onsubmit = formOnSubmit
