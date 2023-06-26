import { ITask } from './types/tasks'

const baseUrl = 'http://localhost:3001'

// the promise is resolved with the response of the request
// the type is inferred from the return type of the function
export const getAllTodos = async (): Promise<ITask[]> => {
    const res = await fetch(`${baseUrl}/tasks`, {cache: 'no-store'})
    const todos = await res.json()
    return todos
}

export const addTodo = async (todo: ITask): Promise<ITask> => {
    const res = await fetch(`${baseUrl}/tasks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(todo)
    })
    const newTodo = await res.json()
    return newTodo
}