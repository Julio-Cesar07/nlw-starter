const buttonSearch = document.querySelector('#page-home .content main a')
const modalObj = document.querySelector('#modal')
const close = document.querySelector('#modal .content .header a')

function modalOn() {}

buttonSearch.addEventListener('click', () => {
  modalObj.classList.remove('hide')
})

close.addEventListener('click', () => {
  modalObj.classList.add('hide')
})
