import {ToDoComponent} from '../../core/ToDoComponent'

export class Sidebar extends ToDoComponent{
	static className = 'todo__sidebar'
	constructor($root){
		super($root, {
			name: 'Sidebar',
			listeners: [
				'submit',
				'click'
			]
		})
		this.$root = $root
	}
	toHTML(){
		return `
			<form name="task">
      <h5>task</h5>
      <div class="form-group">
        <input class="form-control form-control-sm" name="value" placeholder="value">
      </div>
      <div class="form-group">
        <input class="form-control form-control-sm" name="styles" placeholder="styles">
      </div>
      <button type="submit" class="btn btn-primary btn-sm">Добавить</button>
    </form>
    <hr />
			
		`
	}
	

	onSubmit(event){
		event.preventDefault()
		console.log('Formula: onInput', event)
	}
	onClick(event){
		console.log(5)
	}
}