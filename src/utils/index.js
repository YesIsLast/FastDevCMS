import request from "../service/request"

function is(constructor, value) {
	return Object.prototype.toString.call(value) === '[object ' + constructor.name + ']';
}
//ES6 中参数必填的情况下默认的参数
function throwIfMissing() {
	throw new Error('必须的参数并没有被传递');
}

// 复制内容至剪切板
function toClipboard() {
    // 获取需要复制得页面节点
    const copySpan = document.getElementById('copy');
    const range = document.createRange();
    // 获取节点text内容
    range.selectNodeContents(copySpan);
    const selection = window.getSelection();
    selection.removeAllRanges();//（注意）
    selection.addRange(range);

    const copyContent = document.execCommand('Copy',false,null);
    selection.removeRange(range);

    if (copyContent) {
        store.commit('SET_MESSAGE',{
            "message" : "复制成功",
            "level" : "success"
        })
    }else{
        store.commit('SET_MESSAGE',{
            "message" : "复制失败",
            "level" : "error"
        })
    }
  }

/**
 * 首字母大小写转换
 * @param {*} str 字符串值
 * @param {*} type 转换类型 小写——lowercase/大写——upperCase
 * @returns 大小写转换后得单词
 */
function getWordFormat(str,type){
    let result = ""
    if(type == 'lowercase'){
        // 小写转换
        result = str.toLowerCase()
    }else if(type == 'upperCase'){
        // 大写转换
        result = str.toUpperCase()
    }
    return result
}

/**
 * 数组 转 字符串  数组逗号分割
 * @param {*} arr 数组格式 ["妈蛋","滚","啥也不是","？？？"]
 * @return 妈蛋,滚,啥也不是,？？？
 */
function getSplit(arr) {
	let result = ""
	arr.forEach(item => {
		result = result + item + ','
	})
	return result = result.substring(0, result.lastIndexOf(','));
}
/**
 * 字符串 转 数组 split逗号分割
 * @param {*} str 字符串格式  妈蛋,滚,啥也不是,？？？
 * @returns ["妈蛋","滚","啥也不是","？？？"]
 */
function setSplit(str) {
	if (str == "") { return []}
	let result = str.split(",")
	return result
}

/**
 * 时间转换
 * @param {*} val 时间秒级单位
 */
function changeFormatTime(val) {
	var theTime = parseInt(val);// 秒
	var middle = 0;// 分
	var hour = 0;// 小时

	if (theTime > 60) {
		middle = parseInt(theTime / 60);
		theTime = parseInt(theTime % 60);
		if (middle > 60) {
			hour = parseInt(middle / 60);
			middle = parseInt(middle % 60);
		}
	}
	var result = "" + parseInt(theTime) + "秒";
	if (middle > 0) {
		result = "" + parseInt(middle) + "分" + result;
	}
	if (hour > 0) {
		result = "" + parseInt(hour) + "小时" + result;
	}
	return result;
}

// json字符串解析
function parsingJSON(value) {
	if (!value) { return value }
	let val = value.replace('\/', '')
	if (typeof val == 'string') {
		val = JSON.parse(val)
	}
	return val
}
// 排序
function sortByASC(a, b) {
	return a.sort - b.sort
}
/**
 * 框架树结构层级处理
 * @param {Array} list 
 * @param {number} parentId 
 */
function getTreeList(list, parentId) {
	let result = []
	for (let i in list) {
		list[i].key = list[i].id
		list[i].title = list[i].name
		// list[i].type == "root" && 
		if (list[i].parentId === parentId) {
			let children = getTreeList(list, list[i].id)
			if (children.length > 0) {
				list[i].children = getTreeList(list, list[i].id)
			}
			result.push(list[i])
		}
	}
	return result.sort(sortByASC).reverse()
}

/**
 * 日期格式化
 * yyyy-MM-dd HH:mm:ss
 * yyyy-MM-dd
 * */
Date.prototype.Format = function (fmt) {
	var o = {
		"M+": this.getMonth() + 1, //月份 
		"d+": this.getDate(), //日 
		"H+": this.getHours(), //小时 
		"m+": this.getMinutes(), //分 
		"s+": this.getSeconds(), //秒 
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度 
		"S": this.getMilliseconds() //毫秒 
	};
	if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
		if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[
			k]).substr(("" + o[k]).length)));
	return fmt;
}

/**
 * 传时间戳参数进行时间戳转换，不传时返回当前时间（返回年月日时分秒格式）
 * @param {Object} timeStamp 时间戳参数 非必传
 * @param {Object} format 格式化样式 非必传
 */
function getNowDatetime(timeStamp, format) {
	// 判断是否有时间戳参数
	let nowDatetime = ''
	let returnValFormat = 'yyyy-MM-dd HH:mm:ss'
	if (timeStamp) {
		nowDatetime = new Date(timeStamp)
	} else {
		nowDatetime = new Date()
	}
	if (format) {
		returnValFormat = format
	}
	return nowDatetime.Format(returnValFormat)
}


export default {
	is,
	throwIfMissing,
	sortByASC,
	getTreeList,
	getNowDatetime,
	parsingJSON,
	changeFormatTime,
	getSplit,
	setSplit,
    getWordFormat,
    toClipboard
}