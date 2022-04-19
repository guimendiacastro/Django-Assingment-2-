const sudTable = document.getElementById("sudGrid")



const nums ="123456789"

function splitArray(arr, len){
    var chunks  =[], i = 0, n = arr.length;
    while(i<n) {
        console.log(arr.slice(i,i+len))
        chunks.push(arr.slice(i,i += len));
    }
    console.log(chunks)
    return chunks
}

var useGrid = document.getElementById('gridNums').innerHTML
useGrid = Array.from(useGrid)
console.log(useGrid)
useGrid.shift()
useGrid.pop()
console.log(useGrid)
useGrid = splitArray(useGrid,9)
console.log(useGrid)

useGrid.forEach((row, rowNum) => {
    console.log('hello')
    const rowElement = document.createElement('tr')
    if(rowNum%3 == 0 ){
        rowElement.style.borderBottomWidth = '3px'
    }
    rowElement.setAttribute('id', 'Row-' + rowNum)
    rowElement.classList.add('row')
    row.forEach((column,columnNum) => {
        console.log('fbogisbj')
        const boxElement = document.createElement('td')
        boxElement.setAttribute('id','Row-' + rowNum + '-column-' + columnNum)
        boxElement.style.backgroundColor = '#818384'
        if(useGrid[rowNum][columnNum] == " "){
            console.log("hey")
            const inputSpace = document.createElement('input');
            inputSpace.setAttribute('id','input-'+rowNum+'-'+columnNum)
            inputSpace.classList.add('inpSpa')
            inputSpace.setAttribute('useNum',rowNum+columnNum)
            inputSpace.setAttribute('type','text')
            console.log(inputSpace)
            boxElement.appendChild(inputSpace)        }else{   
                boxElement.innerText = useGrid[rowNum][columnNum]
            }
        boxElement.classList.add('boxes')
        rowElement.append(boxElement)
        console.log(boxElement.id)
        console.log(rowElement)
        boxElement.classList.add('boxes')
        rowElement.append(boxElement)
        console.log(boxElement.id)
        console.log(rowElement)
    })
    console.log(rowElement.id)
    sudTable.append(rowElement)
})