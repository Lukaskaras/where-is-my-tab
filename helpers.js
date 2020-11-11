export const formOnSubmit = (event) => {
  event.preventDefault()
  const nameField = document.getElementById('name')
  const address = document.getElementById('address')

  chrome.storage.sync.get('bookmarks', (result) => {
    const newBookmark = {
      name: nameField.value,
      value: address.value
    }
    
    if (Array.isArray(result.bookmarks)) {
      result.bookmarks.push(newBookmark)
    } else {
      result.bookmarks = [newBookmark]
    }

    chrome.storage.sync.set({ bookmarks: result.bookmarks }, () => {
      window.location.reload()
    })
  })
}

const actionButtonOnClick = (element, value) => {
  chrome.tabs.query({ url: `*://${value}/*`}, (tabs) => {
    
    if (tabs.length === 0) {
      const noFoundElement = document.getElementById('mydiv')
      noFoundElement.style.display = 'block'
      return
    }

    chrome.tabs.update(tabs[0].id, { highlighted: true })
  })
}

const deleteButtonOnClick = (element, value) => {
  chrome.storage.sync.get('bookmarks', (result) => {
    const toStayArr = result.bookmarks.filter(bm => bm.value !== value)
    chrome.storage.sync.set({ bookmarks: toStayArr }, () => {
      window.location.reload()
    })
  })
}

export const createBookmarkRow = (value) => {
  const newDiv = document.createElement('div')
  newDiv.setAttribute('style', 'display: flex-inline')
  
  const newTabButton = document.createElement('button')
  newTabButton.setAttribute('class', 'action-button')
  const textElement = document.createElement('p')
  textElement.textContent = `Find my ${value.name}`
  newTabButton.appendChild(textElement)
  newTabButton.onclick = () => actionButtonOnClick(newTabButton, value.value)

  const newDeleteButton = document.createElement('button')
  newDeleteButton.textContent = 'X'
  newDeleteButton.setAttribute('style', 'margin-left:10px;color:red')
  newDeleteButton.onclick = () => deleteButtonOnClick(newDeleteButton, value.value)

  newDiv.appendChild(newTabButton)
  newDiv.appendChild(newDeleteButton)
  
  return newDiv
}