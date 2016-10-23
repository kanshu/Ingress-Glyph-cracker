// 功能: 点击后检查所有单选框的状态，并生成字符串;
function selectCheck() {
  var acc = document.getElementsByClassName("radio");
  var arr = new Array();
  for (var i = 0; i < acc.length; i++) {
    if (acc[i].checked) {
      arr[i] = 1;
    } else {
      arr[i] = 0;
    }
  }
  var str = arr.join(""); //输出的11位字符串
  candList = findGlyph(str);
  candList.sort();
  for (var i = 0; i < candList.length; i++) {
    candList[i] = candList[i].substr(2);
  }
  fillGlyph(candList);
}

function fillGlyph(candList, imgState = 1) {
  stateList = [].fill(0, 0, 5);
  if (candList.length > 0) {
    for (var i = 0; i < candList.length; i++) {
      stateList[i] = imgState;
    }
    candList.fill("undefined", candList.length, 5)
    setGlyph(candList[0], stateList[0], candList[1], stateList[1], candList[2], stateList[2], candList[3], stateList[3], candList[4], stateList[4]);
  }
}

function findGlyph(points) {
  resultList = [];
  for (glyphName in glyphList) {
    value = glyphList[glyphName];
    selectedCount = 0;
    matchCount = 0;
    unmatchCount = 0;
    for (var i = 0; i < points.length; i++) {
      userTrue = points.charAt(i) == "1";
      if (userTrue) {
        selectedCount++;
        if (value.charAt(i) == "1") {
          matchCount++;
        }
      } else {
        // This point, user set it to false , but the candidate is set to true
        if (value.charAt(i) == "1") {
          unmatchCount++;
        }
      }
    }
    if (selectedCount == matchCount) {
      resultList.push(unmatchCount + ":" + glyphName)
    }
  }
  if (resultList.length > 5) {
    return [];
  } else {
    return resultList.sort();
  }
}
// 功能: 清空选择区
function selectClear() {
  var acc = document.getElementsByClassName("radio");
  var arr = new Array();
  for (var i = 0; i < acc.length; i++) {
    acc[i].checked = false;
    arr[i] = 0;
  }
  var str = arr.join(""); //输出的11位字符串
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
  link.setAttribute("href", "javascript:candidateClick('" + link.id + "');");
  // 删除disabled属性
  link.removeAttribute("disabled");
}
//设置右边各个区域的图形及状态
//参数:
//	图片名(jpg格式)：a1_name，a2_name，a3_name，a4_name，a5_name
//	图片状态（是否可点击 0/1）：a1_state，a2_state，a3_state，a4_state，a5_state
function setGlyph(a1_name, a1_state, a2_name, a2_state, a3_name, a3_state, a4_name, a4_state, a5_name, a5_state) {
  var oImg = document.getElementsByClassName("img");
  var linkList = document.getElementsByClassName("lk");
  var oOL = document.getElementsByClassName("overlay");
  var imgList = new Array();
  var stateList = new Array();
  imgList = [a1_name, a2_name, a3_name, a4_name, a5_name];
  for (var i = 0; i < 5; i++) {
    oImg[i].src = 'img/' + imgList[i] + '.png';
  }
  stateList = [a1_state, a2_state, a3_state, a4_state, a5_state];
  initoOerlay();
  for (var i = 4; i >= 0; i--) {
    if (stateList[i]) {
      enableLink(linkList[i]);
      oOL[i].parentNode.removeChild(oOL[i]);
    } else {
      disableLink(linkList[i]);
    }
  }
}
// 功能:初始化overlay，还原为所有图片都带有overlay的状态
function initoOerlay() {
  var linkList = document.getElementsByClassName("lk");
  var oOL = document.getElementsByClassName("overlay");
  while (oOL.length > 0) { //删除所有overlay
    oOL[0].parentNode.removeChild(oOL[0]);
  }
  for (var i = 0; i < 5; i++) { //再为所有图片加上overlay
    linkList[i].innerHTML = linkList[i].innerHTML + '<div class="overlay"></div>';
  }
}
// 功能: reset;
window.onload = function() {
  var oBtn = document.getElementById('btn1');
  oBtn.onclick = function() {
    setGlyph(0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    selectClear();
    initoOerlay();
  };
};

function findNextGlyph(leadingGlyphList) {
  glyphList = [];
  for (var p = 0; p < puzzleList.length; p++) {
    puzzle = puzzleList[p];
    allMatch = 1;
    for (var i = 0; i < leadingGlyphList.length; i++) {
      if (puzzle[i] != leadingGlyphList[i]) {
        allMatch = 0;
        break;
      }
    }
    if ((allMatch == 1) && (glyphList.indexOf(puzzle[i]) == -1)) {
      glyphList.push(puzzle[i]);
    }
  }

  return glyphList;
}

function getFixed() {
  var resList = [];
  var linkList = document.getElementsByClassName("lk");
  var imgList = document.getElementsByClassName("img");
  for (var i = 0; i < linkList.length; i++) {
    link = linkList[i];
    if (link.hasAttribute("disabled")) {
      img = imgList[i];
      name = img.getAttribute("src").substring(4)
      if (name != "undefined.png") {
        mainName = name.substring(0, name.length - 4);
        resList.push(mainName);
      }
    }
  }
  return resList;
}
// 功能:响应事件，参数 clickedIndex 为5张图片的id（序号，1 - 5）
function candidateClick(clickedIndex) {

  var oImg = document.getElementsByClassName("img");
  var name = oImg[clickedIndex - 1].getAttribute("src").substring(4); //图片名称
  var mainName = name.substring(0, name.length - 4);
  fixList = getFixed();
  fixList.push(mainName);
  var i = 0;
  while(i < 100) {
    glyphList = findNextGlyph(fixList);
    if ((glyphList.length == 1) && (glyphList[0] ))  {
      fixList.push(glyphList[0]);
    } else {
      break;
    }
    i++;
  }
  imgList = [];
  stateList = [];
  for (var i = 0; i < fixList.length; i++) {
    imgList.push(fixList[i]);
    stateList.push(0);
  }
  for (var i = 0; i < glyphList.length; i++) {
    imgList.push(glyphList[i]);
    stateList.push(1);
  }
  imgList.fill("undefined", imgList.length, 5);
  stateList.fill("0", stateList.length, 5);
  setGlyph(imgList[0], stateList[0], imgList[1], stateList[1], imgList[2], stateList[2], imgList[3], stateList[3], imgList[4], stateList[4]);
}
