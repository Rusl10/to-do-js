class Dom{
	constructor(selector){
		this.$el = typeof selector === 'string'
		? document.querySelector(selector)
		: selector
		console.log('this.$el', this.$el)
	}

	html(html){
		if (typeof html === 'string') {
			this.$el.innerHTML = html
			return this
		}
		return this.$el.outerHTML.trim()
	}

	clear(){
		this.$el.innerHTML = ''
		return this
	}

	append(node){
		if (node instanceof Dom) {
			node = node.$el
		}
		if (Element.prototype.append) {
			this.$el.append(node)
		} else {
			this.$el.appendChild(node)
		}
		return this
	}

	on(eventType, fn){
		this.$el.addEventListener(eventType, fn)
	}

	off(eventType, fn){
		this.$el.removeEventListener(eventType, fn)
	}

	addClass(className){
		this.$el.classList.add(className)
	}

	removeClass(className){
		this.$el.classList.remove(className)
	}

	toggleClass(className){
		this.$el.classList.contains(className) 
		? this.$el.classList.remove(className)
		: this.$el.classList.add(className)
	}
	find(selector) {
		return this.$el.querySelector(selector)
	}

}


export function $(selector){
	return new Dom(selector)
}

$.create = (tagName, classes = '') => {
	let el = document.createElement(tagName)
	if (classes) {
		el.classList.add(classes)
	}
	return $(el)
}