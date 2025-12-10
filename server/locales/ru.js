export default {
  translation: {
    'First name is required': 'Имя обязательно',
    'Last name is required': 'Фамилия обязательна',
    'Email is required': 'Email обязателен',
    'Password must be at least 3 characters': 'Пароль должен быть не менее 3 символов',
    flash: {
      session: {
        create: {
          success: 'Вы залогинены',
          error: 'Неправильный email или пароль',
        },
        delete: {
          success: 'Вы разлогинены',
        },
      },
      users: {
        create: {
          success: 'Пользователь успешно зарегистрирован',
          error: 'Не удалось зарегистрировать',
        },
        update: {
          success: 'Пользователь успешно изменён',
        },
        delete: {
          success: 'Пользователь успешно удалён',
        },
      },
      tasks: {
        create: {
          success: 'Задача успешно создана!',
          error: 'Не удалось создать задачу. Попробуйте еще раз.'
        },
        error: 'Не удалось обновить задачу.'
      },
      labels: {
        delete: {
          success: 'Метка успешно удалена',
          error: 'Не удалось удалить метку.'
        }
      },
      statuses: {
        create: {
          success: 'Статус успешно создан',
        },
        update: {
          success: 'Статус успешно изменён',
        },
        delete: {
          success: 'Статус успешно удалён',
          error: 'Нельзя удалить статус, к которому привязаны задачи.'
        }
      }
    },
    tasks: {
      index: {
        status: 'Статус',
        all: 'Все',
        executor: 'Исполнитель',
        label: 'Метка',
        labels: 'Метки',
        onlyMy: 'Только мои задачи',
        filter: 'Фильтровать',
        newTask: 'Новая задача',
        signInToAdd: 'Войдите, чтобы добавить задачи',
        name: 'Название',
        statusTh: 'Статус',
        creator: 'Автор',
        actions: 'Действия',
        noTasksFound: 'Задачи не найдены',
        delete: 'Удалить',
        description: 'Описание'
      }
    },
    users: {
      new: {
        title: 'Создать пользователя',
        firstNameLabel: 'Имя',
        firstNamePlaceholder: 'Имя',
        lastNameLabel: 'Фамилия',
        lastNamePlaceholder: 'Фамилия',
        emailLabel: 'Email',
        emailPlaceholder: 'name@example.com',
        passwordLabel: 'Пароль',
        passwordPlaceholder: 'Пароль',
        submit: 'Сохранить'
      },
      index: {
        Name: 'Имя',
        Edit: 'Изменить',
        Delete: 'Удалить',
        noUsersYet: 'Пользователей пока нет',
        newUser: 'Создать пользователя'
      }
    },
    labels: {
      index: {
        newLabel: 'Создать метку',
        name: 'Название',
        actions: 'Действия',
        noLabels: 'Нет меток'
      }
    },
    statuses: {
      index: {
        title: 'Статусы',
        createStatus: 'Создать статус',
        editStatus: 'Изменить статус',
        name: 'Наименование',
        actions: 'Действия',
        delete: 'Удалить',
        save: 'Сохранить'
      },
      createSubmit: 'Создать',
    },
    sessions: {
      new: {
        title: 'Войдите в аккаунт',
        emailLabel: 'Email',
        emailPlaceholder: 'name@example.com',
        passwordLabel: 'Пароль',
        passwordPlaceholder: 'Пароль',
        submit: 'Войти'
      }
    },
    appName: 'Менеджер задач',
    layouts: {
      application: {
        home: 'Главная',
        users: 'Пользователи',
        statuses: 'Статусы',
        tasks: 'Задачи',
        labels: 'Метки',
        signIn: 'Вход',
        signUp: 'Регистрация',
        edit: 'Редактировать',
        delete: 'Удалить',
        signOut: 'Выход'
      }
    },
    views: {
      welcome: {
        index: {
          hello: 'Добро пожаловать в Менеджер задач!',
          description: 'Организуйте свои задачи эффективно с помощью нашей простой и мощной системы управления задачами.',
          getStarted: 'Начать',
          viewUsers: 'Показать пользователей'
        }
      }
    }
  }
};

