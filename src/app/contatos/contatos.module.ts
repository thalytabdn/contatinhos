import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { ContatosComponent } from './contatos.component';
import { ContatoFormComponent } from './contato-form/contato-form.component';
import { ContatoDetalheComponent } from './contato-detalhe/contato-detalhe.component';
import { ContatosRoutingModule } from './contatos.routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        ContatosRoutingModule,
        FormsModule,
        HttpClientModule
    ],
    exports: [],
    declarations: [
        ContatosComponent,
        ContatoFormComponent,
        ContatoDetalheComponent],
    providers: [],
})
export class ContatosModule { }
