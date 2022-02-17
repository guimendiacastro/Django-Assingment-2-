const keyboard = document.querySelector('.key-container')
const tileDisplay = document.querySelector('.tile-container')


const keys = [
    'Q',
    'W',
    'E',
    'R',
    'T',
    'Y',
    'U',
    'I',
    'O',
    'P',
    'A',
    'S',
    'D',
    'F',
    'G',
    'H',
    'J',
    'K',
    'L',
    'ENTER',
    'Z',
    'X',
    'C',
    'V',
    'B',
    'N',
    'M',
    '«',   
]

const guessRows = [
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', '']
]

let currentRow = 0
let currentTile = 0

guessRows.forEach((guessRow, guessRowIndex) => {
    const rowElement = document.createElement('div')
    rowElement.setAttribute('id', 'guessRow-' + guessRowIndex)
    guessRow.forEach((_guess, guessIndex) => {
        const tileElement = document.createElement('div')
        tileElement.setAttribute('id', 'guessRow-' + guessRowIndex + '-tile-' + guessIndex)
        tileElement.classList.add('tile')
        rowElement.append(tileElement)
    })
    tileDisplay.append(rowElement)
})





keys.forEach(key => {
    const buttonElement = document.createElement('button')
    buttonElement.textContent = key
    buttonElement.setAttribute('id', key)
    buttonElement.addEventListener('click', () => handleClick(key))
    keyboard.append(buttonElement)
})

const handleClick = (key) => {
    console.log("Worked", key)
    if (key === '«'){
        deleteLetter()
    }
    if (key === 'ENTER'){
        if (currentTile == 5){
            checker()
        }

        console.log("Not enough letters")
    } 
    if (key != '«' && key != 'ENTER' ) {
    addLetter(key)
    }
}

function addLetter(letter) {
    if (currentTile < 5 && currentRow < 6){
    const tile = document.getElementById("guessRow-" + currentRow + '-tile-' + currentTile)
    tile.textContent = letter
    guessRows[currentRow][currentTile] = letter
    tile.setAttribute('data', letter)
    currentTile++
    }

} 
function deleteLetter() {
    if (currentTile > 0){
    currentTile= currentTile - 1
    const tile = document.getElementById("guessRow-" + currentRow + '-tile-' + currentTile)
    tile.textContent = ''
    guessRows[currentRow][currentTile] = ''
    tile.setAttribute('data', '')
    }
}

function checker(){
    const word = guessRows[currentRow]
    let final_word = '' 
    word.forEach(letter => {
        final_word = final_word.concat(letter)
    })
    final_word = final_word.toLowerCase()
    
    console.log(final_word)
}

