/**
 * 全局自定义校验规则
 * @param {*} rule 
 * @param {*} value 
 * @param {*} callback 
 */

//校验排序输入值
let validateCheckSort = (rule, value, callback) => {
	if (value) {
        if (value <= 0) {
            callback(new Error("请输入正确的排序值,最小不能低于0"));
        } else {
        callback();
        }
	} else {
		callback()
	}
}

// 校验数值输入值
let validateNumber = (rule, value, callback) => {
	if (value) {
        if (value <= 0) {
            callback(new Error("请输入正整数,最小不能低于0"));
        } else {
        callback();
        }
	} else {
		callback()
	}
}


export default {
    validateCheckSort,
    validateNumber
    
}