function $(slect,ranger){
	if(typeof slect=='string'){
		ranger=ranger||'document';
		let selector=slect.trim();
		let firstChar=selector.charAt(0);
		if(firstChar=='#'){
			return ranger.getElementById(selector.substring(1));
		}else if(firstChar=='.'){
			return document.getElementsByClassName(selector.substring(1));
		}else if(/^[a-zA-Z][a-zA-Z1-6]{0,8}$/.test(selector)){
			return ranger.getElementsByTagName(selector);
		}
	}else if(typeof slect=='function'){
		window.onload=function(){
			slect();
		}
	}
}
//添加内容
function html(ele,content){
	if(arguments.length==2){
		ele.innerHTML=content;
	}else if(arguments.length==1){
		return ele.innerHTML;
	}
}
function text(ele,content){
	if(arguments.length==2){
		ele.innerText=content;
	}else if(arguments.length==1){
		return ele.innerText;
	}
}
//添加样式
function css(ele,attrObj){
	for(let i in attrObj){
		ele.style[i]=attrObj[i];
	}
}
//添加事件
function on(ele,type,fn){
	for(let i=0;i<ele.length;i++){
		ele[i][type]=fn;
	}
}
//移出事件
function deleteEvent(ele,type){
	for(let i=0;i<ele.length;i++){
		ele[i][type]=null;
	}
}
//动画
function animate(ele,attrObj,speed,fn){
	let t=setInterval(function(){
		for(let i in attrObj){
			let start=parseInt(getComputedStyle(ele,null)[i]);
			if(start>=attrObj[i]){
				clearInterval(t);
				if(fn){
					fn.call(ele);
//					fn();
				}
			}
			ele.style[i]=`${start+speed}px`;
		}
	},60)
	
}
//任意位置后添加元素
HTMLElement.prototype.insertAfter=function(insert){
	let brotherNode=this.nextElementSibling;
	let ele=this.parentNode;
	if(!brotherNode){
		ele.appendChild(insert);
	}else{
		ele.insertBefore(insert,brotherNode);
	}
}
//在父元素的第一个位置添加一个节点
HTMLElement.prototype.preInsert = function(index){
	let first1 = this.firstElementChild;
	if (first1) {
		this.insertBefore(index,first1);
	} else{
		console.log(this)
		this.appendChild(index);
	}
}
HTMLElement.prototype.preInsertTo=function(parent){
	parent.preInsert(this);
}
//将子元素插入到父元素中
HTMLElement.prototype.appendTo=function(parent){
	parent.appendChild(this);
}
//清空一个标签下的所有节点
HTMLElement.prototype.empty=function(){
	//第一种方法
	let child=this.childNodes;
	//从后往前删
	for(let i=child.length-1;i>=0;i--){
		this.removeChild(child[i]);
	}
	//第二种方法
//	this.innerHTML='';
}
//自己删除自己
HTMLElement.prototype.Remove=function(){
	let parent=this.parentNode;
	parent.removeChild(this);
}
//next()   获取下一个元素节点  
HTMLElement.prototype.next=function(){
	let next=this.nextElementSibling;
	if(next){
		return next;
	}else{
		return false;
	}
}
//nextall()    获取下面所有节点
HTMLElement.prototype.nextAll=function(){
	let nexte=this.next();
	let newArr=[];
	if(nexte){
		newArr.push(nexte);
	}else{
		return false;
	}
	while(nexte){
		nexte=nexte.next();
		newArr.push(nexte);
	}
	newArr.pop();
	return newArr;
}
//nextuntil()    获取下一个到么个范围之内的节点
HTMLElement.prototype.nextUntil=function(range){
	let nexte=this;
	let newArr=[];
	do{
		nexte=nexte.next();
		newArr.push(nexte);
	}while(nexte!=range);
	
	newArr.pop();
	return newArr;
}
//previous()   获取上一个元素节点  
HTMLElement.prototype.Previous=function(){
	let previous=this.previousElementSibling;
	if(previous){
		return previous;
	}else{
		return false;
	}
}
//previousall()    获取上面所有节点
HTMLElement.prototype.PreviousAll=function(){
	let firsts=this.Previous();
	let newArr=[];
	if(firsts){
		newArr.push(firsts);
	}else{
		return false;
	}
	while(firsts){
		firsts=firsts.Previous();
		newArr.push(firsts);
	}
	newArr.pop();
	return newArr;
}
//previousuntil()    获取上一个到么个范围之内的节点
HTMLElement.prototype.PreviousUntil=function(range){
	let firsts=this;
	let newArr=[];
	do{
		firsts=firsts.Previous();
		newArr.push(firsts);
	}while(firsts!=range);
	
	newArr.pop();
	return newArr;
}
//parent  父元素
HTMLElement.prototype.Parent=function(){
	let parent=this.parentNode;
	if(parent){
		parent.empty();
		return parent;
	}else{
		return false;
	}
}
//parents   所有父辈元素
HTMLElement.prototype.Parents=function(){
	let parents=this.Parent();
	let newArr=[];
	if(parents){
		newArr.push(parents);
	}else{
		return false;
	}
	while(parents!=document.body){
		parents=parents.Parent();
		newArr.push(parents);
	}
	return newArr;
}
//parentRange    范围
HTMLElement.prototype.ParentRange=function(range){
	let parents=this;
	let newArr=[];
	do{
		parents=parents.Parent();
		newArr.push(parents);
	}while(parents!=range);
	
	newArr.pop();
	return newArr;
}
//拖拽
function drag(obj){
	this.obj=obj;
}
drag.prototype={
	move:function(){
		this.down();
	},
	down:function(){
		let that=this;
		this.obj.onmousedown=function(e){
			let ox=e.offsetX,oy=e.offsetY;
			document.onmousemove=function(e){
				let cx=e.clientX,cy=e.clientY;
				that.obj.style.left=cx-ox+'px';
				that.obj.style.top=cy-oy+'px';
				that.obj.style.borderColor=`${Random()}`;
				that.obj.style.background=`${Random()}`;
			}
		}
		this.obj.onmouseup=function(){
			document.onmousemove=null;
		}
	}
}
//颜色自动
function Random(){
	let r=Math.round(Math.random()*255);
	let g=Math.round(Math.random()*255);
	let b=Math.round(Math.random()*255);
	return `rgb(${r},${g},${b})`;
}
