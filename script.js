const canvas = document.getElementById('canvas')
const generateBtn = document.getElementById('generate-btn')
const sortBtn = document.getElementById('sort-btn')



canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


ctx = canvas.getContext('2d')

class Bar{
    constructor(x,y,width,height,color){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }

    draw(){
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fill()
    }
}

let arr = []
input = 20;
let num = 0;

function drawBars(input){

    arr = []
   
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(let i = 0; i < num; i++){
        let width = (window.innerWidth - num - 50) / num;
        let height = Math.floor(Math.random() * 25) + 1
        //let randomColor = Math.floor(Math.random()*16777215).toString(16);
        console.log(height)
      
        let bar = new Bar(10 + i*width , 300, width, -height*8, "#0081B4");
        bar.draw();
        arr.push(bar)
    }
    ctx.beginPath();
    ctx.rect(10, 300, window.innerWidth - num - 50, -240);
    ctx.stroke()
}

num = input

function sort(){
    let count1 = 0;
    let count2 = 0;
    let width = (window.innerWidth - num - 50) / num;
    const id = setInterval(frame, 10);
    function frame() {
        if(count1 == num){
            clearInterval(id);
            console.log("finished !")
            ctx.clearRect(10,300,window.innerWidth - num - 50,-240)
            for(let i = 0; i < arr.length; i++){
                arr[i].draw()
            }
        }
        else if (count2 == num-1-count1) {
            count2 = 0;
            count1++;
        } 
        else {
         
        ctx.clearRect(10,300,window.innerWidth - num - 50,-240)
        // will draw all the bars
        // then clear previous bar
        for(let i = 0; i < arr.length; i++){
            arr[i].draw()
        }

        //clear the rectangle where parser will come
        ctx.clearRect(10 + (count2)*(width) , 300, width, -240,);
        // restoring the previous
        old_bar =  new Bar(10 + (count2)*width , 300, width, arr[count2].height, "#0081B4");
        parser = new Bar(10 + (count2+1)*width , 300, width, -240, "red");
        
        old_bar.draw()
        parser.draw()

        let e1 = Math.abs(arr[count2].height);
        let e2 = Math.abs(arr[count2+1].height);
        if(e1 > e2){
            temp = arr[count2+1].height
            arr[count2+1].height = arr[count2].height
            arr[count2].height = temp
        }
        count2++;
        console.log(arr)
        }
    }
}
