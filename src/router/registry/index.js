import Registry from '@/router/registry/Registry'
import Workers from '@/router/registry/Workers'
import Worker from '@/router/registry/Worker'
import Tasks from '@/router/registry/Tasks'
import Task from '@/router/registry/Task'
import Needs from '@/router/registry/Needs'

export default [{
  path: '/registry',
  component: Registry,
  children: [{
    path: '',
    name: 'registry',
    component: Workers
  }, {
    path: 'worker/:worker',
    component: Worker,
    children: [{
      path: '',
      name: 'worker',
      component: Tasks
    }]
  }, {
    path: 'worker/:worker/task/:task',
    component: Task,
    children: [{
      path: '',
      name: 'task',
      component: Needs
    }]
  }]
}]
