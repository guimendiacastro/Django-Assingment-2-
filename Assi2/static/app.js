const keyboard = document.querySelector('.key-container')
const tileDisplay = document.querySelector('.tile-container')
const message = document.querySelector('.message-container')

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
const rand_num = getRandomInt(2309)

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

function pop_up(time, word) {
    const overlay = document.querySelector("#overlay");
    overlay.style.display = "block"
    const modal = document.querySelector("#modal")
    modal.innerHTML = "Concrate the Word was " + word + "<br> <br> I hope you feel good about yourself <br> <br> You won a shitty word game <br> <br> Good for You!!"
    setTimeout(close, time)

}
function close(){
        overlay.style.display = "none"
     
}

function message_display(time){
    message.textContent = "That's Not a Word"
    setTimeout(mess_gone, time)
}
function mess_gone(){
    message.textContent = ""
}



function addLetter(letter) {
    if (currentTile < 5 && currentRow < 6){
    const tile = document.getElementById("guessRow-" + currentRow + '-tile-' + currentTile)
    tile.textContent = letter
    guessRows[currentRow][currentTile] = letter
    tile.setAttribute('data', letter)
    currentTile++
    console.log("Worked", letter)
    }

} 
function deleteLetter() {
    if (currentTile > 0){
    currentTile= currentTile - 1
    const tile = document.getElementById("guessRow-" + currentRow + '-tile-' + currentTile)
    tile.textContent = ''
    guessRows[currentRow][currentTile] = ''
    tile.setAttribute('data', '')
    console.log(guessRows[currentRow])
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
    
    
    
    
    console.log(final_word)
    $.ajax({
        url: 'game',
        type: 'get',
        data: {
          guess : final_word
        },
        success: change_colours,
            
            
          /*$(".message").text(response.name)*/
          /*$('#second').append('<li>' + response.second + '<li>') */
        
      }) 
    
     
}

function addColourToKey (colours) {
    for (let i = 0; i < 5; i++) {
        let key = document.getElementById(guessRows[currentRow][i])
        let keyColour = window.getComputedStyle(key).backgroundColor;
        if (keyColour == '#ffc425') {
            if (colours[i] == "#008000") {
                key.style.background=colours[i]
            }
        if (keyColour == "#A9A9A9" || keyColour == "#818384") {
            key.style.background=colours[i]
        }

        }
        document.getElementById(guessRows[currentRow][i]).style.background=colours[i]
    }
}


function change_colours(response){
    var colours = response;
    colours = Object.values(colours)
    colours = colours[0]
    var checker = "True"
    if (colours[0] != "False") {
    for (let i = 0; i < 5; i++) {
        document.getElementById("guessRow-" + currentRow + '-tile-' + i).style.background=colours[i]
        console.log(colours[i])
        if (colours[i] != "#008000") {
            checker = "False"
        }
        
    }
    if (checker == "True") {
        setTimeout(function() {pop_up(10000, colours[5])}, 1000)
    }
    if (currentRow != 5) {
        addColourToKey(colours)
        currentRow = currentRow + 1
        currentTile = 0
    }
    else {
        /*
        const messElement =  document.getElementById('mess')
        messElement.textContent = "Congrats"
        */
       
        setTimeout(function() {pop_up(10000, colours[5])}, 1000)
        
    }
}
    else{
        message_display(800)
    }
}
     



const handleClick = (key) => {
    if (key === '«'){
        deleteLetter()
    }
    
    else if (key === 'ENTER'){
        if (currentTile == 5){
            console.log("Entered")
            checker()

        }
        
        else{
        console.log("Not enough letters")
        }
        
    } 
    if (key != '«' && key != 'ENTER' ) {
    addLetter(key)
    }
}


