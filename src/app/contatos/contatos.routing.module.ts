import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { ContatoDetalheComponent } from './contato-detalhe/contato-detalhe.component';
import { ContatoFormComponent } from './contato-form/contato-form.component';
import { ContatosComponent } from './contatos.component';

const contatosRoutes = [
    {path: 'contatos', component: ContatosComponent, children: [
        {path: 'new', component: ContatoFormComponent},
        {path: ':id', component: ContatoDetalheComponent},
        {path: ':id/edit', component: ContatoFormComponent}
    ]},
];


@NgModule({
    imports: [RouterModule.forChild(contatosRoutes)],
    exports: [RouterModule],
    declarations: [],
    providers: [],
})
export class ContatosRoutingModule { }
