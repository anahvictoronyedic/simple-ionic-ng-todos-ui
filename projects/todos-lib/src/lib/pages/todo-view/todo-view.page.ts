import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Todo } from '../../abstracts/interfaces/todos.interface';
import {NavController} from '@ionic/angular';
import { TodosDataBroker } from '../../abstracts/interfaces/todos-data-broker';
import { TodosDataBrokerServiceToken } from '../../abstracts/interfaces/todos-data-broker-config.interface';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-todo-view',
  templateUrl: './todo-view.page.html',
  styleUrls: ['./todo-view.page.scss'],
})
export class TodoViewPage implements OnInit {

  todo:Todo;

  constructor(@Inject(TodosDataBrokerServiceToken)
  private todosDataBroker:TodosDataBroker,private router:Router,private activatedRoute: ActivatedRoute,private navCtrl:NavController) {
    this.todo = this.router.getCurrentNavigation()?.extras.state?.todo;
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(
      paramMap => {
        if(!this.todo){
          if(!paramMap.has('id')) {
            this.forcedExit();
            return;
          }
          const todoId = paramMap.get('id');
          this.todosDataBroker.loadOne({
            id:todoId,
          })
        }
      }
    )
  }

  forcedExit(){
    this.navCtrl.pop();
  }

}