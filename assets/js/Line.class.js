//This class handle the recursive properties of the Von Koch Snowflakes
//A Line object can recursivelly split itself into smaller Lines, that can be splitted again, etc.
class Line {
	constructor(x,y,angle,size){
		this.x = x;
		this.y = y;
		this.angle = angle;
		this.size = size;

		this.end = {
			'x': this.x + Math.cos(this.angle) * this.size,
			'y': this.y + Math.sin(this.angle) * this.size
		}

		this.children = [];
	}

	//Render all its children recursivelly, or if it has no children, renders itself
	render(ctx){
		if(this.children.length == 0){
			ctx.beginPath()
			ctx.moveTo(this.x,this.y);
			ctx.lineTo(this.end.x ,this.end.y);
			ctx.strokeStyle = "white"
			ctx.stroke()
		}else {
			for(var i = 0; i < this.children.length; i++){
				this.children[i].render(ctx)
			}
		}
	}

	//Recursivelly create its children, the cildren of its children, etc.
	split(iter){
		if(iter > 0){
			//The new lines will be a third of the actual line
			var new_size = this.size / 3;

			//Get the new children coordinates
			var c1 = new Line(this.x, this.y, this.angle, new_size)
			var c2 = new Line(c1.end.x, c1.end.y, this.angle - Math.PI / 3, new_size)
			var c3 = new Line(c2.end.x, c2.end.y, this.angle + Math.PI / 3, new_size)
			var c4 = new Line(c3.end.x, c3.end.y, this.angle, new_size)

			this.children = [c1,c2,c3,c4];

			//Split the children
			for(var i = 0; i < this.children.length; i++){
				this.children[i].split(iter - 1)
			}
		}
	}
}