const sudTable = document.getElementById("sudGrid")



const nums ="123456789"

function splitArray(arr, len){
    var chunks  =[], i = 0, n = arr.length;
    while(i<n) {
    //    console.log(arr.slice(i,i+len))
        chunks.push(arr.slice(i,i += len));
    }
    //console.log(chunks)
    return chunks
}

console.log(document.getElementById('subButton').attributes)
const finalButton = document.getElementById('subButton')
var useGrid = document.getElementById('gridNums').innerHTML


useGrid = Array.from(useGrid)
//console.log(useGrid)
useGrid.shift()
useGrid.pop()
//console.log(useGrid)
useGrid = splitArray(useGrid,9)
//console.log(useGrid)

useGrid.forEach((row, rowNum) => {
    //console.log('hello')
    const rowElement = document.createElement('tr')
    if(rowNum%3 == 0 ){
        rowElement.style.borderBottomWidth = '3px'
    }
    rowElement.setAttribute('id', 'Row-' + rowNum)
    rowElement.classList.add('row')
    row.forEach((column,columnNum) => {
    //    console.log('fbogisbj')
        const boxElement = document.createElement('td')
        boxElement.setAttribute('id','Row-' + rowNum + '-column-' + columnNum)
        boxElement.style.backgroundColor = '#818384'
        if(useGrid[rowNum][columnNum] == " "){
    //        console.log("hey")
            const inputSpace = document.createElement('input');
            inputSpace.setAttribute('id','input-'+rowNum+'-'+columnNum)
            inputSpace.classList.add('inpSpa')
            inputSpace.setAttribute('useNum',rowNum+columnNum)
            inputSpace.setAttribute('type','text')
    //        console.log(inputSpace)
            boxElement.appendChild(inputSpace)        }else{   
                boxElement.innerText = useGrid[rowNum][columnNum]
            }
        boxElement.classList.add('boxes')
        rowElement.append(boxElement)
    //    console.log(boxElement.id)
    //    console.log(rowElement)
        boxElement.classList.add('boxes')
        rowElement.append(boxElement)
    //    console.log(boxElement.id)
    //    console.log(rowElement)
    })
    //console.log(rowElement.id)
    sudTable.append(rowElement)
})

$(document).ready(function(){
    $(".subButtton").click(function(){
        console.log("yayay")
        $.ajax({
            url: 'sudoku',
            type: 'get', 
            data: {
                sub: $(this).text()
            },
            success: function(response) {
                $(".subButton").text(response.seconds)
            }
        })
    })
})
console.log(finalButton.innerHTML)
finalButton.addEventListener('click', () => handleClick(finalButton))
console.log(finalButton.innerHTML)

function handleClick(UseButton){
    const valNums = ['1' , '2', '3', '4', '5', '6', '7', '8', '9']
    var exit = false
    console.log("yayay")
    console.log(useGrid)
    var sendText = ''
    useGrid.forEach((row,rowNum) => {
        if(exit){
            console.log("YOYO2")
            return
        }
        console.log("This is a new row")
        row.forEach((column, columnNum) => {
            if(exit){
                console.log("YOYO3")
                return
            }
            console.log(column)
            tempVal = column
            console.log(valNums.includes(tempVal))
            if(valNums.includes(column)){
                console.log(column)
                console.log(sendText)
                sendText = sendText + column
            }else{
                console.log("ahhahahaha2")
                var boxName = "input-"+rowNum + "-" +columnNum
                useInp = document.getElementById(boxName)
                console.log(useInp)
                console.log(boxName)
                useVal = useInp.value
                console.log(useVal)
                if (valNums.includes(useVal)){
                    sendText = sendText + useVal
                }else{
                    alert("please enter valid inputs (1-9) in each box")
                    exit = true
                    return
                }
            }
        })
    })
    if(exit){
        console.log("YOYO4")
        return
    }
        $.ajax({
            url: 'sudoku',
            type: 'get', 
            data: {
                sub: sendText
            },
            success: displayWin
        })
    }

    function displayWin(response){
        var message = response.name
        alert(message)
    }