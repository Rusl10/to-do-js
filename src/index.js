import './css/main.css'
import {ToDo} from './components/todo/ToDo'
import {TaskList} from './components/tasklist/TaskList'
import {Sidebar} from './components/sidebar/Sidebar'

const todo = new ToDo('#app', {
	components: [
		Sidebar,
		TaskList,
	]
})

todo.render()