import Workers from '@/router/worker/Workers'
import Worker from '@/router/worker/Worker'
import Tasks from '@/router/worker/Tasks'
import Task from '@/router/worker/Task'
import Needs from '@/router/worker/Needs'

export default [{
  path: '/workers',
  name: 'workers',
  component: Workers
}, {
  path: '/workers/:worker',
  component: Worker,
  children: [{
    path: '',
    name: 'worker',
    component: Tasks
  }, {
    path: ':task',
    component: Task,
    children: [{
      path: '',
      name: 'task',
      component: Needs
    }]
  }]
}]
