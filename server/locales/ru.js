export default {
  translation: {
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
          success: 'Тег успешно удалён',
          error: 'Не удалось удалить тег.'
        }
      },
      statuses: {
        create: {
          success: 'Статус успешно создан!',
        },
        update: {
          success: 'Статус успешно обновлён!',
        },
        delete: {
          success: 'Статус успешно удалён!',
          error: 'Нельзя удалить статус, к которому привязаны задачи.'
        }
      }
    },
    tasks: {
      index: {
        status: 'Статус',
        all: 'Все',
        executor: 'Исполнитель',
        label: 'Тег',
        labels: 'Теги',
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
        Edit: 'Редактировать',
        Delete: 'Удалить',
        noUsersYet: 'Пользователей пока нет'
      }
    },
    labels: {
      index: {
        newLabel: 'Создать тег',
        name: 'Название',
        actions: 'Действия',
        noLabels: 'Нет тегов'
      }
    },
    statuses: {
      index: {
        title: 'Статусы',
        createStatus: 'Создать статус',
        name: 'Название',
        actions: 'Действия',
        delete: 'Удалить'
      }
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
        labels: 'Теги',
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

