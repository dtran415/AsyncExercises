const numAPIBaseURL = "http://numbersapi.com"
const cardsAPIBaseURL = "https://deckofcardsapi.com/api/deck"
const favNum = 0
const numbers = [1,2,3]

// Promise
// Part 1

// 1
axios.get(`${numAPIBaseURL}/${favNum}`).then( res => console.log(res.data))

// 2
axios.get(`${numAPIBaseURL}/${numbers}`).then( res => console.log(res.data))

// 3
const arr = []
for (let i = 0; i < 4; i++) {
    arr.push(axios.get(`${numAPIBaseURL}/${favNum}`))
}
Promise.all(arr).then(res => {
    for (result of res) {
        const div = document.createElement('div')
        div.textContent = result.data
        document.getElementById("part1").appendChild(div)
    }
})

// Part 2

// 1
axios.get(`${cardsAPIBaseURL}/new/draw`).then( res => {
    const card = res.data.cards[0]
    console.log(`${card.value} of ${card.suit}`)
})

// 2
let firstCard = null
axios.get(`${cardsAPIBaseURL}/new/draw`).then( res => {
    firstCard = res.data.cards[0]
    return axios.get(`${cardsAPIBaseURL}/${res.data.deck_id}/draw`)
}).then(res => {
    const secondCard = res.data.cards[0]
    for (card of [firstCard, secondCard]) {
        console.log(`${card.value} of ${card.suit}`)
    }
})

// 3
let deckId = null
axios.get(`${cardsAPIBaseURL}/new/shuffle/`).then( res => {
    deckId = res.data.deck_id
})
const imgTag = document.getElementById("card-image")
const cardBtn = document.getElementById("get-card")

cardBtn.addEventListener("click", function() {
    if (deckId) {
        axios.get(`${cardsAPIBaseURL}/${deckId}/draw`).then(res => {
            imgTag.src = res.data.cards[0].image
            if (res.data.remaining == 0) {
                cardBtn.style.display = "none"
            }
        })
    }
})