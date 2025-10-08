const gap = 16
const MIN_WIDTH_DESKTOP = 1440 

let isOpen = false 
const teamGrid = document.querySelector('.mr-team-grid')
const teamCards = teamGrid?.querySelectorAll('.mr-teammate')
const showMore = document.querySelector('.mr-team__show-more-btn')

let initHeight = 0 

const isMobileView = () => window.innerWidth < MIN_WIDTH_DESKTOP

const calculateStartHeight = () => {
    startHeight = teamGrid.scrollHeight
}

const calculateInitHeight = () => {
    if (teamCards.length >= 3) {
        if (window.innerWidth < 834) {
            initHeight = teamCards[0].offsetHeight + teamCards[1].offsetHeight + gap
        } else {
            initHeight = teamCards[0].offsetHeight + teamCards[2].offsetHeight + gap
        }
    } else if (teamCards.length > 0) {
        initHeight = teamCards[0].offsetHeight + gap
    } else {
        initHeight = 0 
    }
}

const updateGridDisplay = () => {
    calculateStartHeight()
    calculateInitHeight()

    if (isMobileView()) {
        showMore.style.display = 'block'
        teamGrid.style.overflow = 'hidden' 
        if (isOpen) {
            teamGrid.style.height = `${startHeight}px`
            showMore.innerText = 'Скрыть'
        } else {
            teamGrid.style.height = `${initHeight}px`
            showMore.innerText = 'Показать всех'
        }
    } else {
        teamGrid.style.height = 'auto'
        teamGrid.style.overflow = 'visible'
        showMore.style.display = 'none'
        isOpen = true 
    }
}

const onShowMore = () => {
    if (isMobileView()) { 
        isOpen = !isOpen 
        updateGridDisplay() 
    }
}

const init = () => {
    isOpen = !isMobileView();
    updateGridDisplay();
}

showMore.onclick = onShowMore

let resizeTimeout
window.addEventListener('resize', () => {
    isOpen = !isMobileView();
    updateGridDisplay();
})

init()