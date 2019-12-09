var xxx = document.getElementById('Canvas')
var ctx = xxx.getContext('2d') //返回二维的 canvas 上下文

var pageWidth = document.documentElement.clientWidth //获取页面宽度
var pageHeight = document.documentElement.clientHeight //获取页面高度
var lastPoint = { "x": undefined, "y": undefined }
var using = false
var eraserEnabled = false
var lineWidth = 5

autoSetCanvasSize()

eraser.onclick = function () {
    eraserEnabled = true
    eraser.classList.add('active')
    pencil.classList.remove('active')
}
pencil.onclick = function () {
    eraserEnabled = false
    pencil.classList.add('active')
    eraser.classList.remove('active')
}
black.onclick = function () {
    ctx.strokeStyle = 'black'
    black.classList.add('active')
    red.classList.remove('active')
    green.classList.remove('active')
    blue.classList.remove('active')
}
red.onclick = function () {
    ctx.strokeStyle = 'red'
    black.classList.remove('active')
    red.classList.add('active')
    green.classList.remove('active')
    blue.classList.remove('active')
}
green.onclick = function () {
    ctx.strokeStyle = 'green'
    black.classList.remove('active')
    red.classList.remove('active')
    green.classList.add('active')
    blue.classList.remove('active')
}
blue.onclick = function () {
    ctx.strokeStyle = 'blue'
    black.classList.remove('active')
    red.classList.remove('active')
    green.classList.remove('active')
    blue.classList.add('active')
}
thin.onclick = function () {
    lineWidth = 5 // 为什么改成ctx.lineWidth = 5 或者及其他数值无效？？？ 

}
thick.onclick = function () {
    lineWidth = 10 // 为什么改成ctx.lineWidth = 10 或者及其他数值无效？？？ 
}
reset.onclick = function () {
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, pageWidth, pageHeight)
}
download.onclick = function () {
    var url = xxx.toDataURL("image/png")
    var a = document.createElement('a')
    document.body.appendChild(a)
    a.href = url
    a.download = 'paint' //下载的文件名
    a.target = '_blank' //新窗口打开
    a.click() //没有这个不能下载下来
}

if (document.body.ontouchstart !== undefined) {
    //触屏设备
    document.ontouchstart = function (a) {
        var x = a.touches[0].clientX
        var y = a.touches[0].clientY
        using = true
        if (eraserEnabled) {
            black.classList.remove('active')
            red.classList.remove('active')
            green.classList.remove('active')
            blue.classList.remove('active')
            lastPoint = { "x": x, "y": y }
            eraserCirle(x,y,2.5,'#fff')
        } else {
            lastPoint = { "x": x, "y": y }
            drawCirle(x,y,2.5)
        }
    }
    document.ontouchmove = function (a) {
        var x = a.touches[0].clientX
        var y = a.touches[0].clientY
        if (using) {
            if (eraserEnabled) {
                var newPoint = { "x": x, "y": y }
                eraserLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y,'#fff')
                lastPoint = newPoint
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
    // 非触屏设备
    document.onmousedown = function (a) {
        var x = a.clientX
        var y = a.clientY
        using = true
        if (eraserEnabled) {
            //橡皮擦功能
            black.classList.remove('active')
            red.classList.remove('active')
            green.classList.remove('active')
            blue.classList.remove('active')
            lastPoint = { "x": x, "y": y }
            eraserCirle(x,y,2.5,'#fff')
        } else {
            //铅笔功能
            lastPoint = { "x": x, "y": y }
            drawCirle(x,y,2.5)

        }
    }
    document.onmousemove = function (a) {
        var x = a.clientX
        var y = a.clientY
        if (using) {
            if (eraserEnabled) {
                //橡皮擦功能
                var newPoint = { "x": x, "y": y }
                eraserLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y,'#fff')
                lastPoint = newPoint
            } else {
                //铅笔功能
                var newPoint = { "x": x, "y": y }
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                lastPoint = newPoint
            }
        }
    }
    document.onmouseup = function (a) {
        using = false
    }
}






function autoSetCanvasSize() {
    function setCanvasSize() {
        // console.dir(xxx)
        xxx.width = pageWidth //变量xxx的class属性为pageWidth
        xxx.height = pageHeight
    }
    setCanvasSize()

    //浏览器重置大小时执行，即打开开发者工具和调大调小窗口
    window.onresize = function () {
        setCanvasSize()
    }
}
function drawCirle(x, y, radius) {
    
    //创建新的路径
    ctx.beginPath()
    
    //画圆弧 x坐标,y坐标,半径,圆弧的起始点,圆弧的重点
    ctx.arc(x, y, radius, 0, Math.PI * 2)

    //填充当前或以存在的路径
    ctx.fill()

    //绘制每一条线段末端的属性
    ctx.lineCap = "round"

    //用来设置2个长度不为0的相连部分（线段，圆弧，曲线）如何连接在一起的属性
    ctx.lineJoin = "round"
}
function drawLine(x1, y1, x2, y2) {

    //创建新的路径
    ctx.beginPath()

    //设置线宽
    ctx.lineWidth = lineWidth

    //将一个新的子路径的起始点移动到(x，y)坐标的方法。
    ctx.moveTo(x1, y1)

    //使用直线连接子路径的终点到x，y坐标的方法（并不会真正地绘制）。
    ctx.lineTo(x2, y2)

    //根据当前的画线样式，绘制当前或已经存在的路径的方法。
    ctx.stroke()
    
    //绘制每一条线段末端的属性
    ctx.lineCap = "round"

    //用来设置2个长度不为0的相连部分（线段，圆弧，曲线）如何连接在一起的属性
    ctx.lineJoin = "round"
    
    ctx.closePath()
}

function eraserCirle(x, y, radius,color) {
    
    //创建新的路径
    ctx.beginPath()
    
    //画圆弧 x坐标,y坐标,半径,圆弧的起始点,圆弧的重点
    ctx.arc(x, y, radius, 0, Math.PI * 2)

    ctx.fillStyle = color

    //填充当前或以存在的路径
    ctx.fill()

    //绘制每一条线段末端的属性
    ctx.lineCap = "round"

    //用来设置2个长度不为0的相连部分（线段，圆弧，曲线）如何连接在一起的属性
    ctx.lineJoin = "round"
}
function eraserLine(x1, y1, x2, y2,color) {

    //创建新的路径
    ctx.beginPath()

    //设置线宽
    ctx.lineWidth = lineWidth

    //将一个新的子路径的起始点移动到(x，y)坐标的方法。
    ctx.moveTo(x1, y1)

    //使用直线连接子路径的终点到x，y坐标的方法（并不会真正地绘制）。
    ctx.lineTo(x2, y2)

    ctx.strokeStyle = color

    //根据当前的画线样式，绘制当前或已经存在的路径的方法。
    ctx.stroke()
    
    //绘制每一条线段末端的属性
    ctx.lineCap = "round"

    //用来设置2个长度不为0的相连部分（线段，圆弧，曲线）如何连接在一起的属性
    ctx.lineJoin = "round"
    
    ctx.closePath()
}