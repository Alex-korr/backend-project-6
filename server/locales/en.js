export default {
  translation: {
    flash: {
      tasks: {
        create: {
          success: 'Success',
          error: 'Failed to create task. Please try again.',
        },
        update: {
          success: 'Task updated successfully!',
          error: 'Failed to update task.',
        },
        delete: {
          success: 'Task was deleted!',
          forbidden: 'You are not allowed to delete this task.',
          error: 'Failed to delete task.',
        },
      },
      labels: {
        delete: {
          success: 'Label was deleted!',
          error: 'Cannot delete label with related tasks.',
        },
      },
    },
    users: {
      new: {
        title: 'New User',
        firstNameLabel: 'First Name',
        firstNamePlaceholder: 'First Name',
        lastNameLabel: 'Last Name',
        lastNamePlaceholder: 'Last Name',
        emailLabel: 'Email address',
        emailPlaceholder: 'name@example.com',
        passwordLabel: 'Password',
        passwordPlaceholder: 'Password',
        submit: 'Create User',
      },
      index: {
        Name: 'Name',
        Edit: 'Edit',
        Delete: 'Delete',
      },
    },
    labels: {
      index: {
        newLabel: 'New Label',
        name: 'Name',
        actions: 'Actions',
        noLabels: 'No tags',
      },
    },
    statuses: {
      index: {
        title: 'Statuses',
        createStatus: 'Create status',
        name: 'Name',
        actions: 'Actions',
        delete: 'Delete',
      },
    },
    tasks: {
      index: {
        status: 'Status',
        all: 'All',
        executor: 'Executor',
        label: 'Label',
        labels: 'Labels',
        onlyMy: 'Only my tasks',
        filter: 'Filter',
        newTask: 'New Task',
        signInToAdd: 'Sign in to add tasks',
        name: 'Name',
        statusTh: 'Status',
        creator: 'Creator',
        executor: 'Executor',
        actions: 'Actions',
        noTasksFound: 'No tasks found',
        delete: 'Delete',
        description: 'Description',
      },
            },
        sessions: {
          new: {
            title: 'Please sign in',
            emailLabel: 'Email address',
            emailPlaceholder: 'name@example.com',
            passwordLabel: 'Password',
            passwordPlaceholder: 'Password',
            submit: 'Sign in',
          },
        },
    appName: 'Task Manager',
    layouts: {
      application: {
        home: 'Home',
        users: 'Users',
        statuses: 'Statuses',
        tasks: 'Tasks',
        labels: 'Labels',
        signIn: 'Login',
        signUp: 'Sign up',
        language: 'Language',
        edit: 'Edit',
        delete: 'Delete',
        signOut: 'Sign Out',
      },
    },
    views: {
      welcome: {
        index: {
          hello: 'Welcome to Task Manager!',
          description: 'Organize your tasks efficiently with our simple and powerful task management system.',
          getStarted: 'Get Started',
          viewUsers: 'View Users',
        },
      },
    },
    noUsersYet: 'No users yet',
    flash: {
      userNotFound: 'User not found or already deleted',
      userDeleted: 'User successfully deleted',
    },
  },
};
