window.onload=function(){
	let ch=window.innerHeight;
	let foot=document.querySelectorAll('.foot');
	let newarr=[];
	let aside=document.querySelectorAll('.aside>li');
	let floor=0;
	foot.forEach(element=>{
		let footTop=element.offsetTop;
		newarr.push(footTop);
	})
	aside.forEach(function(ele,index){
		aside[index].onclick=function(){
			animate(document.body,{scrollTop:newarr[index]});
		}
	})
	console.log(newarr);
	window.onscroll=function(){
		let scroll=document.body.scrollTop?document.body:document.documentElement;
		let obj=scroll.scrollTop;
		newarr.forEach(function(value,index){
			if(ch+obj>=value+50){
				aside[index].classList.add('color');
				aside[floor].classList.remove('color');
				floor=index;
				let li=foot[index].getElementsByTagName('img');
				let img=Array.from(li);
				for(let i=0;i<li.length;i++){
					li[i].src=li[i].getAttribute('imgPath');
				}
			}
		})
	}
}
