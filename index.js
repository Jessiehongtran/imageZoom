const originImg = document.getElementById("origin-img")
const zoomedImg = document.getElementById("zoomed-img")
const origin = document.getElementsByClassName("origin")[0]
const zoomed = document.getElementsByClassName("zoomed")[0]

const originPos = {
    x: 50,
    y: 100
}

const originImageSize = 150
const zoomedImageSize = originImageSize * 6

const zoomedPos = {
    x: originImageSize + originPos.x,
    y: originPos.y/2
}


origin.style.left = `${originPos.x}px`
origin.style.top = `${originPos.y}px`
zoomed.style.left = `${zoomedPos.x}px`
zoomed.style.top = `${zoomedPos.y}px`
originImg.style.width = `${originImageSize}px`
originImg.style.height = `${originImageSize}px`
zoomedImg.style.width = `${zoomedImageSize}px`
zoomedImg.style.height = `${zoomedImageSize}px`

const squareSize = 10
const rows = Math.floor(originImageSize/squareSize)
const cols = rows
const squares = []

for (let r=0; r < rows; r++){
    let squareRow = []
    for (let c=0; c < cols; c++){
        const square = document.createElement('div')
        square.style.width = square.style.height = `${squareSize}px`
        square.style.position = 'absolute'
        square.style.zIndex = '1'
        square.style.left = `${squareSize*c}px`
        square.style.top = `${squareSize*r}px`
        // square.style.border = '1px solid grey'
        origin.appendChild(square)

        const zoomedSquare = document.createElement('div')
        zoomedSquare.style.width = zoomedSquare.style.height = `${squareSize*zoomedImageSize/originImageSize}px`
        zoomedSquare.style.position = 'absolute'
        zoomedSquare.style.zIndex = '1'
        zoomedSquare.style.left = `${(squareSize*zoomedImageSize/originImageSize)*c}px`
        zoomedSquare.style.top = `${(squareSize*zoomedImageSize/originImageSize)*r}px`
        // zoomedSquare.style.border = '1px solid grey'
        zoomed.appendChild(zoomedSquare) 

        squareRow.push({
            originalSquare: square,
            zoomedSquare: zoomedSquare
        })
    }
    squares.push(squareRow)
}

const visibleGap = 3

function handleMouseOver(e){
        let x =  e.clientX
        let y =  e.clientY
        const hoveredRow = Math.ceil((y - originPos.y)/squareSize)
        const hoveredCol = Math.ceil((x - originPos.x)/squareSize)
        for (let r=0; r < rows; r++){
            for (let c=0; c < cols; c++){
                if (r >= hoveredRow - visibleGap && r <= hoveredRow + visibleGap && c >= hoveredCol - visibleGap && c <= hoveredCol + visibleGap){
                    squares[r][c].zoomedSquare.style.backgroundColor = 'transparent'
                } else {
                    squares[r][c].zoomedSquare.style.backgroundColor = 'white'
                }
            }
        }
        zoomed.style.display = 'block'

}

function handleMouseLeave(){
    zoomed.style.display = 'none'
}


origin.addEventListener('mouseover', handleMouseOver)
origin.addEventListener('mouseleave', handleMouseLeave)