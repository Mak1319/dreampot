/**
 * Converts the path into a path
*/
String.prototype.path = function() {
	this.isPath = true
	return this;
}

/**
 * Returns the basename of the path
*/
String.prototype.basename = function(ext) {
	if (!this.isPath) return void 0;
	var separator = '/';
	var pathArray = this.split(separator);
	var base = pathArray[pathArray.length - 1];
	if (ext) return base.replace(ext, '');
	return base;
}
/**
 * Returns dirname of the path
*/
String.prototype.dirname = function() {
	if (!this.isPath) return void 0;
	var separator = '/';
	var pathWithOutLastSeparator = this.replace(/\/$/gi, '');
	var pathArray = pathWithOutLastSeparator.split(separator);
	pathArray.length -= 1;
	return pathArray.join(separator);
}
/**
 * Return the file's extension
*/
String.prototype.extname = function() {
	if (!this.isPath) return void 0;
	var separator = '/';
	var pathArray = this.split(separator);
	var base = pathArray[pathArray.length - 1];
	var result = base.match(/(\.[a-zA-Z0-9]+)$/gi);
	return result ? result[0] : '';
}
/**
 * Return true if the path is absolute
*/
String.prototype.isAbsolute= function(){
	if(!this.startsWith('/')) return false
	else return true;
}
/**
 * Check the string to check the posibility of typing path
*/
String.prototype.isAPath= function(){
	let x = this.match(/\W/gi)
	if(!this.includes('/')) return false
	let y= x.filter(el=>(el!='/')?(el!='.')?true:false:false)
	return y.length==0;
}
/**
 * Check extension deeply
*/
String.prototype.getExtStrongly= function(level){
	if(level==undefined) level=1;
	let basename = this.basename();
	let extlist= basename.split('.');
	extlist=extlist.splice(1)
	return new function Extension(){
		for(let i=1;i<=level;i++){
			this['ext'+i]='.'+extlist.slice(extlist.length-i,extlist.length).join('.');
		}
	}
}
/**
 * Join paths 
*/
String.prototype.join= function(){
	if (!this.isPath) return void 0;
	const separator = '/';
	let splitedthisText= this.split(separator);
	for (let prop of arguments) {
		splitedthisText=splitedthisText.concat(prop.split(separator));
	}
	for (const index in splitedthisText) {
		if(splitedthisText[index]=='..') {
			delete splitedthisText[index-1]
			delete splitedthisText[index]
		}
		if(splitedthisText[index]=='.') delete splitedthisText[index];
	}
	splitedthisText=splitedthisText.filter(ele=>ele!=null);
	return splitedthisText.join(separator)
}
/**
 * Format the string into camelCase
*/
String.prototype.toCamelCase= function(){
	let regex = /[\W\$\_]\w/gi
	const result=this.replace(regex, function(x){
		return x[1].toUpperCase()
	})
	return result
}

Object.prototype.forEach= function(callback){
	const self=this
	Object.keys(this).forEach(function(ele){
		callback(ele,self[ele])
	})
}

Array.prototype.delete= function(){
	for (const index in arguments) {
		delete this[arguments[index]]
	}
	return  this.filter(ele=>ele!=null)
}


Math.toRad= function(deg){
	return (Math.PI*deg)/180;
}
Math.toDeg= function(rad){
	return  (180*rad)/Math.PI
}
