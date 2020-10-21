import {ToDoComponent} from '../../core/ToDoComponent'
import {createTaskList} from './tasklist.template'
import {$} from '../../core/dom'



export class TaskList extends ToDoComponent{
	static className = 'todo__tasklist'
	constructor($root){
		super($root, {
			name: 'TaskList',
			listeners: [
				'click'
			]
		})
	}
	toHTML(){
		return createTaskList()
	}

	onClick(event){
		console.log('event.target.dataset.resolve', event.target.dataset.resolve)
		if (event.target.dataset.resolve) {
			$($(event.currentTarget).find(`.task__descr[data-description='${event.target.dataset.resolve}']`)).toggleClass('task__descr--resolved')
		}

		if (event.target.dataset.delete) {
			$(event.currentTarget).find(`.row[data-row='${event.target.dataset.delete}']`).remove()
		}
	}
}