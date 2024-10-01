// Bismillah

// to show dev details
function showDevDetails(){
    const page = document.querySelector('.dev-details')
    const co_two = document.querySelector('.cardItems.two')
    const co_three = document.querySelector('.cardItems.three')

    page.classList.add('show')
    co_two.classList.add('hide')
    co_three.classList.add('hide')
}


// to remove dev details
function removeShowPage(){
    const cond = document.querySelector('.dev-container')
    const page = document.querySelector('.dev-details')
    const co_two = document.querySelector('.cardItems.two')
    const co_three = document.querySelector('.cardItems.three')

    page.classList.remove('show')
    co_two.classList.remove('hide')
    co_three.classList.remove('hide')
    cond.addEventListener('click', evnt => evnt.stopPropagation() )
}
removeShowPage()
