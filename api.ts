import { ITask } from './types/tasks'

const baseUrl = 'http://localhost:3001'

// the promise is resolved with the response of the request
// the type is inferred from the return type of the function
export const getAllTodos = async (): Promise<ITask[]> => {
    const res = await fetch(`${baseUrl}/tasks`)
    const todos = await res.json()
    return todos
}