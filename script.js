// Seleciona os elementos do formulário
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")

//Seleciona os elementos da lista.
const expenseList = document.querySelector("ul")

// Captura o evento de input para formatar o valor
amount.oninput = () => {
    //Obtém o valor atual do input e remove os caracters não numericos
    let value = amount.value.replace(/\D/g, "")
    
    //Transforma o valor em centavos (exemplo:150/100 = 1.5 que é equivalente a R$ 1,50)
    value = Number(value)/100

    //Atualiz o valor do input
    amount.value = formatCurrencyBRL(value)
    

}
function formatCurrencyBRL(value){
    //Formata o valor no padrão BRL (Real Brasileiro)
    value = value.toLocaleString("pt-BR", {
        style:"currency",
        currency:"BRL"
    })
    //
    return value

}

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
        //Adiciona as informações no item
        expenseItem.append(expenseIcon, expenseInfo)
        //Adiciona o item na lista
        expenseList.append(expenseItem)
    } catch{

        alert("Não")
        console.log(error)
    }
}

