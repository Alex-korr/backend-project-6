export default {
  translation: {
    layouts: {
      application: {
        home: 'Home',
        users: 'Users',
        statuses: 'Statuses',
        tasks: 'Tasks',
        labels: 'Labels',
        signIn: 'Sign in',
        signUp: 'Sign up',
        signOut: 'Sign out',
      },
    },
    validation: {
      required: 'This field is required',
    },
    create: 'Create',
    flash: {
      session: {
        create: {
          success: 'You are logged in',
          error: 'Invalid email or password',
        },
        delete: {
          success: 'You are logged out',
        },
      },
      tasks: {
        index: {
          show: 'Show',
        },
        create: {
          success: 'Success',
          error: 'Failed to create task',
        },
        update: {
          success: 'Task updated successfully!',
          error: 'Failed to update task.',
        },
        delete: {
          success: 'Task was deleted',
          forbidden: 'You are not allowed to delete this task.',
          error: 'Failed to delete task.',
        },
        validation: {
          statusRequired: 'Status is required',
        },
      },
      statuses: {
        create: {
          success: 'Status created successfully',
        },
        update: {
          success: 'Status updated successfully',
        },
        delete: {
          success: 'Status deleted successfully',
          error: 'Cannot delete status with related tasks.',
        },
      },
      labels: {
        create: {
          success: 'Label was created successfully!',
          error: 'Failed to create label. Name cannot be empty.',
        },
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
        edit: 'Edit',
        delete: 'Delete',
        Name: 'Name',
        Edit: 'Edit',
        Delete: 'Delete',
        newUser: 'Create user',
      },
    },
    labels: {
      index: {
        newLabel: 'New Label',
        name: 'Name',
        actions: 'Actions',
        edit: 'Edit',
        noLabels: 'No tags',
      },
    },
    statuses: {
      index: {
        title: 'Statuses',
        createStatus: 'Create status',
        editStatus: 'Edit status',
        edit: 'Edit',
        name: 'Name',
        actions: 'Actions',
        delete: 'Delete',
        save: 'Save',
        submit: 'Create',
        submit: 'Create',
      },
    },
    tasks: {
      edit: 'Edit Task',
      name: 'Name',
      description: 'Description',
      status: 'Status',
      executor: 'Executor',
      labels: 'Labels',
      save: 'Save',
      create: 'Create',
      cancel: 'Cancel',
      index: {
        status: 'Status',
        all: 'All',
        label: 'Label',
        labels: 'Labels',
        onlyMy: 'Only my tasks',
        noLabel: 'No label',
        onlyMyActive: 'Showing only your tasks',
        filter: 'Filter',
        newTask: 'New Task',
        signInToAdd: 'Sign in to add tasks',
        name: 'Name',
        statusTh: 'Status',
        statusPlaceholder: 'Select status',
        creator: 'Creator',
        executor: 'Executor',
        actions: 'Actions',
        noTasksFound: 'No tasks found',
        delete: 'Delete',
        description: 'Description',
        notAssigned: 'Not assigned',
        noStatus: 'No status',
        edit: 'Edit Task',
        show: 'Show Task',
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
  },
};
