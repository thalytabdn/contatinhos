import { Component, OnInit } from '@angular/core';
import { Contato } from '../models/Contato';
import { ContatosService } from './contatos.service';

@Component({
  selector: 'app-contatos',
  templateUrl: './contatos.component.html',
  styleUrls: ['./contatos.component.css']
})
export class ContatosComponent implements OnInit {

  contatos!: Contato[];

  constructor(private contatosService: ContatosService) { }

  ngOnInit() {
    this.getAll();
  }

  getAll(){
    this.contatosService.getAll().subscribe((contatos: Contato[]) => {
      this.contatos = contatos;
    })
  }


}
