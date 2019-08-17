import * as React from 'react'
import { TasksFlowChart } from '../src/container/TasksFlowChart'
import { COLOR_ERROR, COLOR_SUCCESS } from '../src/types'

export class TasksFlowChartStory extends React.Component<{}, {}> {

  public render () {

    // const startTasks = [{
    //   title: 'Task X',
    //   id: 'taskX',
    //   points: 40,
    //   dependencies: [],
    // }, {
    //   title: 'Task Y',
    //   id: 'taskY',
    //   dependencies: [],
    // }]

    const startTasks = [{
      title: 'Task A',
      id: 'taskA',
      points: 20,
      status: 'finished',
      dependencies: [],
    }, {
      title: 'Task B',
      id: 'taskB',
      points: 30,
      status: 'finished',
      dependencies: ['taskA'],
    }, {
      title: 'Task C',
      id: 'taskC',
      points: 40,
      status: 'finished',
      dependencies: ['taskA'],
    }, {
      title: 'Task D',
      id: 'taskD',
      points: 40,
      status: 'finished',
      dependencies: [],
    }, {
      title: 'Task E',
      id: 'taskE',
      points: 40,
      status: 'finished',
      // dependencies: ['taskC', 'taskJ'],
      dependencies: ['taskC'],
    }, {
      title: 'Task F',
      id: 'taskF',
      points: 40,
      status: 'finished',
      dependencies: ['taskD'],
    }, {
      title: 'Task G',
      id: 'taskG',
      points: 40,
      status: 'finished',
      dependencies: ['taskF'],
    }, {
      title: 'Task H',
      id: 'taskH',
      points: 40,
      dependencies: ['taskC', 'taskF'],
    }, {
      title: 'Task I',
      id: 'taskI',
      points: 40,
      dependencies: ['taskE'],
    }, {
      title: 'Task J',
      id: 'taskJ',
      points: 40,
      dependencies: ['taskE'],
    }, {
      title: 'Task X',
      id: 'taskX',
      points: 40,
      dependencies: [],
    }, {
      title: 'Task Y',
      id: 'taskY',
      dependencies: [],
    }]

    return (
      <div>
        <TasksFlowChart
          tasks={startTasks}
          // handleCreateRelation={({ from, to }) => {
          //   console.log(from, to)
          // }}
          // handleDeleteRelation={({ from, to }) => {
          //   console.log(from, to)
          // }}
          // handleDeleteTaskRelations={(task) => {
          //   console.log(task)
          // }}
          // onChange={({ tasks, distances, chartRelations }) => {
          //   console.log(tasks, distances, chartRelations)
          // }}
          startContent={() => (
            <p>PROJECT START</p>
          )}
          endContent={(distance) => (
            <p>PROJECT END ({distance})</p>
          )}
          taskContent={(task) => (<div
            style={{ color: task && task.status === 'finished' ? COLOR_SUCCESS : COLOR_ERROR }}
          >
            <p>{task.id}</p>
            <i
              style={{ width: 15, position: 'absolute', right: 25, top: 5 }}
              onClick={
                () => {
                  console.log(task)
                }}
            >
              <svg
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="svg-inline--fa fa-pencil fa-w-16"
              >
                <path
                  /* tslint:disable-next-line:max-line-length */
                  d="M493.255 56.236l-37.49-37.49c-24.993-24.993-65.515-24.994-90.51 0L12.838 371.162.151 485.346c-1.698 15.286 11.22 28.203 26.504 26.504l114.184-12.687 352.417-352.417c24.992-24.994 24.992-65.517-.001-90.51zm-95.196 140.45L174 420.745V386h-48v-48H91.255l224.059-224.059 82.745 82.745zM126.147 468.598l-58.995 6.555-30.305-30.305 6.555-58.995L63.255 366H98v48h48v34.745l-19.853 19.853zm344.48-344.48l-49.941 49.941-82.745-82.745 49.941-49.941c12.505-12.505 32.748-12.507 45.255 0l37.49 37.49c12.506 12.506 12.507 32.747 0 45.255z"
                />
              </svg>
            </i>
          </div>)}
        />
      </div>)
  }
}
