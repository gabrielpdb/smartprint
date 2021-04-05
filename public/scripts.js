const currentPage = location.pathname
const menuItems = document.querySelectorAll('header .links a')

for (item of menuItems) {
    if (currentPage.includes(item.getAttribute('href'))) {
        item.classList.add('active')
    }
}


const buttonsOfItems = document.querySelectorAll('i.button-done')
const itemsOfOrder = document.querySelectorAll('.itemofOrder')

for (let button of buttonsOfItems) {
    button.addEventListener('click', function() {
        const itemId = button.getAttribute('id')
        for(let item of itemsOfOrder) {
            if(itemId == item.getAttribute('id')){
                if(!item.classList.contains("item-done")){
                    item.classList.add('item-done')
                    button.innerHTML = "close"
                } else {
                    item.classList.remove('item-done')
                    button.innerHTML = "done"
                }
            }
        }
    })
}