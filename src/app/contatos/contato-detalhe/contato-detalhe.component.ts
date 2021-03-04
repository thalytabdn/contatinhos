import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Contato } from 'src/app/models/Contato';
import { ContatosService } from '../contatos.service';

@Component({
  selector: 'app-contato-detalhe',
  templateUrl: './contato-detalhe.component.html',
  styleUrls: ['./contato-detalhe.component.css']
})
export class ContatoDetalheComponent implements OnInit {

  contato!: Contato;
  idSelecionado!: number;
  inscricao!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contatosService: ContatosService
  ) { }

  editarContato(){
    this.router.navigate(['/contatos', this.contato.id, this.contato, 'edit']);
  }

  deleteContato(){
    this.contatosService.deleteContato(this.contato).subscribe();
    this.router.navigate(['/contatos']);
  }

  ngOnInit(){
    this.inscricao = this.route.params.subscribe(
      (params: any) => {
        let id = params['id'];

        this.contatosService.getContato(id).subscribe(contato => {
          this.contato = contato;
        });
      }
      )
      
  }

  ngOnDestroy(){
    this.inscricao.unsubscribe();
  }
}
