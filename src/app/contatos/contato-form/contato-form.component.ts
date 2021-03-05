import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Contato } from 'src/app/models/Contato';
import { ContatosService } from '../contatos.service';

@Component({
  selector: 'app-contato-form',
  templateUrl: './contato-form.component.html',
  styleUrls: ['./contato-form.component.css']
})
export class ContatoFormComponent implements OnInit {
  
  contatos!: Contato[];
  contato = {} as Contato;
  inscricao!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contatosService: ContatosService
  ) { }

  saveContato(form: NgForm){
    if (this.contato.id !== undefined) {
      this.contatosService.updateContato(this.contato).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      this.contatosService.saveContato(this.contato).subscribe(() => {
        this.cleanForm(form);
      });
    }
  }

  ngOnInit(): void {
    this.inscricao = this.route.params.subscribe(
      (params: any) => {
        let id = params['id'];

        this.contatosService.getContato(id).subscribe(contato => {
          this.contato = contato;
        });

        if(this.contato === null){
          this.contato = {} as Contato;
        }
      }
    )
  }

  ngOnDestroy(){
    this.inscricao.unsubscribe();
  }

  //limpa formulário
  cleanForm(form: NgForm){
    form.resetForm();
    this.contato = {} as Contato;
    this.router.navigate(['/contatos']);
  }

}
