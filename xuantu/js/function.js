// 功能: 点击后检查所有单选框的状态，并生成字符串;
	function selectcheck()
	{
	    var acc=document.getElementsByClassName("radio");
	              
	    var arr=new Array();
	    for(var i=0;i<acc.length;i++)
	    {
	        if(acc[i].checked)
	        {
	            arr[i]=1;
	        }else{
	        	arr[i]=0;
	        }
	        
	    }
	    var str = arr.join("");  //输出的11位字符串
	    console.log(str);
	}

// 功能: 清空选择区
	function selectclear()
	{
	    var acc=document.getElementsByClassName("radio");
	              
	    var arr=new Array();
	    for(var i=0;i<acc.length;i++)
	    {

	        	acc[i].checked=false;
	        	arr[i]=0;
	        
	        
	    }
	    var str = arr.join("");  //输出的11位字符串
	    console.log(str);
	}


// 功能: 禁用一个a元素;
// 参数:
//     link: a元素对象;
	function disableLink(link) {
       	//删除href属性,使其成为文本元素
       	link.removeAttribute("href");
       	//设置disabled属性
       	link.setAttribute("disabled", "disabled");
  	}
 
// 功能: 启用一个a元素;
// 参数:
//     link: a元素对象;
	function enableLink(link) {

       	// 重新设置href
       	link.setAttribute("href", "javascript:event();") ;
       	// 删除disabled属性
       	link.removeAttribute("disabled");
 	}

//设置右边各个区域的图形及状态
//参数:
//	图片名(jpg格式)：a1_name，a2_name，a3_name，a4_name，a5_name
//	图片状态（是否可点击 0/1）：a1_state，a2_state，a3_state，a4_state，a5_state

	function set_glyph(a1_name,a1_state,a2_name,a2_state,a3_name,a3_state,a4_name,a4_state,a5_name,a5_state){

		var oImg=document.getElementsByClassName("img");
		var oLk=document.getElementsByClassName("lk");
		var oOL=document.getElementsByClassName("overlay");
		var arr2=new Array();
		var arr3=new Array();
		
		arr2=[a1_name,a2_name,a3_name,a4_name,a5_name];

		for (var i = 0; i < 5; i++) {
			oImg[i].src='img/'+arr2[i]+'.jpg';
		}

		arr3=[a1_state,a2_state,a3_state,a4_state,a5_state];
		initoverlay();
		for(var i=0;i<5;i++){
	        if(arr3[i])
	        {
	            enableLink(oLk[i]);

	            oOL[i].parentNode.removeChild(oOL[i]);
	        }else{
	        	disableLink(oLk[i]);
	        }
	        
	    }



	}

// 功能:初始化overlay，还原为所有图片都带有overlay的状态

function initoverlay(){
	var oLk=document.getElementsByClassName("lk");
	var oOL=document.getElementsByClassName("overlay");
	while(oOL.length > 0){//删除所有overlay
        	oOL[0].parentNode.removeChild(oOL[0]);
    	}

    	for(var i=0;i<5;i++){//再为所有图片加上overlay
    		oLk[i].innerHTML = oLk[i].innerHTML + '<div class="overlay"></div>';
	        
	    }
}



// 功能: reset;
window.onload=function(){
	var oBtn=document.getElementById('btn1');

	oBtn.onclick=function(){
		set_glyph(0,0,0,0,0,0,0,0,0,0);
		selectclear();
		initoverlay();
	};
};

function event(){
	console.log("run event function")
}
