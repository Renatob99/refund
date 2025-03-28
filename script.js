// Seleciona os elementos do formulário
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")

//Seleciona os elementos da lista.
const expenseList = document.querySelector("ul")
const expenseQuantity = document.querySelector("aside header p span")
const expensesTotal = document.querySelector("aside header h2")

// Captura o evento de input para formatar o valor
amount.oninput = () => {
    //Obtém o valor atual do input e remove os caracters não numericos
    let value = amount.value.replace(/\D/g, "")
    
    //Transforma o valor em centavos (exemplo:150/100 = 1.5 que é equivalente a R$ 1,50)
    value = Number(value)/100

    //Atualiz o valor do input
    amount.value = formatCurrencyBRL(value)
    

}

//Transforma o valor de um variavel em BRL
function formatCurrencyBRL(value){
    //Formata o valor no padrão BRL (Real Brasileiro)
    value = value.toLocaleString("pt-BR", {
        style:"currency",
        currency:"BRL"
    })
    //
    return value

}

//Captura o evento de submit do formulario para obter os vaores.
form.onsubmit = (event) =>{
    event.preventDefault()

    const newExpense = {
        id: new Date().getTime(),
        expense:expense.value,
        category_id: category.value,
        category_name:category.options[category.selectedIndex].text,
        amount:amount.value,
        created_at:new Date()
    }
    //Chama a função que irá adicionar o item a lista.
    expenseAdd(newExpense)
}

//Adiciona um nvo item na lista
function expenseAdd(newExpense){
    try {
        // Cria o elemento para adicionar o item (li) na lista (ul).
        const expenseItem = document.createElement("li")
        expenseItem.classList.add("expense")

        //Cria o ícone da categoria
        const expenseIcon = document.createElement("img")
        expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`)
        expenseIcon.setAttribute("alt", newExpense.category_name)

        //Cria a info da dispesa
        const expenseInfo = document.createElement('div')
        expenseInfo.classList.add('expense-info')

        //Cria o nome da despesa
        const expenseName = document.createElement("strong")
        expenseName.textContent = newExpense.expense

        //Cria a categoria da despesa.
        const expenseCategory = document.createElement('span')
        expenseCategory.textContent = newExpense.category_name

        // Adiciona nome e categoria na div das informações da despensa.
        expenseInfo.append(expenseName, expenseCategory) 
        //Cria o valor da dispensa
        const expenseAmount = document.createElement("span")
        expenseAmount.classList.add("expense-amount")
        expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount.toUpperCase().replace("R$", "")}`
        
        //Cria o ícone de  remover
        const removeIcon = document.createElement("img")
        removeIcon.classList.add("remove-icon")
        removeIcon.setAttribute("src", "img/remove.svg")
        removeIcon.setAttribute("alt", "remover")

        
        //Adiciona as informações no item
        expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon)
        //Adiciona o item na lista
        expenseList.append(expenseItem)

        //Limpa  o  formulario para adicionar um novo item.
        formClear()

        //Atualiza os totais.
        updateTotals()
    } catch{


        alert("Não")

        console.log(error)

    }
}

//Atualizar os totais.
function updateTotals(){
    try{
        //Recupera todos os itens (li) da lista (ul)
        const items = expenseList.children
        
       //Atualiza a quantidade de itens da lista.
       expenseQuantity.textContent = `${items.length} ${items.length > 1?"despesas" : "despesa"}`
       
       //Variável para incrementar o total
       let total = 0
       for(let item = 0; item < items.length; item++){
          const intemAmount = items[item].querySelector(".expense-amount")
          
          //Remove caracteres não numericos e substitui a virgula pelo ponto
          let value = intemAmount.textContent.replace(/[^\d,]/g, "").replace(",", ".")
          
          //Converte o valor para Float
          value = parseFloat(value)

          //Verifica se um numero valido
          if(isNaN(value)){
             return alert("Não foi possivel calcular o total. O valor não parecer ser um número.")
          }

          total += Number(value)
        }

        const symbolBRL = document.createElement("small")
        symbolBRL.textContent = "R$"
        // Formata o valor e remove o R$ que será exibido pela small com estilo customizado.
        
        total = formatCurrencyBRL(total).toUpperCase().replace("R$", "")
        
        //Limpa o conteúdo do elemento
        expensesTotal.innerHTML = ""
        
        // Adiciona o simbolo de moeda e o valor total formatado
        expensesTotal.append(symbolBRL, total)
        
       
    } catch(error){
      console.log(error)
      alert("Não foi possivel atualizar os totais.")

    }
}

//Evento que captura o clique nos itens da lista
expenseList.addEventListener("click", function (event){
  //Verificar se o elemento clicado é o icone de remover
  if(event.target.classList.contains("remove-icon")){
    //Obtém a li  pai do elemento clicado.
    const item = event.target.closest(".expense")

    //Remove utem da lista
    item.remove()
  }
  updateTotals()
})

//Função para limpar os inputs
function formClear(){
    //limpa os inputs
    expense.value = ""
    category.value = ""
    amount.value = ""
    //Coloca o foco no input de amount
    expense.focus()
}


