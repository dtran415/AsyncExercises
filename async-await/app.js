const numAPIBaseURL = "http://numbersapi.com"
const cardsAPIBaseURL = "https://deckofcardsapi.com/api/deck"
const favNum = 0
const numbers = [1,2,3]

// Part 1

// 1
async function part1_1() {
    const res = await axios.get(`${numAPIBaseURL}/0`)
    console.log(res.data)
}
part1_1()

// 2
async function part1_2() {
    const res = await axios.get(`${numAPIBaseURL}/${numbers}`)
    console.log(res.data)
}
part1_2()

// 3
async function part1_3() {
    arr = []
    for (let i = 0; i < 4; i++) {
        arr.push(axios.get(`${numAPIBaseURL}/0`))
    }
    const res = await Promise.all(arr)

    for (result of res) {
        const div = document.createElement('div')
        div.textContent = result.data
        document.getElementById("part1").appendChild(div)
    }
}
part1_3()

// Part 2

// 1
async function part2_1() {
    const res = await axios.get(`${cardsAPIBaseURL}/new/draw`)
    const card = res.data.cards[0]
    console.log(`${card.value} of ${card.suit}`)
}
part2_1()

// 2
async function part2_2() {
    let res = await axios.get(`${cardsAPIBaseURL}/new/draw`)
    const firstCard = res.data.cards[0]
    res =  await axios.get(`${cardsAPIBaseURL}/${res.data.deck_id}/draw`)
    const secondCard = res.data.cards[0]
    for (card of [firstCard, secondCard]) {
        console.log(`${card.value} of ${card.suit}`)
    }
}
part2_2()

// 3
async function part2_3() {
    const res = await axios.get(`${cardsAPIBaseURL}/new/shuffle/`)
    const deckId = res.data.deck_id
    const imgTag = document.getElementById("card-image")
    const cardBtn = document.getElementById("get-card")
    
    cardBtn.addEventListener("click", async function() {
        if (deckId) {
            const res = await axios.get(`${cardsAPIBaseURL}/${deckId}/draw`)
            imgTag.src = res.data.cards[0].image
            if (res.data.remaining == 0) {
                cardBtn.style.display = "none"
            }
        }
    })
}
part2_3()