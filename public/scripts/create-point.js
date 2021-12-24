// Procura select com name="uf"
// espera um evento de mudança "change", quando ocorrer, roda a arrow function

function populateUfs() {
  const ufSelect = document.querySelector('select[name=uf]')

  const url = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados'
  fetch(url)
    .then(response => {
      return response.json()
    })
    .then(states => {
      for (let state of states) {
        ufSelect.innerHTML += `<option value="${state.id}">
        ${state.nome}</option>`
      }
    })
}

/*
document.querySelector('select[name=uf]').addEventListener('change', () => {
  console.log(option.value)
})*/

function getCities(event) {
  const citySelect = document.querySelector('select[name=city]')
  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${event.target.value}/municipios`
  const stateInput = document.querySelector('input[name=state]')

  const indexOfSelectedState = event.target.selectedIndex
  stateInput.value = event.target.options[indexOfSelectedState].text

  citySelect.innerHTML = `<option value="">Selecione a Cidade</option>`
  citySelect.disabled = true
  fetch(url)
    .then(data => {
      return data.json()
    })
    .then(cities => {
      for (let city of cities) {
        citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
      }

      citySelect.disabled = false
    })
}

document.querySelector('select[name=uf]').addEventListener('change', getCities)

populateUfs()

// Itens de coleta
// pegar todos os li's

const itemsToCollect = document.querySelectorAll('.itens-grid li')

for (let item of itemsToCollect) {
  item.addEventListener('click', handleSelectedItem)
}

let selectedItens = []
const collectedItems = document.querySelector('input[name=itens]')

function handleSelectedItem(event) {
  const itemLi = event.target
  // adicionar ou remover uma classe com js
  // olha o itemLi, se existir uma classe selected, ele remove
  // se não tiver, ele adiciona
  itemLi.classList.toggle('selected')

  const itemId = event.target.dataset.id

  // verificar se existem itens selecionados,
  // se sim pegar os itens selecionados
  const alreadSelected = selectedItens.findIndex(item => {
    // item é o valor no array, essa comparação retorna true ou false
    // se retornar true, o findIndex devolve o index
    // se retornar false, o findIndex devolve -1
    return item == itemId
  })

  // se já estiver selecionado, tirar da coleção
  if (alreadSelected >= 0) {
    /*const filteredItems = selectedItens.filter(item => {
      return item != itemId
    })
    
    selectedItens = filteredItems*/

    selectedItens.splice(alreadSelected, 1)
  } // se não tiver selecionado, colocar na coleção
  else {
    selectedItens.push(itemId)
  }

  //console.log(selectedItens)

  // atualizar o campo escolhido com os dados atualidados
  collectedItems.value = selectedItens
}
