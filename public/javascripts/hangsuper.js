(function(){


window.hangsper = window.hs = {
	/*
	 * initialize 
	 */
 	keyPress:function(e){
		    if(e.keyCode === 13){
		        e.preventDefault(); // Ensure it is only this code that rusn

		       	hs.search();
			    }
			},

	init:function(){


	},

	/**
	 *get Element By Id
	 */

	getId:function(element_id){
		return document.getElementById(element_id);
	},

	/**
	 *
	 *get Element By ClassName
	 *
	 */
	getClassName:function(parentElement,classElement){
		if(classElement == undefined){
			return document.getElementsByClassName(parentElement);
		}
		return parentElement.getElementsByClassName(classElement);
	},

	/**
	 * get Elements By TagName
	 */
	getTagName:function(parentElement,tagElement){		
		if(tagElement == undefined){
			return document.getElementsByTagName(parentElement);
		}
		return parentElement.getElementsByTagName(tagElement);
	},
	/**
	 * Get current time 
	 */
	getCurrentTime:function(){
		var oDate = new Date();
		var aDate = [];
		aDate.push(oDate.getFullYear());
		aDate.push(oDate.getMonth()+1);
		aDate.push(oDate.getDate());
		aDate.push(oDate.getHours());
		aDate.push(oDate.getMinutes());
		aDate.push(oDate.getSeconds());
		aDate.push(oDate.getDay());
		aDate.push(oDate.getTime());
		return aDate;
	},
	/**
	 * Ajax connect
	 * 
	 */
	ajax:function(json){
		var timer=null;
		json=json || {};
		if(!json.url){
			alert('Please check your Url');
			return;	
		}
		json.type=json.type || 'get';
		json.time=json.time ||  10;
		json.data=json.data || {};
		if(window.XMLHttpRequest){
			var oAjax=new XMLHttpRequest();
		}else{
			var oAjax=new ActiveXObject('Microsoft.XMLHTTP');	
		}
		switch(json.type.toLowerCase()){
			case 'get':
				oAjax.open('GET',json.url+getjson2url(json.data),true);
				oAjax.send();
				break;
			case 'post':
				oAjax.open('POST',json.url,true);
				oAjax.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
				oAjax.send(postjson2url(json.data));
				break;
		}	
		oAjax.onreadystatechange=function(){
			if(oAjax.readyState==4){
				if(oAjax.status>=200 && oAjax.status<300 || oAjax.status==304){
					clearTimeout(timer);
					json.succFn && json.succFn(oAjax.responseText);	
				}else{
					clearTimeout(timer);
					json.errFn && json.errFn(oAjax.status);
				}
			}	
		}
		timer=setTimeout(function(){
			alert('Time Out');
			oAjax.onreadystatechange=null;
		},json.time*1000);	
		
		function getjson2url(json){
			//json.t = Math.random();
			var arr=[];
			for(var name in json){
				arr.push('/'+json[name]);
			}
			return arr.join('');
		}


		function postjson2url(json){
			json.t = Math.random();
			json.package_name_data = gPackage;
			var arr=[];
			for(var name in json){
				arr.push(name+'='+json[name]);
			}
			return arr.join('&');
		}	
	},
	/**
	 * Ajax - get
	 */
	getAjax:function(jsonData){
		hs.ajax({
			url:jsonData.url,
			data:jsonData.data,
			succFn:jsonData.succFn,
			type:'get'
		});
	},
	/**
	 * Ajax - post
	 */
	postAjax:function(jsonData){
		hs.ajax({
			url:jsonData.url,
			data:jsonData.data,
			succFn:jsonData.succFn,
			type:'post'
		});
	},
	/**
	* redirect
	*/
	redirect:function(url){
		return window.location.href = url;
	},


	text:function(el,text){
		el.innerHTML = text;
	},


	click:function(el,succfn){
		el.addEventListener('click',function(){
			succfn(this);
		});
	},

	toast:function(color,time,text){
		var colorCode = {
			green:"#00cc33",
			red:"#ff0000"
		}
		var div = document.createElement('div');
		hs.text(div,text);
		div.setAttribute('id', 'toast');
		document.body.appendChild(div);
		if (color == "green"){
			div.style.background = colorCode.green;
		}else if (color == "red"){
			div.style.background =colorCode.red;
		}
	    // Add the "show" class to DIV
	    div.className = "show";

	    // After 3 seconds, remove the show class from DIV
	    setTimeout(function(){ 
	    	div.className = div.className.replace("show", "");
	    	hs.removeEle(div);
	     }, time*1000);
	},

	removeEle:function (el) {
	    return el.parentNode.removeChild(el);
	},
	randomColor:function(){
		return '#' + ('00000'+(Math.random() * 0x1000000 << 0).toString(16)).slice(-6);
	},
	randomNum:function(min,max){
		return Math.floor(min + Math.random() * (max-min));
	}


}

})();