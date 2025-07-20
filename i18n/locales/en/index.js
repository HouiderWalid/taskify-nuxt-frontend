export default {
    globals: {
        task: {
            statuses: {
                todo: 'Todo',
                in_progress: 'In Progress',
                done: 'Done'
            },
            priorities:{
                low: 'Low',
                medium: 'Medium',
                high: 'High'
            }
        }
    },
    navbar: {
        overview: 'Overview'
    },
    signup: {
        form: {
            fields: {
                full_name: {
                    title: 'Full Name'
                },
                email: {
                    title: 'Email'
                },
                password: {
                    title: 'Password'
                },
                password_confirmation: {
                    title: 'Password Confirmation'
                }
            }
        }
    },
    project: {
        create: {
            title: 'Create Project',
        },
        form: {
            fields: {
                title: {
                    title: 'Title',
                    placeholder: 'Enter The Title',
                },
                due_date: {
                    title: 'Due Date'
                },
                description: {
                    title: 'Description',
                    placeholder: 'Describe The Project',
                }
            }
        }
    },
    task: {
        create: {
            title: 'Create Task',
        },
        form: {
            fields: {
                project: {
                    title: 'Project',
                    placeholder: 'Search in projects'
                },
                member: {
                    title: 'Assigned to member',
                    placeholder: 'Search in members'
                },
                due_date: {
                    title: 'Due Date',
                },
                title: {
                    title: 'Title',
                    placeholder: 'Enter the title'
                },
                priority:{
                    title: 'Priority',
                },
                description: {
                    title: 'Description',
                    placeholder: 'Describe the task'
                }
            }
        }
    }
}