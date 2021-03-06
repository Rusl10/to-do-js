let tasks = [
	{
		title: 'Заголовок задачи',
		description: 'lorem5 lorem5 v lorem5 lorem5 v',
		isResolved: false
	},
	{
		title: 'Заголовок задачи 2',
		description: 'lorem5 lorem5 v lorem5 lorem5 v',
		isResolved: true
	}
]


function row(content, index){
	
	return `<div data-row="${index}" class="row">${content}</div>`
}

function col(content){
	return `<div class="col-sm">${content}</div>`
}
/* FIXIT index in svg */
function taskContent(task, index){
	return `
		<h3>${task.title}</h3>
			<div class="task">
				<p data-description="${index}" class="task__descr ${task.isResolved ? 'task__descr--resolved' : ''}">${task.description}</p>
				<div class="task__controls controls">
					<button class="controls__check" data-resolve="${index}">
						<svg data-resolve="${index}" width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-check2" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
							<path fill-rule="evenodd" d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
						</svg>
					</button>
					<button class="controls__delete" data-delete="${index}">
						<svg data-delete="${index}" width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
							<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
							<path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
						</svg>
					</button>
				</div>
			</div>
	`
}

export function createTaskList(){
	let html = ''
	tasks.forEach((task, index) => {
		html += row(col(taskContent(task, index)), index)
	})
	return html
}