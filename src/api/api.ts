interface Task {
    id: number;
    name: string;
    text: string;
    status: boolean;
    tags?: string[];
    upDate: string;
}

export const getTasks = () => {
    return JSON.parse( localStorage.tasks );
}

export const getTask = (id:number) => {
    let tasks = JSON.parse( localStorage.tasks );
    return tasks[id];
}

export const createTask = (task:Task) => {
    if(localStorage.tasks === undefined)
        localStorage.setItem('tasks', JSON.stringify([]))
        let tasks = JSON.parse( localStorage.tasks );
        tasks.push(task);
        localStorage.tasks = JSON.stringify(tasks);
        return JSON.parse( localStorage.tasks );
}

export const clearTask = (task:Task) => {
    if(localStorage.tasks === undefined)
        localStorage.setItem('tasks', JSON.stringify([]))
        let tasks = JSON.parse( localStorage.tasks );
        
        tasks = tasks.filter((el:Task, i: number)=> {
            return task.id !== el.id;
        });
        localStorage.tasks = JSON.stringify(tasks)
        return JSON.parse( localStorage.tasks );
}

export const updateTask = (task:Task) => {

        let tasks = JSON.parse( localStorage.tasks );

        tasks = tasks.map((el:Task, id: number)=> {
            return task.id === id? task : el;
        });

        localStorage.tasks = JSON.stringify(tasks);
        return JSON.parse(localStorage.tasks);
}

export const clearTasks = () => {
    localStorage.tasks = JSON.stringify([]);
    return JSON.parse( localStorage.tasks );
}

