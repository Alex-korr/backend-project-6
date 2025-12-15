export default {
  translation: {
    create: 'Создать',
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
        update: {
          success: 'Задача успешно изменена',
          error: 'Не удалось обновить задачу.'
        },
        delete: {
          success: 'Задача успешно удалена',
          error: 'Не удалось удалить задачу.'
        }
      },
      labels: {
        create: {
          success: 'Метка успешно создана',
          error: 'Не удалось создать метку. Имя не может быть пустым.'
        },
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
          show: 'Показать',
        status: 'Статус',
        all: 'Все',
        executor: 'Исполнитель',
        label: 'Метка',
        labels: 'Метки',
        onlyMy: 'Только мои задачи',
        noLabel: 'Без метки',
        onlyMyActive: 'Показаны только ваши задачи',
        filter: 'Фильтровать',
        newTask: 'Создать задачу',
        signInToAdd: 'Войдите, чтобы добавить задачи',
        name: 'Наименование',
        statusTh: 'Статус',
        statusPlaceholder: 'Выберите статус',
        creator: 'Автор',
        actions: 'Действия',
        edit: 'Изменить',
        noTasksFound: 'Задачи не найдены',
        delete: 'Удалить',
        description: 'Описание'
        ,notAssigned: 'Не назначен'
      }
      ,
      editTitle: 'Изменить задачу',
      name: 'Наименование',
      description: 'Описание',
      status: 'Статус',
      executor: 'Исполнитель',
      labels: 'Метки',
      save: 'Сохранить'
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
        name: 'Наименование',
        actions: 'Действия',
        noLabels: 'Нет меток'
      }
    },
    statuses: {
      index: {
        title: 'Статусы',
        createStatus: 'Создать статус',
        editStatus: 'Изменить статус',
        edit: 'Изменить',
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

