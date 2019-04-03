var xxx = document.getElementById('Canvas')
var ctx = xxx.getContext('2d')
autoSetCanvasSize()

var lastPoint = {"x":undefined,"y":undefined}
var using = false
var eraserEnabled = false

eraser.onclick = function (){
    eraserEnabled = true
    eraser.classList.add('active')
    pencil.classList.remove('active')
}
pencil.onclick = function (){
    eraserEnabled = false
    pencil.classList.add('active')
    eraser.classList.remove('active')
}
red.onclick = function (){
    ctx.strokeStyle = 'red'
    red.classList.add('active')
    green.classList.remove('active')
    blue.classList.remove('active')
}
green.onclick = function (){
    ctx.strokeStyle = 'green'
    red.classList.remove('active')
    green.classList.add('active')
    blue.classList.remove('active')
}
blue.onclick = function (){
    ctx.strokeStyle = 'blue'
    red.classList.remove('active')
    green.classList.remove('active')
    blue.classList.add('active')
}

if (document.body.ontouchstart !== undefined) {
    document.ontouchstart = function (a) {
        var x = a.touches[0].clientX
        var y = a.touches[0].clientY
        using = true
        if (eraserEnabled) {
            ctx.clearRect(x - 10, y - 10, 20, 20)
        } else {
            lastPoint = { "x": x, "y": y }
            console.log(lastPoint)
        }
    }
    document.ontouchmove = function (a) {
        var x = a.touches[0].clientX
        var y = a.touches[0].clientY
        if (using) {
            if (eraserEnabled) {
                ctx.clearRect(x - 10, y - 10, 20, 20)
            } else {
                var newPoint = { "x": x, "y": y }
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                lastPoint = newPoint
              }
        }
    }
    document.ontouchend = function (a) {
        using = false
    }
} else {
    document.onmousedown = function (a){
    var x = a.clientX
    var y = a.clientY
    using = true
    if(eraserEnabled){    
        ctx.clearRect(x - 10, y - 10, 20, 20)
    }else{
        lastPoint = { "x": x, "y": y }
        console.log(lastPoint)
        }
    }   
    document.onmousemove = function (a){
        var x = a.clientX
        var y = a.clientY
        if (using) {
            if (eraserEnabled) {
                ctx.clearRect(x - 10, y - 10, 20, 20)
            } else {
            var newPoint = { "x": x, "y": y }
            drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
            lastPoint = newPoint
            }
        }
    } 
    document.onmouseup = function (a){
    using = false 
    }
}






function autoSetCanvasSize() {
    function setCanvasSize() {
        var pageWidth = document.documentElement.clientWidth //获取页面宽度
        var pageHeight = document.documentElement.clientHeight //获取页面高度
        xxx.width = pageWidth //变量xxx的class属性为pageWidth
        xxx.height = pageHeight
    }
    setCanvasSize()
    window.onresize = function () {
        setCanvasSize()
    }
}
function  drawCirle(x,y,radius){
    ctx.beginPath()
    ctx.arc(x,y,radius,0,Math.PI*2)
    ctx.fill()
}
function drawLine(x1,y1,x2,y2){
    ctx.beginPath()
    ctx.lineWidth = 5
    ctx.moveTo(x1,y1)
    ctx.lineTo(x2,y2)
    ctx.stroke()
    ctx.closePath()
}