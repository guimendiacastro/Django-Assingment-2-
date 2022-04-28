const boardContainer = document.querySelector(".board-container")


//const boardRows = JSON('{{board|escapejs}}');

const alphabet = 'abcdefghijklmnopqrstuvwxyz'

let useRow = 0
let useInRow = 0

function splitArray(arr, len){
    var chunks  =[], i = 0, n = arr.length;
    while(i<n) {
        console.log(arr.slice(i,i+len))
        chunks.push(arr.slice(i,i += len));
    }
    console.log(chunks)
    return chunks
}

var boardRows = document.getElementById('useList').innerHTML
console.log(boardRows)
boardRows = Array.from(boardRows)
console.log(boardRows)
boardRows.shift()
boardRows.pop()
console.log(boardRows)
boardRows = splitArray(boardRows,20)
console.log(boardRows)
boardRows.forEach((row)=>{
    console.log(row)
})

boardRows.forEach((row, rowNum) => {
    console.log('hello')
    const rowElement = document.createElement('div')
    rowElement.setAttribute('id', 'Row-' + rowNum)
    rowElement.classList.add('row')
    row.forEach((column,columnNum) => {
        console.log('fbogisbj')
        const boxElement = document.createElement('button')
        boxElement.setAttribute('id','Row-' + rowNum + '-column-' + columnNum)
        boxElement.setAttribute('type', 'button')
        boxElement.setAttribute('form', 'subForm')
        boxElement.style.backgroundColor = '#818384'
        boxElement.innerText = boardRows[rowNum][columnNum]
        boxElement.addEventListener('click', () => handleClick(rowNum,columnNum,boxElement))
        boxElement.classList.add('boxes')
        rowElement.append(boxElement)
        console.log(boxElement.id)
        console.log(rowElement)
    })
    console.log(rowElement.id)
    boardContainer.append(rowElement)
//    const subButton = document.createElement('button')
//    subButton.setAttribute('id', 'sub')
//    subButton.setAttribute('type', 'submit')
//    subButton.setAttribute('form', 'subForm')
})

function handleClick(row,column,box){
    console.log(row,column)
    if(box.style.backgroundColor == 'rgb(129, 131, 132)'){
        box.style.backgroundColor = 'green'
    }
    else if(box.style.backgroundColor = 'green'){
        box.style.backgroundColor = '#818384'
    }
    console.log(box.style.backgroundColor)
}




