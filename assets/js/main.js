//Get screen size
var width = window.innerWidth
|| document.documentElement.clientWidth
|| document.body.clientWidth;

var height = window.innerHeight
|| document.documentElement.clientHeight
|| document.body.clientHeight;

//Initialize the canvas
var canvas = document.createElement("canvas");
canvas.height = height;
canvas.width = width;
document.body.appendChild(canvas)

var ctx = canvas.getContext('2d');
ctx.font = '48px sans-serif';

//Render the snowflake with n iterations
function render(iter){
	//Write the text
	ctx.fillStyle = "white"
	ctx.fillText('Iterations : ' + iter.toString(), 10, 50);

	var size = 3 * height / (2 * Math.sqrt(3))

	//Make 3 lines that we will split each iterations

	var bottom = new Line(width / 2 + size / 2,height - (Math.sqrt(3) / 2 * size)/3,-Math.PI,size)
	bottom.split(iter)
	bottom.render(ctx)	

	var left = new Line(bottom.end.x,bottom.end.y,-Math.PI / 3,size)
	left.split(iter)
	left.render(ctx)

	var right = new Line(left.end.x,left.end.y,Math.PI / 3,size)
	right.split(iter)
	right.render(ctx)	

}

//Clear the canvas
function clear(ctx){
	ctx.fillStyle = "black";
	ctx.fillRect(0,0,width,height);
}

//Render the next frame
function frame(){
	clear(ctx)
	render(iter);
	if(iter > 5){
		iter = 0;
	}else{
		iter++;
	}
}

iter = 0;
frame();
setInterval(frame,1000);
